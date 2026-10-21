// auth.js — shared auth helpers for every page
import { supabase } from "./supabase.js";

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function isLoggedIn() {
  return !!(await getSession());
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    window.location.href = "/login.html";
    return null;
  }
  return session;
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "/";
}

export function friendlyError(err) {
  const msg = err?.message || "Something went wrong.";
  if (msg.includes("Invalid login")) return "Wrong email or password.";
  if (msg.includes("already registered")) return "That email is already in use.";
  if (msg.includes("Password should be")) return "Password must be at least 6 characters.";
  return msg;
}