import { useEffect, useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { getSiteConfig, updateSiteConfig } from '@/lib/db';

interface SiteForm {
  brandName: string;
  phone: string;
  phoneRaw: string;
  phoneSecondary: string;
  email: string;
  emailSecondary: string;
  address: string;
  workingDays: string;
  workingHours: string;
  whatsappNumber: string;
  whatsappMessage: string;
  foundedYear: number;
}

const DEFAULTS: SiteForm = {
  brandName: '',
  phone: '',
  phoneRaw: '',
  phoneSecondary: '',
  email: '',
  emailSecondary: '',
  address: '',
  workingDays: 'Pazartesi - Cumartesi',
  workingHours: '08:00 - 19:00',
  whatsappNumber: '',
  whatsappMessage: '',
  foundedYear: 2009,
};

export default function Settings() {
  const [form, setForm] = useState<SiteForm>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    getSiteConfig().then((data) => {
      if (data && Object.keys(data).length > 0) {
        setForm({
          brandName: (data as Record<string, string>).brandName || '',
          phone: (data as Record<string, string>).phone || '',
          phoneRaw: (data as Record<string, string>).phoneRaw || '',
          phoneSecondary: (data as Record<string, string>).phoneSecondary || '',
          email: (data as Record<string, string>).email || '',
          emailSecondary: (data as Record<string, string>).emailSecondary || '',
          address: (data as Record<string, string>).address || '',
          workingDays: (data as Record<string, string>).workingDays || 'Pazartesi - Cumartesi',
          workingHours: (data as Record<string, string>).workingHours || '08:00 - 19:00',
          whatsappNumber: (data as Record<string, string>).whatsappNumber || '',
          whatsappMessage: (data as Record<string, string>).whatsappMessage || '',
          foundedYear: Number((data as Record<string, number>).foundedYear) || 2009,
        });
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await updateSiteConfig(form as unknown as Record<string, unknown>);
      setMessage({ type: 'success', text: 'Ayarlar kaydedildi.' });
    } catch {
      setMessage({ type: 'error', text: 'Kaydedilirken hata oluştu.' });
    }
    setSaving(false);
  };

  const fields = [
    { key: 'brandName', label: 'Firma Adı', placeholder: 'PanjurMax' },
    { key: 'phone', label: 'Telefon (Görünen)', placeholder: '0532 123 45 67' },
    { key: 'phoneRaw', label: 'Telefon (Uluslararası)', placeholder: '+905321234567' },
    { key: 'phoneSecondary', label: 'İkinci Telefon', placeholder: '0216 987 65 43' },
    { key: 'email', label: 'E-posta', placeholder: 'info@panjurmax.com' },
    { key: 'emailSecondary', label: 'İkinci E-posta', placeholder: 'teklif@panjurmax.com' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Ayarları</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                value={(form as Record<string, string>)[f.key] ?? ''}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={2}
              placeholder="Organize Sanayi Bölgesi, 2. Cadde No: 45, Ümraniye, İstanbul"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Çalışma Günleri</label>
              <input
                value={form.workingDays}
                onChange={(e) => setForm({ ...form, workingDays: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Çalışma Saatleri</label>
              <input
                value={form.workingHours}
                onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Numarası</label>
              <input
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                placeholder="905321234567"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kuruluş Yılı</label>
              <input
                type="number"
                value={form.foundedYear}
                onChange={(e) => setForm({ ...form, foundedYear: parseInt(e.target.value) || 2009 })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Mesajı</label>
            <input
              value={form.whatsappMessage}
              onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
              placeholder="Merhaba, panjur hizmeti hakkında bilgi almak istiyorum."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
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
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-semibold rounded-xl transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </div>
  );
}
