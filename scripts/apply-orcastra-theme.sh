#!/usr/bin/env bash
# apply-orcastra-theme.sh
#
# Deploy Orcastra branding onto an Authentik + nginx reverse-proxy host
# (nginx in front of the authentik `server` container, as in production).
#
# What this script does:
#   1. Copy assets/branding/* to a directory nginx can serve as /branding/.
#   2. Install a parameterized nginx config that:
#        - serves /branding/
#        - injects <script src="/branding/orcastra-theme.js?v=THEME_VERSION" defer>
#          immediately before </head> via sub_filter
#        - rewrites leftover ?v=70..(THEME_VERSION-1) query strings to the current version
#   3. Optionally docker-cp into a running nginx container and reload.
#
# Idempotent: re-running overwrites the same files with the same content.
# No secrets, tokens, SMTP passwords, or OAuth client secrets are read or written.
#
# Comments are English. User-facing echo lines are Indonesian.

set -euo pipefail

THEME_VERSION="${THEME_VERSION:-73}"
BRANDING_DEST="${BRANDING_DEST:-/usr/share/nginx/html/branding}"
NGINX_CONF_DEST="${NGINX_CONF_DEST:-}"
DOCKER_NGINX="${DOCKER_NGINX:-}"
DOCKER_CONF="${DOCKER_CONF:-/etc/nginx/conf.d/default.conf}"
RELOAD=1
DRY_RUN=0
DEST_EXPLICIT=0

usage() {
  cat <<'EOF'
Usage: apply-orcastra-theme.sh [options]

Deploy Orcastra branding onto an Authentik + nginx reverse-proxy host.

Options:
  --dest DIR              Branding directory served as /branding/
                          (default: /usr/share/nginx/html/branding)
  --nginx-conf PATH       Write the generated nginx server config here
                          (host path; omitted = skip host conf install unless --docker-nginx)
  --theme-version N       Cache-bust version (default: 73, env THEME_VERSION)
  --docker-nginx NAME     Docker container running nginx: copy branding + conf, then reload
  --docker-conf PATH      Conf path inside the container
                          (default: /etc/nginx/conf.d/default.conf)
  --no-reload             Do not reload nginx after install
  --dry-run               Print actions only
  -h, --help              Show this help

Environment (overridden by flags):
  THEME_VERSION   BRANDING_DEST   NGINX_CONF_DEST   DOCKER_NGINX   DOCKER_CONF

Examples:
  sudo ./scripts/apply-orcastra-theme.sh --nginx-conf /etc/nginx/conf.d/default.conf
  ./scripts/apply-orcastra-theme.sh --dest ./branding-out --nginx-conf ./nginx-out.conf --no-reload
  ./scripts/apply-orcastra-theme.sh --docker-nginx orcastra-nginx --theme-version 73
EOF
}

log() { printf '%s\n' "$*"; }
run() {
  if [[ "$DRY_RUN" -eq 1 ]]; then
    printf '[dry-run] '; printf '%q ' "$@"; printf '\n'
    return 0
  fi
  "$@"
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACK_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
SRC_BRANDING="${PACK_ROOT}/assets/branding"
SRC_NGINX="${PACK_ROOT}/nginx/nginx-branding.conf"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dest)           BRANDING_DEST="${2:?}"; DEST_EXPLICIT=1; shift 2 ;;
    --nginx-conf)     NGINX_CONF_DEST="${2:?}"; shift 2 ;;
    --theme-version)  THEME_VERSION="${2:?}"; shift 2 ;;
    --docker-nginx)   DOCKER_NGINX="${2:?}"; shift 2 ;;
    --docker-conf)    DOCKER_CONF="${2:?}"; shift 2 ;;
    --no-reload)      RELOAD=0; shift ;;
    --dry-run)        DRY_RUN=1; shift ;;
    -h|--help)        usage; exit 0 ;;
    *)                log "Opsi tidak dikenal: $1"; usage; exit 2 ;;
  esac
done

if [[ ! "$THEME_VERSION" =~ ^[0-9]+$ ]]; then
  log "ERROR: THEME_VERSION harus angka (dapat: ${THEME_VERSION})"
  exit 2
fi
if [[ ! -d "$SRC_BRANDING" ]]; then
  log "ERROR: aset branding tidak ditemukan: ${SRC_BRANDING}"
  exit 1
fi
if [[ ! -f "$SRC_NGINX" ]]; then
  log "ERROR: template nginx tidak ditemukan: ${SRC_NGINX}"
  exit 1
fi

# Build cache-bust sub_filter lines for leftover v=70 .. v=(N-1).
# Production currently ships v=73; older HTML may still reference 70, 71, 72.
build_cachebust() {
  local v
  local start=70
  local current="$THEME_VERSION"
  if [[ "$current" -le "$start" ]]; then
    return 0
  fi
  for ((v = start; v < current; v++)); do
    printf '        sub_filter '\''orcastra-theme.js?v=%s'\'' '\''orcastra-theme.js?v=%s'\'';\n' "$v" "$current"
  done
}

generate_nginx_conf() {
  local cachebust_file
  cachebust_file="$(mktemp)"
  build_cachebust > "$cachebust_file"
  if [[ ! -s "$cachebust_file" ]]; then
    printf '        # no prior theme versions to rewrite (THEME_VERSION=%s)\n' "$THEME_VERSION" > "$cachebust_file"
  fi
  # Match only a standalone inject token (not mention of it in comments).
  # Read cachebust from a file so newlines stay intact (awk -v cannot).
  awk -v ver="$THEME_VERSION" -v cbfile="$cachebust_file" '
    $0 ~ /^[[:space:]]*__INJECT_THEME_CACHEBUST__[[:space:]]*$/ {
      while ((getline line < cbfile) > 0) print line
      close(cbfile)
      next
    }
    { gsub(/__THEME_VERSION__/, ver); print }
  ' "$SRC_NGINX"
  rm -f "$cachebust_file"
}
copy_branding() {
  local dest="$1"
  log "Menyalin aset branding ke ${dest} ..."
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "[dry-run] mkdir -p ${dest}"
    log "[dry-run] cp -a ${SRC_BRANDING}/. ${dest}/"
    return 0
  fi
  mkdir -p "$dest"
  # Copy verbatim; do not rewrite binaries.
  cp -a "${SRC_BRANDING}/." "$dest/"
  # Tighten perms on the directory we own; leave file bytes untouched.
  chmod -R a+rX "$dest" || true
}

write_conf() {
  local dest="$1"
  log "Menulis konfigurasi nginx (THEME_VERSION=${THEME_VERSION}) ke ${dest} ..."
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "[dry-run] generate_nginx_conf > ${dest}"
    return 0
  fi
  mkdir -p "$(dirname "$dest")"
  generate_nginx_conf > "$dest"
}

reload_local_nginx() {
  if [[ "$RELOAD" -ne 1 ]]; then
    log "Melewati reload nginx (--no-reload)."
    return 0
  fi
  if ! command -v nginx >/dev/null 2>&1; then
    log "nginx tidak ada di PATH; lewati reload lokal."
    return 0
  fi
  log "Menguji dan reload nginx ..."
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "[dry-run] nginx -t && nginx -s reload"
    return 0
  fi
  if nginx -t; then
    nginx -s reload
    log "nginx di-reload."
  else
    log "ERROR: nginx -t gagal. Konfigurasi tidak di-reload."
    return 1
  fi
}

install_docker() {
  local name="$1"
  if ! command -v docker >/dev/null 2>&1; then
    log "ERROR: docker tidak ditemukan di PATH."
    return 1
  fi
  log "Memasang branding ke kontainer nginx '${name}' ..."

  local tmp
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' RETURN
  copy_branding "${tmp}/branding"
  write_conf "${tmp}/nginx-branding.conf"

  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "[dry-run] docker exec ${name} mkdir -p /usr/share/nginx/html/branding"
    log "[dry-run] docker cp ${tmp}/branding/. ${name}:/usr/share/nginx/html/branding/"
    log "[dry-run] docker cp ${tmp}/nginx-branding.conf ${name}:${DOCKER_CONF}"
    if [[ "$RELOAD" -eq 1 ]]; then
      log "[dry-run] docker exec ${name} nginx -t && docker exec ${name} nginx -s reload"
    fi
    return 0
  fi

  docker exec "$name" mkdir -p /usr/share/nginx/html/branding
  docker cp "${tmp}/branding/." "${name}:/usr/share/nginx/html/branding/"
  docker cp "${tmp}/nginx-branding.conf" "${name}:${DOCKER_CONF}"

  if [[ "$RELOAD" -eq 1 ]]; then
    log "Menguji dan reload nginx di kontainer '${name}' ..."
    docker exec "$name" nginx -t
    docker exec "$name" nginx -s reload
    log "nginx kontainer di-reload."
  else
    log "Melewati reload nginx kontainer (--no-reload)."
  fi
}

# --- main ------------------------------------------------------------------

log "Orcastra Authentik theme  THEME_VERSION=${THEME_VERSION}"
log "Sumber paket: ${PACK_ROOT}"

# When targeting a docker nginx container, skip the default host dest
# (often not writable) unless the caller passed --dest explicitly.
if [[ -n "$DOCKER_NGINX" && "$DEST_EXPLICIT" -eq 0 ]]; then
  log "Mode docker: aset branding disalin ke kontainer (bukan ${BRANDING_DEST} di host)."
else
  copy_branding "$BRANDING_DEST"
fi

if [[ -n "$NGINX_CONF_DEST" ]]; then
  write_conf "$NGINX_CONF_DEST"
fi

if [[ -n "$DOCKER_NGINX" ]]; then
  install_docker "$DOCKER_NGINX"
elif [[ -n "$NGINX_CONF_DEST" ]]; then
  reload_local_nginx
else
  log "Aset branding disalin. Tidak memasang nginx conf (beri --nginx-conf atau --docker-nginx)."
fi

log ""
log "Tema Orcastra terpasang (v${THEME_VERSION})."
log "Langkah berikutnya (bukan bagian skrip ini, tidak memuat rahasia):"
log "  - Tempel isi assets/brand.css ke Brand → Custom CSS (lihat scripts/apply-brand-settings.md)"
log "  - Pastikan /branding/orcastra-theme.js?v=${THEME_VERSION} muncul sebelum </head>"
log "  - Hard-refresh browser (cache-bust v=70..$((THEME_VERSION - 1)) → v=${THEME_VERSION})"
