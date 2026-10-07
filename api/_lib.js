// Shared code for the reminder functions. Files starting with "_" are not public URLs on Vercel.
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// ---------- Garbage areas (same areas.js file the website uses) ----------
// Read from the project files if available, otherwise download it from the website itself.
let AREAS = null;
async function loadAreas(host) {
  if (AREAS) return AREAS;
  let code = null;
  for (const p of [path.join(process.cwd(), "areas.js"), path.join(__dirname, "..", "areas.js")]) {
    try { code = fs.readFileSync(p, "utf8"); break; } catch (_) {}
  }
  if (!code) {
    const base = host ? `https://${host}` : `https://${env("VERCEL_PROJECT_PRODUCTION_URL") || "sathi-japan.vercel.app"}`;
    const r = await fetch(`${base}/areas.js`);
    if (!r.ok) throw new Error("cannot load areas.js: " + r.status);
    code = await r.text();
  }
  const ctx = { window: {} };
  vm.runInNewContext(code, ctx);
  AREAS = ctx.window.SATHI_AREAS;
  return AREAS;
}
function areas() { if (!AREAS) throw new Error("call loadAreas first"); return AREAS; }
function findTown(cityId, townIndex) {
  // Old Oodori-only ids (before all of Niigata was added) map to the new list
  const legacy = areas().cities.find(c => c.legacy && c.legacy[cityId]);
  if (legacy) { townIndex = legacy.legacy[cityId][townIndex]; cityId = legacy.id; }
  const city = areas().cities.find(c => c.id === cityId);
  const town = city && city.towns[townIndex];
  return city && town ? { city, town } : null;
}
// Same rules as index.html
function idsFor(city, town, iso) {
  if (town.special || iso > city.validUntil) return [];
  if (city.type === "dated") return city.schedule[iso] || [];
  if (city.type === "cal") return calIds(city.calendars[town.cal], iso, city.categories);
  const d = new Date(iso + "T00:00:00Z"), wd = d.getUTCDay();
  if (city.noCollection.includes(iso.slice(5))) return [];
  const out = [];
  if (town.res.includes(wd)) out.push("res");
  if (town.burn.includes(wd)) out.push("burn");
  if (town.metal.wd === wd && town.metal.nth.includes(Math.ceil(d.getUTCDate() / 7))) out.push("metal");
  return out;
}
// Niigata City calendars: 1–3 Jan none; 31 Dec burnable only; in January the six monthly
// items move one week later when one of them falls on 1–3 Jan (calendars that say so).
const SHIFT = ["nonburnable", "pet", "paper", "glass", "cans", "special5"];
const hit = (r, wd, dd) => r.c.some(cl => cl.d.includes(wd) && (!cl.n || cl.n.includes(Math.ceil(dd / 7))));
function calIds(cal, iso, cats) {
  const dt = new Date(iso + "T00:00:00Z"), m = dt.getUTCMonth() + 1, d = dt.getUTCDate(), wd = dt.getUTCDay();
  if (m === 1 && d <= 3) return [];
  if (m === 12 && d === 31) return ["burnable"];
  let shift = false;
  if (cal.jan && m === 1) for (let x = 1; x <= 3; x++) {
    const w = new Date(Date.UTC(dt.getUTCFullYear(), 0, x)).getUTCDay();
    if (SHIFT.some(id => cal.r[id] && hit(cal.r[id], w, x))) shift = true;
  }
  const out = [];
  for (const cg of cats) {
    const r = cal.r[cg.id]; if (!r || (r.off && r.off.includes(m))) continue;
    let dd = d; if (shift && SHIFT.includes(cg.id)) { dd = d - 7; if (dd < 1) continue; }
    if (hit(r, wd, dd)) out.push(cg.id);
  }
  return out;
}
function jpDate(offsetDays) {
  const d = new Date(Date.now() + 9 * 3600e3);
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
// Times a user can choose (Japan time). Before noon = same morning, otherwise = evening before.
const HOURS = [6, 7, 18, 19, 20, 21, 22];
const TIMES = { "08:00": ["8:00 AM", "बिहान ८:००"], "08:30": ["8:30 AM", "बिहान ८:३०"], "12:00": ["noon", "दिउँसो १२:००"] };
function message(city, ids, lang, morning = false, town = null) {
  const cat = id => city.categories.find(c => c.id === id);
  const put = city.type === "cal" && town ? city.calendars[town.cal].put : "08:00";
  const tm = TIMES[put] || TIMES["08:00"];
  if (lang === "ne") {
    return { title: morning ? "आज फोहोर फाल्ने दिन" : "भोलि फोहोर फाल्ने दिन", body: ids.map(i => `${cat(i).icon} ${cat(i).ne}`).join(" + ") + ` – ${tm[1]} भित्र राख्नुहोस्।` };
  }
  return { title: morning ? "Garbage day today" : "Garbage day tomorrow", body: ids.map(i => `${cat(i).icon} ${cat(i).en}`).join(" + ") + ` – put it out by ${tm[0]}.` };
}

// ---------- Web Push (RFC 8291 encryption + VAPID), no extra packages ----------
const b64u = buf => Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = s => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

function vapidHeader(endpoint) {
  const pub = unb64u(env("VAPID_PUBLIC_KEY"));          // 65 bytes, uncompressed point
  const key = crypto.createPrivateKey({ format: "jwk", key: {
    kty: "EC", crv: "P-256", d: env("VAPID_PRIVATE_KEY"),
    x: b64u(pub.subarray(1, 33)), y: b64u(pub.subarray(33, 65)) } });
  const header = b64u(JSON.stringify({ typ: "JWT", alg: "ES256" }));
  const claims = b64u(JSON.stringify({
    aud: new URL(endpoint).origin,
    exp: Math.floor(Date.now() / 1000) + 12 * 3600,
    sub: env("VAPID_SUBJECT") || "mailto:admin@example.com" }));
  const sig = crypto.sign("sha256", Buffer.from(`${header}.${claims}`), { key, dsaEncoding: "ieee-p1363" });
  return `vapid t=${header}.${claims}.${b64u(sig)}, k=${env("VAPID_PUBLIC_KEY")}`;
}

function encrypt(payload, p256dh, auth) {
  const uaPublic = unb64u(p256dh), authSecret = unb64u(auth);
  const ecdh = crypto.createECDH("prime256v1");
  const asPublic = ecdh.generateKeys();
  const shared = ecdh.computeSecret(uaPublic);
  const keyInfo = Buffer.concat([Buffer.from("WebPush: info\0"), uaPublic, asPublic]);
  const ikm = Buffer.from(crypto.hkdfSync("sha256", shared, authSecret, keyInfo, 32));
  const salt = crypto.randomBytes(16);
  const cek = Buffer.from(crypto.hkdfSync("sha256", ikm, salt, Buffer.from("Content-Encoding: aes128gcm\0"), 16));
  const nonce = Buffer.from(crypto.hkdfSync("sha256", ikm, salt, Buffer.from("Content-Encoding: nonce\0"), 12));
  const cipher = crypto.createCipheriv("aes-128-gcm", cek, nonce);
  const body = Buffer.concat([cipher.update(Buffer.concat([Buffer.from(payload), Buffer.from([2])])), cipher.final(), cipher.getAuthTag()]);
  const rs = Buffer.alloc(4); rs.writeUInt32BE(4096);
  return Buffer.concat([salt, rs, Buffer.from([asPublic.length]), asPublic, body]);
}

async function sendPush(sub, data) {
  const res = await fetch(sub.endpoint, {
    method: "POST",
    headers: {
      Authorization: vapidHeader(sub.endpoint),
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream",
      TTL: "43200", Urgency: "normal" },
    body: encrypt(JSON.stringify(data), sub.p256dh, sub.auth) });
  return res.status; // 201 = sent; 404/410 = phone turned it off
}

// ---------- Supabase (REST, no extra packages) ----------
const env = n => (process.env[n] || "").trim();
function keyKind() {
  const k = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!k) return "missing";
  if (k.startsWith("sb_secret_")) return "secret";
  if (k.startsWith("sb_publishable_")) return "publishable (wrong key)";
  try { const role = JSON.parse(Buffer.from(k.split(".")[1], "base64").toString()).role; return role === "service_role" ? "service_role" : role + " (wrong key)"; }
  catch { return "unknown format"; }
}
function sb(pathAndQuery, init = {}) {
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  const headers = { apikey: key, "Content-Type": "application/json", ...(init.headers || {}) };
  if (key && key.includes(".")) headers.Authorization = `Bearer ${key}`; // older JWT-style keys
  return fetch(`${env("SUPABASE_URL").replace(/\/+$/, "").replace(/\/rest\/v1$/, "")}/rest/v1/${pathAndQuery}`, { ...init, headers });
}

// Only real browser push services are accepted
const PUSH_HOSTS = [/\.googleapis\.com$/, /\.mozilla\.com$/, /\.push\.apple\.com$/, /\.notify\.windows\.com$/];
function validSub(s) {
  try {
    const u = new URL(s.endpoint);
    return u.protocol === "https:" && PUSH_HOSTS.some(r => r.test(u.hostname))
      && typeof s.keys?.p256dh === "string" && typeof s.keys?.auth === "string"
      && s.keys.p256dh.length < 200 && s.keys.auth.length < 100;
  } catch { return false; }
}


// ---------- My deadlines ----------
// kind → [English, Nepali] name used in reminders. "n" = instalment number, "l" = the person's own short label.
const DL = {
  rc:  ["Residence card expires", "रेसिडेन्स कार्डको म्याद सकिन्छ"],
  mn:  ["Update your My Number card (it ends with your residence period)", "My Number कार्ड अपडेट गर्नुहोस् (बसाइ अवधिसँगै सकिन्छ)"],
  pp:  ["Passport expires", "पासपोर्टको म्याद सकिन्छ"],
  dl:  ["Driving licence expires", "ड्राइभिङ लाइसेन्सको म्याद सकिन्छ"],
  re:  ["Return to Japan by (re-entry)", "जापान फर्किनुपर्ने अन्तिम दिन (पुनःप्रवेश)"],
  rt:  ["Resident tax payment", "नगर कर (住民税) भुक्तानी"],
  nhi: ["Health insurance payment", "स्वास्थ्य बीमा (国保) भुक्तानी"],
  pen: ["National pension payment", "राष्ट्रिय पेन्सन भुक्तानी"],
  kei: ["Light vehicle tax payment", "हल्का सवारी कर भुक्तानी"],
  cu:  ["Deadline", "अन्तिम मिति"]
};
function dlMessage(rows, lang, today) {
  const ne = lang === "ne", days = d => Math.round((new Date(d + "T00:00:00Z") - new Date(today + "T00:00:00Z")) / 864e5);
  const line = r => {
    const name = (r.kind === "cu" && r.label) ? r.label : (DL[r.kind] || DL.cu)[ne ? 1 : 0] + (r.n ? (ne ? ` (किस्ता ${r.n})` : ` (part ${r.n})`) : "");
    const k = days(r.due);
    const when = k <= 0 ? (ne ? "आज" : "today") : k === 1 ? (ne ? "भोलि" : "tomorrow") : (ne ? `${k} दिनमा` : `in ${k} days`);
    return `${name} – ${when} (${r.due})`;
  };
  return { title: ne ? "⏰ Sathi: अन्तिम मिति नजिकियो" : "⏰ Sathi: deadline coming up", body: rows.map(line).join("\n") };
}

module.exports = { DL, dlMessage, calIds, HOURS, env, keyKind, loadAreas, areas, findTown, idsFor, jpDate, message, sendPush, encrypt, vapidHeader, sb, validSub, b64u, unb64u };
