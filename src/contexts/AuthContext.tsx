import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

const isSupabaseEnabled = !!supabase;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  enabled: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseEnabled) {
      setLoading(false);
      return;
    }

    supabase!.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    if (!isSupabaseEnabled) return 'Supabase bağlantısı yapılandırılmamış.';
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  };

  const logout = async () => {
    if (!isSupabaseEnabled) return;
    await supabase!.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, enabled: isSupabaseEnabled, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
