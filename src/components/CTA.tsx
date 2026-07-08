import { ArrowRight, Phone } from 'lucide-react';
import { SITE } from '@/config/site';
import { scrollToSection } from '@/utils/scrollTo';

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              Evinize En Uygun Panjuru Birlikte Seçelim
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Ücretsiz keşif hizmetimizle evinize gelip ölçü alıyorız, 
              ihtiyacınıza en uygun panjur sistemini birlikte belirliyoruz. 
              Hemen arayın, aynı gün randevu oluşturalım.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${SITE.phone.raw}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {SITE.phone.display}
              </a>
              <a
                href="#calculator"
                onClick={(e) => scrollToSection(e, 'calculator')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl border border-white/20 transition-all group"
              >
                Online Fiyat Hesapla
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
