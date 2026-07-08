import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  {
    src: 'https://images.pexels.com/photos/28337819/pexels-photo-28337819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    title: 'Modern Alüminyum Panjur',
    location: 'Kadıköy, İstanbul',
  },
  {
    src: 'https://images.pexels.com/photos/15109194/pexels-photo-15109194.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    title: 'PVC Panjur Uygulaması',
    location: 'Çankaya, Ankara',
  },
  {
    src: 'https://images.pexels.com/photos/1915703/pexels-photo-1915703.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    title: 'Renkli Dış Cephe Panjur',
    location: 'Bornova, İzmir',
  },
  {
    src: 'https://images.pexels.com/photos/18150686/pexels-photo-18150686.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    title: 'İç Mekan Panjur Sistemi',
    location: 'Nilüfer, Bursa',
  },
  {
    src: 'https://images.pexels.com/photos/13005096/pexels-photo-13005096.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    title: 'Beyaz PVC Panjur',
    location: 'Muratpaşa, Antalya',
  },
  {
    src: 'https://images.pexels.com/photos/32494216/pexels-photo-32494216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    title: 'Motorlu Stor Panjur',
    location: 'Karşıyaka, İzmir',
  },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const next = useCallback(() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryItems.length : 0)), []);
  const prev = useCallback(() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : 0)), []);

  // Klavye yön tuşları ile lightbox navigasyonu
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, next, prev]);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-600 font-semibold text-sm tracking-wider uppercase">
            Galeri
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Tamamladığımız <span className="text-brand-600">Projeler</span>
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Türkiye genelinde binlerce eve panjur montajı gerçekleştirdik. 
            İşte projelerimizden bazıları.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {galleryItems.map((item, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                width="800"
                height="600"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                  <h4 className="text-white font-semibold text-sm sm:text-base">{item.title}</h4>
                  <p className="text-white/70 text-xs sm:text-sm">{item.location}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors">
            <X className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 sm:left-6 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 sm:right-6 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].title}
              loading="lazy"
              width="800"
              height="600"
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <h4 className="text-white font-semibold">{galleryItems[lightboxIndex].title}</h4>
              <p className="text-white/50 text-sm">{galleryItems[lightboxIndex].location}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
