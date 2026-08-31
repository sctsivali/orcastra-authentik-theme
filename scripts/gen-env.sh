#!/usr/bin/env bash
# gen-env.sh — buat .env lokal dari env.example + secret openssl.
# Tidak menimpa .env yang sudah ada. Tidak membaca/menulis secret lain.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACK_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "$PACK_ROOT"

if [[ -f .env ]]; then
  echo "ERROR: .env sudah ada. Tidak menimpa."
  echo "Kalau mau generate ulang, pindahkan dulu:  mv .env .env.bak"
  exit 1
fi

if [[ ! -f env.example ]]; then
  echo "ERROR: env.example tidak ditemukan di ${PACK_ROOT}"
  exit 1
fi

cp env.example .env
echo "PG_PASS=$(openssl rand -base64 36 | tr -d '\n')" >> .env
echo "AUTHENTIK_SECRET_KEY=$(openssl rand -base64 60 | tr -d '\n')" >> .env

echo "Selesai. File .env dibuat di ${PACK_ROOT}/.env"
echo "Jangan commit file ini. Lanjut: docker compose pull && docker compose up -d"
