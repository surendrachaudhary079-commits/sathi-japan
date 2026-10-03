# Sathi Japan – Garbage Day Reminder (MVP)

First area: Niigata City, Minami-ku, "Oodori" calendar (code 74).
Covers 大通西, 大通1–2丁目, 大通黄金, 大通南, and part of 鷲ノ木新田.

## Folders
- `data/` – the garbage rules, typed by hand from the official city page. Edit this when rules change.
- `scripts/build.py` – turns the rules into every collection date + a calendar file.
- `public/` – the website Vercel shows (index.html, the dated data, the .ics file).

## Update the dates (every April and December)
1. Check the official city page (links are inside `data/niigata-minami-oodori.json`).
2. Change the JSON if anything changed, and update `last_checked`.
3. Run: `python3 scripts/build.py`
4. Commit and push to GitHub. Vercel updates the site by itself.

## Deploy (first time)
1. Push this folder to your GitHub repo `sathi-japan`.
2. Vercel → Add New → Project → import the repo → Deploy. (No framework, no build command needed.)
3. Later: Vercel → Settings → Domains → add `sathijapan.com`.

## Needs checking
- January 2027 Saturday dates are shifted one week because of the New Year holiday
  (the city's rule). Compare with the paper calendar code 74 before sharing.
- Nepali wording: please have a native speaker read it.

Not an official city service. Source: Niigata City.
