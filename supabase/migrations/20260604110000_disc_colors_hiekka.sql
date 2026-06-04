-- Värikorjaukset (Vesa): Jailbreak ei keltainen/vihreä vaan hiekka/violetti/sininen;
-- Basic Money Shot keltainen on oikeasti hiekansävyinen. Värin nimiä ei näytetä
-- asiakkaalle (vain swatch), mutta arvo toimii varianttitunnisteena.

-- Jailbreak: korvaa vanhat värit (sininen + vihreä) oikeilla (hiekka/violetti/sininen).
delete from public.product_variants where product_id = 'jailbreak';
insert into public.product_variants (product_id, color, weight, stock) values
  ('jailbreak','hiekka','169-172g',10),
  ('jailbreak','hiekka','173-176g',10),
  ('jailbreak','violetti','169-172g',10),
  ('jailbreak','violetti','173-176g',10),
  ('jailbreak','sininen','169-172g',10),
  ('jailbreak','sininen','173-176g',10)
on conflict do nothing;

-- Basic Money Shot: keltainen -> hiekka
update public.product_variants set color = 'hiekka'
  where product_id = 'basic-money-shot' and color = 'keltainen';
