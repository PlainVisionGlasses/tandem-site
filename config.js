// config.js — site-wide settings + auth helpers
export const SITE = {
  name: "Tandem",
  tagline: "Your school, organized.",
  links: {
    store: "https://example.com/store",
    gradelink: "https://example.com/gradelink",
    utf: "https://example.com/utf",
    schedule: "/schedule.html",
    mail: "/mail.html"
  }
};

// --- Tiny auth state (temporary; will be replaced by real login later) ---
// A real login system writes this. For now, nothing sets it, so the site
// treats every visitor as logged-out. That's the behavior we want.
const AUTH_KEY = "tandem_logged_in";

export function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

// Where to send someone who tries to use a gated link while logged out
export const LOGIN_URL = "/login.html";