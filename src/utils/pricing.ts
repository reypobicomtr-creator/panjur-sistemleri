/* ═══════════════════════════════════════════════════
   PanjurMax — Fiyat Hesaplama Motoru
   ═══════════════════════════════════════════════════ */

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
   Birim Fiyat Tablosu (₺/m²)
   ────────────────────────────────────────────── */
const BASE_PRICES: Record<ShutterType, number> = {
  aluminium: 2250,
  pvc: 1650,
  motorlu: 2750,
  guvenlik: 3450,
};

const MIN_MATERIAL_COST = 1200;

/* ──────────────────────────────────────────────
   Kasa Tipleri
   ────────────────────────────────────────────── */
const CASE_PRICES: Record<CaseType, number> = {
  siva_ustu: 0,
  siva_alti: 450,
  mini: 650,
};

export const CASE_NAMES: Record<CaseType, string> = {
  siva_ustu: 'Sıva Üstü Kasa',
  siva_alti: 'Sıva Altı Kasa',
  mini: 'Mini Kasa',
};

/* ──────────────────────────────────────────────
   Ek Ücretler
   ────────────────────────────────────────────── */
const MOTOR_EXTRA = 1450;
const SPECIAL_COLOR_EXTRA = 480;
const BASE_LABOR = 350;
const FLOOR_EXTRA_PER = 120;
const REMOVAL_COST = 200;

/* ──────────────────────────────────────────────
   İndirim & KDV
   ────────────────────────────────────────────── */
const BULK_DISCOUNT_THRESHOLD = 5;
const BULK_DISCOUNT_RATE = 0.05;
const KDV_RATE = 0.20;

/* ──────────────────────────────────────────────
   Ürün Adları
   ────────────────────────────────────────────── */
export const PRODUCT_NAMES: Record<ShutterType, string> = {
  aluminium: 'Alüminyum Panjur',
  pvc: 'PVC Panjur',
  motorlu: 'Motorlu Panjur',
  guvenlik: 'Güvenlik Panjuru',
};

/* ──────────────────────────────────────────────
   Alan bazlı kademe indirimi
   ────────────────────────────────────────────── */
function getAreaDiscount(area: number): number {
  if (area > 3) return 0.15;
  if (area > 1.5) return 0.08;
  return 0;
}

/* ──────────────────────────────────────────────
   Ana hesaplama fonksiyonu
   ────────────────────────────────────────────── */
export function calculatePrice(form: FormState): PriceBreakdown {
  const w = parseInt(form.width) / 100; // cm → m
  const h = parseInt(form.height) / 100;
  const area = w * h;
  const q = parseInt(form.quantity);
  const f = parseInt(form.floor);
  const shutterType = form.shutterType as ShutterType;
  const hasOld = form.hasOldShutter === true;

  // 1) Malzeme fiyatı (kademeli)
  const basePerM2 = BASE_PRICES[shutterType];
  const areaDiscount = getAreaDiscount(area);
  const effectivePerM2 = basePerM2 * (1 - areaDiscount);
  let baseMaterialCost = Math.max(effectivePerM2 * area, MIN_MATERIAL_COST);
  baseMaterialCost = Math.round(baseMaterialCost);

  // 2) Kasa tipi
  const caseCost = CASE_PRICES[form.caseType as CaseType];

  // 3) Motor (sadece motorlu panjur harici)
  let motorCost = 0;
  if (form.controlType === 'motorlu' && shutterType !== 'motorlu') {
    motorCost = MOTOR_EXTRA;
  }

  // 4) Renk
  const colorCost = form.colorGroup === 'ozel' ? SPECIAL_COLOR_EXTRA : 0;

  // 5) Montaj işçiliği (sabit)
  const laborCost = BASE_LABOR;

  // 6) Kat ek ücreti (3. kattan sonra)
  const floorCost = f > 3 ? (f - 3) * FLOOR_EXTRA_PER : 0;

  // 7) Eski panjur söküm
  const removalCost = hasOld ? REMOVAL_COST : 0;

  // Birim toplam
  const unitTotal = baseMaterialCost + caseCost + motorCost + colorCost + laborCost + floorCost + removalCost;

  // Ara toplam
  let subtotal = unitTotal * q;

  // 8) Adet indirimi
  let discountApplied = false;
  let discountAmount = 0;
  if (q >= BULK_DISCOUNT_THRESHOLD) {
    discountApplied = true;
    discountAmount = Math.round(subtotal * BULK_DISCOUNT_RATE);
    subtotal -= discountAmount;
  }

  // 9) KDV
  const kdv = Math.round(subtotal * KDV_RATE);
  const grandTotal = subtotal + kdv;

  return {
    productName: PRODUCT_NAMES[shutterType],
    width: parseInt(form.width),
    height: parseInt(form.height),
    area,
    quantity: q,
    controlLabel: form.controlType === 'motorlu' ? 'Motorlu Kumanda' : 'Manuel (Kayış)',
    colorLabel: form.colorGroup === 'ozel' ? 'RAL Özel Renk' : 'Standart Renk',
    caseLabel: CASE_NAMES[form.caseType as CaseType],
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
   Fiyat bilgisi özet metni (panelde gösterim için)
   ────────────────────────────────────────────── */
export const PRICE_INFO_TEXT = `
  Malzeme (m² başına):
  • Alüminyum: 2.250 ₺/m²
  • PVC: 1.650 ₺/m²
  • Motorlu: 2.750 ₺/m²
  • Güvenlik: 3.450 ₺/m²

  1.5 m² üzeri %8, 3 m² üzeri %15 indirim.
  5+ adette %5 toplu indirim.
  Tüm fiyatlara %20 KDV eklenir.
`;
