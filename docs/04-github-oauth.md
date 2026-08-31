# 04 — GitHub OAuth

Sama seperti Google: OAuth App di GitHub, OAuth Source di Authentik,
ikatan ke Identification stage. Client secret **tidak** masuk repo.

## Callback URL (Authentik 2026.2)

Pola tipikal:

```
https://<sso-host>/source/oauth/callback/<slug>/
```

Untuk slug `github`:

```
https://sso.orcastra.io/source/oauth/callback/github/
```

Dokumentasi Authentik untuk GitHub kadang menulis path **tanpa** trailing
slash. GitHub OAuth App membandingkan string secara literal. **Salin
Callback URL dari sumber Authentik** setelah sumber dibuat, lalu tempel
ke GitHub. Jika salah satu sisi menolak, daftar kedua varian (dengan dan
tanpa slash) di Authorization callback URL GitHub.

## A. GitHub OAuth App

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   (organisasi: Settings org → Developer settings).
2. Isi:
   - **Application name:** `Orcastra Account Center`
   - **Homepage URL:** `https://orcastra.io`
   - **Authorization callback URL:**
     `https://sso.orcastra.io/source/oauth/callback/github/`
3. Register. **Generate a new client secret**.
4. Salin Client ID dan Client secret; secret hanya ke Authentik.

Jangan memakai GitHub **GitHub App** kecuali Anda sengaja; produksi
memakai **OAuth App** klasik.

## B. Sumber OAuth di Authentik

1. Admin → **Directory → Federation and Social login → New Source**.
2. Tipe: **GitHub OAuth Source**.
3. Name: `GitHub`. **Slug: `github`**.
4. Consumer key = Client ID, Consumer secret = Client secret.
5. Scopes opsional: `read:user user:email` (email privat butuh
   `user:email`).
6. Finish. Salin Callback URL → cocokkan ke GitHub.

## C. Ikat ke Identification stage

1. Stage identification flow login → **Sources**: tambahkan `GitHub`
   (bersama `Google`).
2. **Show source labels**: aktif.
3. Simpan.

Theme JS mendeteksi tombol dari `name` / label / URL ikon yang mengandung
"github" dan menempatkan ikon Lucide GitHub + teks "GitHub".

## D. Urutan tombol

Urutan di kartu login mengikuti urutan sumber di Identification stage.
Produksi: Google lalu GitHub (atur sesuai kebutuhan).

## E. Masalah umum

| Gejala | Periksa |
| --- | --- |
| `redirect_uri_mismatch` | Slash / host / https; salin dari Authentik |
| Email kosong | Scope `user:email`; email GitHub tidak publik |
| Tombol tanpa ikon | Theme JS belum ter-inject (v=73) |
| 404 `/source/oauth/callback/github/` | nginx harus mem-proxy `/` ke Authentik (sudah di conf paket) |

Lanjut: [05-turnstile.md](05-turnstile.md).
