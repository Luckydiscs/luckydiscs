-- ════════════════════════════════════════════════════════════════
-- Lucky Discs — tuotteiden ja varianttien seed (2026-05-30)
-- Data skreipattu kesäpelit.fi WooCommercesta 2026-05-29
-- ════════════════════════════════════════════════════════════════

-- Tuotteet
insert into public.products
  (id, name, variant, plastic, category, category_label, price_cents, original_price_cents, description, image_url, flight_speed, flight_glide, flight_turn, flight_fade, badge, sort_order)
values
  ('daniel-jackpot','Daniel Davidsson – Jackpot','Tournament Edition','Premium','signature','Signature',1490,2490,
   'Signature-painos tournament-tason kiekosta. Rajoitettu erä, painettu erityisellä Jackpot-grafiikalla.',
   '/images/products/daniel-jackpot.jpg',9,5,-1,2,'LIMITED',1),
  ('premium-bank-robber','Bank Robber','Premium','Premium','fairway-driver','Fairway Driver',1490,1990,
   'Luotettava fairway driver, joka hallitsee tuulen. Wild west -teemainen Premium-muovi.',
   '/images/products/bank-robber-premium.png',8,5,-1,2,null,2),
  ('ultrium-treasure-hunt','Treasure Hunt','Ultrium','Ultrium','distance-driver','Distance Driver',1490,1990,
   'Maksimaalinen pituus ja hallittavuus huippumuovissa. Aarteenmetsästäjän työkalu.',
   '/images/products/treasure-hunt-ultrium.png',12,6,-1,3,null,3),
  ('premium-treasure-hunt','Treasure Hunt','Premium','Premium','distance-driver','Distance Driver',1490,1990,
   'Distance driver Premium-muovissa. Loistava pelikiekko jokaiselle pelaajalle.',
   '/images/products/treasure-hunt-premium.png',12,6,-1,3,null,4),
  ('basic-money-shot','Money Shot','Basic','Basic','midrange','Midrange',1290,null,
   'Äärimmäisen luotettava lähestymiskiekko. Kestää tuulen, paineen ja kovatkin vedot. Aloittelijan paras kaveri.',
   '/images/products/money-shot-basic.png',5,5,-1,1,null,5),
  ('premium-money-shot','Money Shot','Premium','Premium','midrange','Midrange',1490,1990,
   'Money Shot Premium-muovissa. Paras tuntuma ja kesto, sopii kaikille pelaajille.',
   '/images/products/money-shot-premium.png',5,5,-1,1,null,6),
  ('ultrium-money-shot','Money Shot','Ultrium','Ultrium','midrange','Midrange',1490,1790,
   'Money Shot huippumuovissa. Ultrium tarjoaa erinomaisen gripin ja pitkän käyttöiän.',
   '/images/products/money-shot-ultrium.png',5,5,-1,1,null,7),
  ('lucky-discs-marker','Lucky Discs Markkeri',null,null,'marker','Marker',690,null,
   'Virallinen Lucky Discs -markkeri pelikiekkojen merkkaamiseen.',
   '/images/products/marker.png',null,null,null,null,null,8),
  ('super-starter-pack','Super Starter Pack','6 kiekkoa',null,'bundle','Bundle',5900,8745,
   'Kuusi kiekkoa täydellisenä aloituspakkauksena: driver, midrange, putteri — kaikki, mitä radalle tarvitset.',
   '/images/products/super-pack.jpg',null,null,null,null,'SÄÄSTÄ -32%',9)
on conflict (id) do update set
  name=excluded.name, variant=excluded.variant, plastic=excluded.plastic,
  category=excluded.category, category_label=excluded.category_label,
  price_cents=excluded.price_cents, original_price_cents=excluded.original_price_cents,
  description=excluded.description, image_url=excluded.image_url,
  flight_speed=excluded.flight_speed, flight_glide=excluded.flight_glide,
  flight_turn=excluded.flight_turn, flight_fade=excluded.flight_fade,
  badge=excluded.badge, sort_order=excluded.sort_order, updated_at=now();

-- Variantit (väri × paino × stock)
insert into public.product_variants (product_id, color, weight, stock) values
  ('daniel-jackpot','oranssi','169-172g',44),

  ('premium-bank-robber','vaaleanpunainen','169-172g',24),
  ('premium-bank-robber','oranssi','169-172g',6),
  ('premium-bank-robber','keltainen','169-172g',2),
  ('premium-bank-robber','pinkki','169-172g',14),
  ('premium-bank-robber','punainen','173-176g',1),

  ('ultrium-treasure-hunt','vaaleansininen','169-172g',3),
  ('ultrium-treasure-hunt','vaaleansininen','173-176g',10),
  ('ultrium-treasure-hunt','violetti','169-172g',4),
  ('ultrium-treasure-hunt','sininen','173-176g',1),

  ('premium-treasure-hunt','oranssi','169-172g',13),
  ('premium-treasure-hunt','oranssi','173-176g',57),
  ('premium-treasure-hunt','vihrea','173-176g',20),

  ('basic-money-shot','oranssi','173-176g',20),
  ('basic-money-shot','keltainen','169-172g',1),
  ('basic-money-shot','keltainen','173-176g',18),
  ('basic-money-shot','sininen','173-176g',24),
  ('basic-money-shot','valkoinen','169-172g',12),
  ('basic-money-shot','valkoinen','173-176g',1),

  ('premium-money-shot','keltainen','169-172g',42),
  ('premium-money-shot','keltainen','173-176g',19),
  ('premium-money-shot','pinkki','169-172g',7),
  ('premium-money-shot','pinkki','173-176g',16),
  ('premium-money-shot','vaaleanpunainen','169-172g',14),

  ('ultrium-money-shot','vaaleansininen','169-172g',85),
  ('ultrium-money-shot','vaaleansininen','173-176g',36),
  ('ultrium-money-shot','keltainen','173-176g',46),
  ('ultrium-money-shot','oranssi','173-176g',72),
  ('ultrium-money-shot','punainen','173-176g',9),
  ('ultrium-money-shot','pinkki','169-172g',5),
  ('ultrium-money-shot','pinkki','173-176g',5)
on conflict (product_id, color, weight) do update set stock = excluded.stock, updated_at = now();
