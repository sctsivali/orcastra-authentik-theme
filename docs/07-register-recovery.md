# 07 — Register & recovery

Agar kartu login menampilkan tautan **Register** / **Need an account?**
dan **Forgot password?**, Identification stage harus menunjuk ke flow
Enrollment dan Recovery. Brand juga boleh mengisi default recovery flow.

## A. Enrollment (Register)

1. Pastikan ada flow dengan designation **Enrollment**
   (bawaan: `default-enrollment-flow`, atau impor blueprint
   `example/flows-enrollment-email-verification.yaml`).
2. Stage tipikal:
   - Prompt (username, email, nama, password, **phone** jika dipakai)
   - User Write
   - Email verification (opsional tapi disarankan)
   - Login
3. Edit Identification stage login → **Enrollment flow** = flow itu.
4. Simpan. Di kartu login muncul tautan daftar.

Kebijakan: tentukan apakah self-sign-up terbuka atau hanya undangan.
Captcha (Turnstile) bisa di-embed di identification enrollment juga.

## B. Recovery (reset email)

1. Flow designation **Recovery** (bawaan atau blueprint
   `example/flows-recovery-email-verification.yaml`).
2. Urutan tipikal:
   1. Identification (cari user lewat email)
   2. Email stage (tautan reset — SMTP Mailgun, docs/06)
   3. Prompt password baru
   4. User Write
   5. Login (opsional)
3. Identification **login** → field **Recovery flow** = flow itu.
4. Brand → **Default flows → Recovery flow** = flow yang sama, agar tautan
   recovery konsisten di UI lain.

Uji: minta reset, cek kotak masuk, klik tautan, set password, login.

## C. Field telepon / WhatsApp (jika ada)

Produksi bisa menampilkan field nomor untuk recovery WhatsApp. Authentik
stok **tidak** mengirim WhatsApp sendiri; yang ada di UI adalah Prompt
field yang disimpan ke atribut user, lalu otomasi di luar Authentik
(atau notification transport kustom) yang memakai nomor itu.

Jika field ini dipakai:

1. **Flows & Stages → Prompts** (atau Prompt stage di enrollment /
   user settings).
2. Tambah field:
   - Field key: `phone` (atau `attributes.phone`)
   - Type: Text
   - Label: `Nomor WhatsApp`
   - Placeholder: `+62…`
   - Required: sesuai kebijakan
3. Bind prompt ke enrollment dan/atau user settings.
4. Jangan simpan token WhatsApp Business / API key di paket tema.

Jika instan stok belum butuh WhatsApp, lewati bagian ini — checklist
go-live menandainya opsional.

## D. User settings

Brand → User settings flow = `default-user-settings-flow` (atau kustom).
Theme JS menata nav kapsul + tabs + chevron mobile di halaman itu.

Lanjut: [08-checklist.md](08-checklist.md).
