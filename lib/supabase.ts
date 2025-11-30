import { createClient } from '@supabase/supabase-js';

// NOTE: In a Vite environment, use import.meta.env instead of process.env
// We add safe checking to ensure we don't crash if env is missing.
const getEnv = (key: string) => {
  try {
    return (import.meta as any).env?.[key] || '';
  } catch (e) {
    return '';
  }
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = !!supabase;