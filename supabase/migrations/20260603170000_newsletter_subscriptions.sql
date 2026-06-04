-- Newsletter-tilaukset (footerin uutiskirjelomake). Puuttui uudesta projektista,
-- minkä takia newsletter-subscribe-funktio antoi errorin. Luodaan taulu.
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now()
);
alter table public.newsletter_subscriptions enable row level security;
-- Vain service_role (edge function) kirjoittaa/lukee; ei julkista pääsyä.
