-- Super Starter Pack näytti kaksi eri alennusta: badge "SÄÄSTÄ -32%" + laskettu -33%.
-- Poistetaan päällekkäinen badge-teksti → näkyy vain yksi oikea laskettu alennus (-33%).
update public.products set badge = null, updated_at = now()
  where id = 'super-starter-pack';
