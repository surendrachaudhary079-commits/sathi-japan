// Runs every hour (Supabase pg_cron, plus Vercel Cron as a daily backup – see supabase-setup.sql / vercel.json).
// Sends to the phones whose chosen time is this hour (Japan time).
//   06:00 / 07:00  → today's garbage ("Garbage day today")
//   18:00 – 22:00  → tomorrow's garbage ("Garbage day tomorrow")
const { fxAlerts } = require("./fx");

// Event reminders. The event date is read fresh from the "events" table every time,
// so if you correct a festival date on events-admin.html, reminders follow the new date.
async function eventReminders(hour, today) {
  const out = { sent: 0, removed: 0, failed: 0 };
  const r = await sb(`event_reminders?select=id,endpoint,p256dh,auth,lang,key,title,before,last_sent&hour=eq.${hour}&limit=5000`);
  if (!r.ok) { if (r.status !== 404) console.error("event_reminders", r.status, await r.text()); return out; }
  const rows = (await r.json()).filter(x => x.last_sent !== today);
  if (!rows.length) return out;
  const ids = [...new Set(rows.filter(x => x.key.startsWith("e:")).map(x => x.key.slice(2)))];
  const evs = new Map();
  for (let i = 0; i < ids.length; i += 100) {
    const q = await sb(`events?select=id,title_en,title_ne,start_date,status&id=in.(${ids.slice(i, i + 100).join(",")})&status=in.(verified,unverified)`);
    if (q.ok) for (const e of await q.json()) evs.set(String(e.id), e);
  }
  const DAY = 864e5, byPhone = new Map();
  for (const x of rows) {
    let date, name;
    if (x.key.startsWith("h:")) { date = x.key.slice(2); let t = {}; try { t = JSON.parse(x.title || "{}"); } catch (_) {} name = (x.lang === "ne" ? t.ne : t.en) || t.ja || ""; }
    else { const e = evs.get(x.key.slice(2)); if (!e || !e.start_date) continue; date = e.start_date; name = (x.lang === "ne" && e.title_ne) || e.title_en; }
    const days = Math.round((Date.parse(date + "T00:00:00Z") - Date.parse(today + "T00:00:00Z")) / DAY);
    if (!(x.before || []).includes(days)) continue;
    if (!byPhone.has(x.endpoint)) byPhone.set(x.endpoint, []);
    byPhone.get(x.endpoint).push({ ...x, date, name, days });
  }
  const done = [];
  for (const list of byPhone.values()) {
    const ne = list[0].lang === "ne";
    const when = d => d === 0 ? (ne ? "आज" : "today") : d === 1 ? (ne ? "भोलि" : "tomorrow") : (ne ? `${d} दिनमा` : `in ${d} days`);
    const fmt = d => { const x = new Date(d + "T00:00:00Z"); return ne ? `${x.getUTCMonth() + 1}/${x.getUTCDate()}` : x.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }); };
    const msg = { title: ne ? "📅 Sathi: कार्यक्रम आउँदैछ" : "📅 Sathi: event coming up",
      body: list.map(x => `${x.name} – ${when(x.days)} (${fmt(x.date)})`).join("\n"), url: "/events.html" };
    try {
      const st = await sendPush(list[0], msg);
      if (st === 404 || st === 410) { await sb(`event_reminders?endpoint=eq.${encodeURIComponent(list[0].endpoint)}`, { method: "DELETE" }); out.removed++; }
      else if (st >= 200 && st < 300) { out.sent++; done.push(...list.map(x => x.id)); }
      else { out.failed++; console.error("event push", st); }
    } catch (e) { out.failed++; console.error(e); }
  }
  for (let i = 0; i < done.length; i += 200)
    await sb(`event_reminders?id=in.(${done.slice(i, i + 200).join(",")})`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ last_sent: today }) });
  return out;
}
const { HOURS, loadAreas, findTown, idsFor, jpDate, message, sendPush, sb, dlMessage } = require("./_lib");

module.exports = async function handler(req, res) {
  // Only the schedulers (or you, with the secret) may run this
  if (req.headers.authorization !== `Bearer ${(process.env.CRON_SECRET || "").trim()}`) return res.status(401).json({ error: "unauthorized" });

  // Current Japan hour. A few minutes early still counts (schedulers can start at 19:59:58).
  const jp = new Date(Date.now() + 9 * 3600e3 + 10 * 60e3);
  // Vercel's daily backup job (11:00 UTC) always means the 20:00 group, even if it starts late
  const hour = req.headers["x-vercel-cron-schedule"] ? 20 : (req.query && req.query.hour ? Number(req.query.hour) : jp.getUTCHours());
  if (!HOURS.includes(hour)) return res.status(200).json({ hour, note: "no reminders at this hour" });

  // ---- Yen → rupee rate alerts: checked at 18:00–20:00 (Nepal Rastra Bank publishes around noon Japan time) ----
  let fx = null;
  if (hour >= 18 && hour <= 20) { try { fx = await fxAlerts(hour); } catch (e) { console.error("fx", e); fx = { error: String(e.message || e) }; } }

  try { await loadAreas((req.headers || {}).host); } catch (e) { console.error(e); return res.status(500).json({ error: "areas_unavailable" }); }
  const morning = hour < 12;
  const today = jpDate(0), target = morning ? today : jpDate(1);
  let sent = 0, skipped = 0, removed = 0, failed = 0, already = 0;
  const done = [];

  for (let offset = 0; ; offset += 1000) {
    const r = await sb(`push_subs?select=id,endpoint,p256dh,auth,city,town,lang,last_sent&hour=eq.${hour}&order=id&limit=1000&offset=${offset}`);
    if (!r.ok) { console.error("supabase", r.status, await r.text()); return res.status(500).json({ error: "load_failed" }); }
    const rows = await r.json();
    // Send 25 at a time so the job stays fast as users grow
    for (let i = 0; i < rows.length; i += 25) {
      await Promise.all(rows.slice(i, i + 25).map(async row => {
        if (row.last_sent === today) { already++; return; }   // never twice in one day
        const place = findTown(row.city, row.town);
        const ids = place ? idsFor(place.city, place.town, target) : [];
        if (!ids.length) { skipped++; return; }
        try {
          const status = await sendPush(row, { ...message(place.city, ids, row.lang, morning, place.town), url: "/" });
          if (status === 404 || status === 410) {            // phone removed the permission → forget it
            await sb(`push_subs?id=eq.${row.id}`, { method: "DELETE" }); removed++;
          } else if (status >= 200 && status < 300) { sent++; done.push(row.id); }
          else { failed++; console.error("push status", status); }
        } catch (e) { failed++; console.error(e); }
      }));
    }
    if (rows.length < 1000) break;
  }
  // Remember who got today's reminder
  for (let i = 0; i < done.length; i += 200) {
    await sb(`push_subs?id=in.(${done.slice(i, i + 200).join(",")})`, {
      method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ last_sent: today }) });
  }
  // ---- My deadlines: one notification per phone listing everything due on a reminder day ----
  const dl = { sent: 0, removed: 0, failed: 0 };
  try {
    const end = jpDate(200);
    const r = await sb(`dl_items?select=id,endpoint,p256dh,auth,lang,kind,due,before,n,label,last_sent&hour=eq.${hour}&due=gte.${today}&due=lte.${end}&order=due&limit=5000`);
    if (r.ok) {
      const rows = await r.json(), byPhone = new Map();
      for (const row of rows) {
        const days = Math.round((new Date(row.due + "T00:00:00Z") - new Date(today + "T00:00:00Z")) / 864e5);
        if (row.last_sent === today || !(row.before || []).includes(days)) continue;
        if (!byPhone.has(row.endpoint)) byPhone.set(row.endpoint, []);
        byPhone.get(row.endpoint).push(row);
      }
      const doneIds = [];
      for (const list of byPhone.values()) {
        try {
          const status = await sendPush(list[0], { ...dlMessage(list, list[0].lang, today), url: "/deadlines.html" });
          if (status === 404 || status === 410) { await sb(`dl_items?endpoint=eq.${encodeURIComponent(list[0].endpoint)}`, { method: "DELETE" }); dl.removed++; }
          else if (status >= 200 && status < 300) { dl.sent++; doneIds.push(...list.map(x => x.id)); }
          else { dl.failed++; console.error("dl push status", status); }
        } catch (e) { dl.failed++; console.error(e); }
      }
      for (let i = 0; i < doneIds.length; i += 200)
        await sb(`dl_items?id=in.(${doneIds.slice(i, i + 200).join(",")})`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ last_sent: today }) });
    } else if (r.status !== 404) console.error("dl load", r.status, await r.text());
  } catch (e) { console.error("deadlines", e); }

  // ---- Event reminders (festivals, community events, Japanese holidays): one notification per phone ----
  const ev = { sent: 0, removed: 0, failed: 0 };
  try { Object.assign(ev, await eventReminders(hour, today)); } catch (e) { console.error("events", e); ev.error = String(e.message || e); }

  return res.status(200).json({ hour, target, sent, skipped, already, removed, failed, deadlines: dl, fx, events: ev });
};
