
import { createClient } from '@supabase/supabase-js';

// The environment variables should be set in your .env file
// These are accessed at build time through import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
