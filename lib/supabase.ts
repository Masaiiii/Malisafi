import { createClient } from '@supabase/supabase-js';

// NOTE: In a real environment, these would be process.env.SUPABASE_URL and process.env.SUPABASE_KEY
// For this demo, we will gracefully handle missing keys by falling back to mock data in the service layer.
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = !!supabase;