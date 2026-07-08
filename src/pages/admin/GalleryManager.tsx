import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, AlertCircle } from 'lucide-react';
import { getGallery, upsertGalleryItem, deleteGalleryItem, type GalleryItem } from '@/lib/db';

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    getGallery().then(setItems);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      for (const item of items) {
        await upsertGalleryItem(item);
      }
      setMessage({ type: 'success', text: 'Galeri kaydedildi.' });
    } catch {
      setMessage({ type: 'error', text: 'Kaydedilirken hata oluştu.' });
    }
    setSaving(false);
  };

  const updateItem = (index: number, field: keyof GalleryItem, value: string | number) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addItem = () => {
    setItems((prev) => [...prev, { src: '', title: '', location: '', sort_order: prev.length }]);
  };

  const removeItem = async (id: number | undefined, index: number) => {
    if (id) await deleteGalleryItem(id);
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Galeri</h1>
        <button onClick={addItem} className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-50 text-brand-700 text-sm font-semibold rounded-xl hover:bg-brand-100 transition-colors">
          <Plus className="w-4 h-4" /> Fotoğraf Ekle
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
            {/* Preview */}
            <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
              {item.src ? (
                <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">Önizleme</div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                value={item.src}
                onChange={(e) => updateItem(i, 'src', e.target.value)}
                placeholder="Görsel URL'si"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={item.title}
                  onChange={(e) => updateItem(i, 'title', e.target.value)}
                  placeholder="Başlık"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                />
                <input
                  value={item.location}
                  onChange={(e) => updateItem(i, 'location', e.target.value)}
                  placeholder="Konum (örn: Kadıköy, İstanbul)"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <button onClick={() => removeItem(item.id, i)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors self-start">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-sm text-gray-400">
            Henüz fotoğraf eklenmemiş. "Fotoğraf Ekle" butonuna tıklayın.
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
