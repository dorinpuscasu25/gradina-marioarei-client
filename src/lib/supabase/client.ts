'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from './config';

let browserClient: SupabaseClient | null = null;

export function getBrowserSupabase() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return browserClient;
}
