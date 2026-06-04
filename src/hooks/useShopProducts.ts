import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ShopVariant {
  color: string;
  weight: string;
  stock: number;
  soldOut?: boolean;
  incoming?: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  variant?: string;
  plastic?: string;
  category: string;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  flight?: { speed: number; glide: number; turn: number; fade: number };
  weight?: string;
  badge?: string;
  variants?: ShopVariant[];
  /** Distinct "tulossa"-merkinnät varianteista (näytetään kun tuote on loppuunmyyty) */
  incomingNotes?: string[];
}

interface ProductRow {
  id: string;
  name: string;
  variant: string | null;
  plastic: string | null;
  category: string;
  category_label: string;
  price_cents: number;
  original_price_cents: number | null;
  description: string | null;
  image_url: string | null;
  flight_speed: number | null;
  flight_glide: number | null;
  flight_turn: number | null;
  flight_fade: number | null;
  badge: string | null;
  sort_order: number;
}

interface VariantRow {
  product_id: string;
  color: string;
  weight: string;
  stock: number;
  sold_out?: boolean;
  incoming_note?: string | null;
}

export function useShopProducts() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ data: prodData, error: prodErr }, { data: varData, error: varErr }] =
          await Promise.all([
            supabase.from("products").select("*").eq("active", true).order("sort_order"),
            supabase.from("product_variants").select("*"),
          ]);
        if (prodErr) throw prodErr;
        if (varErr) throw varErr;
        if (cancelled) return;

        const variantsByProduct: Record<string, ShopVariant[]> = {};
        (varData as VariantRow[] | null)?.forEach((v) => {
          (variantsByProduct[v.product_id] ??= []).push({
            color: v.color,
            weight: v.weight,
            // "loppuunmyyty" -lippu nollaa saatavuuden (kaikki stock>0 -tarkistukset toimivat)
            stock: v.sold_out ? 0 : v.stock,
            soldOut: !!v.sold_out,
            incoming: v.incoming_note ?? undefined,
          });
        });

        const mapped: ShopProduct[] = (prodData as ProductRow[] | null ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          variant: p.variant ?? undefined,
          plastic: p.plastic ?? undefined,
          category: p.category,
          categoryLabel: p.category_label,
          price: p.price_cents / 100,
          originalPrice: p.original_price_cents ? p.original_price_cents / 100 : undefined,
          description: p.description ?? "",
          image: p.image_url ?? "",
          flight:
            p.flight_speed != null
              ? {
                  speed: p.flight_speed,
                  glide: p.flight_glide ?? 0,
                  turn: p.flight_turn ?? 0,
                  fade: p.flight_fade ?? 0,
                }
              : undefined,
          badge: p.badge ?? undefined,
          variants: variantsByProduct[p.id]?.length ? variantsByProduct[p.id] : undefined,
          incomingNotes: Array.from(
            new Set(
              (variantsByProduct[p.id] ?? [])
                .map((v) => v.incoming?.trim())
                .filter((n): n is string => !!n)
            )
          ),
        }));

        setProducts(mapped);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Virhe ladattaessa tuotteita");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
