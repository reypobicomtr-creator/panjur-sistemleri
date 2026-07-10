# PanjurMax — Satılabilir Web Sitesi Paketi

Panjur firmaları için hazır, modern ve Supabase destekli kurumsal web sitesi + admin panel.

## Özellikler

- 🏠 **Kurumsal Web Sitesi** — Hero, Hizmetler, Galeri, Hakkımızda, İletişim
- 🤖 **Fiyat Hesaplama Robotu** — Müşteriler anlık fiyat alır
- 🔧 **Admin Paneli** — Fiyatlar, galeri, yorumlar, mesajlar tek yerden yönetilir
- 📱 **Mobil Uyumlu** — Tüm cihazlarda kusursuz görünüm
- 🔍 **SEO Dostu** — Meta etiketler, JSON-LD, site haritası hazır
- 💬 **WhatsApp Entegrasyonu** — Tek tıkla iletişim
- 🛡️ **Bot Koruması** — Honeypot + matematik doğrulaması

## Tech Stack

| Bileşen | Teknoloji |
|---|---|
| Frontend | React 19 + TypeScript + Tailwind v4 |
| Backend | Supabase (PostgreSQL, Auth, RLS) |
| Build | Vite + vite-plugin-singlefile |
| Routing | HashRouter (statik hosting) |
| Deploy | Vercel (GitHub entegrasyonu) |
| Fonts | Inter + Playfair Display |

## Hızlı Başlangıç

```bash
npm install
npm run dev          # localhost:9009
npm run build        # dist/index.html
```

## Routes

| Route | Sayfa |
|---|---|
| `/#/` | Public site (müşteri panjur sitesi) |
| `/#/tanitim` | Ürün tanıtım landing page |
| `/#/admin/login` | Admin giriş |
| `/#/admin` | Admin panel |
| `/#/admin/ayarlar` | Site ayarları |
| `/#/admin/fiyatlar` | Fiyat yönetimi |
| `/#/admin/galeri` | Galeri yönetimi |
| `/#/admin/yorumlar` | Müşteri yorumları |
| `/#/admin/mesajlar` | İletişim mesajları |

## Supabase Kurulumu

1. [supabase.com](https://supabase.com)'da proje oluşturun
2. SQL Editor'da `supabase-schema.sql`'in tamamını çalıştırın
3. Project Settings → API'den URL ve anon key alın
4. Vercel'de ortam değişkenlerine ekleyin:
   - `VITE_SUPABASE_URL=https://xxx.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=eyJ...`
5. Authentication → Users'dan admin kullanıcısı oluşturun

## Deployment

GitHub'a push → Vercel otomatik deploy eder (`main` branch).

**Prod:** https://panjur-sistemleri.vercel.app

## Yeni Müşteri Kurulumu

1. Fork edin veya template olarak kullanın
2. Supabase projesi + tablolar oluşturun
3. Vercel'e bağlayın, env var'ları girin
4. Admin panele girip firma bilgilerini doldurun
5. Ürün fiyatlarını, galeriyi, yorumları ekleyin
6. Müşteriye admin giriş bilgilerini teslim edin

**Önemli:** Varsayılan içerikler (görseller, ürün isimleri) müşteriye göre değiştirilmelidir.

## Proje Yapısı

```
src/
├── lib/          # Supabase client, CRUD işlemleri, config tipleri
├── contexts/     # AuthContext, SiteConfigContext
├── components/   # Public site bileşenleri
├── utils/        # Fiyat hesaplama motoru
├── pages/
│   ├── admin/    # Admin panel sayfaları
│   └── Landing.tsx  # Ürün tanıtım sayfası
├── App.tsx       # Router
└── index.css     # Tailwind + @theme yapılandırması
```

Detaylı bellek/bağlam dosyası: `.omo/memory.md`
