---
name: PanjurMax
description: Profesyonel panjur çözümleri kurumsal sitesi
colors:
  primary: "#0066cc"
  primary-hover: "#0784ef"
  primary-light: "#b8dcff"
  primary-surface: "#f0f7ff"
  primary-deep: "#0a3a70"
  primary-dark: "#07254a"
  accent: "#d78333"
  accent-light: "#f2d8b5"
  accent-surface: "#fdf8f0"
  ink: "#111827"
  ink-muted: "#6b7280"
  ink-subtle: "#9ca3af"
  border: "#e5e7eb"
  surface: "#ffffff"
  surface-muted: "#f9fafb"
  surface-ghost: "#f3f4f6"
typography:
  display:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "clamp(1rem, 2vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.04em"
    textTransform: "uppercase"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "16px 28px"
    typography: "{typography.title}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "16px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "16px 28px"
    border: "1px solid rgba(255,255,255,0.2)"
  button-ghost-hover:
    backgroundColor: "rgba(255,255,255,0.1)"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "16px 28px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    border: "1px solid {colors.border}"
  input-focus:
    border: "2px solid {colors.primary}"
    shadow: "0 0 0 3px rgba(0,102,204,0.12)"
---

# Design System: PanjurMax

## 1. Overview

**Creative North Star: "Güvenli Liman (The Safe Harbor)"**

PanjurMax'ın tasarım sistemi, bir evin en güvenli odası gibi hissettirir: davetkâr, korunaklı, sağlam. Kullanıcı siteye adım attığı anda "doğru yerdesin" duygusunu almalıdır. Bu, her tasarım kararının altında yatan tezdir.

Sistem, **Endüstriyel Mavi** (profesyonellik, güven, teknoloji) ile **Sıcak Amber**'i (zanaatkârlık, samimiyet, ev sıcaklığı) bir araya getirir. Mavi ana rengin %60-70'ini taşır; amber ise %5-10 oranında, stratejik dokunuşlarda ortaya çıkar (CTA hover'ları, vurgu ögeleri, rozetler).

Mekânsal dil düzdür (flat): derinlik, gölgelerle değil, temiz whitespace ve tonal katmanlarla (beyaz zemin → çok açık gri surface) sağlanır. Tipografide Playfair Display'in zarif serifleriyle Inter'in teknik netliği arasında bir kontrast vardır — tıpkı markanın kendisi gibi: usta eller, modern araçlar.

**Sistemin reddettikleri:** Aşırı kurumsal ve soğuk estetik (banka sitesi hissi), bayat esnaf sitesi gradientleri ve flaş efektleri, AI jenerik landing page şablonları (her bölümde uppercase eyebrow, üst üste aynı boyutta kart ızgaraları).

### Key Characteristics:
- **Flat-by-default:** Yüzeyler düzdür; katmanlar ton farkıyla ayrılır
- **Mavi egemen, amber vurgu:** Renk hiyerarşisi nettir; amber nadir kullanıldığı için değerlidir
- **Yumuşak geometri:** 8–16px radius, hiçbir köşe 90° keskin değil
- **Nefes alan boşluk:** Yoğun padding ve margin; içerik kalabalık hissettirmez
- **Tek bir h1, net akış:** Her sayfa/bölüm tek bir dönüşüm hedefine kilitlenir

## 2. Colors: Endüstriyel Mavi & Sıcak Amber Paleti

Karakter: Mavi güven ve profesyonelliği taşır; amber sıcaklık ve zanaatkârlığı imler.

### Primary
- **Endüstriyel Mavi** (`#0066cc` / `oklch(0.52 0.18 255)`): Tüm birincil butonlar, linkler, aktif ögeler ve marka varlığının ana taşıyıcısı.
- **Endüstriyel Mavi Parlak** (`#0784ef` / `oklch(0.56 0.20 250)`): Hover durumları, interactive ögelerin üzerine gelindiğinde.
- **Endüstriyel Mavi Işık** (`#b8dcff` / `oklch(0.82 0.08 250)`): Hafif vurgular, badge arka planları.
- **Endüstriyel Mavi Yüzey** (`#f0f7ff` / `oklch(0.96 0.018 250)`): Çok hafif mavi tonlu surface; Calculator'daki fiyat kartı, info panelleri.
- **Endüstriyel Mavi Derin** (`#0a3a70` / `oklch(0.33 0.13 260)`): Footer, koyu zeminler.
- **Endüstriyel Mavi Gece** (`#07254a` / `oklch(0.22 0.10 260)`): Hero gradient'in en koyu ucu, aşırı koyu zeminler.

### Accent
- **Sıcak Amber** (`#d78333` / `oklch(0.62 0.10 65)`): Stratejik vurgularda — rozetler, fiyat avantajı göstergeleri, "15 yıldır güvenilir hizmet" etiketi gibi dikkat çekmesi gereken küçük alanlar.
- **Amber Işık** (`#f2d8b5` / `oklch(0.88 0.04 75)`): Dekoratif daireler ve blur efektlerinde.
- **Amber Yüzey** (`#fdf8f0` / `oklch(0.98 0.006 80)`): Sıcak tonlu arka plan alternatifi.

### Neutral
- **Mürekkep** (`#111827`): Ana gövde metni.
- **Mürekkep Donuk** (`#6b7280`): İkincil metin, yardımcı açıklamalar.
- **Mürekkep Silik** (`#9ca3af`): Placeholder metni, pasif label'lar.
- **Sınır** (`#e5e7eb`): Kart kenarlıkları, input çerçeveleri, ayırıcılar.
- **Yüzey** (`#ffffff`): Ana sayfa zemini, kartlar.
- **Yüzey Donuk** (`#f9fafb`): Chatbot mesaj alanı zemini, bölümler arası tonal ayrım.
- **Yüzey Hayalet** (`#f3f4f6`): Durdurulmuş input'lar, pasif alanlar.

### Named Rules
**The Mavi Egemenlik Kuralı.** Ana mavi (`primary`, `#0066cc`) markanın rengidir ve yüzeyin %60-70'ini kaplar. Amber vurgu rengi, toplam yüzeyin %10'unu geçemez. Amber nadir olduğu için değerlidir; her yerde kullanılırsa etkisini kaybeder.

**The Sıfır Gradyan Kuralı.** Gradient metin (`background-clip: text`) ve dekoratif gradient arka planlar yasaktır. Tüm renkler düz (solid) uygulanır.

## 3. Typography

**Display Font:** Playfair Display (Georgia, serif)
**Body Font:** Inter (system-ui, sans-serif)

**Karakter:** Playfair Display'in zarif, klasik serifleri markanın "usta işi" ve "güvenilir" yanını temsil eder. Inter'in geometrik netliği ise "modern" ve "şeffaf" duruşu taşır. Birlikte, geleneksel zanaatkârlıkla dijital çağın buluşmasını anlatır.

### Hierarchy
- **Display** (Bold 700, `clamp(2.25rem, 6vw, 4.5rem)`, 1.1 line-height, -0.02em letter-spacing): Hero başlıkları. Tek ve güçlü bir ifade için. `text-wrap: balance` uygulanır. Azami 6rem (~96px) tavanı aşılmaz.
- **Headline** (SemiBold 600, `clamp(1.75rem, 4vw, 2.75rem)`, 1.2): Bölüm başlıkları (`h2`). `text-wrap: balance` uygulanır.
- **Title** (SemiBold 600, `clamp(1rem, 2vw, 1.25rem)`, 1.4): Kart başlıkları, alt başlıklar. `text-wrap: balance` uygulanır.
- **Body** (Regular 400, `1rem`/16px, 1.625): Paragraf metni. Max satır genişliği 65–75ch.
- **Label** (Medium 500, `0.875rem`/14px, 1.5, 0.04em letter-spacing, uppercase): Section etiketleri, küçük başlık üstü etiketler. **Sadece bir bölümde kullanılır** — AI jenerik görünümünü önlemek için her bölümün üstünde bu etiket kullanılmaz.

### Named Rules
**The Tek Font Kontrastı Kuralı.** Playfair Display yalnızca display ve headline rollerinde kullanılır. Body, title ve label'da asla serif kullanılmaz. İki font aynı rolde yarışmaz.

## 4. Elevation

Sistem düzdür (flat). Derinlik, CSS gölgeleriyle değil, tonal katmanlama ve whitespace ile sağlanır. Bir kart, arka plandan yalnızca daha açık/beyaz rengi ve border'ı ile ayrılır.

- **Sıfır gölge politikası:** Kartlar, containerlar, section'lar gölge kullanmaz. Yüzeyler düzdür.
- **Tek istisna — etkileşim:** Buton hover'ında `hover:shadow-xl hover:shadow-brand-500/30` kullanılır (Hero CTA). Bu, harekete geçirici eylem için ince bir "kalkma" hissi verir. Bunun dışında gölge yoktur.
- **Chatbot calculator kartı** (`shadow-xl`): Bu, sistemdeki tek gölgeli container'dır. Amacı, fiyat asistanını sayfada "yükseltilmiş, ayrıcalıklı" bir modül olarak işaretlemektir. Yeni bir component eklenirken bu istisnaya referans verilmeden gölge kullanılmaz.

### Shadow Vocabulary (restricted)
- **CTA hover** (`0 4px 14px 0 rgba(0, 102, 204, 0.3)`): Yalnızca birincil CTA butonlarındaki hover durumu için.

### Named Rules
**The Flat-By-Default Kuralı.** Yüzeyler düz durur. Gölge yalnızca etkileşim anında (hover) ve yalnızca CTA butonlarında görünür. Yeni bir component asla varsayılan durumda gölgeyle başlamaz.

## 5. Components

### Buttons
- **Şekil:** Yumuşak yuvarlatılmış (12px / rounded-xl). Köşeler ne keskin ne tam yuvarlak.
- **Primary (CTA):** Endüstriyel Mavi (`#0066cc`) zemin, beyaz metin, 16px 28px padding. Hover: Parlak Mavi (`#0784ef`), yükselme hissi için hafif gölge (`0 4px 14px rgba(0,102,204,0.3)`) ve `translateY(-1px)`.
- **Ghost (Hero ikincil):** Saydam zemin, beyaz metin, `rgba(255,255,255,0.2)` border. Hover: `rgba(255,255,255,0.1)` zemin.
- **Transition:** Tüm durumlar `150ms ease-out` ile.
- **Min height:** 48px (dokunmatik hedef büyüklüğü).

### Cards / Containers
- **Köşe:** 16px (rounded-2xl).
- **Zemin:** Beyaz (`#ffffff`). Sınır: 1px solid `#e5e7eb`.
- **Gölge:** Yok (sadece Calculator kartı istisnadır).
- **Padding:** 24–32px, içerik yoğunluğuna göre.
- **İç boşluk:** Ögeler arası 16px.

### Inputs / Fields
- **Stil:** 1px solid `#e5e7eb` çerçeve, beyaz zemin, 8px (rounded-lg) köşe.
- **Padding:** 12px 16px.
- **Focus:** 2px solid `#0066cc` border + 3px `rgba(0,102,204,0.12)` dış glow. Focus ring asla kaldırılmaz.
- **Placeholder:** `#9ca3af` — kontrast ≥4.5:1 sağlanır.
- **Hata:** `#dc2626` border + arka plan tonu (henüz implemente edilmedi, referans için).

### Chips / Badges
- **Stil:** 6px (rounded-sm), 8px 14px padding.
- **Zemin:** `#f0f7ff` (brand-surface). Metin: `#0066cc` (brand-600).
- **Kullanım:** Hizmet etiketleri, filtreler, fiyat bilgi etiketleri.

### Navigation (Header)
- **Stil:** Beyaz zemin, sabit üst (sticky), 48px yükseklik.
- **Link:** `#6b7280` → hover `#0066cc`.
- **Mobil:** Hamburger menü (mevcut implementasyon kontrol edilmeli).

### Chatbot Calculator (Signature Component)
- **Container:** Beyaz kart, 16px radius, `shadow-xl`, ince border.
- **Header:** Gradient (`#0066cc` → `#0051a5`), beyaz metin, bot avatarı.
- **Mesaj balonu (bot):** Beyaz, `shadow-sm`, 12px radius, sol hizalı.
- **Mesaj balonu (user):** Brand mavisi, beyaz metin, 12px radius, sağ hizalı.
- **Input:** Standart input kuralları, gönder butonu brand mavisi.
- **Fiyat kartı:** Gradient (`brand-50 → white`), border brand-200, 12px radius.

## 6. Do's and Don'ts

### Do:
- **Do** Endüstriyel Mavi'yi (`#0066cc`) baskın renk olarak kullan. Ana marka varlığı budur.
- **Do** Sıcak Amber'i (`#d78333`) stratejik vurgularda kullan — küçük rozetler, "15 yıl" etiketi gibi dikkat çekmesi gereken ögelerde.
- **Do** flat yaklaşımı benimse: Derinlik gölgeyle değil, tonal katmanlarla (beyaz → `#f9fafb`) ve whitespace'le sağlanır.
- **Do** Playfair Display'i yalnızca display/headline'da, Inter'i body/title/label'da kullan.
- **Do** köşeleri yumuşak tut (8–16px radius). Keskin 90° köşelerden kaçın.
- **Do** hero ve section başlıklarında `text-wrap: balance` kullan.
- **Do** `prefers-reduced-motion` medya sorgusuyla animasyonları saygılı hale getir (crossfade veya anlık geçiş).
- **Do** fiyat hesaplama chatbot'unu sayfanın en belirgin etkileşimli ögesi olarak konumlandır.
- **Do** placeholder metninde `#9ca3af` kullan (≥4.5:1 kontrat için).

### Don't:
- **Don't** gradient metin (`background-clip: text`) kullan. Tüm renkler düz uygulanır.
- **Don't** amber rengini ana CTA veya geniş yüzeylerde kullan. Amber vurgu rengidir, nadir kullanılmalıdır.
- **Don't** her bölümün üstünde küçük uppercase eyebrow ("HİZMETLER", "GALERİ", "REFERANSLAR") kullan — bu AI jenerik görünümü yaratır.
- **Don't** "big number + small label + gradient accent" hero-metrik şablonunu kullan (SaaS klişesi).
- **Don't** aynı boyutta, icon + başlık + metin kalıbında tekrar eden kart ızgaraları yap.
- **Don't** gölgeyi varsayılan durumda hiçbir container'da kullanma (Calculator chatbot kartı tek istisnadır).
- **Don't** keskin 90° köşeler veya aşırı yuvarlatma (>20px) kullan.
- **Don't** body metninde `#9ca3af` veya daha açık gri kullan — okunamaz. Body metni için `#111827` kullan.
- **Don't** focus ring'i kaldır veya `outline: none` ile değiştir — klavye kullanıcıları için erişilebilirlik zorunluluğudur.
- **Don't** 01/02/03 numaralı bölüm işaretleyicilerini sıralı olmayan bölümlerde kullan.
- **Don't** border-left veya border-right'ı renkli aksesuar olarak 1px'ten kalın kullan (side-stripe).
