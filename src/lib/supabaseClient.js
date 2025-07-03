import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from './security';

const { url: supabaseUrl, anonKey: supabaseAnonKey } = getSupabaseConfig();

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);