import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, AlertCircle, DollarSign, Percent, Layers } from 'lucide-react';
import {
  getProducts, upsertProduct, deleteProduct,
  getPricingConfig, updatePricingConfig,
  type Product,
} from '@/lib/db';
import type { PricingConfigData, CaseType as CaseTypeConfig, AreaDiscount, ExtraCosts, Discounts } from '@/lib/config';
import { DEFAULT_PRICING_CONFIG } from '@/lib/config';

const PRODUCT_TYPES = [
  { type: 'aluminium', label: 'Alüminyum Panjur' },
  { type: 'pvc', label: 'PVC Panjur' },
  { type: 'motorlu', label: 'Motorlu Panjur' },
  { type: 'guvenlik', label: 'Güvenlik Panjuru' },
];

type Tab = 'products' | 'cases' | 'extras' | 'discounts';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [pricing, setPricing] = useState<PricingConfigData>(DEFAULT_PRICING_CONFIG);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    Promise.all([getProducts(), getPricingConfig()]).then(([prods, cfg]) => {
      setProducts(prods);
      if (cfg) setPricing(cfg);
    });
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await Promise.all(products.map((p) => upsertProduct(p)));
      await updatePricingConfig(pricing);
      showMessage('success', 'Tüm ayarlar kaydedildi.');
    } catch {
      showMessage('error', 'Kaydedilirken hata oluştu.');
    }
    setSaving(false);
  };

  /* ── Products tab ── */
  const updateProduct = (index: number, field: keyof Product, value: string | number) => {
    setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };
  const addProduct = () => {
    setProducts((prev) => [...prev, { type: '', name: '', base_price: 0, sort_order: prev.length }]);
  };
  const removeProduct = async (id: number | undefined, index: number) => {
    if (id) await deleteProduct(id);
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  /* ── Case types tab ── */
  const updateCaseType = (index: number, field: keyof CaseTypeConfig, value: string | number) => {
    setPricing((prev) => ({
      ...prev,
      caseTypes: prev.caseTypes.map((ct, i) => (i === index ? { ...ct, [field]: value } : ct)),
    }));
  };
  const addCaseType = () => {
    setPricing((prev) => ({
      ...prev,
      caseTypes: [...prev.caseTypes, { id: '', name: '', price: 0 }],
    }));
  };
  const removeCaseType = (index: number) => {
    setPricing((prev) => ({
      ...prev,
      caseTypes: prev.caseTypes.filter((_, i) => i !== index),
    }));
  };

  /* ── Extras tab ── */
  const updateExtra = (field: keyof ExtraCosts, value: number) => {
    setPricing((prev) => ({
      ...prev,
      extraCosts: { ...prev.extraCosts, [field]: value },
    }));
  };

  /* ── Discounts tab ── */
  const updateDiscount = (field: keyof Discounts, value: number | AreaDiscount[]) => {
    setPricing((prev) => ({
      ...prev,
      discounts: { ...prev.discounts, [field]: value },
    }));
  };
  const updateAreaDiscount = (index: number, field: keyof AreaDiscount, value: number) => {
    setPricing((prev) => ({
      ...prev,
      discounts: {
        ...prev.discounts,
        areaDiscounts: prev.discounts.areaDiscounts.map((ad, i) =>
          i === index ? { ...ad, [field]: value } : ad
        ),
      },
    }));
  };
  const addAreaDiscount = () => {
    setPricing((prev) => ({
      ...prev,
      discounts: {
        ...prev.discounts,
        areaDiscounts: [...prev.discounts.areaDiscounts, { minArea: 0, maxArea: 0, rate: 0 }],
      },
    }));
  };
  const removeAreaDiscount = (index: number) => {
    setPricing((prev) => ({
      ...prev,
      discounts: {
        ...prev.discounts,
        areaDiscounts: prev.discounts.areaDiscounts.filter((_, i) => i !== index),
      },
    }));
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'products', label: 'Ürün Fiyatları', icon: <DollarSign className="w-4 h-4" /> },
    { key: 'cases', label: 'Kasa Tipleri', icon: <Layers className="w-4 h-4" /> },
    { key: 'extras', label: 'Ek Ücretler', icon: <Plus className="w-4 h-4" /> },
    { key: 'discounts', label: 'İndirim & KDV', icon: <Percent className="w-4 h-4" /> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fiyatlandırma</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === t.key
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Products ── */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-sm text-gray-500">Ürün bazında m² fiyatları</span>
            <button onClick={addProduct} className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-lg hover:bg-brand-100 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Ekle
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Ürün Tipi</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Adı</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">m² Fiyatı (₺)</th>
                <th className="w-16 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <select
                      value={product.type}
                      onChange={(e) => updateProduct(i, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                    >
                      <option value="">Seçin</option>
                      {PRODUCT_TYPES.map((t) => (
                        <option key={t.type} value={t.type}>{t.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={product.name}
                      onChange={(e) => updateProduct(i, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={product.base_price}
                      onChange={(e) => updateProduct(i, 'base_price', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => removeProduct(product.id, i)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-400">Henüz ürün eklenmemiş.</div>
          )}
        </div>
      )}

      {/* ── Tab: Case Types ── */}
      {activeTab === 'cases' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-sm text-gray-500">Kasa tipleri ve ek ücretleri</span>
            <button onClick={addCaseType} className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-lg hover:bg-brand-100 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Ekle
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Adı</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Fiyat (₺)</th>
                <th className="w-16 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pricing.caseTypes.map((ct, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <input
                      value={ct.id}
                      onChange={(e) => updateCaseType(i, 'id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-brand-500"
                      placeholder="siva_ustu"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={ct.name}
                      onChange={(e) => updateCaseType(i, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                      placeholder="Sıva Üstü Kasa"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={ct.price}
                      onChange={(e) => updateCaseType(i, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => removeCaseType(i)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Tab: Extra Costs ── */}
      {activeTab === 'extras' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <span className="text-sm text-gray-500">Motor, renk, işçilik, söküm ve kat ek ücretleri</span>
          </div>
          <div className="p-4 space-y-4">
            {([
              { key: 'motorExtra', label: 'Motor Ek Ücreti (₺)' },
              { key: 'specialColorExtra', label: 'Özel Renk Ek Ücreti (₺)' },
              { key: 'baseLabor', label: 'Montaj İşçiliği (₺)' },
              { key: 'floorExtraPer', label: 'Kat Başına Ek Ücret (₺)' },
              { key: 'removalCost', label: 'Eski Panjur Söküm (₺)' },
              { key: 'minMaterialCost', label: 'Minimum Malzeme Bedeli (₺)' },
            ] as { key: keyof ExtraCosts; label: string }[]).map((item) => (
              <div key={item.key} className="flex items-center gap-4">
                <label className="w-52 text-sm font-medium text-gray-700">{item.label}</label>
                <input
                  type="number"
                  value={pricing.extraCosts[item.key]}
                  onChange={(e) => updateExtra(item.key, parseFloat(e.target.value) || 0)}
                  className="flex-1 max-w-xs px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: Discounts ── */}
      {activeTab === 'discounts' && (
        <div className="space-y-4">
          {/* KDV & Bulk */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Genel indirim ve vergi oranları</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <label className="w-52 text-sm font-medium text-gray-700">Toplu İndirim Eşiği (adet)</label>
                <input
                  type="number"
                  value={pricing.discounts.bulkDiscountThreshold}
                  onChange={(e) => updateDiscount('bulkDiscountThreshold', parseInt(e.target.value) || 0)}
                  className="flex-1 max-w-xs px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-52 text-sm font-medium text-gray-700">Toplu İndirim Oranı (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={pricing.discounts.bulkDiscountRate * 100}
                  onChange={(e) => updateDiscount('bulkDiscountRate', (parseFloat(e.target.value) || 0) / 100)}
                  className="flex-1 max-w-xs px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-52 text-sm font-medium text-gray-700">KDV Oranı (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={pricing.discounts.kdvRate * 100}
                  onChange={(e) => updateDiscount('kdvRate', (parseFloat(e.target.value) || 0) / 100)}
                  className="flex-1 max-w-xs px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Alan indirim kademeleri */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Alan bazlı malzeme indirimi kademeleri</span>
              <button onClick={addAreaDiscount} className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-lg hover:bg-brand-100 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Kademe Ekle
              </button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Min (m²)</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Max (m²)</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">İndirim (%)</th>
                  <th className="w-16 px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pricing.discounts.areaDiscounts.map((ad, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        step="0.1"
                        value={ad.minArea}
                        onChange={(e) => updateAreaDiscount(i, 'minArea', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        step="0.1"
                        value={ad.maxArea >= 999 ? 999 : ad.maxArea}
                        onChange={(e) => updateAreaDiscount(i, 'maxArea', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        step="0.1"
                        value={ad.rate * 100}
                        onChange={(e) => updateAreaDiscount(i, 'rate', (parseFloat(e.target.value) || 0) / 100)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => removeAreaDiscount(i)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mesaj + Save */}
      {message && (
        <div className={`mt-4 flex items-center gap-2 p-3 rounded-xl text-sm ${
          message.type === 'success'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          {message.text}
        </div>
      )}

      <button
        onClick={handleSaveAll}
        disabled={saving}
        className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-semibold rounded-xl transition-colors"
      >
        <Save className="w-4 h-4" />
        {saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
      </button>
    </div>
  );
}
