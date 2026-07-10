# PanjurMax — AI Memory Context

## Proje Türü
React SPA (HashRouter) + Supabase backend. Panjur firmalarına satılmak üzere hazır web sitesi paketi. vite-plugin-singlefile ile tek dosya çıktı.

## Tech Stack
- **Frontend:** React 19 + TypeScript + Tailwind v4 + Vite
- **Backend:** Supabase (Auth, PostgreSQL, RLS)
- **Routing:** HashRouter (statik hosting uyumu)
- **Build:** vite-plugin-singlefile → tek `index.html` (dist/index.html)
- **Deploy:** GitHub → Vercel (otomatik)
- **Design:** Inter (body) + Playfair Display (display/headline). Renkler: Endüstriyel Mavi (#0066cc primary) + Sıcak Amber (#d78333 accent)

## Critical Architecture

### Context Flow
```
App (HashRouter)
 ├── AuthProvider (auth context)
 │    └── SiteConfigProvider (site data context)
 │         └── Routes
 │              ├── / → PublicLayout (Header, Hero, Calculator, Contact, Footer...)
 │              ├── /tanitim → Landing (standalone sales page, NO context)
 │              ├── /admin/login → Login
 │              └── /admin → AdminLayout (Settings, Pricing, Gallery, Reviews, Messages)
```

### Data Flow
```
fetchFullConfig() (lib/config.ts)
  ├── Queries Supabase: site_config, products, pricing_config
  ├── Falls back to DEFAULT constants if Supabase fails
  ├── Caches result in module-level cachedConfig
  └── SiteConfigContext wraps app, exposes { config, loading, error }

updateSiteConfig() → supabase.from('site_config').upsert()
updatePricingConfig() → supabase.from('pricing_config').upsert()
```

**!!! IMPORTANT !!!** — `clearConfigCache()` MUST be called after any admin save (Settings, Pricing). Otherwise public site uses stale cache.

## Supabase Structure

### Tables
| Table | Type | RLS |
|---|---|---|
| `site_config` | Single row (id=1), jsonb data | Anyone SELECT, auth'ed ALL |
| `products` | Multiple rows, typed columns | Anyone SELECT, auth'ed ALL |
| `pricing_config` | Single row (id=1), jsonb data | Anyone SELECT, auth'ed ALL |
| `gallery` | Multiple rows, typed columns | Anyone SELECT, auth'ed ALL |
| `reviews` | Multiple rows, typed columns | Anyone SELECT, auth'ed ALL |
| `contacts` | Multiple rows, typed columns | Anyone INSERT, auth'ed SELECT+UPDATE |

### SQL Schema File
`supabase-schema.sql` — contains CREATE TABLE + RLS policies. Run entire file in SQL Editor.

### Auth
Supabase Auth (email/password). Admin user created via Supabase Dashboard → Authentication → Users.

## File Structure (modified files)

```
src/
├── lib/
│   ├── supabase.ts          # createClient with VITE_ env vars
│   ├── db.ts                # CRUD: get/update SiteConfig, Products, Gallery, Reviews, Contacts, PricingConfig
│   └── config.ts            # Types (SiteConfigData, PricingConfigData...), DEFAULT constants, fetchFullConfig(), clearConfigCache()
├── contexts/
│   ├── AuthContext.tsx       # useAuth() hook: user, login, logout, loading
│   └── SiteConfigContext.tsx # useSiteConfig() hook: config, loading, error
├── utils/pricing.ts         # calculatePrice(form, pricing, products) → PriceBreakdown
├── components/              # All migrated from import { SITE } to useSiteConfig()
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Footer.tsx
│   ├── Contact.tsx          # Submits to Supabase contacts table. Bot protection: honeypot + math
│   ├── CTA.tsx
│   ├── WhatsAppButton.tsx
│   ├── Calculator.tsx       # Chat-style pricing bot. Uses config.pricing + config.products
│   ├── Gallery.tsx
│   ├── Services.tsx
│   ├── ServiceAreas.tsx
│   └── Testimonials.tsx
├── pages/
│   ├── Landing.tsx          # /tanitim — product sales page for panjur firms
│   └── admin/
│       ├── Login.tsx
│       ├── AdminLayout.tsx
│       ├── Dashboard.tsx
│       ├── Settings.tsx     # Site config form. Saves nested SiteConfigData format
│       ├── Pricing.tsx      # 4-tab: Products, CaseTypes, ExtraCosts, Discounts. Calls clearConfigCache()
│       ├── GalleryManager.tsx
│       ├── ReviewsManager.tsx
│       └── Messages.tsx
└── App.tsx                  # Routes: /, /tanitim, /admin/login, /admin/*
```

## Issues Fixed & Patterns

### 1. White Page (Cache)
- **Symptom:** Site loaded white after Vercel deploy
- **Cause:** CDN cached stale index.html with old JS references
- **Fix:** `vercel.json` with `Cache-Control: no-cache, no-store, must-revalidate` + meta tags in index.html

### 2. Admin Settings Not Saving
- **Symptom:** "Kaydedilirken hata oluştu"
- **Cause 1:** `updateSiteConfig` used `update` not `upsert` — if no row existed, save did nothing
- **Cause 2:** Settings form saved flat data (`phone: "0532..."`) but public site expects nested (`phone: {display, raw, secondary}`)
- **Fix:** `upsert` + nested `SiteConfigData` format + migration detection for old flat data

### 3. Pricing Save Not Reflected in Calculator
- **Symptom:** Admin saves new prices, calculator still shows old values
- **Cause:** `fetchFullConfig()` caches results. Admin never called `clearConfigCache()`
- **Fix:** Added `clearConfigCache()` to both Settings and Pricing admin pages after successful save

### 4. Material Cost Display Confusion
- **Symptom:** "6.800 ₺ gösteriyor ama ürün m² fiyatı 2.000 ₺"
- **Cause:** Area discount was baked into base material cost (2,000 × 4 = 8,000 - 15% = 6,800)
- **Fix:** Added `basePerM2`, `areaDiscountRate`, `areaDiscountAmount` to PriceBreakdown. Calculator now shows:
  - `Malzeme (4.00 m² × 2.000 ₺/m²) → 8.000 ₺`
  - `Alan indirimi (%15) → -1.200 ₺`

### 5. Contact Form Error
- **Symptom:** "Gönderilirken bir hata oluştu"
- **Cause:** Formspree endpoint was placeholder `https://formspree.io/f/xxxxxx`
- **Fix:** Changed to submit directly to Supabase `contacts` table (RLS allows public INSERT)

### 6. Bot Spam
- **Symptom:** No protection on contact form
- **Fix:** Honeypot (hidden field) + math question (5 + 3 = ?)

## Fallback System
When Supabase is unavailable (no env vars or network error):
- `fetchFullConfig()` silently catches errors and returns DEFAULT constants
- All components show default content
- Admin panel shows "Supabase bağlantısı yapılandırılmamış" message
- Contact form falls back to Formspree endpoint

## Deployment
- **GitHub:** https://github.com/reypobicomtr-creator/panjur-sistemleri
- **Vercel:** https://panjur-sistemleri.vercel.app
- **Supabase:** https://mlbkgjdprprqxejcpyig.supabase.co
- **Auto-deploy:** Every push to main → Vercel builds and deploys

## Routes
| Route | Page | Context |
|---|---|---|
| `/#/` | Public site (panjur company site) | Full context |
| `/#/tanitim` | Product landing page (sell this system) | No context |
| `/#/admin/login` | Admin login | Auth |
| `/#/admin` | Admin dashboard | Auth |
| `/#/admin/ayarlar` | Site settings | Auth |
| `/#/admin/fiyatlar` | Pricing management | Auth |
| `/#/admin/galeri` | Gallery management | Auth |
| `/#/admin/yorumlar` | Reviews management | Auth |
| `/#/admin/mesajlar` | Contact messages | Auth |

## Next Steps (planned)
- Analytics dashboard
- SEO editor in admin
- Multi-language support
- Production Formspree endpoint (for Supabase-fallback path)
