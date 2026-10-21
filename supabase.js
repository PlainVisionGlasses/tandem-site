// supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

export const SUPABASE_URL = "https://hbraxlqiuymtttldeogp.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicmF4bHFpdXltdHR0bGRlb2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2MDM1MzUsImV4cCI6MjEwODE3OTUzNX0.tTs0V1M01IQ8flwa4CYoBIWnURzW0Cbd0sVd-RPdtLo";

const REMEMBER_FLAG = "tandem_remember_me";

// Session-only by default. localStorage only when REMEMBER_FLAG === "true".
const hybridStorage = {
  getItem(key) {
    const s = sessionStorage.getItem(key);
    if (s !== null) return s;
    if (localStorage.getItem(REMEMBER_FLAG) === "true") return localStorage.getItem(key);
    return null;
  },
  setItem(key, value) {
    if (localStorage.getItem(REMEMBER_FLAG) === "true") {
      localStorage.setItem(key, value);
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, value);
      localStorage.removeItem(key);
    }
  },
  removeItem(key) {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  },
};

export function setRememberMe(remember) {
  localStorage.setItem(REMEMBER_FLAG, remember ? "true" : "false");
}

export function isRemembered() {
  return localStorage.getItem(REMEMBER_FLAG) === "true";
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: hybridStorage,
  },
});