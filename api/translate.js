// Japanese helper (translate.html): boss speech → English + Nepali, reply in polite Japanese,
// study a drama line, explain a word or the grammar of a sentence, check a practice answer.
//   POST { mode: "boss"|"reply"|"study"|"word"|"grammar"|"check", text, ctx?, code? }
//   → { ok:true, out:{...}, left } or { ok:false, error:"not_ready"|"code"|"limit"|"busy"|"too_long"|"bad"|"ai" }
// Needs in Vercel: ANTHROPIC_API_KEY (and the Supabase keys you already have).
// Optional:   TRANSLATE_CODE  → people must type this code (good while testing)
//             TRANSLATE_PER_DAY (default 300 per person), TRANSLATE_ALL_DAY (default 5000 for the whole site)
// Nothing the user says or types is saved. Only a scrambled code + a counter per day (see supabase-translate.sql).
const crypto = require("crypto");
const { sb, env, jpDate } = require("./_lib");

const MODEL = "claude-haiku-5-5";   // cheapest current model: $0.10 in / $0.50 out per million tokens
const FURI = `"furi": the Japanese text split into pieces as [[text, reading]] — reading in hiragana ONLY for pieces containing kanji, "" otherwise (e.g. [["お",""],["前","まえ"],["が",""]]); joining every text piece must give the Japanese text exactly`;

const MODES = {
  boss: { max: 600, tokens: 1500, sys: `You are a live interpreter for a Nepali worker in a Japanese workplace. The input is Japanese speech from their boss or coworker, possibly transcribed by speech recognition (may contain errors, missing punctuation, or fragments — infer the most likely meaning from workplace context).
Return ONLY JSON: {"ja": cleaned-up Japanese, ${FURI}, "en": natural English translation, "ne": natural Nepali translation in Devanagari, "note": short Nepali tip or ""}.
"note": only when useful — e.g. it is an instruction/request the worker must act on (say clearly what to do), a deadline/time/number, indirect Japanese that really means "no" or "please don't", or polite phrasing whose real meaning differs from the literal words. One sentence in simple Nepali. Otherwise "".
Keep numbers, times and names exactly. Do not add anything not said.` },

  reply: { max: 600, tokens: 1200, sys: `Turn the user's message (Nepali or English) into natural, polite Japanese a foreign worker would say to their boss at work (丁寧語/敬語, not overly stiff).
Return ONLY JSON: {"ja": Japanese, ${FURI}, "romaji": Hepburn romaji for reading aloud, "back": short English back-translation so the user can check the meaning, "back_ne": the same back-translation in simple Nepali}.` },

  study: { max: 300, tokens: 3000, sys: `You are a Japanese tutor for a Nepali speaker who also reads English. The input is ONE line of Japanese (from work, TV, anime or a film; it may be typed by a learner or come from speech recognition, so fix obvious errors).
Return ONLY JSON:
{"ja": corrected Japanese line, ${FURI},
 "kana": whole line in hiragana/katakana, "romaji": Hepburn romaji,
 "en": natural English meaning, "ne": natural Nepali meaning (Devanagari),
 "words": [{"w": word as written, "r": reading in kana, "en": short English, "ne": short Nepali}] — every meaningful word/particle in order, dictionary form noted in "en" if conjugated (e.g. "doing (する)"),
 "grammar": 1-2 short sentences in simple Nepali explaining the key grammar or casual speech pattern. Say if it is casual/rude/polite and whether it is OK to use with a boss.}` },

  word: { max: 30, tokens: 800, sys: `Explain ONE Japanese word for a Nepali learner who also reads English.
Return ONLY JSON: {"word": the word in dictionary form as normally written (e.g. 戦った → 戦う; keep nouns as is), "reading": hiragana reading of "word", "en": short English meaning as used in the sentence, "ne": short Nepali meaning (Devanagari), "pos": part of speech in English (noun, verb, i-adjective, na-adjective, adverb, expression...), "jlpt": "N5".."N1" or "", "note": one short simple-Nepali sentence on nuance/usage (formal? old-fashioned? common at work? rude?) or ""}` },

  grammar: { max: 300, tokens: 6000, sys: `You are a friendly Japanese grammar teacher for a Nepali speaker (beginner to intermediate) who lives and works in Japan. Analyse ONE Japanese sentence.
Return ONLY JSON:
{"register": one of "polite","casual","rough","honorific","old-fashioned / fictional",
 "register_ne": one simple Nepali sentence: who talks like this, and is it OK to say to a boss or coworker,
 "natural": if the sentence is old-fashioned, fictional, rude or unnatural for daily life in Japan today, the same meaning in natural modern polite Japanese; otherwise "",
 "natural_ne": Nepali meaning of "natural" or "",
 "points": the 2-4 most useful grammar points in the sentence (most useful for real life first). Each:
   {"pattern": e.g. "〜ですが" or "は", "name": short English name, "level": "N5".."N1",
    "everyday": true if common in daily life today, false if mainly movies/anime/old speech,
    "ne": 1-3 short sentences in simple Nepali: what it means and when to use it,
    "en": one short English explanation,
    "rule": how to build it, e.g. "Noun + ですが", "Verb て-form + いる"; include polite/casual forms,
    "examples": exactly 2 short NEW everyday sentences (work, shop, station, friends): [{"ja": ..., "en": ..., "ne": ...}],
    "practice": {"ne": a realistic situation in simple Nepali asking the learner to say one thing with this pattern, "en": same task in English, "answer": one good natural Japanese answer}}]}` },

  check: { max: 300, tokens: 1000, sys: `A Nepali learner of Japanese is practising a grammar pattern. Judge their answer kindly. The answer may be in kana, kanji or romaji — accept all.
Return ONLY JSON: {"ok": true if the meaning fits the task and the pattern is used correctly (small mistakes ok), "corrected": a natural corrected Japanese version (or their answer if already good), "ne": 1-2 short sentences of feedback in simple Nepali, "en": the same feedback in English}` }
};

const str = (v, max) => typeof v === "string" ? v.trim().slice(0, max) : "";
function who(req) {
  const ip = String((req.headers["x-forwarded-for"] || "").split(",")[0] || req.socket?.remoteAddress || "?").trim();
  return crypto.createHash("sha256").update("tr|" + ip + "|" + env("CRON_SECRET") + "|" + jpDate(0)).digest("hex").slice(0, 32);
}
function codeOk(got) {
  const want = env("TRANSLATE_CODE");
  if (!want) return true;
  got = String(got || "");
  return got.length === want.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(want));
}
// Counts one use. Returns how many are left today, or -1 (person) / -2 (whole site) when the limit is reached.
async function hit(id) {
  const r = await sb("rpc/translate_hit", { method: "POST", body: JSON.stringify({
    p_who: id, p_day: jpDate(0), p_max: Number(env("TRANSLATE_PER_DAY")) || 300, p_all: Number(env("TRANSLATE_ALL_DAY")) || 5000 }) });
  if (!r.ok) throw new Error("usage table " + r.status);
  return Number(await r.json());
}
function parseJSON(t) {
  t = String(t || "").replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
  try { return JSON.parse(t); } catch (_) {}
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a >= 0 && b > a) try { return JSON.parse(t.slice(a, b + 1)); } catch (_) {}
  return null;
}
async function ask(mode, user) {
  const m = MODES[mode];
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": env("ANTHROPIC_API_KEY"), "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: m.tokens, output_config: { effort: "low" },
      system: m.sys, messages: [{ role: "user", content: user }] })
  });
  if (r.status === 429 || r.status === 529) return { busy: true };
  if (!r.ok) { console.error("anthropic", r.status, (await r.text()).slice(0, 300)); return null; }
  const d = await r.json();
  const text = (d.content || []).filter(c => c.type === "text").map(c => c.text).join("");
  return { out: parseJSON(text) };
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "bad" });
  if (!env("ANTHROPIC_API_KEY")) return res.status(503).json({ ok: false, error: "not_ready" });
  let b = req.body; if (typeof b === "string") try { b = JSON.parse(b); } catch (_) { b = {}; }
  b = b || {};
  const mode = String(b.mode || ""), m = MODES[mode];
  if (!m) return res.status(400).json({ ok: false, error: "bad" });
  if (!codeOk(b.code)) return res.status(403).json({ ok: false, error: "code" });
  const raw = typeof b.text === "string" ? b.text.trim() : "";
  if (!raw) return res.status(400).json({ ok: false, error: "bad" });
  if (raw.length > m.max) return res.status(400).json({ ok: false, error: "too_long" });
  const c = b.ctx && typeof b.ctx === "object" ? b.ctx : {};

  let user;
  if (mode === "boss") user = "Japanese:\n" + raw;
  else if (mode === "reply") user = "Message:\n" + raw;
  else if (mode === "study") user = "Line:\n" + raw;
  else if (mode === "word") user = `Word tapped: ${raw}\nSentence: ${str(c.ja, 300) || "(none)"}`;
  else if (mode === "grammar") user = `Sentence: ${raw}\nEnglish meaning: ${str(c.en, 400)}\nNepali meaning: ${str(c.ne, 400)}`;
  else user = `Pattern: ${str(c.pattern, 60)} (${str(c.rule, 200)})\nTask: ${str(c.task, 300)}\nModel answer: ${str(c.answer, 200)}\nLearner's answer: ${raw}`;

  let left;
  try { left = await hit(who(req)); }
  catch (e) { console.error(e); return res.status(503).json({ ok: false, error: "not_ready" }); }
  if (left < 0) return res.status(429).json({ ok: false, error: "limit", site: left === -2 });

  try {
    const r = await ask(mode, user);
    if (r && r.busy) return res.status(503).json({ ok: false, error: "busy" });
    if (!r || !r.out || typeof r.out !== "object") return res.status(502).json({ ok: false, error: "ai" });
    return res.status(200).json({ ok: true, out: r.out, left });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ ok: false, error: "ai" });
  }
};
