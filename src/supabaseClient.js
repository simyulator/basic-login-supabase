import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project details
const supabaseUrl = "https://uassczygdyjpxpkzzpnx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhc3NjenlnZHlqcHhwa3p6cG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNzM2MTAsImV4cCI6MjA0OTc0OTYxMH0.RS-6Iq_0a0EyVmBSoE_9u1TC8x6VxAWAGIzcfAaDo6w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
