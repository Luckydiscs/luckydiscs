-- Fix: decrement_stock_for_order must match variants case-insensitively.
--
-- Bug: order_items store the color label capitalized (e.g. "Oranssi", from the
-- cart's colorLabel()), but product_variants store lowercase ("oranssi", from the
-- seed). The original function compared `color = r.color` exactly, so the UPDATE
-- never matched any variant and stock was NEVER decremented on a paid order.
--
-- Verified 2026-06-02: with lower(trim()) on both sides, a test run against order
-- LD-MPWWODFA correctly decremented daniel-jackpot/oranssi/169-172g 44 -> 43.

CREATE OR REPLACE FUNCTION public.decrement_stock_for_order(p_order_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
declare r record;
begin
  for r in
    select product_id, color, weight, quantity
    from public.order_items where order_id = p_order_id
  loop
    if r.color is not null and r.weight is not null then
      update public.product_variants
        set stock = greatest(0, stock - r.quantity), updated_at = now()
        where product_id = r.product_id
          and lower(trim(color)) = lower(trim(r.color))
          and lower(trim(weight)) = lower(trim(r.weight));
    end if;
  end loop;
end;
$function$;
