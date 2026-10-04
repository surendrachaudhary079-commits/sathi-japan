// Turn reminders on (or update area/language). Saves: push address, area, language. Nothing else.
const { env, keyKind, findTown, sb, validSub, sendPush, HOURS } = require("./_lib");

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    // The phone needs the public key before it can subscribe
    const out = { publicKey: env("VAPID_PUBLIC_KEY") || null };
    if (req.query && req.query.check) {
      // Safe self-check: only yes/no answers, never the secret values
      out.check = {
        VAPID_PUBLIC_KEY: !!env("VAPID_PUBLIC_KEY"), VAPID_PRIVATE_KEY: !!env("VAPID_PRIVATE_KEY"),
        VAPID_SUBJECT: env("VAPID_SUBJECT").startsWith("mailto:") ? "ok" : "should start with mailto:",
        CRON_SECRET: !!env("CRON_SECRET"),
        SUPABASE_URL: /^https:\/\/[a-z0-9]+\.supabase\.co/.test(env("SUPABASE_URL")) ? "ok" : (env("SUPABASE_URL") ? "looks wrong" : "missing"),
        SUPABASE_KEY: keyKind() };
      try {
        const r = await sb("push_subs?select=id&limit=1");
        out.check.database = r.ok ? "ok" : `error ${r.status}: ${(await r.text()).slice(0, 120)}`;
      } catch (e) { out.check.database = "cannot reach: " + e.message; }
    }
    return res.status(200).json(out);
  }
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { sub, city, town, lang = "en", hour = 20, test = false } = req.body || {};
  if (!validSub(sub)) return res.status(400).json({ error: "bad_subscription" });
  const place = findTown(city, Number(town));
  if (!place || place.town.special) return res.status(400).json({ error: "bad_area" });
  if (!["en", "ne"].includes(lang)) return res.status(400).json({ error: "bad_lang" });
  if (!HOURS.includes(Number(hour))) return res.status(400).json({ error: "bad_hour" });

  const row = { endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth, city, town: Number(town), lang, hour: Number(hour) };
  const r = await sb("push_subs?on_conflict=endpoint", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(row) });
  if (!r.ok) {
    const detail = (await r.text()).slice(0, 200);
    console.error("supabase", r.status, detail);
    return res.status(500).json({ error: "save_failed", status: r.status, detail });
  }

  if (test) {
    const hh = `${Number(hour)}:00`, morning = Number(hour) < 12;
    const m = lang === "ne"
      ? { title: "रिमाइन्डर सक्रिय भयो ✅", body: `${morning ? "फोहोर फाल्ने दिन बिहान" : "फोहोर फाल्ने दिनको अघिल्लो बेलुका"} ${hh} मा सम्झाउँछौं – ${place.town.ro}` }
      : { title: "Reminders are on ✅", body: `We'll remind you at ${hh} ${morning ? "on the morning of" : "the evening before"} each collection day – ${place.town.ro}` };
    try { await sendPush(row, { ...m, url: "/" }); } catch (e) { console.error("test push", e); }
  }
  return res.status(200).json({ ok: true });
};
