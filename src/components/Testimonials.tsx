import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Ahmet Yılmaz',
    role: 'Kadıköy, İstanbul',
    text: 'Alüminyum panjur montajı yaptırdık. Ölçü alma aşamasından montaja kadar çok profesyonel bir hizmet aldık. Kesinlikle tavsiye ediyorum.',
    rating: 5,
    initials: 'AY',
    color: 'bg-blue-500',
  },
  {
    name: 'Fatma Demir',
    role: 'Çankaya, Ankara',
    text: 'Motorlu panjur sistemi taktırdık. Uzaktan kumanda ile kullanım çok pratik. Fiyat da beklediğimizden uygundu. Teşekkürler PanjurMax!',
    rating: 5,
    initials: 'FD',
    color: 'bg-emerald-500',
  },
  {
    name: 'Mehmet Kaya',
    role: 'Bornova, İzmir',
    text: 'Güvenlik panjuru için teklif aldık. Çok hızlı dönüş yaptılar ve aynı hafta içinde montajı tamamladılar. Gayet memnunuz.',
    rating: 5,
    initials: 'MK',
    color: 'bg-amber-500',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-brand-950 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-800/30 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-warm-400/10 rounded-full blur-3xl translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-300 font-semibold text-sm tracking-wider uppercase">
            Müşteri Yorumları
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-white">
            Müşterilerimiz <span className="text-warm-300">Ne Diyor?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <Quote className="w-8 h-8 text-brand-400/30 mb-4" />
              <p className="text-white/80 text-sm leading-relaxed mb-6">{review.text}</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-warm-400 fill-warm-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                  {review.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{review.name}</div>
                  <div className="text-white/40 text-xs">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
