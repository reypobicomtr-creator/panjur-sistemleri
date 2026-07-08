import { useState, useEffect } from 'react';
import { Menu, X, Phone, Shield } from 'lucide-react';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { scrollToSection } from '@/utils/scrollTo';

export default function Header() {
  const { config } = useSiteConfig();
  const { site } = config;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ana Sayfa', section: 'hero' },
    { label: 'Ürünler', section: 'services' },
    { label: 'Fiyat Hesapla', section: 'calculator' },
    { label: 'Galeri', section: 'gallery' },
    { label: 'Hakkımızda', section: 'about' },
    { label: 'İletişim', section: 'contact' },
  ];

  const brandStart = site.brandName.slice(0, Math.ceil(site.brandName.length / 2));
  const brandEnd = site.brandName.slice(Math.ceil(site.brandName.length / 2));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className={`transition-all duration-300 overflow-hidden ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
        <div className="bg-brand-900 text-white/90 text-xs py-1.5">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              {site.phone.display}
            </span>
            <span className="hidden sm:block">Ücretsiz keşif ve ölçü hizmeti</span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3" />
              {site.hero.perks[1]}
            </span>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="flex items-center gap-2 group">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${scrolled ? 'bg-brand-600' : 'bg-white/20 backdrop-blur-sm'}`}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="13" x2="21" y2="13" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </div>
            <div>
              <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? 'text-brand-900' : 'text-white'}`}>
                {brandStart}<span className={`${scrolled ? 'text-brand-500' : 'text-warm-300'}`}>{brandEnd}</span>
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.section}
                href={`#${link.section}`}
                onClick={(e) => scrollToSection(e, link.section)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#calculator"
              onClick={(e) => scrollToSection(e, 'calculator')}
              className="ml-3 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-brand-600/25"
            >
              Teklif Al
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 shadow-xl px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.section}
              href={`#${link.section}`}
              onClick={(e) => { scrollToSection(e, link.section); setIsOpen(false); }}
              className="block px-4 py-2.5 text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#calculator"
            onClick={(e) => { scrollToSection(e, 'calculator'); setIsOpen(false); }}
            className="block text-center mt-2 px-5 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold"
          >
            Teklif Al
          </a>
        </div>
      </div>
    </header>
  );
}
