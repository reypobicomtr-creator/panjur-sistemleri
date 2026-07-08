/* ═══════════════════════════════════════════════════
   PanjurMax — Fiyat Hesaplama Motoru
   ═══════════════════════════════════════════════════ */

import type { PricingConfigData } from '@/lib/config';
import type { Product } from '@/lib/db';

export type ShutterType = 'aluminium' | 'pvc' | 'motorlu' | 'guvenlik';
export type ControlType = 'manuel' | 'motorlu';
export type ColorGroup = 'standart' | 'ozel';
export type CaseType = 'siva_ustu' | 'siva_alti' | 'mini';

export interface FormState {
  step: number;
  shutterType: ShutterType | '';
  width: string;
  height: string;
  quantity: string;
  controlType: ControlType | '';
  colorGroup: ColorGroup | '';
  caseType: CaseType | '';
  floor: string;
  hasOldShutter: boolean | null;
}

export interface PriceBreakdown {
  productName: string;
  basePerM2: number;
  areaDiscountRate: number;
  areaDiscountAmount: number;
  width: number;
  height: number;
  area: number;
  quantity: number;
  controlLabel: string;
  colorLabel: string;
  caseLabel: string;
  floor: number;
  hasOldShutter: boolean;
  baseMaterialCost: number;
  caseCost: number;
  motorCost: number;
  colorCost: number;
  laborCost: number;
  floorCost: number;
  removalCost: number;
  unitTotal: number;
  subtotal: number;
  kdv: number;
  grandTotal: number;
  discountApplied: boolean;
  discountAmount: number;
}

/* ──────────────────────────────────────────────
   Ürün Adları (sabit display labels)
   ────────────────────────────────────────────── */
export const PRODUCT_NAMES: Record<ShutterType, string> = {
  aluminium: 'Alüminyum Panjur',
  pvc: 'PVC Panjur',
  motorlu: 'Motorlu Panjur',
  guvenlik: 'Güvenlik Panjuru',
};

export const CASE_NAMES: Record<CaseType, string> = {
  siva_ustu: 'Sıva Üstü Kasa',
  siva_alti: 'Sıva Altı Kasa',
  mini: 'Mini Kasa',
};

/* ──────────────────────────────────────────────
   Yardımcı: base m² fiyatını ürün listesinden bul
   ────────────────────────────────────────────── */
function getBasePrice(products: Product[], shutterType: ShutterType): number {
  const found = products.find((p) => p.type === shutterType);
  return found ? found.base_price : 0;
}

/* ──────────────────────────────────────────────
   Alan bazlı kademe indirimi
   ────────────────────────────────────────────── */
function getAreaDiscount(area: number, discounts: PricingConfigData['discounts']): number {
  const tier = discounts.areaDiscounts.find((d) => area >= d.minArea && area < d.maxArea);
  return tier ? tier.rate : 0;
}

/* ──────────────────────────────────────────────
   Ana hesaplama fonksiyonu (artık config parametresi alır)
   ────────────────────────────────────────────── */
export function calculatePrice(
  form: FormState,
  pricing: PricingConfigData,
  products: Product[],
): PriceBreakdown {
  const w = parseInt(form.width) / 100; // cm → m
  const h = parseInt(form.height) / 100;
  const area = w * h;
  const q = parseInt(form.quantity);
  const f = parseInt(form.floor);
  const shutterType = form.shutterType as ShutterType;
  const hasOld = form.hasOldShutter === true;

  const { extraCosts, discounts } = pricing;

  // 1) Malzeme fiyatı (kademeli)
  const basePerM2 = getBasePrice(products, shutterType);
  const areaDiscountRate = getAreaDiscount(area, discounts);
  const rawMaterial = basePerM2 * area;
  const areaDiscountAmount = Math.round(rawMaterial * areaDiscountRate);
  let baseMaterialCost = Math.max(rawMaterial - areaDiscountAmount, extraCosts.minMaterialCost);
  baseMaterialCost = Math.round(baseMaterialCost);

  // 2) Kasa tipi
  const caseTypeConfig = pricing.caseTypes.find((c) => c.id === form.caseType);
  const caseCost = caseTypeConfig ? caseTypeConfig.price : 0;

  // 3) Motor (sadece motorlu panjur harici)
  let motorCost = 0;
  if (form.controlType === 'motorlu' && shutterType !== 'motorlu') {
    motorCost = extraCosts.motorExtra;
  }

  // 4) Renk
  const colorCost = form.colorGroup === 'ozel' ? extraCosts.specialColorExtra : 0;

  // 5) Montaj işçiliği (sabit)
  const laborCost = extraCosts.baseLabor;

  // 6) Kat ek ücreti (3. kattan sonra)
  const floorCost = f > 3 ? (f - 3) * extraCosts.floorExtraPer : 0;

  // 7) Eski panjur söküm
  const removalCost = hasOld ? extraCosts.removalCost : 0;

  // Birim toplam
  const unitTotal = baseMaterialCost + caseCost + motorCost + colorCost + laborCost + floorCost + removalCost;

  // Ara toplam
  let subtotal = unitTotal * q;

  // 8) Adet indirimi
  let discountApplied = false;
  let discountAmount = 0;
  if (q >= discounts.bulkDiscountThreshold) {
    discountApplied = true;
    discountAmount = Math.round(subtotal * discounts.bulkDiscountRate);
    subtotal -= discountAmount;
  }

  // 9) KDV
  const kdv = Math.round(subtotal * discounts.kdvRate);
  const grandTotal = subtotal + kdv;

  return {
    productName: PRODUCT_NAMES[shutterType],
    basePerM2,
    areaDiscountRate,
    areaDiscountAmount,
    width: parseInt(form.width),
    height: parseInt(form.height),
    area,
    quantity: q,
    controlLabel: form.controlType === 'motorlu' ? 'Motorlu Kumanda' : 'Manuel (Kayış)',
    colorLabel: form.colorGroup === 'ozel' ? 'RAL Özel Renk' : 'Standart Renk',
    caseLabel: caseTypeConfig ? caseTypeConfig.name : '',
    floor: f,
    hasOldShutter: hasOld,
    baseMaterialCost,
    caseCost,
    motorCost,
    colorCost,
    laborCost,
    floorCost,
    removalCost,
    unitTotal,
    subtotal: unitTotal * q, // pre-discount subtotal (display only)
    kdv,
    grandTotal,
    discountApplied,
    discountAmount,
  };
}

/* ──────────────────────────────────────────────
   Fiyat bilgisi özet metni (dinamik)
   ────────────────────────────────────────────── */
export function getPriceInfoText(products: Product[], pricing: PricingConfigData): string {
  const productLines = products
    .map((p) => `  • ${p.name}: ${formatPrice(p.base_price)}/m²`)
    .join('\n');

  const areaLines = pricing.discounts.areaDiscounts
    .filter((d) => d.rate > 0)
    .map((d) => {
      const upper = d.maxArea >= 999 ? 'üzeri' : `${d.maxArea} m²'ye kadar`;
      return `  ${d.minArea} – ${upper}: %${(d.rate * 100).toFixed(0)} indirim`;
    })
    .join('\n');

  return `
  Malzeme (m² başına):
${productLines}

  Alan indirimi:
${areaLines}

  ${pricing.discounts.bulkDiscountThreshold}+ adette %${(pricing.discounts.bulkDiscountRate * 100).toFixed(0)} toplu indirim.
  Tüm fiyatlara %${(pricing.discounts.kdvRate * 100).toFixed(0)} KDV eklenir.
  `;
}

function formatPrice(n: number): string {
  return n.toLocaleString('tr-TR') + ' ₺';
}
