// Yen → Nepali rupee reference rate (Nepal Rastra Bank) + rate alerts.
// GET  → last ~120 days of the NRB rate for JPY (per 100 yen), cached for an hour.
// POST → save an alert {sub, lang, target}   DELETE → remove this phone's alert.
// The app never moves money – it only shows the official reference rate and links to registered companies.
const { sb, validSub, sendPush } = require("./_lib");

let cache = null, cacheAt = 0;
async function nrbRates() {
  if (cache && Date.now() - cacheAt < 3600e3) return cache;
  const iso = d => d.toISOString().slice(0, 10);
  const to = new Date(Date.now() + 5.75 * 3600e3), from = new Date(to.getTime() - 120 * 864e5); // Nepal time, 120 days
  const days = [];
  for (let page = 1; page <= 5; page++) {
    const r = await fetch(`https://www.nrb.org.np/api/forex/v1/rates?page=${page}&per_page=50&from=${iso(from)}&to=${iso(to)}`);
    if (!r.ok) throw new Error("NRB " + r.status);
    const j = await r.json();
    days.push(...((j.data && j.data.payload) || []));
    const p = j.pagination || {};
    if (!p.pages || page >= p.pages) break;
  }
  const rows = [];
  for (const day of days) {
    const jp = (day.rates || []).find(x => x.currency && x.currency.iso3 === "JPY");
    if (!jp) continue;
    const unit = Number(jp.currency.unit) || 1;
    const buy = Number(jp.buy), sell = Number(jp.sell);
    if (!(buy > 0) || !(sell > 0)) continue;              // NRB sometimes lists a day twice, once with 0 – skip it
    rows.push({ d: day.date, buy: +(buy * 100 / unit).toFixed(2), sell: +(sell * 100 / unit).toFixed(2) });
  }
  rows.sort((a, b) => a.d < b.d ? -1 : 1);
  for (let i = rows.length - 1; i > 0; i--) if (rows[i].d === rows[i - 1].d) rows.splice(i, 1);   // one row per date
  cache = rows; cacheAt = Date.now();
  return rows;
}

// Called by the hourly reminder job (18:00–20:00 Japan time)
async function fxAlerts(jpHour) {
  if (jpHour < 8 || jpHour > 21) return { skipped: "hour" };
  const rows = await nrbRates(), last = rows.at(-1);
  if (!last) return { skipped: "no rate" };
  // At most one alert a week per phone, so a rate that stays high does not send a message every day
  const weekAgo = new Date(Date.parse(last.d + "T00:00:00Z") - 6 * 864e5).toISOString().slice(0, 10);
  const r = await sb(`fx_alerts?select=id,endpoint,p256dh,auth,lang,target,last_sent&target=lte.${last.buy}&or=(last_sent.is.null,last_sent.lt.${weekAgo})&limit=2000`);
  if (!r.ok) return { skipped: "table " + r.status };
  const subs = await r.json(); let sent = 0, removed = 0;
  for (const s of subs) {
    const ne = s.lang === "ne";
    const msg = ne
      ? { title: "💱 रुपैयाँ दर लक्ष्यमा पुग्यो", body: `आजको नेपाल राष्ट्र बैंक दर: १०० येन = रु ${last.buy} (तपाईंको लक्ष्य: रु ${s.target})। पठाउनुअघि कम्पनीको दर र शुल्क जाँच्नुहोस्।` }
      : { title: "💱 Rupee rate reached your target", body: `Nepal Rastra Bank rate today: ¥100 = Rs ${last.buy} (your target: Rs ${s.target}). Check the company's own rate and fee before sending.` };
    try {
      const st = await sendPush(s, { ...msg, url: "/rate.html" });
      if (st === 404 || st === 410) { await sb(`fx_alerts?id=eq.${s.id}`, { method: "DELETE" }); removed++; continue; }
      if (st >= 200 && st < 300) { sent++; await sb(`fx_alerts?id=eq.${s.id}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ last_sent: last.d }) }); }
    } catch (e) { console.error("fx push", e); }
  }
  return { rate: last.buy, date: last.d, sent, removed };
}

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const rows = await nrbRates();
      res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
      return res.status(200).json({ source: "Nepal Rastra Bank", unit: "NPR per 100 JPY", rows });
    } catch (e) { console.error(e); return res.status(502).json({ error: "rate_unavailable" }); }
  }
  const { sub, lang = "en", target } = req.body || {};
  if (!validSub(sub)) return res.status(400).json({ error: "bad_subscription" });
  const ep = encodeURIComponent(sub.endpoint);
  if (req.method === "DELETE") {
    const r = await sb(`fx_alerts?endpoint=eq.${ep}`, { method: "DELETE" });
    return res.status(r.ok ? 200 : 500).json({ ok: r.ok });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  const t = Number(target);
  if (!(t > 10 && t < 1000)) return res.status(400).json({ error: "bad_target" });
  const del = await sb(`fx_alerts?endpoint=eq.${ep}`, { method: "DELETE" });
  const r = await sb("fx_alerts", { method: "POST", headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth, lang: lang === "ne" ? "ne" : "en", target: +t.toFixed(2) }) });
  if (!del.ok || !r.ok) { const d = await r.text(); console.error("fx save", r.status, d); return res.status(500).json({ error: "save_failed", status: r.status, detail: d.slice(0, 160) }); }
  return res.status(200).json({ ok: true });
}
module.exports = handler;
module.exports.fxAlerts = fxAlerts;
module.exports.nrbRates = nrbRates;
