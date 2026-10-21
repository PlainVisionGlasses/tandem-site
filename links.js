// links.js — read the current user's saved links from Supabase
import { supabase } from "./supabase.js";

let cache = null;
let cacheUserId = null;

/**
 * Returns a map of { key: url } for the logged-in user.
 * Cached per-user for the lifetime of the page.
 */
export async function getUserLinks() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};

  if (cache && cacheUserId === user.id) return cache;

  const { data, error } = await supabase
    .from("links")
    .select("key,url")
    .eq("user_id", user.id);

  if (error) {
    console.warn("links.js: failed to load links", error.message);
    return {};
  }

  const map = {};
  (data || []).forEach((r) => { if (r.url) map[r.key] = r.url; });
  cache = map;
  cacheUserId = user.id;
  return map;
}

/** Clear the cache (call after the user saves links on Profile). */
export function clearLinksCache() {
  cache = null;
  cacheUserId = null;
}

/** Is this a safe URL to open in a new tab? (prevents javascript: etc.) */
export function isSafeUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url, window.location.origin);
    return u.protocol === "http:" || u.protocol === "https:" || u.protocol === "mailto:";
  } catch {
    return false;
  }
}