-- Jailbreak: painot lähes kaikissa ~180 g → ei painovalintaa.
-- Yhdistetään kunkin värin painorivit yhdeksi "n. 180 g" -riviksi (stockit summataan).
-- Storefront näyttää tällöin painon tekstinä (ei pudotusvalikkoa).
-- Idempotentti: uudelleenajo ryhmittelee saman värin rivit ja kirjoittaa saman tuloksen.
do $$
declare r record;
begin
  for r in
    select v.product_id, v.color,
           sum(v.stock) as total,
           bool_or(v.sold_out) as so,
           max(v.incoming_note) as note
    from public.product_variants v
    join public.products p on p.id = v.product_id
    where lower(p.name) like '%jailbreak%'
    group by v.product_id, v.color
  loop
    delete from public.product_variants
      where product_id = r.product_id and color = r.color;
    insert into public.product_variants (product_id, color, weight, stock, sold_out, incoming_note)
      values (r.product_id, r.color, 'n. 180 g', r.total, r.so, r.note);
  end loop;
end $$;
