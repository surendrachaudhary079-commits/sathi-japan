// Runs every evening (Vercel Cron, see vercel.json) and sends "Garbage day tomorrow" to each phone.
const { findTown, idsFor, jpDate, message, sendPush, sb } = require("./_lib");

module.exports = async function handler(req, res) {
  // Only Vercel's scheduler (or you, with the secret) may run this
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).json({ error: "unauthorized" });

  const tomorrow = jpDate(1);
  let sent = 0, skipped = 0, removed = 0, failed = 0;
  for (let offset = 0; ; offset += 1000) {
    const r = await sb(`push_subs?select=id,endpoint,p256dh,auth,city,town,lang&order=id&limit=1000&offset=${offset}`);
    if (!r.ok) { console.error("supabase", r.status, await r.text()); return res.status(500).json({ error: "load_failed" }); }
    const rows = await r.json();
    // Send 25 at a time so the job stays fast as users grow
    for (let i = 0; i < rows.length; i += 25) {
      await Promise.all(rows.slice(i, i + 25).map(async row => {
        const place = findTown(row.city, row.town);
        const ids = place ? idsFor(place.city, place.town, tomorrow) : [];
        if (!ids.length) { skipped++; return; }
        try {
          const status = await sendPush(row, { ...message(place.city, ids, row.lang), url: "/" });
          if (status === 404 || status === 410) {          // phone removed the permission → forget it
            await sb(`push_subs?id=eq.${row.id}`, { method: "DELETE" }); removed++;
          } else if (status >= 200 && status < 300) sent++;
          else { failed++; console.error("push status", status); }
        } catch (e) { failed++; console.error(e); }
      }));
    }
    if (rows.length < 1000) break;
  }
  return res.status(200).json({ date: tomorrow, sent, skipped, removed, failed });
};
