import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SITE } from '@/config/site';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_FORM: FormData = { name: '', phone: '', email: '', message: '' };

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('submitting');

    try {
      const res = await fetch(SITE.contact.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Formspree error');

      setSubmitState('success');
      setFormData(INITIAL_FORM);
    } catch {
      setSubmitState('error');
    }
  };

  const contactItems = [
    {
      icon: MapPin,
      title: 'Adres',
      lines: SITE.address.full.split(', '),
    },
    {
      icon: Phone,
      title: 'Telefon',
      lines: [SITE.phone.display, SITE.phone.secondary],
    },
    {
      icon: Mail,
      title: 'E-posta',
      lines: [SITE.email.primary, SITE.email.secondary],
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      lines: [SITE.workingHours.days, SITE.workingHours.hours],
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-600 font-semibold text-sm tracking-wider uppercase">
            İletişim
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Bize <span className="text-brand-600">Ulaşın</span>
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Ücretsiz keşif randevusu almak veya sorularınız için bize ulaşın.
            En kısa sürede size dönüş yapacağız.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-11 h-11 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-sm text-gray-500">{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{SITE.contact.formHeading}</h3>
              <p className="text-sm text-gray-500 mb-6">{SITE.contact.formSubtext}</p>

              {submitState === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Mesajınız Alındı!</h4>
                  <p className="text-sm text-gray-500 mt-2">En kısa sürede sizinle iletişime geçeceğiz.</p>
                  <button
                    onClick={() => setSubmitState('idle')}
                    className="mt-6 text-sm text-brand-600 hover:text-brand-700 font-medium underline underline-offset-2"
                  >
                    Yeni mesaj gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ad Soyad <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Adınız Soyadınız"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Telefon <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="05XX XXX XX XX"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      E-posta
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="ornek@email.com"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Mesajınız
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Panjur ihtiyacınızı kısaca açıklayın..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
                    />
                  </div>

                  {submitState === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
                  >
                    {submitState === 'submitting' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                          <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
                        </svg>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Gönder
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    Bilgileriniz yalnızca size dönüş yapmak için kullanılır, üçüncü taraflarla paylaşılmaz.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
