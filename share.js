// Sathi Japan – one-tap sharing (Viber, Messenger, WhatsApp, LINE, Facebook, copy link).
// Usage: sathiShare({ text: "message", url: "https://…" }). Nothing is sent to our server.
(function () {
  const SITE = "https://sathi-japan.vercel.app";
  const L = {
    en: { title: "Share", copy: "Copy link", copied: "Link copied ✓", close: "Close", fb: "Facebook", hint: "Send it to your building, work or family group." },
    ne: { title: "सेयर गर्नुहोस्", copy: "लिंक कपी गर्नुहोस्", copied: "लिंक कपी भयो ✓", close: "बन्द गर्नुहोस्", fb: "Facebook", hint: "आफ्नो भवन, कामको वा परिवारको समूहमा पठाउनुहोस्।" }
  };
  // Tag shared links so visits from shares can be counted later (no personal data)
  function tag(url) {
    const u = new URL(url, SITE);
    u.searchParams.set("utm_source", "share");
    return u.origin === location.origin || u.origin === SITE ? SITE + u.pathname + u.search + u.hash : u.href;
  }
  function css() {
    if (document.getElementById("sathi-share-css")) return;
    const s = document.createElement("style"); s.id = "sathi-share-css";
    s.textContent = `.ss-back{position:fixed;inset:0;background:rgba(8,14,30,.55);display:flex;align-items:flex-end;justify-content:center;z-index:50}
.ss-panel{background:var(--sheet,var(--card,var(--surface,#fff)));color:var(--ink,var(--text,#0E1A33));width:100%;max-width:520px;border-radius:18px 18px 0 0;padding:20px 18px calc(20px + env(safe-area-inset-bottom,0px));font:inherit}
@media (min-width:640px){.ss-back{align-items:center}.ss-panel{border-radius:18px}}
.ss-panel h2{margin:0 0 4px;font-size:20px}.ss-panel p{margin:0 0 14px;font-size:15px;opacity:.75}
.ss-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ss-grid a,.ss-grid button{display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:12px;border:1px solid rgba(127,140,160,.35);background:transparent;color:inherit;font:inherit;font-weight:700;font-size:16px;text-decoration:none;cursor:pointer}
.ss-grid .ss-copy{grid-column:1/-1;background:#0B2E6B;color:#fff;border:0}
.ss-close{margin-top:12px;width:100%;min-height:44px;border:0;background:transparent;color:inherit;font:inherit;cursor:pointer;opacity:.75}`;
    document.head.appendChild(s);
  }
  function sheet(text, url) {
    css();
    const t = L[(document.documentElement.lang || "en").slice(0, 2)] || L.en;
    const msg = encodeURIComponent(text + "\n" + url), u = encodeURIComponent(url);
    const back = document.createElement("div"); back.className = "ss-back"; back.setAttribute("role", "dialog"); back.setAttribute("aria-modal", "true");
    back.innerHTML = `<div class="ss-panel"><h2>${t.title}</h2><p>${t.hint}</p><div class="ss-grid">
      <button class="ss-copy" type="button">${t.copy}</button>
      <a href="viber://forward?text=${msg}">Viber</a>
      <a href="https://wa.me/?text=${msg}" target="_blank" rel="noopener">WhatsApp</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener">${t.fb}</a>
      <a href="https://social-plugins.line.me/lineit/share?url=${u}" target="_blank" rel="noopener">LINE</a>
      </div><button class="ss-close" type="button">${t.close}</button></div>`;
    const close = () => back.remove();
    back.addEventListener("click", e => { if (e.target === back) close(); });
    back.querySelector(".ss-close").onclick = close;
    const copyBtn = back.querySelector(".ss-copy");
    copyBtn.onclick = async () => {
      try { await navigator.clipboard.writeText(text + "\n" + url); }
      catch (e) { const ta = document.createElement("textarea"); ta.value = text + "\n" + url; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (_) {} ta.remove(); }
      copyBtn.textContent = t.copied;
    };
    document.addEventListener("keydown", function esc(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); } });
    document.body.appendChild(back);
    copyBtn.focus();
  }
  window.sathiShare = async function ({ text, url }) {
    const link = tag(url || location.href);
    // Phones: the normal share menu (Viber, Messenger, WhatsApp, LINE… whatever is installed)
    if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      try { await navigator.share({ text, url: link }); return; }
      catch (e) { if (e && e.name === "AbortError") return; }
    }
    sheet(text, link);
  };
})();
