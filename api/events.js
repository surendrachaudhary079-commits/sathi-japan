// Events calendar: Japanese national holidays (live from the Cabinet Office), Nepali festivals and
// approved community events (Supabase table "events"), event reminders (table "event_reminders").
//   GET                         → { holidays, events, publicKey }
//   POST {action:"submit", ...} → a community event, saved as "pending" (hidden until you approve it)
//   POST {action:"remind"|"unremind"|"mine", sub, ...}
//   POST {action:"admin-*"} with header x-admin-code = ADMIN_CODE → review tools for events-admin.html
const crypto = require("crypto");
const { sb, env, validSub, jpDate } = require("./_lib");

const CAO_CSV = "https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv";   // official, updated every February
const HOL_NAMES = {   // Japanese → [English, Nepali]
  "元日": ["New Year's Day", "नयाँ वर्षको दिन"], "成人の日": ["Coming of Age Day", "वयस्क दिवस"], "建国記念の日": ["National Foundation Day", "राष्ट्र स्थापना दिवस"],
  "天皇誕生日": ["Emperor's Birthday", "सम्राटको जन्मदिन"], "春分の日": ["Vernal Equinox Day", "वसन्त विषुव दिवस"], "昭和の日": ["Showa Day", "शोवा दिवस"],
  "憲法記念日": ["Constitution Memorial Day", "संविधान दिवस"], "みどりの日": ["Greenery Day", "हरियाली दिवस"], "こどもの日": ["Children's Day", "बाल दिवस"],
  "海の日": ["Marine Day", "समुद्र दिवस"], "山の日": ["Mountain Day", "पर्वत दिवस"], "敬老の日": ["Respect for the Aged Day", "ज्येष्ठ नागरिक सम्मान दिवस"],
  "秋分の日": ["Autumnal Equinox Day", "शरद विषुव दिवस"], "スポーツの日": ["Sports Day", "खेलकुद दिवस"], "文化の日": ["Culture Day", "संस्कृति दिवस"],
  "勤労感謝の日": ["Labour Thanksgiving Day", "श्रम धन्यवाद दिवस"], "休日": ["Substitute holiday", "सट्टा बिदा"], "国民の休日": ["Citizens' holiday", "राष्ट्रिय बिदा"]
};
const PREFS = ["hokkaido","aomori","iwate","miyagi","akita","yamagata","fukushima","ibaraki","tochigi","gunma","saitama","chiba","tokyo","kanagawa","niigata","toyama","ishikawa","fukui","yamanashi","nagano","gifu","shizuoka","aichi","mie","shiga","kyoto","osaka","hyogo","nara","wakayama","tottori","shimane","okayama","hiroshima","yamaguchi","tokushima","kagawa","ehime","kochi","fukuoka","saga","nagasaki","kumamoto","oita","miyazaki","kagoshima","okinawa"];
const PUBLIC = "id,kind,slug,title_en,title_ne,desc_en,desc_ne,start_date,end_date,start_time,pref,city,venue,organizer,source_url,status";
const isoOk = s => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s + "T00:00:00Z"));
const str = (v, max) => typeof v === "string" ? v.trim().slice(0, max) : "";
const urlOk = u => !u || /^https:\/\/[^\s<>"]+$/.test(u);

// ---- Japanese national holidays: Cabinet Office CSV (Shift_JIS), cached 12 hours ----
let HOL = null, HOL_AT = 0;
async function holidays() {
  if (HOL && Date.now() - HOL_AT < 12 * 3600e3) return HOL;
  const r = await fetch(CAO_CSV);
  if (!r.ok) throw new Error("CAO " + r.status);
  const text = new TextDecoder("shift_jis").decode(await r.arrayBuffer());
  const out = [];
  for (const line of text.split(/\r?\n/)) {
    const m = /^(\d{4})\/(\d{1,2})\/(\d{1,2}),(.+)$/.exec(line.trim());
    if (!m) continue;
    const d = `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`, ja = m[4].trim();
    const n = HOL_NAMES[ja] || [ja, ja];
    out.push({ d, ja, en: n[0], ne: n[1] });
  }
  if (!out.length) throw new Error("CAO csv empty");
  HOL = out; HOL_AT = Date.now();
  return out;
}

function who(req) {
  const ip = String((req.headers["x-forwarded-for"] || "").split(",")[0] || req.socket?.remoteAddress || "?").trim();
  return crypto.createHash("sha256").update(ip + "|" + env("CRON_SECRET") + "|" + jpDate(0)).digest("hex").slice(0, 32);
}
function isAdmin(req) {
  const want = env("ADMIN_CODE"), got = String(req.headers["x-admin-code"] || "");
  if (want.length < 12 || got.length !== want.length) return false;
  return crypto.timingSafeEqual(Buffer.from(got), Buffer.from(want));
}
async function json(r) { try { return await r.json(); } catch (_) { return null; } }

async function handler(req, res) {
  try {
    if (req.method === "GET" && req.query && req.query.lat) {
      // "Near me" fallback for garbage.html: town name from GSI (国土地理院). Location is not stored or logged.
      const lat = Number(req.query.lat), lon = Number(req.query.lon);
      if (!(lat > 20 && lat < 46 && lon > 122 && lon < 154)) return res.status(400).json({ error: "bad_location" });
      const r = await fetch(`https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat.toFixed(5)}&lon=${lon.toFixed(5)}`);
      if (!r.ok) return res.status(502).json({ error: "gsi_" + r.status });
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json(await r.json());
    }
    if (req.method === "GET") {
      const today = jpDate(0), until = jpDate(400);
      let hol = [], holErr = false;
      try { hol = (await holidays()).filter(h => h.d >= today && h.d <= until); } catch (e) { console.error(e); holErr = true; }
      let events = [], evErr = false;
      const r = await sb(`events?select=${PUBLIC}&status=in.(verified,unverified)&or=(start_date.is.null,start_date.gte.${jpDate(-10)})&order=start_date.asc.nullslast&limit=500`);
      if (r.ok) events = (await r.json()).filter(e => !e.start_date || (e.end_date || e.start_date) >= today);
      else { evErr = true; console.error("events", r.status, await r.text()); }
      const latestHoliday = HOL ? HOL[HOL.length - 1].d : null;
      res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
      return res.status(200).json({ today, holidays: hol, holidaysSource: CAO_CSV, holidaysUntil: latestHoliday, holErr, events, evErr, publicKey: env("VAPID_PUBLIC_KEY") || null });
    }
    if (req.method !== "POST") return res.status(405).json({ error: "method" });
    const b = req.body || {};

    // ---- Public: submit a community event (hidden until approved) ----
    if (b.action === "submit") {
      if (b.website) return res.status(200).json({ ok: true });                 // honeypot: bots fill hidden fields
      const ev = {
        kind: "community", status: "pending",
        title_en: str(b.title, 90), desc_en: str(b.desc, 600), start_date: b.date, end_date: b.end || null,
        start_time: /^\d{1,2}:\d{2}$/.test(b.time || "") ? b.time : null, pref: b.pref, city: str(b.city, 60), venue: str(b.venue, 120),
        organizer: str(b.organizer, 90), source_url: str(b.url, 300) || null, contact: str(b.contact, 120) || null, submitter: who(req)
      };
      const max = jpDate(730);
      if (ev.title_en.length < 4 || !isoOk(ev.start_date) || ev.start_date < jpDate(0) || ev.start_date > max ||
          (ev.end_date && (!isoOk(ev.end_date) || ev.end_date < ev.start_date)) || !PREFS.includes(ev.pref) || !ev.venue || !urlOk(ev.source_url))
        return res.status(400).json({ error: "invalid" });
      const c = await sb(`events?select=id&submitter=eq.${ev.submitter}&created_at=gte.${jpDate(0)}T00:00:00%2B09:00`);
      if (c.ok && (await c.json()).length >= 3) return res.status(429).json({ error: "limit" });
      const r = await sb("events", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(ev) });
      if (!r.ok) { console.error("submit", r.status, await r.text()); return res.status(500).json({ error: "save_failed" }); }
      return res.status(200).json({ ok: true });
    }

    // ---- Reminders ----
    if (["remind", "unremind", "mine"].includes(b.action)) {
      if (!validSub(b.sub)) return res.status(400).json({ error: "bad_subscription" });
      const ep = encodeURIComponent(b.sub.endpoint);
      if (b.action === "mine") {
        const r = await sb(`event_reminders?select=key,before,hour&endpoint=eq.${ep}`);
        return res.status(r.ok ? 200 : 500).json({ items: r.ok ? await r.json() : [] });
      }
      const key = String(b.key || "");
      if (!/^(e:\d{1,12}|h:\d{4}-\d{2}-\d{2})$/.test(key)) return res.status(400).json({ error: "bad_key" });
      if (b.action === "unremind") {
        const r = await sb(`event_reminders?endpoint=eq.${ep}&key=eq.${encodeURIComponent(key)}`, { method: "DELETE" });
        return res.status(r.ok ? 200 : 500).json({ ok: r.ok });
      }
      const before = [...new Set((Array.isArray(b.before) ? b.before : []).map(Number))].filter(n => [0, 1, 3, 7].includes(n));
      const hour = Number(b.hour);
      if (!before.length || ![6, 7, 18, 19, 20, 21, 22].includes(hour)) return res.status(400).json({ error: "bad_options" });
      let title = null;
      if (key.startsWith("e:")) {   // the event must exist and be public
        const r = await sb(`events?select=id&id=eq.${key.slice(2)}&status=in.(verified,unverified)`);
        if (!r.ok || !(await r.json()).length) return res.status(404).json({ error: "no_event" });
      } else {
        const h = (await holidays()).find(x => x.d === key.slice(2));
        if (!h) return res.status(404).json({ error: "no_holiday" });
        title = JSON.stringify({ en: h.en, ne: h.ne, ja: h.ja });
      }
      const row = { endpoint: b.sub.endpoint, p256dh: b.sub.keys.p256dh, auth: b.sub.keys.auth, lang: b.lang === "ne" ? "ne" : "en", key, title, before, hour, last_sent: null };
      const r = await sb("event_reminders?on_conflict=endpoint,key", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(row) });
      if (!r.ok) { const d = await r.text(); console.error("remind", r.status, d); return res.status(500).json({ error: "save_failed", status: r.status }); }
      return res.status(200).json({ ok: true });
    }

    // ---- Admin (events-admin.html) ----
    if (String(b.action || "").startsWith("admin-")) {
      if (!isAdmin(req)) return res.status(401).json({ error: "unauthorized" });
      if (b.action === "admin-list") {
        const r = await sb(`events?select=${PUBLIC},contact,created_at,reviewed_at&order=start_date.asc.nullsfirst&limit=1000`);
        return res.status(r.ok ? 200 : 500).json({ events: r.ok ? await r.json() : [], holidaysUntil: HOL ? HOL[HOL.length - 1].d : null });
      }
      const id = Number(b.id);
      if (b.action === "admin-status") {
        if (!["verified", "unverified", "pending", "rejected"].includes(b.status) || !id) return res.status(400).json({ error: "bad" });
        const r = await sb(`events?id=eq.${id}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ status: b.status, reviewed_at: new Date().toISOString() }) });
        return res.status(r.ok ? 200 : 500).json({ ok: r.ok });
      }
      if (b.action === "admin-save") {
        const e = b.event || {};
        const row = { kind: e.kind === "community" ? "community" : "festival", title_en: str(e.title_en, 120), title_ne: str(e.title_ne, 120) || null,
          desc_en: str(e.desc_en, 800) || null, desc_ne: str(e.desc_ne, 800) || null, start_date: e.start_date || null, end_date: e.end_date || null,
          start_time: e.start_time || null, pref: e.pref || null, city: str(e.city, 60) || null, venue: str(e.venue, 120) || null, organizer: str(e.organizer, 90) || null,
          source_url: str(e.source_url, 300) || null, status: ["verified", "unverified", "pending", "rejected"].includes(e.status) ? e.status : "unverified", reviewed_at: new Date().toISOString() };
        if (e.slug) row.slug = str(e.slug, 60);
        if (!row.title_en || (row.start_date && !isoOk(row.start_date)) || (row.end_date && !isoOk(row.end_date)) || !urlOk(row.source_url) || (row.pref && !PREFS.includes(row.pref)))
          return res.status(400).json({ error: "invalid" });
        const r = id ? await sb(`events?id=eq.${id}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(row) })
                     : await sb("events", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(row) });
        if (!r.ok) { const d = await r.text(); return res.status(500).json({ error: "save_failed", detail: d.slice(0, 160) }); }
        return res.status(200).json({ ok: true });
      }
      if (b.action === "admin-delete" && id) {
        const r = await sb(`events?id=eq.${id}`, { method: "DELETE" });
        return res.status(r.ok ? 200 : 500).json({ ok: r.ok });
      }
      return res.status(400).json({ error: "bad_action" });
    }
    return res.status(400).json({ error: "bad_action" });
  } catch (e) { console.error(e); return res.status(500).json({ error: "server" }); }
}
module.exports = handler;
module.exports.holidays = holidays;
