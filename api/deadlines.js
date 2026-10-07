// My deadlines – phone reminders. The phone sends its whole list; we replace the saved rows.
// Saved per row: push address + keys, language, reminder hour, type, date, days-before, instalment no.,
// and an optional short label the person typed (max 40 characters). No names, card or account numbers.
const { env, sb, validSub, sendPush, HOURS, DL, dlMessage } = require("./_lib");

const iso = s => /^\d{4}-\d{2}-\d{2}$/.test(s || "") && !isNaN(new Date(s + "T00:00:00Z"));
const jpToday = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
const clean = s => String(s || "").replace(/\d{6,}/g, "…").replace(/[\u0000-\u001f<>]/g, "").slice(0, 40).trim();

module.exports = async function handler(req, res) {
  if (req.method === "GET") return res.status(200).json({ publicKey: env("VAPID_PUBLIC_KEY") || null });
  const { sub, lang = "en", hour = 20, items = [], test = false } = req.body || {};
  if (!validSub(sub)) return res.status(400).json({ error: "bad_subscription" });
  const ep = encodeURIComponent(sub.endpoint);

  if (req.method === "DELETE") {
    const r = await sb(`dl_items?endpoint=eq.${ep}`, { method: "DELETE" });
    return res.status(r.ok ? 200 : 500).json({ ok: r.ok });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  if (!HOURS.includes(Number(hour))) return res.status(400).json({ error: "bad_hour" });
  if (!Array.isArray(items) || items.length > 60) return res.status(400).json({ error: "bad_items" });

  const today = jpToday();
  const rows = [];
  for (const it of items) {
    if (!DL[it.k] || !iso(it.d) || it.d < today || it.done) continue;
    const before = (Array.isArray(it.b) ? it.b : [7, 1]).map(Number).filter(n => Number.isInteger(n) && n >= 0 && n <= 200).slice(0, 5);
    rows.push({ endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth, lang: lang === "ne" ? "ne" : "en",
      hour: Number(hour), kind: it.k, due: it.d, before: before.length ? before : [1],
      n: Number.isInteger(it.n) && it.n > 0 && it.n < 20 ? it.n : null, label: it.k === "cu" ? clean(it.l) || null : null });
  }
  // Replace this phone's list
  const del = await sb(`dl_items?endpoint=eq.${ep}`, { method: "DELETE" });
  if (!del.ok) { const d = await del.text(); console.error("dl delete", del.status, d); return res.status(500).json({ error: "save_failed", status: del.status, detail: d.slice(0, 160) }); }
  if (rows.length) {
    const r = await sb("dl_items", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(rows) });
    if (!r.ok) { const d = await r.text(); console.error("dl insert", r.status, d); return res.status(500).json({ error: "save_failed", status: r.status, detail: d.slice(0, 160) }); }
  }
  if (test && rows.length) {
    const next = [...rows].sort((a, b) => a.due < b.due ? -1 : 1).slice(0, 1);
    try { await sendPush(rows[0], { ...dlMessage(next, rows[0].lang, today), url: "/deadlines.html" }); } catch (e) { console.error("test push", e); }
  }
  return res.status(200).json({ ok: true, saved: rows.length });
};
