import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchFullConfig, type FullConfig, DEFAULT_SITE_CONFIG, DEFAULT_PRODUCTS, DEFAULT_PRICING_CONFIG } from '@/lib/config';

interface SiteConfigContextType {
  config: FullConfig;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

const SiteConfigContext = createContext<SiteConfigContextType | null>(null);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<FullConfig>({
    site: DEFAULT_SITE_CONFIG,
    products: DEFAULT_PRODUCTS,
    pricing: DEFAULT_PRICING_CONFIG,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFullConfig();
      setConfig(result);
    } catch (e) {
      setError('Config yüklenemedi, varsayılan değerler kullanılıyor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, loading, error, reload: load }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error('useSiteConfig must be used within SiteConfigProvider');
  return ctx;
}
