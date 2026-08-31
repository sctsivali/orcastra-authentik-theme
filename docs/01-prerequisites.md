# 01 — Prasyarat

Panduan ini cukup untuk merakit ulang **sso.orcastra.io** dari Authentik
**2026.2.x** stok (image produksi: `2026.2.1`).

## Topologi produksi

```
Browser
   │  HTTPS
   ▼
Cloudflare (sso.orcastra.io)
   │  → origin host:9000
   ▼
nginx:1.27-alpine          listen :80 di jaringan kontainer
   │  /branding/*  → file statis
   │  /            → proxy_pass http://server:9000  + sub_filter theme JS
   │  /ws/         → WebSocket ke server:9000
   ▼
ghcr.io/goauthentik/server:2026.2.1   command: server
   │
   ├── worker (image yang sama, command: worker)
   └── postgres:16
```

Domain contoh:

| Host | Peran |
| --- | --- |
| `sso.orcastra.io` | Origin publik Authentik (login, admin, `/if/`, `/source/`) |
| `auth.orcastra.io` | Domain pengirim email (contoh Mailgun), **bukan** UI login |

`auth.orcastra.io` tidak harus mem-proxy ke Authentik; cukup SPF/DKIM/MX
Mailgun. UI selalu di `sso.orcastra.io`.

## Komponen yang harus ada

- Docker Engine + Compose (atau runtime setara)
- Image:
  - `ghcr.io/goauthentik/server:2026.2.1`
  - `nginx:1.27-alpine` (punya `ngx_http_sub_module`)
  - `postgres:16`
- Secret Authentik (`AUTHENTIK_SECRET_KEY`, password Postgres) — **buat
  sendiri, jangan commit, jangan taruh di paket ini**
- Tunnel / DNS Cloudflare yang mengarah ke port **9000** di host

## Kerangka Compose (tanpa rahasia)

Simpan password dan `SECRET_KEY` di environment host atau secret store,
bukan di git. Nama layanan `server` harus cocok dengan `proxy_pass
http://server:9000` pada `nginx/nginx-branding.conf`.

```yaml
services:
  postgresql:
    image: postgres:16
    environment:
      POSTGRES_USER: authentik
      POSTGRES_DB: authentik
      # POSTGRES_PASSWORD dari secret, bukan dari file di repo ini
    volumes:
      - database:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -d authentik -U authentik"]
      interval: 10s
      retries: 5

  server:
    image: ghcr.io/goauthentik/server:2026.2.1
    command: server
    environment:
      AUTHENTIK_POSTGRESQL__HOST: postgresql
      AUTHENTIK_POSTGRESQL__USER: authentik
      AUTHENTIK_POSTGRESQL__NAME: authentik
      # AUTHENTIK_POSTGRESQL__PASSWORD dan AUTHENTIK_SECRET_KEY dari secret
      AUTHENTIK_ERROR_REPORTING__ENABLED: "false"
    volumes:
      - authentik-media:/media
      - authentik-templates:/templates
    depends_on:
      postgresql:
        condition: service_healthy
    restart: unless-stopped

  worker:
    image: ghcr.io/goauthentik/server:2026.2.1
    command: worker
    environment:
      AUTHENTIK_POSTGRESQL__HOST: postgresql
      AUTHENTIK_POSTGRESQL__USER: authentik
      AUTHENTIK_POSTGRESQL__NAME: authentik
    volumes:
      - authentik-media:/media
      - authentik-templates:/templates
    depends_on:
      postgresql:
        condition: service_healthy
    restart: unless-stopped

  nginx:
    image: nginx:1.27-alpine
    ports:
      - "9000:80"
    volumes:
      - ./nginx/nginx-branding.conf:/etc/nginx/conf.d/default.conf:ro
      # setelah apply-orcastra-theme.sh, atau bind-mount aset:
      - branding-html:/usr/share/nginx/html/branding
    depends_on:
      - server
    restart: unless-stopped

volumes:
  database:
  authentik-media:
  authentik-templates:
  branding-html:
```

Jika Anda bind-mount file conf dari paket ini **sebelum** menjalankan
skrip apply, ganti token `THEME_VERSION` dulu (skrip itu yang
menghasilkan conf final). Cara paling aman: biarkan skrip
`--docker-nginx` yang menulis conf ke dalam kontainer.

## Reverse proxy: hal yang wajib

1. Nginx di **depan** kontainer `server`, bukan sebaliknya.
2. `proxy_set_header X-Forwarded-Proto` harus `https` setelah Cloudflare
   (template memakai `$http_x_forwarded_proto` lalu `$scheme`).
3. `Accept-Encoding ""` pada `location /` agar `sub_filter` melihat HTML
   yang tidak di-gzip.
4. WebSocket `/ws/` dengan `Upgrade` / `Connection`.
5. Aset tema di `/usr/share/nginx/html/branding` → URL `/branding/`.

## Bootstrap Authentik

1. Naikkan stack, buka `https://sso.orcastra.io/if/flow/initial-setup/`
   (atau sesuai prompt first-install).
2. Buat akun akadmin. Jangan commit password.
3. Pastikan **System → Brands** punya brand untuk domain
   `sso.orcastra.io` (wildcard `orcastra.io` juga cocok).
4. Lanjut ke [02-branding.md](02-branding.md).

## Versi

Paket ini ditulis untuk **Authentik 2026.2.x**. Perilaku penting:

- `ak-brand-links` = light DOM (bukan shadow). CSS footer dokumen-level.
- OAuth callback: `/source/oauth/callback/<slug>/`
- Brand Custom CSS = field teks (bukan URL), sejak 2025.4.
- Captcha stage mendukung Cloudflare Turnstile, bisa di-embed di
  Identification stage.
