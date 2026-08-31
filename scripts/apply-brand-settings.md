# Prosedur Brand / Tenant Authentik (Orcastra)

Dokumen ini **bukan skrip yang menyimpan rahasia**. Tidak ada token, client
secret, kunci Turnstile, atau kata sandi SMTP di sini. Isi Brand lewat Admin
UI atau `ak` Django shell setelah `scripts/apply-orcastra-theme.sh` memasang
aset di `/branding/`.

Nilai produksi yang didokumentasikan (contoh, jangan dijadikan syarat):

| Kunci | Nilai |
| --- | --- |
| Branding title | `Orcastra Account Center` |
| Footer link | `{ "name": "Powered by Orcastra", "href": "https://orcastra.io" }` |
| UUID brand produksi | `bc22ca39-66c2-422d-a4f2-017ac0107213` (contoh saja) |
| Custom CSS | tempel isi `assets/brand.css` (bukan URL) |
| Logo | `/branding/orca-logo.png` |
| Favicon | `/branding/favicon.ico` |
| Flow background | `/branding/bg_orcastra-scaled-1.jpg` |

Authentik 2026.2 menyimpan judul/logo/CSS/background pada model **Brand**,
dan footer links pada **Tenant** (`tenant.footer_links`). `ak-brand-links`
merender di **light DOM** — CSS footer harus di tingkat dokumen (Custom CSS
brand / `brand.css`), bukan hanya di dalam shadow root.

Teks hardcoded `Powered by authentik` selalu ditambahkan sebagai item
terakhir footer. Theme CSS menyembunyikannya dengan
`ak-brand-links li:last-child { display: none }`. Jangan mengandalkan
menghapus teks itu dari pengaturan tenant.

---

## A. Admin UI (disarankan)

### 1. Brand

1. Masuk sebagai administrator → **Admin interface**.
2. **System → Brands**.
3. Edit brand yang mencocokkan domain `sso.orcastra.io` (atau buat brand
   baru dengan Domain `sso.orcastra.io` / default). UUID produksi
   `bc22ca39-66c2-422d-a4f2-017ac0107213` hanyalah contoh; di instance
   baru biarkan Authentik membuat UUID sendiri.
4. Isi **Branding settings**:
   - **Branding title:** `Orcastra Account Center`
   - **Logo:** URL/path `/branding/orca-logo.png`
     (varian: `orca-logo-white.png` di atas background gelap,
     `orca-logo-black.png` untuk konteks terang / email)
   - **Favicon:** `/branding/favicon.ico`
   - **Default flow background:** `/branding/bg_orcastra-scaled-1.jpg`
   - **Custom CSS:** buka `assets/brand.css` (atau
     `assets/branding/brand.css`, file yang sama) dan **tempel seluruh
     isinya**. Authentik 2026.2 memakai field teks, bukan URL stylesheet.
5. **Default flows** (opsional, selaraskan dengan docs/07):
   - Authentication flow → flow login produksi
   - Recovery flow → flow reset email
   - User settings flow → default user settings
6. Simpan.

`assets/branding/orcastra-prod.css` adalah CSS lama (referensi). Jangan
ditempel ke produksi; pakai `brand.css` terbaru.

### 2. Footer links (Tenant)

1. **System → Settings** (pengaturan tenant; pada setup multi-tenant,
   buka tenant yang aktif).
2. Temukan **Footer links**.
3. Set satu tautan:

```json
[
  {
    "name": "Powered by Orcastra",
    "href": "https://orcastra.io"
  }
]
```

4. Simpan. Theme menambahkan logo orca putih 18px di kiri tautan dan
   meratakan footer di tengah.

### 3. Sembunyikan copy branding Authentik default

Tidak ada saklar resmi untuk mematikan `Powered by authentik`. Yang
dipakai produksi:

- Custom CSS (`brand.css`) menyembunyikan `li:last-child` pada
  `ak-brand-links`.
- Theme JS menyuntikkan CSS dokumen yang sama (`orc-page-footer`)
  sebagai jaring pengaman setelah navigasi SPA.

Pastikan Custom CSS tersimpan **dan** nginx menyuntikkan
`orcastra-theme.js` (lihat skrip apply).

---

## B. Django shell `ak` (opsional)

Jalankan di kontainer **server** atau **worker**:

```bash
docker compose exec worker ak shell
# atau: docker exec -it <worker> ak shell
```

Ganti UUID hanya jika Anda memang mengedit brand yang sudah ada.
Instance baru: ambil brand default.

```python
from authentik.brands.models import Brand
from authentik.tenants.models import Tenant
from pathlib import Path

# --- Brand ---
# Contoh UUID produksi (jangan diwajibkan):
#   bc22ca39-66c2-422d-a4f2-017ac0107213
brand = Brand.objects.filter(default=True).first()
# brand = Brand.objects.get(brand_uuid="bc22ca39-66c2-422d-a4f2-017ac0107213")

brand.branding_title = "Orcastra Account Center"
brand.branding_logo = "/branding/orca-logo.png"
brand.branding_favicon = "/branding/favicon.ico"
brand.branding_default_flow_background = "/branding/bg_orcastra-scaled-1.jpg"

# Tempel CSS dari file yang sudah di-mount, atau paste manual.
# Jangan memuat .env atau secret di sini.
css_path = Path("/usr/share/nginx/html/branding/brand.css")
# Di worker, file ini mungkin tidak ter-mount; tempel dari mesin Anda:
#   brand.branding_custom_css = open("assets/brand.css", encoding="utf-8").read()
if css_path.is_file():
    brand.branding_custom_css = css_path.read_text(encoding="utf-8")

brand.save()
print("brand saved", brand.brand_uuid, brand.branding_title)

# --- Tenant footer ---
tenant = Tenant.objects.first()
tenant.footer_links = [
    {"name": "Powered by Orcastra", "href": "https://orcastra.io"},
]
tenant.save()
print("footer_links saved", tenant.footer_links)
```

Field FileField Authentik menerima path URL publik (`/branding/...`) lewat
file picker di UI. Jika shell menolak string path, set logo/favicon/
background lewat Admin UI.

---

## C. Verifikasi cepat

1. Buka `https://sso.orcastra.io/if/flow/default-authentication-flow/`.
2. Judul tab / kartu: **Orcastra Account Center**.
3. Footer tengah: logo orca 18px + "Powered by Orcastra" → `https://orcastra.io`.
4. Teks "Powered by authentik" tidak terlihat.
5. View-source / DevTools: `<script src="/branding/orcastra-theme.js?v=73" defer>`
   sebelum `</head>`.
6. `ak-brand-links` ada di light DOM (bukan di dalam shadow root) —
   aturan CSS dokumen harus mengenai elemen itu.

Lanjut: [docs/02-branding.md](../docs/02-branding.md).
