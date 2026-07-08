/* ════════════════════════════════════════════════
   PanjurMax — Site Yapılandırması
   ════════════════════════════════════════════════
   Bu dosyayı düzenleyerek siteyi tamamen
   kendi markanıza göre özelleştirebilirsiniz.
   
   Yeni müşteri: Bu dosyadaki tüm değerleri
   kendi bilgilerinizle değiştirin.
   ════════════════════════════════════════════════ */

export const SITE = {
  /* ─── Marka ─────────────────────────────── */
  brandName: 'PanjurMax',
  tagline: 'Profesyonel Panjur Çözümleri',
  domain: 'https://panjurmax.com',

  /* ─── İletişim ──────────────────────────── */
  phone: {
    display: '0532 123 45 67',
    raw: '+905321234567',
    secondary: '0216 987 65 43',
  },
  email: {
    primary: 'info@panjurmax.com',
    secondary: 'teklif@panjurmax.com',
  },
  address: {
    street: 'Organize Sanayi Bölgesi, 2. Cadde No: 45',
    district: 'Ümraniye',
    city: 'İstanbul',
    region: 'İstanbul',
    zip: '34770',
    country: 'TR',
    full: 'Organize Sanayi Bölgesi, 2. Cadde No: 45, Ümraniye, İstanbul',
  },
  workingHours: {
    days: 'Pazartesi - Cumartesi',
    hours: '08:00 - 19:00',
  },

  /* ─── Sosyal / Mesajlaşma ───────────────── */
  whatsapp: {
    number: '905321234567',
    message: 'Merhaba, panjur hizmeti hakkında bilgi almak istiyorum.',
  },

  /* ─── SEO / Meta (index.html'i de ayrıca güncelle) ─ */
  seo: {
    title: 'PanjurMax - Profesyonel Panjur Çözümleri | İstanbul, Ankara, İzmir Panjur Montajı',
    description:
      '15 yıllık tecrübeyle İstanbul, Ankara, İzmir, Bursa, Antalya ve Türkiye genelinde alüminyum, PVC, motorlu ve güvenlik panjuru çözümleri. Ücretsiz keşif ve ölçü hizmeti.',
    keywords:
      'panjur, alüminyum panjur, pvc panjur, motorlu panjur, güvenlik panjuru, panjur montajı, istanbul panjur, ankara panjur, izmir panjur, panjur fiyatları, ücretsiz keşif, panjurmax',
    ogImage: 'https://panjurmax.com/og-image.jpg',
  },

  /* ─── Hero Bölümü ───────────────────────── */
  hero: {
    title: 'PanjurMax ile Evinize Değer Katan',
    titleAccent: 'Panjur Çözümleri',
    badge: '15 yıldır güvenilir hizmet',
    description:
      'Güvenlik, enerji tasarrufu ve estetik bir arada. Uzman ekibimizle evinize en uygun panjur sistemini belirleyip profesyonel montaj hizmeti sunuyoruz.',
    stats: [
      { value: '3.200+', label: 'Tamamlanan Proje' },
      { value: '%98', label: 'Müşteri Memnuniyeti' },
      { value: '15', label: 'Yıllık Tecrübe' },
      { value: '7/24', label: 'Teknik Destek' },
    ],
    perks: ['Ücretsiz ölçü', '2 yıl garanti', 'Aynı gün montaj'],
    ctaPrimary: 'Hemen Fiyat Hesapla',
    ctaSecondary: 'Ücretsiz Keşif',
  },

  /* ─── Hakkımızda ────────────────────────── */
  about: {
    headline: 'Güvenilir Panjur Çözümleri İçin',
    headlineAccent: 'Doğru Adres',
    foundedYear: 2009,
    stats: [
      { icon: 'Award', title: 'TSE Belgeli', desc: 'Tüm ürünlerimiz sertifikalı' },
      { icon: 'Users', title: '3.200+ Müşteri', desc: 'Mutlu müşteri portföyü' },
      { icon: 'Clock', title: 'Hızlı Montaj', desc: 'Aynı gün kurulum imkânı' },
      { icon: 'Truck', title: 'Ücretsiz Keşif', desc: 'Ölçü ve keşif ücretsiz' },
    ],
  },

  /* ─── İletişim Sayfası ──────────────────── */
  contact: {
    formHeading: 'Ücretsiz Keşif Formu',
    formSubtext: 'Formu doldurun, sizi arayalım.',
    /* Formspree endpoint — form mesajlarını email'inize yönlendirir.
       https://formspree.io'da ücretsiz hesap açıp kendi endpoint'inizi alın. */
    formspreeEndpoint: 'https://formspree.io/f/xxxxxx',
  },

  /* ─── Footer ────────────────────────────── */
  footer: {
    description:
      '15 yıldır Türkiye genelinde profesyonel panjur montaj ve servis hizmeti sunuyoruz.',
    products: ['Alüminyum Panjur', 'PVC Panjur', 'Motorlu Panjur', 'Güvenlik Panjuru', 'Stor Perde', 'Jaluzi Perde'],
    services: ['Ücretsiz Keşif', 'Panjur Montajı', 'Panjur Tamiri', 'Motor Değişimi', 'Bakım & Onarım', 'Renk Değişimi'],
  },

  /* ─── Puan / Referans ───────────────────── */
  rating: {
    value: 4.9,
    best: 5,
    count: 187,
  },
} as const;

export type SiteConfig = typeof SITE;
