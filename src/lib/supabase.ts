import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasConfig = supabaseUrl && supabaseAnonKey;

if (!hasConfig) {
  console.warn(
    '[Supabase] VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY tanımlanmamış. ' +
    'Admin paneline erişmek için .env.local dosyası oluşturun. ' +
    'Public site sorunsuz çalışır.'
  );
}

export const supabase = hasConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as ReturnType<typeof createClient>);
