import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, Star, AlertCircle } from 'lucide-react';
import { getReviews, upsertReview, deleteReview, type Review } from '@/lib/db';

const COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'];

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    getReviews().then(setReviews);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      for (const r of reviews) {
        await upsertReview(r);
      }
      setMessage({ type: 'success', text: 'Yorumlar kaydedildi.' });
    } catch {
      setMessage({ type: 'error', text: 'Kaydedilirken hata oluştu.' });
    }
    setSaving(false);
  };

  const update = (index: number, field: keyof Review, value: string | number) => {
    setReviews((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const add = () => {
    setReviews((prev) => [...prev, { name: '', role: '', text: '', rating: 5, initials: '', color: COLORS[prev.length % COLORS.length], sort_order: prev.length }]);
  };

  const remove = async (id: number | undefined, index: number) => {
    if (id) await deleteReview(id);
    setReviews((prev) => prev.filter((_, i) => i !== index));
  };

  const generateInitials = (name: string) => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Müşteri Yorumları</h1>
        <button onClick={add} className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-50 text-brand-700 text-sm font-semibold rounded-xl hover:bg-brand-100 transition-colors">
          <Plus className="w-4 h-4" /> Yorum Ekle
        </button>
      </div>

      <div className="space-y-3">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Ad Soyad</label>
                <input
                  value={review.name}
                  onChange={(e) => {
                    update(i, 'name', e.target.value);
                    update(i, 'initials', generateInitials(e.target.value));
                  }}
                  placeholder="Ahmet Yılmaz"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Lokasyon / Rol</label>
                <input
                  value={review.role}
                  onChange={(e) => update(i, 'role', e.target.value)}
                  placeholder="Kadıköy, İstanbul"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs text-gray-500 mb-1">Yorum</label>
              <textarea
                value={review.text}
                onChange={(e) => update(i, 'text', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 resize-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => update(i, 'rating', s)}>
                    <Star className={`w-4 h-4 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Renk:</span>
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => update(i, 'color', c)}
                    className={`w-5 h-5 rounded-full border-2 ${c} ${review.color === c ? 'border-gray-900' : 'border-transparent'}`}
                  />
                ))}
              </div>
              <button onClick={() => remove(review.id, i)} className="ml-auto p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-sm text-gray-400">
            Henüz yorum eklenmemiş. "Yorum Ekle" butonuna tıklayın.
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
