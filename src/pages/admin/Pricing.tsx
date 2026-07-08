import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, AlertCircle } from 'lucide-react';
import { getProducts, upsertProduct, deleteProduct, type Product } from '@/lib/db';

const PRODUCT_TYPES = [
  { type: 'aluminium', label: 'Alüminyum Panjur' },
  { type: 'pvc', label: 'PVC Panjur' },
  { type: 'motorlu', label: 'Motorlu Panjur' },
  { type: 'guvenlik', label: 'Güvenlik Panjuru' },
];

export default function Pricing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      for (const p of products) {
        await upsertProduct(p);
      }
      setMessage({ type: 'success', text: 'Fiyatlar kaydedildi.' });
    } catch {
      setMessage({ type: 'error', text: 'Kaydedilirken hata oluştu.' });
    }
    setSaving(false);
  };

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fiyatlar</h1>
        <button onClick={addProduct} className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-50 text-brand-700 text-sm font-semibold rounded-xl hover:bg-brand-100 transition-colors">
          <Plus className="w-4 h-4" /> Ürün Ekle
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
          <div className="text-center py-12 text-sm text-gray-400">
            Henüz ürün eklenmemiş. "Ürün Ekle" butonuna tıklayın.
          </div>
        )}
      </div>

      {message && (
        <div className={`mt-4 flex items-center gap-2 p-3 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          {message.text}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-semibold rounded-xl transition-colors"
      >
        <Save className="w-4 h-4" />
        {saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
      </button>
    </div>
  );
}
