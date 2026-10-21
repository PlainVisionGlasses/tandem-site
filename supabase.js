// supabase.js — one place for your Supabase config. Safe to commit (anon key is public).
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

export const SUPABASE_URL = "https://hbraxlqiuymtttldeogp.supabase.co/rest/v1/";   // ← your Project URL / API URL
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicmF4bHFpdXltdHR0bGRlb2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2MDM1MzUsImV4cCI6MjEwODE3OTUzNX0.tTs0V1M01IQ8flwa4CYoBIWnURzW0Cbd0sVd-RPdtLo";           // ← your anon public key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});