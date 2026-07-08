import { Award, Users, Clock, Truck } from 'lucide-react';
import { SITE } from '@/config/site';

const iconMap: Record<string, typeof Award> = { Award, Users, Clock, Truck };

export default function About() {
  const { about } = SITE;
  const yearsActive = new Date().getFullYear() - about.foundedYear;

  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3284980/pexels-photo-3284980.png?auto=compress&cs=tinysrgb&fit=crop&h=700&w=800"
                alt={`${SITE.brandName} modern iç mekan panjur uygulaması`}
                loading="lazy"
                width="800"
                height="700"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100 max-w-[200px]">
              <div className="text-3xl font-bold text-brand-600">{yearsActive}+</div>
              <div className="text-sm text-gray-500 mt-1">Yıllık sektör deneyimi</div>
              <div className="mt-3 flex -space-x-2">
                {['bg-brand-400', 'bg-warm-400', 'bg-emerald-400', 'bg-violet-400'].map((c, i) => (
                  <div key={i} className={`w-7 h-7 ${c} rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                    {['AK', 'BY', 'CD', 'EF'][i]}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-1">60+ uzman kadro</div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="text-brand-600 font-semibold text-sm tracking-wider uppercase">
              Hakkımızda
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              {about.headline} <span className="text-brand-600">{about.headlineAccent}</span>
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed">
              {about.foundedYear} yılından bu yana İstanbul başta olmak üzere Türkiye genelinde binlerce eve 
              panjur montajı gerçekleştirdik. Müşteri memnuniyetini her zaman ön planda tutarak, 
              kaliteli malzeme ve uzman işçilikle hizmet veriyoruz.
            </p>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Alüminyum, PVC, motorlu ve güvenlik panjurlarında geniş ürün yelpazemizle 
              her bütçeye ve her ihtiyaca uygun çözümler sunuyoruz. Ücretsiz keşif ve ölçü 
              hizmetimizle doğru ürünü birlikte belirliyoruz.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">
              {about.stats.map((item, i) => {
                const Icon = iconMap[item.icon] || Award;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
