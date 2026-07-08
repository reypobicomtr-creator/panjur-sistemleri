import { Shield, Sun, Volume2, Paintbrush, Zap, Wrench } from 'lucide-react';
import { scrollToSection } from '@/utils/scrollTo';

const products = [
  {
    title: 'Alüminyum Panjur',
    desc: 'Dayanıklı ve hafif yapısıyla en çok tercih edilen panjur tipi. Rüzgâra ve dış etkilere karşı üstün performans.',
    img: 'https://images.pexels.com/photos/15109194/pexels-photo-15109194.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    tag: 'En Popüler',
    features: ['Hafif & dayanıklı', 'Pas tutmaz', '12 renk seçeneği'],
  },
  {
    title: 'PVC Panjur',
    desc: 'Isı yalıtımında en iyi performansı sunan, ekonomik ve bakım gerektirmeyen panjur çözümü.',
    img: 'https://images.pexels.com/photos/13005096/pexels-photo-13005096.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    tag: 'Ekonomik',
    features: ['Isı yalıtımı', 'Ses izolasyonu', 'Kolay temizlik'],
  },
  {
    title: 'Motorlu Panjur',
    desc: 'Uzaktan kumanda ile kontrol edin. Akıllı ev sistemleriyle entegre edilebilen modern panjur teknolojisi.',
    img: 'https://images.pexels.com/photos/32494216/pexels-photo-32494216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    tag: 'Akıllı',
    features: ['Uzaktan kumanda', 'Zamanlayıcı', 'Akıllı ev entegre'],
  },
  {
    title: 'Güvenlik Panjuru',
    desc: 'Çelik takviyeli yapısı ile hırsızlığa karşı maksimum koruma sağlayan güçlendirilmiş panjur sistemi.',
    img: 'https://images.pexels.com/photos/19073602/pexels-photo-19073602.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    tag: 'Güvenli',
    features: ['Çelik takviye', 'Kilitli sistem', 'Darbe dayanımı'],
  },
];

const features = [
  { icon: Shield, title: 'Güvenlik', desc: 'Çelik takviyeli panjurlarla evinizi koruyun' },
  { icon: Sun, title: 'Isı Yalıtımı', desc: 'Enerji tasarrufu sağlayan yalıtım' },
  { icon: Volume2, title: 'Ses İzolasyonu', desc: 'Dış gürültüyü minimuma indirin' },
  { icon: Paintbrush, title: 'Estetik', desc: 'Evinizin stiline uygun renk seçenekleri' },
  { icon: Zap, title: 'Motorlu Sistem', desc: 'Tek tuşla kumanda edin' },
  { icon: Wrench, title: 'Kolay Bakım', desc: 'Uzun ömürlü, bakım gerektirmez' },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-600 font-semibold text-sm tracking-wider uppercase">
            Ürünlerimiz
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            İhtiyacınıza Uygun <span className="text-brand-600">Panjur Çeşitleri</span>
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Her eve, her bütçeye ve her ihtiyaca uygun panjur sistemleri sunuyoruz. 
            Ücretsiz keşif hizmetimizle size en uygun çözümü birlikte belirleyelim.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {products.map((product, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.title}
                  loading="lazy"
                  width="600"
                  height="400"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full">
                    {product.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{product.desc}</p>
                <ul className="space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-brand-500 rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#calculator"
                  onClick={(e) => scrollToSection(e, 'calculator')}
                  className="mt-5 block text-center py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm font-semibold rounded-xl transition-colors"
                >
                  Fiyat Hesapla
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-4 p-5 sm:p-6 bg-white rounded-xl border border-gray-100 hover:border-brand-200 transition-colors"
              >
                <div className="w-11 h-11 shrink-0 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{feature.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
