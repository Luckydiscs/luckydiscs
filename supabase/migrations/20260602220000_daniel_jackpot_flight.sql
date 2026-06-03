-- Daniel Davidsson Jackpot is a signature edition of the Money Shot mold,
-- so its flight numbers are identical to Money Shot: 4/3/1/3.
-- (DB previously had a wrong 9/5/-1/2.)
update public.products
  set flight_speed=4, flight_glide=3, flight_turn=1, flight_fade=3, updated_at=now()
  where id='daniel-jackpot';
