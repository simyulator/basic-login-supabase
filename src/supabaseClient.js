import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project details
// const supabaseUrl = "https://uassczygdyjpxpkzzpnx.supabase.co";
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
console.log(supabaseUrl);
const supabaseAnonKey = import.meta.env.VITE_APP_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
