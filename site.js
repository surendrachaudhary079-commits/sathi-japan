/* Sathi Japan – shared site parts: header (logo, navigation, language switch), footer, language memory.
   New pages:  <header id="sxHead"></header> ... <footer id="sxFoot"></footer>, then call Sathi.onLang(render).
   Older tool pages keep their own header/language buttons; this file only adds the logo and the shared footer. */
(function () {
  "use strict";
  // Fill in before going public (also in privacy.html). Leave "" until you have a contact address.
  var CONTACT_EMAIL = "";

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var listeners = [];
  var lang = store.get("lang") === "ne" ? "ne" : "en";

  var TXT = {
    en: {
      tag: "Together for a Better Tomorrow", menu: "Menu", lang: "Language",
      nav: [["./", "Home"], ["./#services", "Services"], ["garbage.html", "Garbage calendar"], ["guides.html#newcomer", "New to Japan"], ["about.html", "About"], ["about.html#help", "Help"]],
      aboutH: "About", about: "Sathi Japan explains life in Japan simply, in English and Nepali. Made in Niigata by a Nepali resident.",
      linksH: "Sathi Japan", links: [["about.html", "About us"], ["about.html#contact", "Contact"], ["privacy.html", "Privacy policy"], ["about.html#help", "Help"]],
      toolsH: "Tools", tools: [["garbage.html", "Garbage calendar"], ["deadlines.html", "My deadlines"], ["visa.html", "Visa renewal"], ["letter.html", "Letter explainer"], ["rate.html", "Yen → Rupee rate"]],
      sosH: "Emergency", sos: "Fire / ambulance <b>119</b> · Police <b>110</b>",
      note: "Sathi Japan is not a government or city service. Always check the official page linked on each tool.",
      year: "© Sathi Japan"
    },
    ne: {
      tag: "उज्यालो भोलिका लागि सँगै", menu: "मेनु", lang: "भाषा",
      nav: [["./", "गृहपृष्ठ"], ["./#services", "सेवाहरू"], ["garbage.html", "फोहोर क्यालेन्डर"], ["guides.html#newcomer", "जापानमा नयाँ"], ["about.html", "हाम्रोबारे"], ["about.html#help", "मद्दत"]],
      aboutH: "हाम्रोबारे", about: "Sathi Japan ले जापानको जीवन नेपाली र अंग्रेजीमा सजिलो गरी बुझाउँछ। निगातामा बस्ने एक नेपालीले बनाएको।",
      linksH: "Sathi Japan", links: [["about.html", "हाम्रोबारे"], ["about.html#contact", "सम्पर्क"], ["privacy.html", "गोपनीयता नीति"], ["about.html#help", "मद्दत"]],
      toolsH: "सुविधाहरू", tools: [["garbage.html", "फोहोर क्यालेन्डर"], ["deadlines.html", "मेरा अन्तिम मिति"], ["visa.html", "भिसा नवीकरण"], ["letter.html", "चिठी बुझाउने"], ["rate.html", "येन → रुपैयाँ दर"]],
      sosH: "आपतकाल", sos: "आगो / एम्बुलेन्स <b>119</b> · प्रहरी <b>110</b>",
      note: "Sathi Japan सरकार वा सिटीको सेवा होइन। हरेक सुविधामा दिइएको आधिकारिक पेज सधैं जाँच्नुहोस्।",
      year: "© Sathi Japan"
    }
  };

  var LOGO = '<svg class="sx-logo" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="#E2F3EC"/><path d="M24 40V24" stroke="#0F6B57" stroke-width="3" stroke-linecap="round"/><path d="M24 26C24 15 16 10 8 11c0 9 6 15 16 15z" fill="#1E9E6E"/><path d="M24 24c0-10 8-15 16-14 0 9-6 14-16 14z" fill="#0E8C96"/><circle cx="35" cy="13" r="3.2" fill="#F2B531"/><path d="M14 40h20" stroke="#0F6B57" stroke-width="3" stroke-linecap="round"/></svg>';

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function here(href) {
    var p = location.pathname.replace(/\/index\.html$/, "/"), f = href.split("#")[0];
    if (href.indexOf("#") > 0 && href.split("#")[0] !== "guides.html") return false;
    if (f === "./" || f === "") return p === "/" || p === "";
    return p.slice(-f.length) === f;
  }

  function header() {
    var el = document.getElementById("sxHead"); if (!el) return;
    var t = TXT[lang];
    el.className = "sx-head";
    el.innerHTML =
      '<div class="sx-in">' +
        '<a class="sx-brand" href="./">' + LOGO + '<span><b>Sathi Japan <span lang="ne">साथी जापान</span></b><small>' + esc(t.tag) + '</small></span></a>' +
        '<nav class="sx-nav" id="sxNav" aria-label="' + esc(t.menu) + '"><ul>' +
          t.nav.map(function (n) { return '<li><a href="' + n[0] + '"' + (here(n[0]) ? ' aria-current="page"' : "") + '>' + esc(n[1]) + '</a></li>'; }).join("") +
        '</ul></nav>' +
        '<div class="sx-lang" role="group" aria-label="' + esc(t.lang) + ' / भाषा">' +
          '<button type="button" data-l="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
          '<button type="button" data-l="ne" lang="ne" aria-pressed="' + (lang === "ne") + '">नेपाली</button>' +
        '</div>' +
        '<button type="button" class="sx-menu" id="sxMenu" aria-expanded="false" aria-controls="sxNav"><span class="sx-sr">' + esc(t.menu) + '</span>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>' +
      '</div>';
    el.querySelectorAll(".sx-lang button").forEach(function (b) { b.onclick = function () { setLang(b.getAttribute("data-l")); }; });
    var menu = document.getElementById("sxMenu"), nav = document.getElementById("sxNav");
    menu.onclick = function (e) { e.stopPropagation(); var open = !nav.classList.contains("open"); nav.classList.toggle("open", open); menu.setAttribute("aria-expanded", open); };
    nav.querySelectorAll("a").forEach(function (a) { a.onclick = function () { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }; });
  }

  function footer(l) {
    var el = document.getElementById("sxFoot");
    if (!el) { if (document.body.getAttribute("data-sx-foot") === "off") return; el = document.createElement("footer"); el.id = "sxFoot"; document.body.appendChild(el); }
    var t = TXT[l];
    el.className = "sx-foot";
    el.innerHTML =
      '<div class="sx-in sx-cols">' +
        '<div class="sx-c1"><a class="sx-brand light" href="./">' + LOGO + '<span><b>Sathi Japan</b><small>' + esc(t.tag) + '</small></span></a><p>' + esc(t.about) + '</p></div>' +
        '<div><h2>' + esc(t.linksH) + '</h2><ul>' + t.links.map(function (n) { return '<li><a href="' + n[0] + '">' + esc(n[1]) + '</a></li>'; }).join("") + '</ul></div>' +
        '<div><h2>' + esc(t.toolsH) + '</h2><ul>' + t.tools.map(function (n) { return '<li><a href="' + n[0] + '">' + esc(n[1]) + '</a></li>'; }).join("") + '</ul></div>' +
        '<div><h2>' + esc(t.sosH) + '</h2><p class="sx-sos">' + t.sos + '</p><p class="sx-note">' + esc(t.note) + '</p></div>' +
      '</div><div class="sx-in sx-bottom">' + esc(t.year) + ' ' + new Date().getFullYear() + '</div>';
  }

  function setLang(l) {
    lang = l === "ne" ? "ne" : "en";
    store.set("lang", lang);
    document.documentElement.lang = lang;
    header(); footer(lang);
    listeners.forEach(function (fn) { try { fn(lang); } catch (e) { console.error(e); } });
  }

  // Older pages: add the logo to their "‹ Sathi Japan" link and follow their own language switch
  function enhanceOldPage() {
    if (document.getElementById("sxHead")) return;
    var back = document.querySelector("a.back,a.brand");
    if (back && !back.querySelector(".sx-logo") && /Sathi/.test(back.textContent)) {
      back.classList.add("sx-backlogo");
      back.innerHTML = LOGO + "<span>Sathi Japan</span>";
    }
    var follow = function () { footer(document.documentElement.lang === "ne" ? "ne" : "en"); };
    follow();
    new MutationObserver(follow).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  // Line icons used by the home and guide pages (24×24, drawn with currentColor)
  var IC = {
    bin: '<path d="M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
    plane: '<path d="M3 11l18-7-5 17-4-7z"/><path d="M12 14l9-10"/>',
    building: '<path d="M4 21V8l8-5 8 5v13M2 21h20M9 21v-5h6v5M8 11h.01M12 11h.01M16 11h.01"/>',
    health: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/><path d="M12 9v6M9 12h6"/>',
    bank: '<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>',
    lang: '<path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c-.5 4-3.5 7-7 8.5"/><path d="M13 21l4-10 4 10M14.5 17.5h5"/>',
    home: '<path d="M3 11l9-7 9 7M5 9.5V20h5v-6h4v6h5V9.5"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.8.2 5 2.4 5 5.3"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    share: '<path d="M12 15V3M7 8l5-5 5 5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    pin: '<path d="M12 21s7-7.5 7-12a7 7 0 0 0-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>'
  };
  function icon(n, cls) { return '<svg class="' + (cls || "sx-ic") + '" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + (IC[n] || IC.arrow) + '</svg>'; }

  window.Sathi = {
    icon: icon,
    get lang() { return lang; },
    contactEmail: CONTACT_EMAIL,
    setLang: setLang,
    onLang: function (fn) { listeners.push(fn); fn(lang); },
    esc: esc
  };

  function start() {
    if (document.getElementById("sxHead")) { document.documentElement.lang = lang; header(); footer(lang); }
    else enhanceOldPage();
    document.addEventListener("click", function (e) {
      var nav = document.getElementById("sxNav");
      if (nav && nav.classList.contains("open") && !nav.contains(e.target)) { nav.classList.remove("open"); var m = document.getElementById("sxMenu"); if (m) m.setAttribute("aria-expanded", "false"); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { var nav = document.getElementById("sxNav"); if (nav) nav.classList.remove("open"); } });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
