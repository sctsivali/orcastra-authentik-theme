# 05 — Cloudflare Turnstile

Widget Turnstile muncul di **Identification** (kartu login), bukan halaman
terpisah. Site key (public) diisi di Captcha stage Authentik. **Secret key
hanya disimpan di Authentik** (dan Cloudflare). Jangan commit, jangan taruh
di `.env` di repo ini.

## A. Widget di Cloudflare

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Turnstile**.
2. Add widget.
   - Name: `sso.orcastra.io`
   - Domains: `sso.orcastra.io`
   - Mode: **Managed** (produksi) atau Non-interactive
3. Salin **Site key** (public) dan **Secret key** (private).

## B. Captcha stage di Authentik

1. Admin → **Flows & Stages → Stages → Create**.
2. Tipe: **Captcha Stage**. Name: `orcastra-turnstile` (bebas).
3. Isi:
   - **Public key:** site key Turnstile
   - **Private key:** secret Turnstile — **hanya di sini**
   - **Interactive:** aktifkan untuk mode Managed / Invisible agar widget
     merender di dalam form identification
   - JS URL: `https://challenges.cloudflare.com/turnstile/v0/api.js`
   - API URL: `https://challenges.cloudflare.com/turnstile/v0/siteverify`
4. Turnstile tidak memakai score threshold reCAPTCHA; biarkan default.
5. Finish.

## C. Tempel ke Identification (bukan stage terpisah)

Agar widget ada **di kartu identifier** (bukan langkah flow berikutnya):

1. Edit Identification stage flow login.
2. Field **Captcha stage**: pilih stage Turnstile yang baru dibuat.
3. Simpan.

Jangan *sekaligus* bind Captcha stage yang sama sebagai stage terpisah
pada flow yang sama — Authentik akan menjalankannya dua kali.

Jika Anda lebih suka langkah terpisah (setelah identifier, sebelum
password), bind stage ke flow dan **kosongkan** Captcha stage di
identification. Produksi Orcastra memakai embed di identification.

## D. Tampilan

Theme JS memusatkan `.cf-turnstile` / `ak-stage-captcha` di kartu.
Tidak perlu CSS tambahan selain `brand.css`.

## E. Uji

- Login normal: widget Manage/checkbox muncul, submit berhasil.
- Secret salah: Authentik menolak setelah verifikasi siteverify.
- Domain widget ≠ `sso.orcastra.io`: error Cloudflare di browser.

Lanjut: [06-email-smtp.md](06-email-smtp.md).
