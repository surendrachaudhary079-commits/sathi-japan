// Turn reminders off: deletes this phone's row completely.
const { sb } = require("./_lib");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const endpoint = req.body && req.body.endpoint;
  if (typeof endpoint !== "string" || !endpoint.startsWith("https://")) return res.status(400).json({ error: "bad_endpoint" });
  const r = await sb(`push_subs?endpoint=eq.${encodeURIComponent(endpoint)}`, { method: "DELETE" });
  return res.status(r.ok ? 200 : 500).json({ ok: r.ok });
};
