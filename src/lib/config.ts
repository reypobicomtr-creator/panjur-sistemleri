import { supabase } from './supabase';
import type { Product } from './db';

/* ═══════════════════════════════════════════════
   Tip Tanımları
   ═══════════════════════════════════════════════ */

export interface SitePhone {
  display: string;
  raw: string;
  secondary: string;
}

export interface SiteEmail {
  primary: string;
  secondary: string;
}

export interface SiteAddress {
  street: string;
  district: string;
  city: string;
  region: string;
  zip: string;
  country: string;
  full: string;
}

export interface WorkingHours {
  days: string;
  hours: string;
}

export interface WhatsApp {
  number: string;
  message: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroConfig {
  title: string;
  titleAccent: string;
  badge: string;
  description: string;
  stats: HeroStat[];
  perks: string[];
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface AboutStat {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutConfig {
  headline: string;
  headlineAccent: string;
  foundedYear: number;
  stats: AboutStat[];
}

export interface ContactConfig {
  formHeading: string;
  formSubtext: string;
  formspreeEndpoint: string;
}

export interface FooterConfig {
  description: string;
  products: string[];
  services: string[];
}

export interface RatingConfig {
  value: number;
  best: number;
  count: number;
}

export interface SiteConfigData {
  brandName: string;
  tagline: string;
  domain: string;
  phone: SitePhone;
  email: SiteEmail;
  address: SiteAddress;
  workingHours: WorkingHours;
  whatsapp: WhatsApp;
  seo: SeoConfig;
  hero: HeroConfig;
  about: AboutConfig;
  contact: ContactConfig;
  footer: FooterConfig;
  rating: RatingConfig;
}

export interface CaseType {
  id: string;
  name: string;
  price: number;
}

export interface AreaDiscount {
  minArea: number;
  maxArea: number;
  rate: number;
}

export interface ExtraCosts {
  motorExtra: number;
  specialColorExtra: number;
  baseLabor: number;
  floorExtraPer: number;
  removalCost: number;
  minMaterialCost: number;
}

export interface Discounts {
  areaDiscounts: AreaDiscount[];
  bulkDiscountThreshold: number;
  bulkDiscountRate: number;
  kdvRate: number;
}

export interface PricingConfigData {
  caseTypes: CaseType[];
  extraCosts: ExtraCosts;
  discounts: Discounts;
}

export interface FullConfig {
  site: SiteConfigData;
  products: Product[];
  pricing: PricingConfigData;
}

/* ═══════════════════════════════════════════════
   Varsayılan Değerler (fallback)
   ═══════════════════════════════════════════════ */

export const DEFAULT_SITE_CONFIG: SiteConfigData = {
  brandName: 'PanjurMax',
  tagline: 'Profesyonel Panjur Çözümleri',
  domain: 'https://panjurmax.com',
  phone: { display: '0532 123 45 67', raw: '+905321234567', secondary: '0216 987 65 43' },
  email: { primary: 'info@panjurmax.com', secondary: 'teklif@panjurmax.com' },
  address: {
    street: 'Organize Sanayi Bölgesi, 2. Cadde No: 45',
    district: 'Ümraniye', city: 'İstanbul', region: 'İstanbul',
    zip: '34770', country: 'TR',
    full: 'Organize Sanayi Bölgesi, 2. Cadde No: 45, Ümraniye, İstanbul',
  },
  workingHours: { days: 'Pazartesi - Cumartesi', hours: '08:00 - 19:00' },
  whatsapp: { number: '905321234567', message: 'Merhaba, panjur hizmeti hakkında bilgi almak istiyorum.' },
  seo: {
    title: 'PanjurMax - Profesyonel Panjur Çözümleri',
    description: '15 yıllık tecrübeyle alüminyum, PVC, motorlu ve güvenlik panjuru çözümleri.',
    keywords: 'panjur, alüminyum panjur, pvc panjur, motorlu panjur, güvenlik panjuru',
    ogImage: 'https://panjurmax.com/og-image.jpg',
  },
  hero: {
    title: 'PanjurMax ile Evinize Değer Katan', titleAccent: 'Panjur Çözümleri',
    badge: '15 yıldır güvenilir hizmet',
    description: 'Güvenlik, enerji tasarrufu ve estetik bir arada.',
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
  about: {
    headline: 'Güvenilir Panjur Çözümleri İçin', headlineAccent: 'Doğru Adres',
    foundedYear: 2009,
    stats: [
      { icon: 'Award', title: 'TSE Belgeli', desc: 'Tüm ürünlerimiz sertifikalı' },
      { icon: 'Users', title: '3.200+ Müşteri', desc: 'Mutlu müşteri portföyü' },
      { icon: 'Clock', title: 'Hızlı Montaj', desc: 'Aynı gün kurulum imkânı' },
      { icon: 'Truck', title: 'Ücretsiz Keşif', desc: 'Ölçü ve keşif ücretsiz' },
    ],
  },
  contact: {
    formHeading: 'Ücretsiz Keşif Formu',
    formSubtext: 'Formu doldurun, sizi arayalım.',
    formspreeEndpoint: 'https://formspree.io/f/xxxxxx',
  },
  footer: {
    description: '15 yıldır Türkiye genelinde profesyonel panjur montaj ve servis hizmeti sunuyoruz.',
    products: ['Alüminyum Panjur', 'PVC Panjur', 'Motorlu Panjur', 'Güvenlik Panjuru', 'Stor Perde', 'Jaluzi Perde'],
    services: ['Ücretsiz Keşif', 'Panjur Montajı', 'Panjur Tamiri', 'Motor Değişimi', 'Bakım & Onarım', 'Renk Değişimi'],
  },
  rating: { value: 4.9, best: 5, count: 187 },
};

export const DEFAULT_PRICING_CONFIG: PricingConfigData = {
  caseTypes: [
    { id: 'siva_ustu', name: 'Sıva Üstü Kasa', price: 0 },
    { id: 'siva_alti', name: 'Sıva Altı Kasa', price: 450 },
    { id: 'mini', name: 'Mini Kasa', price: 650 },
  ],
  extraCosts: {
    motorExtra: 1450,
    specialColorExtra: 480,
    baseLabor: 350,
    floorExtraPer: 120,
    removalCost: 200,
    minMaterialCost: 1200,
  },
  discounts: {
    areaDiscounts: [
      { minArea: 0, maxArea: 1.5, rate: 0 },
      { minArea: 1.5, maxArea: 3, rate: 0.08 },
      { minArea: 3, maxArea: 999, rate: 0.15 },
    ],
    bulkDiscountThreshold: 5,
    bulkDiscountRate: 0.05,
    kdvRate: 0.20,
  },
};

export const DEFAULT_PRODUCTS: Product[] = [
  { type: 'aluminium', name: 'Alüminyum Panjur', base_price: 2250, sort_order: 0 },
  { type: 'pvc', name: 'PVC Panjur', base_price: 1650, sort_order: 1 },
  { type: 'motorlu', name: 'Motorlu Panjur', base_price: 2750, sort_order: 2 },
  { type: 'guvenlik', name: 'Güvenlik Panjuru', base_price: 3450, sort_order: 3 },
];

/* ═══════════════════════════════════════════════
   Fetch fonksiyonları
   ═══════════════════════════════════════════════ */

let cachedConfig: FullConfig | null = null;

export async function fetchFullConfig(): Promise<FullConfig> {
  if (cachedConfig) return cachedConfig;

  const isEnabled = !!supabase;

  let site: SiteConfigData = DEFAULT_SITE_CONFIG;
  let products: Product[] = DEFAULT_PRODUCTS;
  let pricing: PricingConfigData = DEFAULT_PRICING_CONFIG;

  if (isEnabled) {
    try {
      const [siteRes, prodRes, pricingRes] = await Promise.all([
        supabase!.from('site_config').select('data').eq('id', 1).maybeSingle(),
        supabase!.from('products').select('*').order('sort_order'),
        supabase!.from('pricing_config').select('data').eq('id', 1).maybeSingle(),
      ]);

      if (siteRes.data?.data) {
        site = { ...DEFAULT_SITE_CONFIG, ...siteRes.data.data as Partial<SiteConfigData> };
      }
      if (prodRes.data && (prodRes.data as Product[]).length > 0) {
        products = prodRes.data as Product[];
      }
      if (pricingRes.data?.data) {
        pricing = { ...DEFAULT_PRICING_CONFIG, ...pricingRes.data.data as Partial<PricingConfigData> };
      }
    } catch {
      // fallback to defaults
    }
  }

  const config: FullConfig = { site, products, pricing };
  cachedConfig = config;
  return config;
}

export function clearConfigCache() {
  cachedConfig = null;
}
