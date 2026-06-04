-- Super Starter Pack: kuvaukseen eritelty 7 kiekon sisältö (Vesan vahvistus).
-- 2× Bank Robber, 2× Money Shot, 2× Treasure Hunt, 1× Jailbreak. Värit/muovit saatavuuden mukaan.
update public.products set
  description = 'Sisältää 7 kiekkoa: 2× Bank Robber (fairway driver), 2× Money Shot (putteri), 2× Treasure Hunt (distance driver) ja 1× Jailbreak (midrange). Värit ja muovit vaihtelevat saatavuuden mukaan. Täydellinen aloituspakkaus — yhdellä ostoksella valmis radalle.',
  updated_at = now()
  where id = 'super-starter-pack';
