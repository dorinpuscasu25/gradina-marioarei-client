import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabaseAnonKey, supabaseServiceRoleKey, supabaseUrl } from './config';

export function getPublicSupabase() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export function getServiceSupabase() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
