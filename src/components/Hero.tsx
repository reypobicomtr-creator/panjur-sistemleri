import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { scrollToSection } from '@/utils/scrollTo';

const HERO_IMG = 'https://images.pexels.com/photos/28337819/pexels-photo-28337819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600';

export default function Hero() {
  const { config } = useSiteConfig();
  const { site } = config;
  const { hero } = site;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt={`${site.brandName} modern panjur uygulaması`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/75 to-brand-950/50" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-warm-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32 lg:py-0 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-sm text-warm-200 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" />
            {hero.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight animate-fade-in-up animation-delay-200">
            <span className="text-warm-300">{site.brandName}</span> ile {hero.title}
            <span className="block text-warm-300 mt-1">{hero.titleAccent}</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl animate-fade-in-up animation-delay-400">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
            <a
              href="#calculator"
              onClick={(e) => scrollToSection(e, 'calculator')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-brand-500/30 group"
            >
              {hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all"
            >
              {hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 animate-fade-in-up animation-delay-600">
            {hero.perks.map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-green-400/80" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
