import { createClient } from '@supabase/supabase-js';

// NOTE: In a Vite environment, use import.meta.env instead of process.env
// For this demo, we will gracefully handle missing keys by falling back to mock data in the service layer.
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = !!supabase;