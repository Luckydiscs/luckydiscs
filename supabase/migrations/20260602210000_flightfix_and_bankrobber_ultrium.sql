-- 1) Fix Money Shot flight numbers: DB had 5/5/-1/1 (old Shop.tsx data, wrong).
--    Official manufacturer numbers (Infinite Discs / Lucky Discs) = 4/3/1/3.
update public.products
  set flight_speed=4, flight_glide=3, flight_turn=1, flight_fade=3, updated_at=now()
  where id in ('basic-money-shot','premium-money-shot','ultrium-money-shot');

-- Verified correct (no change): Bank Robber 8/5/-1/2, Treasure Hunt 12/6/-1/3, Jailbreak 5/4/0/2.

-- 2) Add Bank Robber Ultrium as a sold-out (stock 0) option (Vesa: show even when out of stock).
--    Same mold as Premium Bank Robber, Ultrium plastic. Flight 8/5/-1/2.
insert into public.products
  (id, name, variant, plastic, category, category_label, price_cents, original_price_cents,
   description, image_url, flight_speed, flight_glide, flight_turn, flight_fade, badge, sort_order, active)
values
  ('ultrium-bank-robber','Bank Robber','Ultrium','Ultrium','fairway-driver','Fairway Driver',
   1490, 1990,
   'Luotettava fairway driver, joka hallitsee tuulen. Wild west -teemainen Ultrium-muovi (premium-laatu).',
   '/images/products/bank-robber-ultrium.png', 8, 5, -1, 2, null, 4, true)
on conflict (id) do update set
  active = true, flight_speed = 8, flight_glide = 5, flight_turn = -1, flight_fade = 2,
  image_url = '/images/products/bank-robber-ultrium.png', updated_at = now();

-- Placeholder variants at stock 0 (colors mirror Premium Bank Robber; adjust in admin on restock).
-- Sold-out UI hides the color swatches, so customers only see the disc + "LOPPUUNMYYTY".
insert into public.product_variants (product_id, color, weight, stock) values
  ('ultrium-bank-robber','keltainen','169-172g',0),
  ('ultrium-bank-robber','oranssi','169-172g',0),
  ('ultrium-bank-robber','pinkki','169-172g',0),
  ('ultrium-bank-robber','punainen','173-176g',0),
  ('ultrium-bank-robber','vaaleanpunainen','169-172g',0)
on conflict do nothing;
