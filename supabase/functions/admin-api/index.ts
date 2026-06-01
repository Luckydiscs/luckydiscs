// Lucky Discs — admin-api edge function
// Hoitaa kaikki admin-toiminnot service_role-avaimella (ohittaa RLS).
// Suojattu ADMIN_PASSWORD-secretillä (lähetetään x-admin-password -headerissa).
//
// Ympäristömuuttujat (Supabase secrets):
//   ADMIN_PASSWORD             - admin-paneelin salasana
//   SUPABASE_URL               - automaattinen
//   SUPABASE_SERVICE_ROLE_KEY  - automaattinen
//
// Actionit (POST body { action, ... }):
//   "list_orders"          -> kaikki tilaukset
//   "update_order_status"  -> { orderId, status, trackingNumber? }
//   "list_products"        -> tuotteet + variantit (myös stock)
//   "update_stock"         -> { variantId, stock }
//   "list_blogs"           -> kaikki blogit (myös julkaisemattomat)
//   "save_blog"            -> { post } (insert/update slug:lla)
//   "delete_blog"          -> { slug }
//   "toggle_blog"          -> { slug, published }

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);
const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD") ?? "";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-password",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // Auth
  const pw = req.headers.get("x-admin-password") ?? "";
  if (!ADMIN_PASSWORD || pw !== ADMIN_PASSWORD) {
    return json({ error: "Unauthorized" }, 401);
  }

  try {
    const body = await req.json();
    const { action } = body;

    switch (action) {
      // ── TILAUKSET ──
      case "list_orders": {
        const { data: orders, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200);
        if (error) throw error;
        const ids = (orders ?? []).map((o) => o.id);
        let itemsByOrder: Record<string, unknown[]> = {};
        if (ids.length) {
          const { data: items } = await supabase
            .from("order_items")
            .select("*")
            .in("order_id", ids);
          itemsByOrder = (items ?? []).reduce((acc: Record<string, unknown[]>, it) => {
            (acc[it.order_id] ??= []).push(it);
            return acc;
          }, {});
        }
        return json({
          orders: (orders ?? []).map((o) => ({ ...o, items: itemsByOrder[o.id] ?? [] })),
        });
      }

      case "update_order_status": {
        const { orderId, status, trackingNumber } = body;
        const patch: Record<string, unknown> = { status };
        if (status === "shipped") patch.shipped_at = new Date().toISOString();
        if (trackingNumber !== undefined) patch.tracking_number = trackingNumber;
        const { error } = await supabase.from("orders").update(patch).eq("id", orderId);
        if (error) throw error;
        return json({ ok: true });
      }

      // ── VARASTO ──
      case "list_products": {
        const { data: products, error: pe } = await supabase
          .from("products")
          .select("*")
          .order("sort_order");
        if (pe) throw pe;
        const { data: variants, error: ve } = await supabase
          .from("product_variants")
          .select("*")
          .order("color");
        if (ve) throw ve;
        return json({ products: products ?? [], variants: variants ?? [] });
      }

      case "update_stock": {
        const { variantId, stock } = body;
        const { error } = await supabase
          .from("product_variants")
          .update({ stock: Math.max(0, parseInt(stock, 10) || 0) })
          .eq("id", variantId);
        if (error) throw error;
        return json({ ok: true });
      }

      // ── BLOGIT ──
      case "list_blogs": {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("published_at", { ascending: false, nullsFirst: false });
        if (error) throw error;
        return json({ blogs: data ?? [] });
      }

      case "save_blog": {
        const { post } = body;
        const { error } = await supabase.from("blog_posts").upsert(post, { onConflict: "slug" });
        if (error) throw error;
        return json({ ok: true });
      }

      case "toggle_blog": {
        const { slug, published } = body;
        const patch: Record<string, unknown> = { published };
        if (published) patch.published_at = new Date().toISOString().slice(0, 10);
        const { error } = await supabase.from("blog_posts").update(patch).eq("slug", slug);
        if (error) throw error;
        return json({ ok: true });
      }

      case "delete_blog": {
        const { slug } = body;
        const { error } = await supabase.from("blog_posts").delete().eq("slug", slug);
        if (error) throw error;
        return json({ ok: true });
      }

      default:
        return json({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (e) {
    console.error("admin-api error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
