// Turn reminders on (or update area/language). Saves: push address, area, language. Nothing else.
const { findTown, sb, validSub, sendPush, message } = require("./_lib");

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    // The phone needs the public key before it can subscribe
    return res.status(200).json({ publicKey: process.env.VAPID_PUBLIC_KEY || null });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { sub, city, town, lang = "en", test = false } = req.body || {};
  if (!validSub(sub)) return res.status(400).json({ error: "bad_subscription" });
  const place = findTown(city, Number(town));
  if (!place || place.town.special) return res.status(400).json({ error: "bad_area" });
  if (!["en", "ne"].includes(lang)) return res.status(400).json({ error: "bad_lang" });

  const row = { endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth, city, town: Number(town), lang };
  const r = await sb("push_subs?on_conflict=endpoint", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(row) });
  if (!r.ok) {
    console.error("supabase", r.status, await r.text());
    return res.status(500).json({ error: "save_failed" });
  }

  if (test) {
    const m = lang === "ne"
      ? { title: "रिमाइन्डर सक्रिय भयो ✅", body: `हरेक बेलुका ८ बजेतिर भोलिको फोहोर बताउँछौं – ${place.town.ro}` }
      : { title: "Reminders are on ✅", body: `We'll tell you each evening around 8 PM what to put out tomorrow – ${place.town.ro}` };
    try { await sendPush(row, { ...m, url: "/" }); } catch (e) { console.error("test push", e); }
  }
  return res.status(200).json({ ok: true });
};
