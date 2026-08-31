# 08 — Checklist go-live

Cocokkan instance baru dengan produksi **sso.orcastra.io** sebelum
mengalihkan DNS/Cloudflare. Tidak ada rahasia di daftar ini.

Gunakan jendela penyamaran. Hard-refresh setelah menaikkan `THEME_VERSION`.

## Identitas

- [ ] Image Authentik `ghcr.io/goauthentik/server:2026.2.1`
- [ ] nginx `1.27-alpine` di depan `server:9000`
- [ ] postgres 16
- [ ] Origin publik `https://sso.orcastra.io` (Cloudflare → host `:9000`)
- [ ] Branding title **Orcastra Account Center** (tab + kartu)
- [ ] Favicon `/branding/favicon.ico`
- [ ] Background nebula `/branding/bg_orcastra-scaled-1.jpg`

## Footer + logo

- [ ] Footer rata tengah, bukan menempel di kolom kartu
- [ ] Teks **Powered by Orcastra** menaut ke **https://orcastra.io**
- [ ] Logo orca putih **18px** di kiri tautan
- [ ] "Powered by authentik" tidak terlihat
- [ ] `ak-brand-links` di light DOM; Custom CSS dokumen-level aktif
- [ ] Bandingkan dengan `docs/images/orcastra-login-footer-full.png`

## Theme JS / Lottie

- [ ] View-source: `<script src="/branding/orcastra-theme.js?v=73" defer>`
      sebelum `</head>`
- [ ] Tidak ada sisa `?v=70` / `?v=71` / `?v=72`
- [ ] Transisi flow menampilkan Lottie **70px**, logo kartu disembunyikan
      selama load
- [ ] Login pill (tombol primer bundar)
- [ ] Ikon Lucide di input, submit, tabs, user settings

## Google

- [ ] Tombol Google di identification
- [ ] Callback Google Cloud =
      `https://sso.orcastra.io/source/oauth/callback/google/`
      (atau **persis** Callback URL di sumber Authentik)
- [ ] Login Google akun uji berhasil
- [ ] Client secret **tidak** ada di git

## GitHub

- [ ] Tombol GitHub dengan ikon
- [ ] Callback =
      `https://sso.orcastra.io/source/oauth/callback/github/`
      (salin dari Authentik)
- [ ] Login GitHub akun uji berhasil
- [ ] Client secret **tidak** ada di git

## Turnstile

- [ ] Widget Cloudflare tampil di kartu identification
- [ ] Domain widget = `sso.orcastra.io`
- [ ] Submit ditolak jika challenge gagal
- [ ] Secret key hanya di Captcha stage Authentik

## Register

- [ ] Tautan Register / Need an account? tampil
- [ ] Enrollment flow selesai (user write ± verifikasi email)

## Reset email

- [ ] Tautan forgot password tampil
- [ ] Email terkirim via Mailgun dari domain `auth.orcastra.io` (contoh)
- [ ] Template light-mode: Inter, heading 22px semibold, body 15px
- [ ] Footer email: **Orcastra Account Center** → URL SSO
- [ ] Password SMTP **tidak** ada di git

## MFA cards

- [ ] Halaman pilih perangkat MFA: kartu terpisah
- [ ] Klik satu kartu memilih **satu** perangkat, bukan select-all
- [ ] Di mobile, tabel menjadi kartu (bukan header tabel PatternFly)

## Mobile sidebar chevron

- [ ] User settings / admin tabs vertikal ≤768px: ikon saja + chevron
- [ ] Chevron membuka label; chevron lagi menutup

## Referensi visual

- Login: `docs/images/authentik_login_orcastra.png`
- Footer: `docs/images/orcastra-login-footer-full.png`

Jika semua kotak tercentang, instance setara produksi dari sisi tema dan
alur akun (rahasia tetap di secret store, bukan di paket ini).
