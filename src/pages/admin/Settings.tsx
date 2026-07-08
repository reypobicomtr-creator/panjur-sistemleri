import { useEffect, useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { getSiteConfig, updateSiteConfig } from '@/lib/db';
import type { SiteConfigData } from '@/lib/config';
import { DEFAULT_SITE_CONFIG } from '@/lib/config';

export default function Settings() {
  const [form, setForm] = useState<SiteConfigData>(DEFAULT_SITE_CONFIG);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    getSiteConfig().then((data) => {
      if (!data || Object.keys(data).length === 0) return;

      // old flat format detected (e.g. phone was a string) → use defaults
      if (typeof data.phone === 'string' || typeof data.email === 'string') {
        return; // stay on DEFAULT_SITE_CONFIG
      }

      setForm((prev) => ({ ...prev, ...data }));
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

  const update = <T,>(path: string[], value: T) => {
    setForm((prev) => {
      const clone = structuredClone(prev);
      let obj: Record<string, unknown> = clone as unknown as Record<string, unknown>;
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]] as Record<string, unknown>;
      }
      obj[path[path.length - 1]] = value;
      return clone;
    });
  };

  const sections = [
    {
      title: 'Firma Bilgileri',
      fields: [
        { path: ['brandName'], label: 'Firma Adı', type: 'text' as const },
        { path: ['tagline'], label: 'Slogan', type: 'text' as const },
        { path: ['domain'], label: 'Alan Adı', type: 'text' as const },
      ],
    },
    {
      title: 'İletişim',
      fields: [
        { path: ['phone', 'display'], label: 'Telefon (Görünen)', type: 'text' as const },
        { path: ['phone', 'raw'], label: 'Telefon (Uluslararası)', type: 'text' as const },
        { path: ['phone', 'secondary'], label: 'İkinci Telefon', type: 'text' as const },
        { path: ['email', 'primary'], label: 'E-posta', type: 'text' as const },
        { path: ['email', 'secondary'], label: 'İkinci E-posta', type: 'text' as const },
      ],
    },
    {
      title: 'Adres',
      fields: [
        { path: ['address', 'full'], label: 'Tam Adres', type: 'textarea' as const },
        { path: ['address', 'street'], label: 'Cadde/Sokak', type: 'text' as const },
        { path: ['address', 'district'], label: 'İlçe', type: 'text' as const },
        { path: ['address', 'city'], label: 'İl', type: 'text' as const },
      ],
    },
    {
      title: 'Çalışma Saatleri & WhatsApp',
      fields: [
        { path: ['workingHours', 'days'], label: 'Çalışma Günleri', type: 'text' as const },
        { path: ['workingHours', 'hours'], label: 'Çalışma Saatleri', type: 'text' as const },
        { path: ['whatsapp', 'number'], label: 'WhatsApp No', type: 'text' as const },
        { path: ['whatsapp', 'message'], label: 'WhatsApp Mesajı', type: 'text' as const },
      ],
    },
    {
      title: 'SEO',
      fields: [
        { path: ['seo', 'title'], label: 'SEO Başlık', type: 'text' as const },
        { path: ['seo', 'description'], label: 'SEO Açıklama', type: 'textarea' as const },
        { path: ['seo', 'keywords'], label: 'Anahtar Kelimeler', type: 'text' as const },
      ],
    },
    {
      title: 'Hakkımızda',
      fields: [
        { path: ['about', 'foundedYear'], label: 'Kuruluş Yılı', type: 'number' as const },
      ],
    },
  ];

  const getVal = (path: string[]) => {
    let val: unknown = form as unknown as Record<string, unknown>;
    for (const key of path) {
      if (val && typeof val === 'object') val = (val as Record<string, unknown>)[key];
      else return '';
    }
    return val ?? '';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Ayarları</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{s.title}</h2>
            <div className="space-y-4">
              {s.fields.map((f) => (
                <div key={f.path.join('.')}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={getVal(f.path) as string}
                      onChange={(e) => update(f.path, e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none"
                    />
                  ) : (
                    <input
                      type={f.type}
                      value={getVal(f.path) as string | number}
                      onChange={(e) => update(f.path, f.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {message && (
          <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            {message.text}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-semibold rounded-xl transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </div>
  );
}
