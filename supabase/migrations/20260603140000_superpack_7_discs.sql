-- Super Starter Pack: 6 → 7 kiekkoa (lisätään Jailbreak, joka on vain Ultrium-muovina).
-- Hinta 85,00 €. Poistetaan vanha vertailuhinta (ei annettua normaalihintaa).
update public.products set
  price_cents = 8500,
  original_price_cents = null,
  variant = '7 kiekkoa',
  description = 'Seitsemän kiekon aloituspakkaus — täydellinen startti frisbeegolfiin. Setti kattaa kiekot radan eri tilanteisiin, ja mukana on myös Jailbreak (saatavilla ainoastaan Ultrium-muovina). Yhdellä ostoksella valmis pelaamaan.',
  updated_at = now()
  where id = 'super-starter-pack';

-- Jailbreak: kuvauksessa luki virheellisesti "distance driver" — se on midrange (5/4/0/2).
update public.products set
  description = 'Jailbreak on suoraan menevä midrange, joka lentää niin pitkälle kuin käsi riittää. Keskiloiva feidi tuo varmuutta ilman jyräävää ylivakautta — täydellinen työkalu 60–90 metrin heittoihin, joissa tarvitset sekä luotettavuutta että korille pääsyä. Wild West -teemainen Jailbreak-stamppi, Ultrium-muovi.',
  updated_at = now()
  where id = 'jailbreak';
