import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL || '';
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!url || !anonKey) {
  // Soft warn — pages show a clear error when calling the API.
  // eslint-disable-next-line no-console
  console.warn(
    '[javion] Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY. Copy frontend/.env.example to .env.local'
  );
}

export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const PRODUCT_IMAGES_BUCKET = 'product-images';

export function assertSupabaseConfigured() {
  if (!url || !anonKey || url.includes('placeholder')) {
    const err = new Error(
      'Supabase is not configured. Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to frontend/.env.local'
    );
    err.status = 0;
    throw err;
  }
}
