-- Ostoskori-muistutus ("jäikö ostos kesken")
-- reminder_sent_at: estää saman muistutuksen lähettämisen kahdesti
alter table public.orders
  add column if not exists reminder_sent_at timestamptz;

create index if not exists orders_reminder_idx
  on public.orders (status, reminder_sent_at, created_at);
