# 06 — Email / Mailgun SMTP

Dipakai untuk pemulihan kata sandi, konfirmasi akun, dan notifikasi.
Kata sandi SMTP **tidak pernah** ditulis di paket ini.

## Domain pengirim (contoh produksi)

- From-domain: **`auth.orcastra.io`** (contoh)
- From address contoh: `Orcastra Account Center <no-reply@auth.orcastra.io>`
- UI login tetap `https://sso.orcastra.io`

Tambahkan domain pengirim di Mailgun, lalu SPF + DKIM di DNS
`auth.orcastra.io`.

## A. Variabel lingkungan Authentik

Set di **server dan worker** (Compose `environment` / secret store), lalu
redeploy. Jangan commit nilai password.

```sh
AUTHENTIK_EMAIL__HOST=smtp.mailgun.org
AUTHENTIK_EMAIL__PORT=587
AUTHENTIK_EMAIL__USERNAME=no-reply@auth.orcastra.io
# AUTHENTIK_EMAIL__PASSWORD=   # isi di secret store, BUKAN di git
AUTHENTIK_EMAIL__USE_TLS=true
AUTHENTIK_EMAIL__USE_SSL=false
AUTHENTIK_EMAIL__TIMEOUT=30
AUTHENTIK_EMAIL__FROM=Orcastra Account Center <no-reply@auth.orcastra.io>
```

Catatan:

- Port **587** + `USE_TLS=true` (STARTTLS). Jangan nyalakan `USE_TLS` dan
  `USE_SSL` bersamaan.
- Region EU Mailgun: host `smtp.eu.mailgun.org`.
- Username SMTP Mailgun adalah alamat SMTP domain itu, bukan API key
  publik (API key juga secret — jangan dicampur ke git).

Email stage recovery boleh "Use global connection settings" agar memakai
blok di atas.

## B. Uji kirim (tanpa membuka password)

```bash
docker compose exec worker ak test_email you@example.com
# atau stage tertentu:
docker compose exec worker ak test_email you@example.com -S default-recovery-email
```

Jika gagal: cek outbound port 587, kredensial Mailgun, dan
`AUTHENTIK_EMAIL__FROM` domain yang terverifikasi.

## C. Template email light-mode Orcastra

Authentik merender Django template dari image, plus volume
`/templates` (lihat compose di docs/01). Letakkan berkas kustom di
volume itu, misalnya:

```
custom-templates/email/orcastra_password_reset.html
```

lalu di Email stage pilih template itu (nama tampil sesuai path).

Salinan siap pakai: [`assets/email/orcastra_password_reset.html`](../assets/email/orcastra_password_reset.html).

Spesifikasi visual (produksi):

| Elemen | Nilai |
| --- | --- |
| Mode | Terang (bukan dark card login) |
| Font | Inter, fallback `ui-sans-serif, system-ui, sans-serif` |
| Heading | 22px, semibold (600) |
| Body | 15px, warna `#334155`, line-height 1.6 |
| Tombol | latar `#7c3aed`, teks putih, radius penuh |
| Footer | `Orcastra Account Center` → `https://sso.orcastra.io` |
| Logo (opsional) | `orca-logo-black.png` — banyak klien email memblokir
  host privat; unggah ke CDN publik atau lewatkan logo |

Jangan menanam password, token reset, atau query secret di template.
Link reset memakai `{{ url }}` dari Authentik dan kedaluwarsa lewat
`{{ expires }}`.

Cuplikan struktur (lihat file aset untuk HTML lengkap):

```html
<h1 style="font-family:Inter,ui-sans-serif,system-ui,sans-serif;
           font-size:22px;font-weight:600;color:#0f172a;">
  Reset your password
</h1>
<p style="font-size:15px;color:#334155;">
  …
</p>
<a href="{{ url }}" style="background:#7c3aed;color:#fff;border-radius:9999px;
   display:inline-block;padding:12px 22px;text-decoration:none;font-weight:600;">
  Reset Password
</a>
<p style="font-size:13px;color:#64748b;">
  <a href="https://sso.orcastra.io" style="color:#7c3aed;text-decoration:none;">
    Orcastra Account Center
  </a>
</p>
```

Mount volume yang sama ke **server dan worker**. Worker yang mengirim
email.

## D. Stage email di recovery flow

1. **Flows & Stages → Stages** → Email stage recovery (atau buat baru).
2. Template: `email/orcastra_password_reset.html` (setelah berkas
   ter-mount) atau template bawaan dulu untuk uji SMTP.
3. Use global connection settings: ya.
4. Bind ke recovery flow sebelum prompt password baru.

Lanjut: [07-register-recovery.md](07-register-recovery.md).
