# 03 — Google OAuth

Tombol **Google** di kartu login berasal dari OAuth Source Authentik yang
diikat ke Identification stage. Client secret Google **hanya** disimpan di
Authentik / Google Cloud Console — jangan taruh di repo ini.

## Callback URL (Authentik 2026.2)

Pola tipikal:

```
https://<sso-host>/source/oauth/callback/<slug>/
```

Untuk slug `google` di produksi:

```
https://sso.orcastra.io/source/oauth/callback/google/
```

Dokumentasi resmi Authentik 2026 memakai trailing slash untuk Google.
Google Cloud Console **sensitif** terhadap path. Setelah sumber dibuat,
buka sumber itu di Authentik dan **salin field Callback URL** — itulah
nilai yang harus dicantumkan di Google, bukan tebakan.

## A. Google Cloud Console

1. [Google Cloud Console](https://console.cloud.google.com/) → proyek baru
   (mis. `orcastra-sso`) atau proyek yang sudah ada.
2. **APIs & Services → OAuth consent screen**
   - User type: External (atau Internal jika Google Workspace)
   - App name: `Orcastra Account Center`
   - Support email & developer contact: isi
   - Authorized domains: `orcastra.io`
   - Scope default (`openid`, `email`, `profile`) cukup untuk login
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**
   - Application type: **Web application**
   - Name: `authentik-sso` (bebas)
   - **Authorized JavaScript origins:** `https://sso.orcastra.io`
   - **Authorized redirect URIs:**
     `https://sso.orcastra.io/source/oauth/callback/google/`
     (sesuaikan dengan Callback URL Authentik)
4. Salin **Client ID** dan **Client secret**. Secret tidak masuk git.

## B. Sumber OAuth di Authentik

1. Admin → **Directory → Federation and Social login → New Source**.
2. Tipe: **Google OAuth Source**.
3. Name: `Google`. **Slug: `google`** — harus sama dengan segmen path
   callback.
4. Protocol settings:
   - Consumer key = Client ID
   - Consumer secret = Client secret
   - Scopes: biarkan default, atau `openid email profile`
5. Enrollment flow: flow source-enrollment default (agar user baru dari
   Google bisa dibuat). Sesuaikan kebijakan organisasi.
6. Finish. Buka sumber → salin **Callback URL** → pastikan identik dengan
   redirect URI di Google.

## C. Ikat ke Identification stage

Tanpa langkah ini tombol Google tidak muncul.

1. **Flows & Stages → Stages** → stage identification pada flow login
   (sering `default-authentication-identification`).
2. Edit → **Sources**: tambahkan `Google`.
3. **Show source labels**: aktifkan (theme JS menata ikon + teks
   "Google").
4. Simpan.

Atau lewat flow: **Flows → default-authentication-flow → Stage Bindings**
→ buka identification → Sources.

User baru vs user lama: Authentik mencocokkan email jika
*user matching* di sumber diaktifkan. Uji dengan akun Google yang sudah
ada di Authentik dan dengan akun baru.

## D. Ikon tombol

Theme JS (`decorateLogin`) mengganti ikon native dengan SVG Google
berwarna. Tidak perlu mengunggah ikon ke sumber. Pastikan theme JS v=73
terpasang.

## E. Masalah umum

| Gejala | Periksa |
| --- | --- |
| `redirect_uri_mismatch` | URI di Google ≠ Callback URL Authentik (slash, host, http/https) |
| Tombol tidak muncul | Source belum di Sources identification stage; source disabled |
| Loop / 404 callback | Slug sumber ≠ `google`; nginx tidak mem-proxy `/source/` |
| User dobel | Matching mode sumber vs email yang sama |

Lanjut: [04-github-oauth.md](04-github-oauth.md).
