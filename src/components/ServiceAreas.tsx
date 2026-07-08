import { MapPin, CheckCircle2 } from 'lucide-react';
import { scrollToSection } from '@/utils/scrollTo';

const regions = [
  {
    region: 'Marmara Bölgesi',
    cities: ['İstanbul (Avrupa)', 'İstanbul (Anadolu)', 'Kocaeli', 'Sakarya', 'Bursa', 'Yalova', 'Tekirdağ'],
  },
  {
    region: 'İç Anadolu Bölgesi',
    cities: ['Ankara (Çankaya)', 'Ankara (Keçiören)', 'Eskişehir', 'Konya', 'Kayseri'],
  },
  {
    region: 'Ege Bölgesi',
    cities: ['İzmir (Bornova)', 'İzmir (Karşıyaka)', 'Manisa', 'Aydın', 'Muğla'],
  },
  {
    region: 'Akdeniz Bölgesi',
    cities: ['Antalya (Muratpaşa)', 'Antalya (Konyaaltı)', 'Mersin', 'Adana', 'Hatay'],
  },
];

const stats = [
  { label: 'İl', value: '81' },
  { label: 'İlçe', value: '450+' },
  { label: 'Tamamlanan Proje', value: '3.200+' },
  { label: 'Ortalama Teslimat', value: '3 Gün' },
];

export default function ServiceAreas() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-600 font-semibold text-sm tracking-wider uppercase">
            Hizmet Bölgeleri
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Türkiye'nin Her Yerinde <span className="text-brand-600">Yanınızdayız</span>
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            İstanbul merkezli olmakla birlikte Türkiye genelinde 81 ilde profesyonel
            panjur montaj ve servis hizmeti sunuyoruz.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-brand-50 rounded-2xl border border-brand-100"
            >
              <div className="text-2xl sm:text-3xl font-bold text-brand-700">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Region grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region) => (
            <div
              key={region.region}
              className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-brand-200 transition-colors shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-brand-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{region.region}</h3>
              </div>
              <ul className="space-y-2">
                {region.cities.map((city) => (
                  <li key={city} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400">
            Diğer iller ve ilçeler için <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-brand-600 hover:text-brand-700 font-medium underline underline-offset-2">iletişime geçin</a>.
            Ücretsiz keşif ve montaj hizmeti tüm Türkiye'de.
          </p>
        </div>
      </div>
    </section>
  );
}
