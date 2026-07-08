import { Phone, Mail, MapPin } from 'lucide-react';
import { SITE } from '@/config/site';
import { scrollToSection } from '@/utils/scrollTo';

interface Props {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export default function Footer({ onPrivacyClick, onTermsClick }: Props) {
  const brandParts = [SITE.brandName.slice(0, Math.ceil(SITE.brandName.length / 2)), SITE.brandName.slice(Math.ceil(SITE.brandName.length / 2))];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer */}
        <div className="py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="13" x2="21" y2="13" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">
                {brandParts[0]}<span className="text-brand-400">{brandParts[1]}</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-5">
              {SITE.footer.description}
            </p>
            <div className="space-y-2">
              <a href={`tel:${SITE.phone.raw}`} className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-400" />
                {SITE.phone.display}
              </a>
              <a href={`mailto:${SITE.email.primary}`} className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-400" />
                {SITE.email.primary}
              </a>
              <span className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                {SITE.address.district}, {SITE.address.city}
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Ürünlerimiz</h4>
            <ul className="space-y-2.5">
              {SITE.footer.products.map((item) => (
                <li key={item}>
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Hizmetler</h4>
            <ul className="space-y-2.5">
              {SITE.footer.services.map((item) => (
                <li key={item}>
                  <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Ana Sayfa', href: '#hero' },
                { label: 'Ürünler', href: '#services' },
                { label: 'Fiyat Hesapla', href: '#calculator' },
                { label: 'Galeri', href: '#gallery' },
                { label: 'Hakkımızda', href: '#about' },
                { label: 'İletişim', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {new Date().getFullYear()} {SITE.brandName}. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <button onClick={onPrivacyClick} className="hover:text-white transition-colors">Gizlilik Politikası</button>
            <button onClick={onTermsClick} className="hover:text-white transition-colors">Kullanım Koşulları</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
