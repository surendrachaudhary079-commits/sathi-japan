# Sathi Japan

Life-in-Japan tools for foreign residents, in English and Nepali.
Website: https://sathi-japan.vercel.app · Hosting: Vercel (Hobby) · Database: Supabase (Tokyo)

Plain HTML, CSS and JavaScript pages – no framework, no build step needed to deploy.
Server code is small Vercel functions in `api/`.

---

## 1. Files

| File | What it is |
|---|---|
| `index.html` | Home page: hero, 6 service cards, garbage preview for the saved area, "New to Japan", tools, help lines, trusted info |
| `guides.html` + `guides-data.js` | Service guides: New to Japan, City office & paperwork, Healthcare & emergency, Banking & payments, Japanese learning, Daily life. **Only official, checked links – edit `guides-data.js` when something changes** |
| `about.html` | About, Contact (`#contact`) and Help/FAQ (`#help`) |
| `site.js` | Shared header (logo, menu, EN/नेपाली switch – remembered on the phone), shared footer, icons. **Put your contact email in `CONTACT_EMAIL` at the top** |
| `theme.css` | Shared colours (green/teal + blue, yellow, pastels), header and footer styles |
| `robots.txt`, `sitemap.xml` | Help Google find the pages |
| `garbage.html` | **Garbage calendar** – area, next collection, reminder, 2–6 week schedule, sorting guide, calendar file |
| `areas.js` | **All garbage data** (Niigata City: 91 official calendars, 1,272 towns; all of Shinjuku). Built from `data-src/` |
| `deadlines.html`, `visa.html`, `spouse.html`, `checklists.html` (+ `checklists-data.js`), `letter.html`, `rate.html` | Other tools |
| `share.js` | Share button (Viber, WhatsApp, Facebook, LINE, copy link) |
| `sw.js` | Service worker – shows push notifications. Does not cache anything |
| `manifest.json`, icons, `og.png` | App name/icon for "Add to Home Screen" and link previews |
| `privacy.html` | What we save. **Add your contact email.** |
| `vercel.json` | Daily backup run of the reminder job (20:00 JST) |
| `api/_lib.js` | Shared server code: garbage date rules, push encryption, Supabase helper |
| `api/subscribe.js`, `api/unsubscribe.js` | Save / delete a phone's garbage reminder |
| `api/remind.js` | The hourly job: sends garbage, deadline and rate reminders |
| `api/deadlines.js`, `api/fx.js`, `api/explain.js` | My deadlines, rate watch, letter explainer |
| `supabase-*.sql` | Database setup (run once in Supabase → SQL Editor) |
| `data-src/` | Sources and scripts that build `areas.js` and `garbage.html` (do not upload) |
| `.env.example` | List of the secret settings (example values only) |

**Never upload:** `sathi-secret-keys.txt`, `supabase-setup-READY.sql`, or any file with real keys.

---

## 2. Garbage calendar – how it works

**Where the dates come from.** `areas.js` → `window.SATHI_AREAS`. For Niigata City each town points to one of
the city's official calendars (`calendars[...].r` = rules such as "every Mon/Wed/Fri" or "2nd and 4th Saturday").
The rules were copied from each official calendar page (link and "last checked" date are shown in the page footer)
and tested against the published Oodori calendar for all 365 days.

**Special days (same code in `garbage.html` and `api/_lib.js`):**
- 1–3 January: no collection. 31 December: burnable garbage only.
- In January, the monthly items move one week later on calendars where the city says so.
- Public holidays: collected as normal (Niigata City official sorting sheet).
- Dates after `validUntil` (31 March 2027) are **not shown** – the page says the new calendar is not out yet.

**Area in the link.** `garbage.html?area=niigata.935` opens 大通西 (Ōdōri Nishi), Minami-ku.
The link is checked (`city.number`, the town must exist). It becomes the saved area, with an "Undo" if the phone
had a different one. The address bar always shows the current area, so it can be bookmarked or shared.

**Sorting rules** in the page come from Niigata City's official sheet
"ごみ・資源の分け方・出し方" (Dec 2024): https://www.city.niigata.lg.jp/kurashi/gomi/gomishigen/start.files/2024.12wakedashi_omote.pdf

**Yearly update (every April, and check before New Year):** update the calendar rules in `data-src/`,
run the build (section 6), upload `areas.js`.

---

## 3. Phone reminders – how they work

A timer in the page would stop when the page is closed, so reminders use **Web Push**:

1. The phone allows notifications → the browser gives a *push address* → `POST /api/subscribe`
   saves it in Supabase table `push_subs` with area, language and hour (default **7:00 PM**, choices 18–22 or 6–7).
2. **Supabase pg_cron** calls `/api/remind` every hour (with `Authorization: Bearer CRON_SECRET`).
   Vercel Cron runs it once more each day at 20:00 JST as a backup (Hobby plan allows only daily jobs).
3. `/api/remind` works out tomorrow's (evening) or today's (morning) garbage in Japan time,
   sends the push, and writes `last_sent` – so **one phone never gets the same day's reminder twice**.
4. `sw.js` shows the notification; tapping it opens the garbage page.

iPhone: works only after "Add to Home Screen" (iOS 16.4+). The page explains this.
If notifications are blocked, the page shows how to allow them. "Add to calendar" works without any server.

---

## 4. Setup (first time)

1. **Supabase** (free): create a project in Tokyo. SQL Editor → run `supabase-setup.sql`
   (put your CRON_SECRET and site address in it first – keep that filled copy private),
   then `supabase-deadlines.sql`, `supabase-fx.sql`, `supabase-letter.sql`.
2. **Push keys:** create a VAPID key pair once (e.g. `npx web-push generate-vapid-keys` on your computer).
3. **Vercel** → Project → Settings → Environment Variables: add every name in `.env.example`
   with your real values → **Redeploy**.
4. Check: open `/api/subscribe?check=1` – every line should say `ok`.

## 4b. How the pages fit together

- New pages (`index`, `guides`, `about`) have `<header id="sxHead">` and `<footer id="sxFoot">`; `site.js` fills them and calls `Sathi.onLang(render)` when the language changes.
- Tool pages keep their own language buttons; `site.js` adds the logo and the shared footer and follows their language.
- `garbage.html` has its own header/footer (built from `data-src/garbage.tpl.html`).
- Language is stored in `localStorage` key `lang` (`en` / `ne`) – the same key on every page.

## 5. Deploy an update (GitHub web)

1. Clear your Downloads folder first (a Mac adds "(1)" to repeated downloads).
2. GitHub repo → **Add file → Upload files** → drop the changed root files → **Commit changes**.
3. Files in `api/`: open the file → pencil (Edit) → paste the new content → Commit.
   New api file: **Add file → Create new file**, name it `api/name.js`.
4. Vercel deploys by itself in about 1 minute.

## 6. Run on your computer / rebuild data

```
python3 -m http.server 8000        # then open http://localhost:8000/garbage.html?area=niigata.935
```
Reminders need the Vercel functions, so test them on the live site (or `npx vercel dev` with your env vars).

Rebuild garbage data after editing `data-src/`:
```
cd data-src && python3 build_niigata.py && python3 build_areas.py     # writes ../areas.js
cp data-src/garbage.tpl.html garbage.html                              # page source = template
```

---

## 7. Legal reminders

- Sathi Japan is not an official city service and never fills in or submits applications (行政書士 work).
- No money transfer, job matching or real-estate features without a licence.
- Before earning money: check your 在留資格 (資格外活動許可) and your company's side-job rules;
  Vercel Hobby is for non-commercial use (upgrade to Pro before charging); add a 特定商取引法 page;
  file a tax return if side income is over ¥200,000 a year.
