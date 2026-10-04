# Sathi Japan – Complete Guide

Version: 4 October 2026 · Areas: Niigata City Minami-ku (Oodori, code 74) and all of Shinjuku, Tokyo
Website: https://sathi-japan.vercel.app

---

## 1. What is in this folder

| File | What it is | Shown as |
|---|---|---|
| `index.html` | Home page: area picker, today/tomorrow garbage, next 7 days, garbage types, buttons to the other pages. | `/` |
| `areas.js` | **All garbage areas**: Niigata Minami-ku (Oodori), all 171 Shinjuku towns, and official links for 11 other cities. Built from `data-src/`. | used by index.html |
| `niigata-minami-oodori.ics` | Calendar file with every garbage day (to add reminders to a phone). | "Add reminders" button |
| `niigata-minami-oodori.json` | The same garbage data as a separate file (backup / for future use). | – |
| `checklists.html` | Life checklists page (arrival, moving, job change, leaving Japan). | "✅ Life checklists" button |
| `checklists-data.js` | All checklist steps, deadlines, official links and forms. **Edit this file when a rule changes.** | used by checklists.html |
| `visa.html` | Visa renewal guide: expiry reminder, steps, documents, forms, fees, help. | "🪪 Visa renewal" button |
| `vercel.json` | Vercel settings: calendar file type and the **evening reminder job (20:00–21:00 JST)**. Do not delete. | – |
| `api/` folder | Server code for reminders: `subscribe.js`, `unsubscribe.js`, `remind.js`, `_lib.js`. | runs on Vercel |
| `sw.js` | Shows the reminder notification on the phone. | – |
| `manifest.json`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | App name and icon (for "Add to Home Screen"). | – |
| `privacy.html` | "What we save" page (English + Nepali). **Add your contact email.** | footer link |
| `supabase-setup.sql` | Creates the reminder table in Supabase (run once). | – |
| `later-ai-letter/` | AI letter explainer – **do NOT upload yet** (needs a paid Claude API key). See section 6. | – |

Everything sits at the top level except the `api/` folder. Personal dates and ticks stay on each user's phone.
Only the evening reminders use a database (Supabase, free plan) – see section 10.

---

## 2. Put everything online (first time or full update)

1. Unzip `sathi-japan-complete.zip` on your computer.
2. Open your GitHub repo **sathi-japan** → **Add file → Upload files**.
3. Select these 8 files (NOT the `later-ai-letter` folder):
   `index.html, checklists.html, checklists-data.js, visa.html, niigata-minami-oodori.ics, niigata-minami-oodori.json, vercel.json, README.md`
4. Drag them in. Files with the same name are replaced automatically.
5. Wait until all 8 appear in the list → click **Commit changes**.
6. Vercel updates by itself in about 1 minute. Open https://sathi-japan.vercel.app and pull down to refresh.

**Check after uploading:**
- Home shows today's garbage (not empty boxes).
- The green "Life checklists" and purple "Visa renewal" buttons open their pages.
- Switching EN / नेपाली works on every page.

**If something looks old:** close the browser tab and open the link again (the phone may be showing a saved copy).

---

## 3. Use it yourself (test week)

- **Garbage reminders on Android / Google Calendar:** tap "Add reminders" → Add all. Then Google Calendar → ☰ → Settings → your calendar → All-day event notifications → "1 day before at 20:00".
- **iPhone:** tap "Add reminders" → Add all. Reminders at 20:00 the evening before and 6:30 on the day are built in.
- **Visa page:** enter your own residence card expiry date → tap "Add renewal reminders".
- **Add to home screen:** in the phone browser menu → "Add to Home screen". It opens like an app.

---

## 4. Share with testers (5–10 people first)

1. Send the link to a few Nepali friends in Minami-ku.
2. Ask 3 questions after one week:
   - Was any garbage day wrong?
   - Was any Nepali sentence unclear?
   - What else do you need help with in Japan?
3. Send me their answers – I will fix and improve.

Only people in the **Oodori calendar area** (大通西, 大通1–2丁目, 大通黄金, 大通南, part of 鷲ノ木新田) get correct garbage days for now. The checklists and visa guide work for everyone in Niigata.

---

## 5. Keeping it correct (maintenance)

| When | What to check | Who |
|---|---|---|
| Every month | All official links and rules still the same | Claude (scheduled check – ask me to set it up) |
| **March / April** | New garbage calendar (令和9年度), checklist rules, visa fees | Claude prepares new files, you upload |
| **December** | New Year garbage schedule (Jan 2027 Saturday shift) – compare with the paper calendar code 74 | You check, Claude fixes |
| Any time | A user reports a mistake | Send it to Claude |

The garbage data in this version covers **until 31 March 2027**. You MUST upload a new version before April 2027.

The rules and sources are saved in your Claude project notes:
`garbage-data-sources.md`, `checklist-rules-sources.md`, `visa-renewal-sources.md`, `forms-links.md`.

---

## 6. Later: AI letter explainer (when ready)

Needs a Claude API key (pay-per-use, about ¥2 per letter – your Claude chat plan does not cover it).

1. platform.claude.com → add a small credit (e.g. $5) → API Keys → Create key. Set a monthly spend limit.
2. Vercel → project → Settings → Environment Variables:
   - `ANTHROPIC_API_KEY` = your key
   - `ACCESS_CODE` = a password for testers (e.g. sathi2026)
3. GitHub → Add file → Upload files → upload `letter.html`.
4. GitHub → Add file → **Create new file** → name it exactly `api/explain.js` → paste the contents of `later-ai-letter/explain.js` → Commit.
5. Vercel → Deployments → ⋯ → Redeploy.
6. Ask Claude to add the "📮 Explain a letter" button back to the home page.

---

## 7. Rules we never break

- We **explain and remind only**. We never fill in or submit applications for users (that is licensed gyoseishoshi work). Users fill official forms themselves; we only link to them.
- We never store residence card numbers or My Number. Dates and ticks stay on the user's phone.
- Every page says "not legal / tax / immigration advice" and links to the official source.
- We link to official forms; we do not host copies (they change).

## 8. Before you earn money

- Check your visa's side-business permission (資格外活動許可) with Immigration.
- Check your company's side-job (副業) rules.
- Vercel's free Hobby plan is for non-commercial use – move to a paid plan before charging or showing ads.

---

## 9. Quick help

| Problem | Fix |
|---|---|
| Page shows empty boxes | Old `index.html` on GitHub – upload the new one again |
| Vercel shows 404 | A file is inside a folder on GitHub – files must be at the top level |
| Calendar reminders don't ring (Android) | Set "All-day event notifications" in Google Calendar settings |
| A form link is broken | Tell Claude – the government changed the file; Claude finds the new one |

Not an official government or city service.

---

## 10. Evening push reminders – one-time setup (about 20 minutes)

You need: the file `sathi-secret-keys.txt` (sent separately – keep it private, never upload it).

**A. Supabase (database)**
1. supabase.com → **New project** → name `sathi-japan` → choose region **Northeast Asia (Tokyo)** → set a database password → Create.
2. Left menu → **SQL Editor** → **New query** → paste everything from `supabase-setup.sql` → **Run**. You should see "Success".
3. Left menu → **Project Settings → API / API Keys**. Copy the **Project URL** and the **secret (service_role) key**.
   The secret key is like a master password – only put it in Vercel, never in GitHub.

**B. Vercel (settings)**
1. Vercel → project → **Settings → Environment Variables**. Add 6 variables:
   `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`, `CRON_SECRET` (from the keys file),
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (from Supabase).
   In `VAPID_SUBJECT` replace YOUR-EMAIL-HERE with your contact email (e.g. `mailto:you@gmail.com`).

**C. GitHub (upload)**
1. Repo → **Add file → Upload files**.
2. From the unzipped folder, drag in **all files AND the `api` folder itself** (drag the folder, don't open it).
   Do NOT upload `later-ai-letter`, `data-src` or the keys file.
3. Before committing, check the list shows `api/subscribe.js`, `api/remind.js`, `api/unsubscribe.js`, `api/_lib.js`.
   If they appear without `api/` in front, cancel and use **Add file → Create new file**, type the name `api/_lib.js`, paste the file's contents, commit – repeat for the other 3.
4. **Commit changes** → Vercel → **Deployments → ⋯ → Redeploy** (so it uses the new settings).

**D. Test**
1. Android: open the site in Chrome → choose your area → **🔔 Remind me every evening** → Allow. A "Reminders are on ✅" message should arrive within seconds.
2. iPhone: Safari → Share → **Add to Home Screen** → open it from the Home Screen → tap the button → Allow.
3. Vercel → project → **Settings → Cron Jobs** should list `/api/remind`. You can press **Run** to test it now (it only sends if tomorrow has a collection).
4. Problems? Vercel → **Logs** shows errors in plain text – send me a screenshot.

**E. Before you share it widely**
- Put your contact email in `privacy.html` (replace both "[add your contact email]").
- Reminders arrive between 20:00 and 21:00 (free plan timing).
