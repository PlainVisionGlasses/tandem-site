// nav.js — injects a shared top bar + dropdown into any internal page
import { supabase } from "./supabase.js";
import { getUserLinks, isSafeUrl } from "./links.js";
import { logout } from "./auth.js";

export async function mountNav({ containerId = "navHost" } = {}) {
  const host = document.getElementById(containerId);
  if (!host) return;

  host.innerHTML = `
    <header class="tandem-nav">
      <button class="menu-btn" id="tnMenuBtn" aria-label="Open menu" aria-expanded="false">
        <span class="bars"><span></span><span></span><span></span></span>
      </button>
      <a href="/" class="brand"><span class="dot"></span>Tandem</a>
      <a href="/profile.html" class="profile" aria-label="Profile">
        <div class="avatar" id="tnAvatar">T</div>
        <span>Profile</span>
      </a>
    </header>
    <nav class="tandem-nav-menu" id="tnMenu" aria-hidden="true">
      <a href="#" target="_blank" rel="noopener" data-key="store"><span class="ico">🛍️</span><span>Store<small>School clothes store</small></span></a>
      <a href="#" target="_blank" rel="noopener" data-key="gradelink"><span class="ico">📊</span><span>GradeLink<small>Open your GradeLink account</small></span></a>
      <a href="#" target="_blank" rel="noopener" data-key="utf"><span class="ico">🎓</span><span>UTF<small>University of Toccoa Falls</small></span></a>
      <a href="/schedule.html"><span class="ico">🗓️</span><span>Schedule<small>Week, grades &amp; assignments</small></span></a>
      <a href="/mail.html"><span class="ico">✉️</span><span>Mail<small>Choose your inbox</small></span></a>
    </nav>
  `;

  const btn = host.querySelector("#tnMenuBtn");
  const menu = host.querySelector("#tnMenu");
  const avatar = host.querySelector("#tnAvatar");

  btn.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    btn.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
  });
  document.addEventListener("click", (e) => {
    if (!host.contains(e.target)) {
      btn.classList.remove("open"); menu.classList.remove("open");
    }
  });

  // Fill avatar from profile
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from("profiles").select("display_name,username").eq("id", user.id).single();
    const name = profile?.username || profile?.display_name || "T";
    avatar.textContent = (name[0] || "T").toUpperCase();
  }

  // Hydrate store/gradelink/utf from saved links; hide blanks
  const links = await getUserLinks();
  host.querySelectorAll(".tandem-nav-menu a[data-key]").forEach((a) => {
    const url = links[a.dataset.key];
    if (url && isSafeUrl(url)) {
      a.href = url; a.target = "_blank"; a.rel = "noopener";
    } else {
      a.style.display = "none";
    }
  });

  // Handle logout link if present anywhere
  document.querySelectorAll("[data-logout]").forEach((el) =>
    el.addEventListener("click", (e) => { e.preventDefault(); logout(); })
  );
}