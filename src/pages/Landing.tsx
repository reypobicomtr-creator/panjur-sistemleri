import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Menu, X, ExternalLink, Zap, Settings, Smartphone, Search, BarChart3, MessageSquare } from 'lucide-react';

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.15) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('revealed');
        });
      },
      { threshold }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [threshold]);
}

/* ── FAQ data ── */
const FAQS = [
  { q: 'Siteyi kendim güncelleyebilecek miyim?', a: 'Evet. Admin paneli sayesinde ürün fiyatlarını, galeriyi, müşteri yorumlarını ve tüm site içeriğini kendiniz kolayca güncelleyebilirsiniz. Hiç kod bilgisi gerekmez.' },
  { q: 'Fiyat hesaplama robotu nasıl çalışıyor?', a: 'Müşterileriniz pencere ölçülerini, panjur tipini ve ek seçenekleri seçerek anında fiyat alabilir. Siz admin panelden tüm fiyatları ve indirim kademelerini kendiniz belirlersiniz.' },
  { q: 'Siteme müşteri yorumları eklenebilecek mi?', a: 'Evet. Admin panelden yorumları ekleyip düzenleyebilirsiniz. Yıldızlı puanlama ve müşteri fotoğrafları desteği var.' },
  { q: 'Mobil uyumlu mu?', a: 'Tüm sayfalar mobil, tablet ve masaüstünde kusursuz görünecek şekilde tasarlandı. Müşterileriniz telefondan bile rahatça fiyat hesaplayabilir.' },
  { q: 'Kurulum ne kadar sürüyor?', a: 'İçerikleriniz hazırsa 1-2 iş günü içinde siteniz yayında olur. Alan adı ve hosting işlemleriyle biz ilgileniyoruz.' },
  { q: 'SEO çalışması dahil mi?', a: 'Evet. Google aramalarında üst sıralarda çıkmak için teknik SEO (meta etiketleri, site haritası, hız optimizasyonu) siteye önceden entegre edilmiştir.' },
  { q: 'WhatsApp entegrasyonu nasıl çalışıyor?', a: 'Sitedeki WhatsApp butonuna tıklayan müşterileriniz doğrudan size yönlendirilir. Otomatik hoş geldin mesajı özelleştirilebilir.' },
  { q: 'İptal/iade politikası nedir?', a: 'Site yayına alınana kadar herhangi bir sebep göstermeksizin iptal edebilir, tam iade alabilirsiniz. Yayın sonrası aylık abonelik bazlı çalışır.' },
];

/* ── Pricing data ── */
const PLANS = [
  {
    name: 'Temel',
    price: '4.999',
    period: 'tek seferlik + aylık 299 ₺',
    desc: 'Bireysel panjur ustaları için ideal',
    features: [
      'Tek sayfa web sitesi',
      'Fiyat hesaplama robotu',
      'WhatsApp entegrasyonu',
      'İletişim formu',
      'Mobil uyumlu tasarım',
      'SSL + hosting 1 yıl',
    ],
    cta: 'Başlayın',
    featured: false,
  },
  {
    name: 'Profesyonel',
    price: '9.999',
    period: 'tek seferlik + aylık 499 ₺',
    desc: 'Büyüyen panjur firmaları için',
    features: [
      'Çok sayfalı kurumsal site',
      'Fiyat hesaplama robotu',
      'Admin paneli (tüm yönetim)',
      'Ürün & galeri yönetimi',
      'Müşteri yorumları',
      'SEO optimizasyonu',
      'WhatsApp + iletişim entegrasyonu',
      'SSL + hosting 1 yıl',
    ],
    cta: 'Başlayın',
    featured: true,
  },
  {
    name: 'Premium',
    price: '14.999',
    period: 'tek seferlik + aylık 799 ₺',
    desc: 'Çok şubeli büyük işletmeler için',
    features: [
      'Profesyonel paketteki her şey',
      'Çoklu dil desteği',
      'Özel tasarım & markalaşma',
      'Gelişmiş SEO danışmanlığı',
      'Google Ads & Meta reklam kurulumu',
      'Performans raporları',
      '7/24 öncelikli destek',
      'SSL + hosting 1 yıl',
    ],
    cta: 'İletişime Geç',
    featured: false,
  },
];

export default function Landing() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState(false);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(false);
    try {
      if (supabase) {
        const { error } = await supabase.from('contacts').insert({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: 'Site tanıtım talebi',
        });
        if (error) throw error;
      }
      setFormSent(true);
    } catch {
      setFormError(true);
    }
  };

  const scrollTo = (id: string) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-900 antialiased bg-white overflow-x-hidden">
      {/* ── Navigation ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-bold">P</div>
            <span className={`font-bold text-base ${scrolled ? 'text-gray-900' : 'text-white'}`}>Panjur<span className="text-brand-400">Max</span></span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {[
              { label: 'Özellikler', href: 'ozellikler' },
              { label: 'Nasıl Çalışır', href: 'nasil-calisir' },
              { label: 'Paketler', href: 'paketler' },
              { label: 'SSS', href: 'sss' },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`font-medium hover:text-brand-600 transition-colors ${scrolled ? 'text-gray-700' : 'text-white/80 hover:text-white'}`}
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo('teklif')} className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-brand-600/25">
              Teklif Al
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2">
            {navOpen ? <X className={`w-5 h-5 ${scrolled ? 'text-gray-900' : 'text-white'}`} /> : <Menu className={`w-5 h-5 ${scrolled ? 'text-gray-900' : 'text-white'}`} />}
          </button>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {[
                { label: 'Özellikler', href: 'ozellikler' },
                { label: 'Nasıl Çalışır', href: 'nasil-calisir' },
                { label: 'Paketler', href: 'paketler' },
                { label: 'SSS', href: 'sss' },
              ].map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="block w-full text-left py-2 text-gray-700 font-medium">
                  {link.label}
                </button>
              ))}
              <button onClick={() => scrollTo('teklif')} className="w-full py-2.5 bg-brand-600 text-white font-semibold rounded-xl text-sm">
                Teklif Al
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex items-center bg-[#0c1424] overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/60 via-[#0c1424] to-slate-950" />
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-warm-500/8 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 md:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-300 text-sm font-medium mb-6 reveal">
              <Zap className="w-3.5 h-3.5" />
              30+ panjur firması tercih ediyor
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight reveal">
              Panjur Firmanız İçin
              <br />
              <span className="text-warm-300">Hazır Web Sitesi</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl reveal">
              Dakikalar içinde yayına alın. Fiyat hesaplama robotu, admin paneli, 
              galeri ve WhatsApp entegrasyonuyla eksiksiz bir web sitesine sahip olun. 
              Kod bilmenize gerek yok.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 reveal">
              <button onClick={() => scrollTo('teklif')} className="px-7 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg hover:shadow-brand-600/30">
                Hemen Başlayın
              </button>
              <button onClick={() => scrollTo('ozellikler')} className="px-7 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl text-base border border-white/10 transition-all">
                Özellikleri İncele
              </button>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg reveal">
            {[
              { value: '30+', label: 'Aktif Müşteri' },
              { value: '%98', label: 'Memnuniyet Oranı' },
              { value: '7/24', label: 'Teknik Destek' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature: Admin panel preview ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="text-brand-600 font-semibold text-sm tracking-wider uppercase">Güçlü Yönetim</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Her Şeyi Kontrol Et
                <br />
                <span className="text-brand-600">Tek Panelden Yönet</span>
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Admin paneli sayesinde ürün fiyatlarını güncelle, galeriye fotoğraf ekle, 
                müşteri yorumlarını düzenle ve iletişim formundan gelen mesajları görüntüle. 
                Tüm site içeriği parmaklarınızın ucunda.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Ürün fiyatlarını anında güncelle',
                  'Müşteri mesajlarını oku ve yanıtla',
                  'Galeri ve yorumları yönet',
                  'Site ayarlarını özelleştir',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal relative">
              <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-100">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-gray-500 font-medium">Admin Paneli — Fiyat Yönetimi</span>
                </div>
                <div className="p-5 bg-white space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-sm font-semibold text-gray-900">Ürünler</span>
                    <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">4 ürün</span>
                  </div>
                  {[
                    { name: 'Alüminyum Panjur', price: '2.250 ₺/m²' },
                    { name: 'PVC Panjur', price: '1.650 ₺/m²' },
                    { name: 'Motorlu Panjur', price: '2.750 ₺/m²' },
                    { name: 'Güvenlik Panjuru', price: '3.450 ₺/m²' },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center justify-between py-1.5">
                      <span className="text-sm text-gray-700">{p.name}</span>
                      <span className="text-sm font-semibold text-gray-900">{p.price}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-brand-600 font-medium">
                      <span className="inline-block w-3 h-3 rounded-full bg-brand-500" />
                      Fiyatları düzenlemek için tıkla
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section id="ozellikler" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Sitenizde Olması Gereken Her Şey
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Panjur firmaları için özel olarak tasarlanmış eksiksiz web sitesi çözümü.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Fiyat Hesaplama Robotu', desc: 'Müşterileriniz ölçüleri girip anında fiyat alır. Siz tüm fiyatları admin panelden belirlersiniz.' },
              { icon: Settings, title: 'Admin Paneli', desc: 'Ürünler, galeri, yorumlar, mesajlar — hepsi tek yerden yönetilir. Kod bilgisi gerekmez.' },
              { icon: Smartphone, title: 'Mobil Uyumlu Tasarım', desc: 'Tüm cihazlarda kusursuz görünen responsive tasarım. Müşterileriniz telefondan rahatça gezinir.' },
              { icon: Search, title: 'SEO Optimizasyonu', desc: 'Google dostu altyapı. Meta etiketleri, site haritası ve hız optimizasyonu hazır gelir.' },
              { icon: BarChart3, title: 'Galeri & Referanslar', desc: 'İşlerinizi sergileyin. Öncesi-sonrası fotoğrafları, müşteri yorumları ve puanlama.' },
              { icon: MessageSquare, title: 'WhatsApp & İletişim', desc: 'Tek tıkla WhatsApp görüşmesi. Otomatik mesaj ve iletişim formu entegrasyonu.' },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all reveal hover:shadow-md">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="nasil-calisir" className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              3 Adımda Siteniz Yayında
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Hiçbir teknik bilgi gerektirmez. Adımları tamamlayın, siteniz yayına hazır.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Paket Seçin', desc: 'İhtiyacınıza en uygun paketi seçin. Temel, Profesyonel veya Premium — her bütçeye uygun seçenek.' },
              { step: '02', title: 'Bilgilerinizi Verin', desc: 'Firma bilgilerinizi, iletişim detaylarınızı ve ürün fiyatlarınızı bizimle paylaşın. İsterseniz siz de sonra admin panelden girersiniz.' },
              { step: '03', title: 'Yayına Alalım', desc: 'Siteyi kurup tasarlıyor, alan adınızı bağlıyor ve yayına alıyoruz. Sonrası tamamen size kalmış.' },
            ].map((s, i) => (
              <div key={i} className="text-center reveal">
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl font-bold text-brand-600">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing preview (calculator teaser) ── */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal order-2 lg:order-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                    <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-brand-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Fiyat Asistanı</div>
                      <div className="text-xs text-gray-400">Hemen fiyat hesapla</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-700 font-medium">🪟 PVC Panjur</span>
                    <span className="text-gray-300">→</span>
                    <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-700 font-medium">📐 120 × 150 cm</span>
                  </div>
                  <div className="bg-gradient-to-r from-brand-50 to-white rounded-xl p-4 border border-brand-100">
                    <div className="text-xs text-gray-500 mb-1">Tahmini Fiyat</div>
                    <div className="text-2xl font-bold text-brand-700">4.280 ₺</div>
                    <div className="text-xs text-gray-400 mt-1">KDV dahil, montajlı fiyat</div>
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    Müşterileriniz 30 saniyede kendi fiyatını hesaplasın
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal order-1 lg:order-2">
              <span className="text-brand-600 font-semibold text-sm tracking-wider uppercase">Dönüşüm Aracı</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Müşterileriniz Anında
                <br />
                <span className="text-brand-600">Fiyat Alsın</span>
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Sizi aramadan, form doldurmadan kendi fiyatlarını görsünler. 
                Fiyat hesaplama robotu sayesinde potansiyel müşterileriniz 7/24 
                anlık fiyat alabilir. Bu da size daha fazla dönüşüm demek.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Pencere ölçüsüne göre anlık fiyat',
                  'Kasa tipi, renk ve motor seçeneği',
                  'Otomatik indirim kademeleri',
                  'KDV dahil toplam fiyat gösterimi',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing plans ── */}
      <section id="paketler" className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Size Uygun Paketi Seçin
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Tek seferlik kurulum bedeli, aylık düşük bakım ücreti. İstediğiniz zaman iptal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 border transition-all reveal ${
                  plan.featured
                    ? 'bg-gray-900 text-white border-gray-900 shadow-2xl scale-105 md:scale-110'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.featured && (
                  <div className="inline-block px-3 py-1 bg-brand-500 text-white text-xs font-semibold rounded-full mb-4">
                    En Popüler
                  </div>
                )}
                <h3 className={`text-xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className={`text-sm mt-1 ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>{plan.desc}</p>
                <div className="mt-5">
                  <span className={`text-3xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>{plan.price} ₺</span>
                  <span className={`text-sm ml-1 ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? 'text-brand-400' : 'text-brand-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo('teklif')}
                  className={`mt-8 w-full py-2.5 font-semibold rounded-xl text-sm transition-all ${
                    plan.featured
                      ? 'bg-brand-600 hover:bg-brand-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="sss" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Sıkça Sorulan Sorular
            </h2>
          </div>

          <div className="space-y-3 reveal">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium text-gray-900 text-sm sm:text-base">{faq.q}</span>
                  <span className={`text-gray-400 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="teklif" className="py-24 lg:py-32 bg-[#0c1424] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Hazır mısınız?
                <br />
                <span className="text-brand-400">Hemen Başlayın</span>
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Formu doldurun, en kısa sürede sizi arayalım. Size özel teklifimizi hazırlayalım.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Ücretsiz demo gösterimi',
                  'Size özel fiyat teklifi',
                  '30 gün garantili memnuniyet',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
                {formSent ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Mesajınız Alındı!</h3>
                    <p className="text-sm text-gray-500 mt-2">En kısa sürede size dönüş yapacağız.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad <span className="text-red-400">*</span></label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Adınız Soyadınız" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon <span className="text-red-400">*</span></label>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="05XX XXX XX XX" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ornek@email.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
                    </div>

                    {formError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                        Gönderilirken hata oluştu. Lütfen tekrar deneyin.
                      </div>
                    )}

                    <button type="submit" className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25">
                      Teklif Al
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      Bilgileriniz yalnızca size teklif sunmak için kullanılır.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#070d1a] border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xxs font-bold">P</div>
            <span className="text-sm text-gray-500">PanjurMax &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <button onClick={() => scrollTo('ozellikler')} className="hover:text-gray-300 transition-colors">Özellikler</button>
            <button onClick={() => scrollTo('paketler')} className="hover:text-gray-300 transition-colors">Paketler</button>
            <button onClick={() => scrollTo('sss')} className="hover:text-gray-300 transition-colors">SSS</button>
            <a href="/#/" className="hover:text-gray-300 transition-colors">Ana Site</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
