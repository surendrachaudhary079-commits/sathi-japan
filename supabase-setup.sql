-- Sathi Japan: table for evening garbage reminders.
-- Paste this into Supabase → SQL Editor → New query → Run.
create table if not exists public.push_subs (
  id         bigint generated always as identity primary key,
  endpoint   text not null unique,      -- push address given by the phone's browser
  p256dh     text not null,             -- encryption key from the browser
  auth       text not null,             -- encryption secret from the browser
  city       text not null,             -- e.g. 'shinjuku'
  town       int  not null,             -- town number in areas.js
  lang       text not null default 'en',
  created_at timestamptz not null default now()
);
-- Lock the table: nobody can read it from the internet.
-- Only the Vercel functions (with the secret key) can use it.
alter table public.push_subs enable row level security;
