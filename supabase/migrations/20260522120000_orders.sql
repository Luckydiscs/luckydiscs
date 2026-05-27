-- Lucky Discs orders schema
-- 2026-05-22: Verkkokaupan tilauksia varten — Paytrail integraatio

create extension if not exists "pgcrypto";

-- =====================
-- orders
-- =====================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  reference text unique not null,           -- Paytrail reference (= order_number)
  stamp text unique not null,                -- Paytrail stamp (unique idempotency key)
  status text not null default 'pending'
    check (status in ('pending','paid','failed','cancelled','shipped','refunded')),

  -- asiakas
  customer_first_name text not null,
  customer_last_name text not null,
  customer_email text not null,
  customer_phone text not null,

  -- toimitusosoite
  shipping_address text not null,
  shipping_postal_code text not null,
  shipping_city text not null,
  shipping_country text not null default 'FI',

  -- summat (kaikki sentteinä jotta ei floattia)
  subtotal_cents integer not null,
  shipping_cents integer not null,
  total_cents integer not null,
  currency text not null default 'EUR',

  -- Paytrail
  paytrail_transaction_id text,
  paytrail_provider text,
  paytrail_href text,

  -- timestamps
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  shipped_at timestamptz,
  cancelled_at timestamptz
);

create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_email_idx on public.orders(customer_email);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

-- =====================
-- order_items
-- =====================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,                -- esim. "basic-money-shot"
  product_name text not null,
  variant text,
  plastic text,
  weight text,
  color text,
  unit_price_cents integer not null,
  quantity integer not null check (quantity > 0),
  line_total_cents integer not null,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);

-- =====================
-- RLS
-- =====================
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Vain service_role saa lukea/kirjoittaa tilauksia (edge functionit käyttävät)
-- Asiakas ei tarvitse pääsyä — kuitti tulee sähköpostiin, status näkyy /shop/vahvistus
create policy "service role full access orders" on public.orders
  for all using (auth.role() = 'service_role');

create policy "service role full access order_items" on public.order_items
  for all using (auth.role() = 'service_role');

-- =====================
-- Apufunktio: lue order_number ja merkitse maksetuksi
-- =====================
create or replace function public.mark_order_paid(
  p_reference text,
  p_transaction_id text,
  p_provider text
) returns public.orders
language plpgsql
security definer
as $$
declare
  v_order public.orders;
begin
  update public.orders
    set status = 'paid',
        paid_at = now(),
        paytrail_transaction_id = p_transaction_id,
        paytrail_provider = p_provider
    where reference = p_reference
      and status = 'pending'
    returning * into v_order;

  return v_order;
end;
$$;

comment on table public.orders is 'Lucky Discs webshop orders (Paytrail-integraatio 2026-05-22)';
comment on table public.order_items is 'Lucky Discs webshop order line items';
