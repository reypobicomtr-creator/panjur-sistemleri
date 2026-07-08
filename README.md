# PanjurMax — Satılabilir Web Sitesi Paketi

Panjur firmaları için hazır, modern ve SEO dostu kurumsal web sitesi.

## 🚀 Hızlı Başlangıç

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Site config'ini düzenle
# src/config/site.ts — tüm marka bilgilerini buraya gir

# 3. Geliştirme sunucusunu başlat
npm run dev

# 4. Production build al
npm run build

# 5. dist/index.html dosyasını hostinge yükle
```

## ⚙️ Yeni Müşteri Kurulumu

### 1. Marka Bilgilerini Gir

**`src/config/site.ts`** dosyasını aç. Bu dosyadaki tüm değerleri müşterinin bilgileriyle değiştir:

| Alan | Örnek Değer | Açıklama |
|---|---|---|
| `brandName` | "PanjurMax" | Firma adı |
| `phone.display` | "0532 123 45 67" | Telefon |
| `phone.raw` | "+905321234567" | Uluslararası format |
| `email.primary` | "info@panjurmax.com" | E-posta |
| `whatsapp.number` | "905321234567" | WhatsApp (ülke kodu ile) |
| `address.*` | — | Adres bilgileri |

### 2. Formspree Kurulumu (Form Bildirimleri)

1. [formspree.io](https://formspree.io)'da ücretsiz hesap aç
2. Yeni bir form oluştur → endpoint URL'ini al (`https://formspree.io/f/xxxxxx`)
3. `src/config/site.ts` içinde `contact.formspreeEndpoint` değerini bununla değiştir

> Form doldurulunca müşterinin email'ine bildirim gider. Ayda 50 submission ücretsiz.

### 3. SEO Ayarları (index.html)

`index.html` dosyasında aşağıdaki etiketleri müşteriye göre güncelle:

- `<title>` — Sayfa başlığı
- `<meta name="description">` — Açıklama
- `<meta name="keywords">` — Anahtar kelimeler
- `<link rel="canonical">` — Alan adı
- Open Graph meta etiketleri (`og:title`, `og:description`, `og:url`, `og:image`)
- JSON-LD içindeki adres, telefon, çalışma saatleri

### 4. JSON-LD Güncelle

`index.html` içindeki `<script type="application/ld+json">` bloğunda:
- `name`, `telephone`, `email`, `address` → müşteri bilgileri
- `areaServed` → hizmet verilen şehirler
- `aggregateRating.ratingCount` → referans/varsa güncelle
- `sameAs` → WhatsApp linki

### 5. İmajları Değiştir

Aşağıdaki componentlerdeki Pexels görsellerini müşterinin kendi fotoğraflarıyla değiştirin:

| Component | Değişken |
|---|---|
| `Hero.tsx` | `HERO_IMG` |
| `Services.tsx` | `products[].img` |
| `Gallery.tsx` | `galleryItems[].src` |
| `About.tsx` | `<img src="...">` |

### 6. Fiyatları Güncelle (opsiyonel)

`src/utils/pricing.ts` içinde:
- `BASE_PRICES` — m² fiyatları
- `CASE_PRICES` — kasa tipleri
- `MOTOR_EXTRA`, `SPECIAL_COLOR_EXTRA` — ek ücretler
- `BULK_DISCOUNT_RATE` — indirim oranı

### 7. Müşteri Yorumlarını Güncelle (opsiyonel)

`src/components/Testimonials.tsx` içindeki `reviews` dizisini müşterinin kendi referanslarıyla değiştirin.

## 🌐 Hosting (Netlify — Ücretsiz)

### Seçenek A: Netlify Drag & Drop (En Kolay)

1. `npm run build` yap → `dist/` klasörü oluşur
2. [netlify.com](https://netlify.com)'a git → "Sites" → "Drag and drop your site folder here"
3. `dist/` klasörünü sürükle-bırak
4. Site yayında! Netlify sana `random-name.netlify.app` adresini verir
5. "Domain Settings" → "Add custom domain" ile müşterinin alan adını bağla

### Seçenek B: Git ile Deploy (Otomatik)

1. Projeyi GitHub'a pushla
2. Netlify → "Import from Git" → repo'yu seç
3. Netlify `netlify.toml`'u otomatik okur:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Her push'ta otomatik deploy olur

## 📦 Proje Yapısı

```
panjur-sistemleri/
├── public/
│   ├── robots.txt          # Arama motoru talimatları
│   └── sitemap.xml         # Site haritası
├── src/
│   ├── config/
│   │   └── site.ts         # ⭐ Tüm marka ayarları (MÜŞTERİ BURAYI DÜZENLER)
│   ├── components/         # React componentleri
│   ├── utils/
│   │   ├── cn.ts           # Tailwind yardımcı
│   │   └── pricing.ts     # Fiyat hesaplama motoru
│   ├── App.tsx             # Ana sayfa
│   ├── main.tsx            # Giriş noktası
│   └── index.css           # Stil dosyası
├── index.html              # SEO etiketleri (manuel güncelle)
├── netlify.toml            # Netlify yapılandırması
├── package.json
├── vite.config.ts
└── README.md               # Bu dosya
```

## 🛠️ Admin Paneli (Opsiyonel — Supabase)

Sitenin içeriklerini (fiyatlar, galeri, yorumlar, mesajlar) canlı olarak yönetmek için Supabase tabanlı admin paneli.

### Kurulum

**1. Supabase Projesi Oluştur**

[supabase.com](https://supabase.com)'da yeni bir proje aç → şifreyi kaydet.

**2. Veritabanı Tablolarını Oluştur**

Supabase Dashboard → SQL Editor → New Query → `supabase-schema.sql` içeriğini yapıştır → Run.

Bu şu tabloları oluşturur: `site_config` (marka ayarları), `products` (fiyatlar), `gallery` (galeri), `reviews` (yorumlar), `contacts` (mesajlar).

**3. API Anahtarlarını Al**

Sol menü → Project Settings → API → "Project URL" ve "anon public" key'i kopyala.

**4. `.env` Dosyasını Oluştur**

Proje kökünde `.env.local` dosyası oluştur:

```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

Değerleri Supabase Project Settings > API sayfasından al.

**5. Admin Kullanıcısı Oluştur**

Supabase Dashboard → Authentication → Users → "Add User" → email + şifre belirle (müşteriye teslim edilecek).

**6. Derle ve Test Et**

```bash
npm run build    # hata yoksa hazır
npm run dev      # local'de admin panele eriş:
```

- **Public site**: `http://localhost:9009/#/`
- **Admin giriş**: `http://localhost:9009/#/admin/login`
- **Admin panel**: `http://localhost:9009/#/admin`

> Admin paneli `/#/admin` altındadır. Statik hosting (Netlify, Vercel) ile sorunsuz çalışır çünkü HashRouter kullanır.

### Admin Paneli Bölümleri

| Sayfa | URL | Açıklama |
|---|---|---|
| Genel Bakış | `/admin` | İstatistikler, hızlı ipuçları |
| Site Ayarları | `/admin/ayarlar` | Marka bilgileri, iletişim, çalışma saatleri |
| Fiyatlar | `/admin/fiyatlar` | Ürün fiyat listesi yönetimi |
| Galeri | `/admin/galeri` | Fotoğraf ekleme/silme |
| Yorumlar | `/admin/yorumlar` | Müşteri referansları |
| Mesajlar | `/admin/mesajlar` | Formdan gelen talepler (okundu işaretleme/silme) |

> **Not**: Public site şu an `site.ts` config'inden okuyor. Admin paneli Supabase'e yazar. Canlı senkronizasyon sonraki sürümde eklenecek.

## 🔧 Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusu (localhost:9009) |
| `npm run build` | Production build (dist/index.html) |
| `npm run preview` | Build çıktısını lokal test et |

## ✅ Teslimat Kontrol Listesi

- [ ] `src/config/site.ts` — tüm müşteri bilgileri girildi
- [ ] `index.html` — meta etiketler, JSON-LD güncellendi
- [ ] Formspree endpoint'i girildi
- [ ] İmajlar müşteri fotoğraflarıyla değiştirildi
- [ ] `pricing.ts` — fiyatlar güncellendi
- [ ] `npm run build` — sorunsuz çalışıyor
- [ ] Netlify'a deploy edildi
- [ ] Özel alan adı bağlandı (opsiyonel)
- [ ] Site mobilde test edildi
- [ ] Form çalışıyor (test mesajı atıldı)
- [ ] WhatsApp bağlantısı çalışıyor
- [ ] Telefon bağlantıları çalışıyor
