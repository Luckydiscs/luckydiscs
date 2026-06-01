-- ════════════════════════════════════════════════════════════════
-- Lucky Discs — täysi taustajärjestelmä (2026-05-30)
-- products + variants + orders + order_items + blog_posts
-- RLS, auto-stock-vähennys, admin-näkymät
-- ════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ════════════════════════════════════════════════════════════════
-- 1. PRODUCTS (varasto DB:ssä, ei kovakoodattu)
-- ════════════════════════════════════════════════════════════════
create table if not exists public.products (
  id            text primary key,           -- "premium-bank-robber"
  name          text not null,
  variant       text,                        -- "Premium" / "Ultrium" / "6 kiekkoa"
  plastic       text,
  category      text not null,               -- midrange / fairway-driver / distance-driver / marker / bundle / signature
  category_label text not null,
  price_cents   integer not null,
  original_price_cents integer,
  description   text,
  image_url     text,
  flight_speed  integer,
  flight_glide  integer,
  flight_turn   integer,
  flight_fade   integer,
  badge         text,                        -- "LIMITED" / "SÄÄSTÄ -32%"
  sort_order    integer not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ════════════════════════════════════════════════════════════════
-- 2. PRODUCT VARIANTS (väri × paino × stock)
-- ════════════════════════════════════════════════════════════════
create table if not exists public.product_variants (
  id         uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on delete cascade,
  color      text not null,                  -- "oranssi", "keltainen" jne.
  weight     text not null,                  -- "169-172g"
  stock      integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, color, weight)
);
create index if not exists product_variants_product_idx on public.product_variants(product_id);

-- ════════════════════════════════════════════════════════════════
-- 3. ORDERS
-- ════════════════════════════════════════════════════════════════
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  reference    text unique not null,
  stamp        text unique not null,
  status text not null default 'pending'
    check (status in ('pending','paid','failed','cancelled','shipped','refunded')),

  customer_first_name text not null,
  customer_last_name  text not null,
  customer_email      text not null,
  customer_phone      text not null,

  shipping_address     text not null,
  shipping_postal_code text not null,
  shipping_city        text not null,
  shipping_country     text not null default 'FI',

  subtotal_cents integer not null,
  shipping_cents integer not null,
  total_cents    integer not null,
  currency       text not null default 'EUR',

  paytrail_transaction_id text,
  paytrail_provider       text,
  paytrail_href           text,

  tracking_number   text,
  tracking_url      text,
  shipping_provider text default 'posti',

  created_at  timestamptz not null default now(),
  paid_at     timestamptz,
  shipped_at  timestamptz,
  cancelled_at timestamptz
);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_email_idx on public.orders(customer_email);
create index if not exists orders_created_idx on public.orders(created_at desc);

-- ════════════════════════════════════════════════════════════════
-- 4. ORDER ITEMS
-- ════════════════════════════════════════════════════════════════
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id   text not null,
  product_name text not null,
  variant text,
  color   text,
  weight  text,
  unit_price_cents integer not null,
  quantity integer not null check (quantity > 0),
  line_total_cents integer not null,
  created_at timestamptz not null default now()
);
create index if not exists order_items_order_idx on public.order_items(order_id);

-- ════════════════════════════════════════════════════════════════
-- 5. BLOG POSTS (Cowork-agentit kirjoittavat tänne → live ilman deployta)
-- ════════════════════════════════════════════════════════════════
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  content text not null,               -- markdown
  category text,
  keywords text,
  reading_time integer,
  author text default 'Lucky Discs',
  hero_image text,
  hero_alt text,
  published boolean not null default false,
  published_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blog_posts_published_idx on public.blog_posts(published, published_at desc);

-- ════════════════════════════════════════════════════════════════
-- 6. AUTO-STOCK: vähennä saldo kun tilaus maksetaan
-- ════════════════════════════════════════════════════════════════
create or replace function public.decrement_stock_for_order(p_order_id uuid)
returns void language plpgsql security definer as $$
declare r record;
begin
  for r in
    select product_id, color, weight, quantity
    from public.order_items where order_id = p_order_id
  loop
    if r.color is not null and r.weight is not null then
      update public.product_variants
        set stock = greatest(0, stock - r.quantity), updated_at = now()
        where product_id = r.product_id and color = r.color and weight = r.weight;
    end if;
  end loop;
end;
$$;

-- Merkitse maksetuksi + vähennä stock atomisesti (idempotentti)
create or replace function public.mark_order_paid(
  p_reference text, p_transaction_id text, p_provider text
) returns public.orders language plpgsql security definer as $$
declare v_order public.orders;
begin
  update public.orders
    set status='paid', paid_at=now(),
        paytrail_transaction_id=p_transaction_id, paytrail_provider=p_provider
    where reference=p_reference and status='pending'
    returning * into v_order;

  if v_order.id is not null then
    perform public.decrement_stock_for_order(v_order.id);
  end if;
  return v_order;
end;
$$;

-- updated_at-trigger
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists t_products_updated on public.products;
create trigger t_products_updated before update on public.products
  for each row execute function public.touch_updated_at();
drop trigger if exists t_variants_updated on public.product_variants;
create trigger t_variants_updated before update on public.product_variants
  for each row execute function public.touch_updated_at();
drop trigger if exists t_blog_updated on public.blog_posts;
create trigger t_blog_updated before update on public.blog_posts
  for each row execute function public.touch_updated_at();

-- ════════════════════════════════════════════════════════════════
-- 7. RLS — julkinen luku tuotteille/blogeille, kirjoitus vain service_role
-- ════════════════════════════════════════════════════════════════
alter table public.products         enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders           enable row level security;
alter table public.order_items      enable row level security;
alter table public.blog_posts       enable row level security;

-- Tuotteet: kuka tahansa saa lukea aktiiviset
drop policy if exists "public read active products" on public.products;
create policy "public read active products" on public.products
  for select using (active = true);

drop policy if exists "public read variants" on public.product_variants;
create policy "public read variants" on public.product_variants
  for select using (true);

-- Blogit: kuka tahansa saa lukea julkaistut
drop policy if exists "public read published blogs" on public.blog_posts;
create policy "public read published blogs" on public.blog_posts
  for select using (published = true);

-- Orders/order_items: vain service_role (edge functionit). Asiakas ei lue suoraan.
drop policy if exists "service role orders" on public.orders;
create policy "service role orders" on public.orders
  for all using (auth.role() = 'service_role');
drop policy if exists "service role order_items" on public.order_items;
create policy "service role order_items" on public.order_items
  for all using (auth.role() = 'service_role');

-- Admin-kirjoitus tuotteille/blogeille hoidetaan service_role-avaimella admin-edge-functionin kautta
drop policy if exists "service role products write" on public.products;
create policy "service role products write" on public.products
  for all using (auth.role() = 'service_role');
drop policy if exists "service role variants write" on public.product_variants;
create policy "service role variants write" on public.product_variants
  for all using (auth.role() = 'service_role');
drop policy if exists "service role blogs write" on public.blog_posts;
create policy "service role blogs write" on public.blog_posts
  for all using (auth.role() = 'service_role');

comment on table public.products is 'Lucky Discs tuotteet (2026-05-30)';
comment on table public.product_variants is 'Väri × paino × stock — oikea WooCommerce-pohjainen varasto';
comment on table public.blog_posts is 'Blogi — Cowork-agentit kirjoittavat tänne, näkyy heti ilman deployta';
