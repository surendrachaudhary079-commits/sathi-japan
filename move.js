/* JapanMates – moving from the old address (sathi-japan.vercel.app → www.japanmates.com).
   Loaded by site.js on every page (and directly by garbage.html). Safe to delete a few months after the move. */
(function () {
  "use strict";
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  // ---------- Moving from the old address (sathi-japan.vercel.app → www.japanmates.com) ----------
  // On the old address a banner offers the new site. The link carries this phone's saved settings
  // (garbage area, deadlines, language, saved words…) in the part after "#", which is never sent to any server.
  var OLD_HOST = "sathi-japan.vercel.app", NEW_SITE = "https://www.japanmates.com";
  function b64(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function unb64(s) { return decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/")))); }
  var reloading = false;
  (function importMoved() {
    var m = /[#&]sxmove=([\w-]+)/.exec(location.hash);
    if (!m) return;
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    if (location.hostname === OLD_HOST || document.referrer.indexOf("https://" + OLD_HOST + "/") !== 0) return;  // only links made by our old site
    var data, n = 0;
    try { data = JSON.parse(unb64(m[1])); } catch (e) { return; }
    try {
      for (var k in data) if (typeof data[k] === "string" && k.length < 80 && localStorage.getItem(k) === null) { localStorage.setItem(k, data[k]); n++; }
      if (n) { sessionStorage.setItem("sx_moved", "1"); reloading = true; location.reload(); }
    } catch (e) {}
  })();
  function exportData() {
    var o = {};
    try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); o[k] = localStorage.getItem(k); } } catch (e) {}
    return b64(JSON.stringify(o));
  }
  var MOVE_TXT = {
    en: { old: "Sathi Japan is now JapanMates! Please use our new address – your saved settings come with you.", go: "Open www.japanmates.com", done: "✓ Your saved settings were moved to JapanMates." },
    ne: { old: "Sathi Japan अब JapanMates भयो! नयाँ ठेगाना प्रयोग गर्नुहोस् – तपाईंका सेभ गरिएका सेटिङ पनि साथै आउँछन्।", go: "www.japanmates.com खोल्नुहोस्", done: "✓ तपाईंका सेभ गरिएका सेटिङ JapanMates मा सारिए।" }
  };
  function moveBanner() {
    if (reloading) return;
    var l = (document.documentElement.lang || (function () { try { return localStorage.getItem("lang"); } catch (e) { return ""; } })()) === "ne" ? "ne" : "en", bar;
    if (location.hostname === OLD_HOST) {
      bar = document.createElement("div"); bar.className = "sx-moved noprint";
      bar.innerHTML = "<span>" + esc(MOVE_TXT[l].old) + "</span> ";
      var a = document.createElement("a"); a.textContent = MOVE_TXT[l].go + " →"; a.href = NEW_SITE + location.pathname;
      a.onclick = function () { a.href = NEW_SITE + location.pathname + location.search + "#sxmove=" + exportData(); };
      bar.appendChild(a);
    } else {
      var done = null; try { done = sessionStorage.getItem("sx_moved"); sessionStorage.removeItem("sx_moved"); } catch (e) {}
      if (!done) return;
      bar = document.createElement("div"); bar.className = "sx-moved noprint"; bar.textContent = MOVE_TXT[l].done;
      setTimeout(function () { bar.remove(); }, 6000);
    }
    bar.style.cssText = "background:#F2B531;color:#1E1A0A;padding:10px 16px;font-weight:600;font-size:15px;line-height:1.45;text-align:center";
    var lk = bar.querySelector("a"); if (lk) lk.style.cssText = "color:#1E1A0A;font-weight:800";
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", moveBanner); else moveBanner();
})();
