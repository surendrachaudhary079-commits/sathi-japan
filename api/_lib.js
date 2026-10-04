// Shared code for the reminder functions. Files starting with "_" are not public URLs on Vercel.
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// ---------- Garbage areas (same file the website uses) ----------
let AREAS = null;
function areas() {
  if (!AREAS) {
    const ctx = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(process.cwd(), "areas.js"), "utf8"), ctx);
    AREAS = ctx.window.SATHI_AREAS;
  }
  return AREAS;
}
function findTown(cityId, townIndex) {
  const city = areas().cities.find(c => c.id === cityId);
  const town = city && city.towns[townIndex];
  return city && town ? { city, town } : null;
}
// Same rules as index.html
function idsFor(city, town, iso) {
  if (town.special || iso > city.validUntil) return [];
  if (city.type === "dated") return city.schedule[iso] || [];
  const d = new Date(iso + "T00:00:00Z"), wd = d.getUTCDay();
  if (city.noCollection.includes(iso.slice(5))) return [];
  const out = [];
  if (town.res.includes(wd)) out.push("res");
  if (town.burn.includes(wd)) out.push("burn");
  if (town.metal.wd === wd && town.metal.nth.includes(Math.ceil(d.getUTCDate() / 7))) out.push("metal");
  return out;
}
function jpDate(offsetDays) {
  const d = new Date(Date.now() + 9 * 3600e3);
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
function message(city, ids, lang) {
  const cat = id => city.categories.find(c => c.id === id);
  if (lang === "ne") {
    return { title: "भोलि फोहोर फाल्ने दिन", body: ids.map(i => `${cat(i).icon} ${cat(i).ne}`).join(" + ") + " – बिहान ८:०० भित्र राख्नुहोस्।" };
  }
  return { title: "Garbage day tomorrow", body: ids.map(i => `${cat(i).icon} ${cat(i).en}`).join(" + ") + " – put it out by 8:00 AM." };
}

// ---------- Web Push (RFC 8291 encryption + VAPID), no extra packages ----------
const b64u = buf => Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = s => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

function vapidHeader(endpoint) {
  const pub = unb64u(process.env.VAPID_PUBLIC_KEY);          // 65 bytes, uncompressed point
  const key = crypto.createPrivateKey({ format: "jwk", key: {
    kty: "EC", crv: "P-256", d: process.env.VAPID_PRIVATE_KEY,
    x: b64u(pub.subarray(1, 33)), y: b64u(pub.subarray(33, 65)) } });
  const header = b64u(JSON.stringify({ typ: "JWT", alg: "ES256" }));
  const claims = b64u(JSON.stringify({
    aud: new URL(endpoint).origin,
    exp: Math.floor(Date.now() / 1000) + 12 * 3600,
    sub: process.env.VAPID_SUBJECT || "mailto:admin@example.com" }));
  const sig = crypto.sign("sha256", Buffer.from(`${header}.${claims}`), { key, dsaEncoding: "ieee-p1363" });
  return `vapid t=${header}.${claims}.${b64u(sig)}, k=${process.env.VAPID_PUBLIC_KEY}`;
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
function sb(pathAndQuery, init = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const headers = { apikey: key, "Content-Type": "application/json", ...(init.headers || {}) };
  if (key && key.includes(".")) headers.Authorization = `Bearer ${key}`; // older JWT-style keys
  return fetch(`${process.env.SUPABASE_URL}/rest/v1/${pathAndQuery}`, { ...init, headers });
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

module.exports = { areas, findTown, idsFor, jpDate, message, sendPush, encrypt, vapidHeader, sb, validSub, b64u, unb64u };
