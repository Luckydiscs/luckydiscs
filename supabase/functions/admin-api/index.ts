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

      case "update_order": {
        const { orderId, patch } = body;
        const allowed = [
          "customer_first_name", "customer_last_name", "customer_email", "customer_phone",
          "shipping_address", "shipping_postal_code", "shipping_city", "shipping_country",
          "status", "tracking_number",
        ];
        const clean: Record<string, unknown> = {};
        for (const k of allowed) if (patch && k in patch) clean[k] = patch[k];
        if (clean.status === "shipped") clean.shipped_at = new Date().toISOString();
        const { error } = await supabase.from("orders").update(clean).eq("id", orderId);
        if (error) throw error;
        return json({ ok: true });
      }

      case "delete_order": {
        const { orderId } = body;
        // order_items poistuu cascade-säännöllä
        const { error } = await supabase.from("orders").delete().eq("id", orderId);
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

      case "update_variant": {
        const { variantId, stock, sold_out, incoming_note } = body;
        const patch: Record<string, unknown> = {};
        if (stock !== undefined) patch.stock = Math.max(0, parseInt(stock, 10) || 0);
        if (sold_out !== undefined) patch.sold_out = !!sold_out;
        if (incoming_note !== undefined) patch.incoming_note = incoming_note || null;
        const { error } = await supabase.from("product_variants").update(patch).eq("id", variantId);
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

      // ── KUVANLATAUS (blog-images bucket) ──
      case "upload_image": {
        const { filename, dataBase64, contentType } = body;
        if (!dataBase64) throw new Error("Ei kuvadataa");
        const bytes = Uint8Array.from(atob(dataBase64), (c) => c.charCodeAt(0));
        const safe = String(filename || "image").replace(/[^a-zA-Z0-9._-]/g, "_").slice(-60);
        const path = `articles/${crypto.randomUUID()}-${safe}`;
        const { error: upErr } = await supabase.storage
          .from("blog-images")
          .upload(path, bytes, { contentType: contentType || "image/jpeg", upsert: true });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("blog-images").getPublicUrl(path);
        return json({ url: pub.publicUrl });
      }

      // ── KONEHUONE / DASHBOARD ──
      case "dashboard": {
        // Tilaukset + liikevaihto
        const { data: allOrders } = await supabase
          .from("orders")
          .select("id,status,total_cents,created_at")
          .order("created_at", { ascending: false })
          .limit(2000);
        const ordersArr = allOrders ?? [];
        const byStatus: Record<string, number> = {};
        let revenueCents = 0;
        const paidIds: string[] = [];
        for (const o of ordersArr) {
          byStatus[o.status] = (byStatus[o.status] || 0) + 1;
          if (o.status === "paid" || o.status === "shipped") {
            revenueCents += o.total_cents || 0;
            paidIds.push(o.id);
          }
        }

        // Myydyimmät kiekot (vain maksetut/lähetetyt tilaukset)
        let topProducts: { name: string; qty: number }[] = [];
        if (paidIds.length) {
          const { data: items } = await supabase
            .from("order_items")
            .select("product_name,variant,color,quantity,order_id")
            .in("order_id", paidIds);
          const map: Record<string, { name: string; qty: number }> = {};
          for (const it of items ?? []) {
            const key = `${it.product_name}${it.variant ? " " + it.variant : ""}`;
            (map[key] ??= { name: key, qty: 0 }).qty += it.quantity || 0;
          }
          topProducts = Object.values(map).sort((a, b) => b.qty - a.qty).slice(0, 12);
        }

        // Vähissä / loppu olevat variantit
        const { data: variants } = await supabase
          .from("product_variants")
          .select("product_id,color,weight,stock,sold_out");
        const { data: products } = await supabase.from("products").select("id,name,variant");
        const nameById: Record<string, string> = {};
        (products ?? []).forEach((p) => {
          nameById[p.id] = `${p.name}${p.variant ? " " + p.variant : ""}`;
        });
        const lowStock = (variants ?? [])
          .filter((v) => v.sold_out || (v.stock ?? 0) <= 5)
          .map((v) => ({
            product: nameById[v.product_id] ?? v.product_id,
            color: v.color,
            weight: v.weight,
            stock: v.stock ?? 0,
            sold_out: !!v.sold_out,
          }))
          .sort((a, b) => (a.sold_out === b.sold_out ? a.stock - b.stock : a.sold_out ? -1 : 1))
          .slice(0, 50);

        // Uutiskirjeen tilaajat
        const { data: subs, count } = await supabase
          .from("newsletter_subscriptions")
          .select("email,subscribed_at", { count: "exact" })
          .order("subscribed_at", { ascending: false })
          .limit(50);

        return json({
          orders: {
            total: ordersArr.length,
            paid: byStatus.paid || 0,
            pending: byStatus.pending || 0,
            shipped: byStatus.shipped || 0,
            failed: byStatus.failed || 0,
            cancelled: byStatus.cancelled || 0,
            revenueCents,
          },
          topProducts,
          lowStock,
          newsletter: { count: count ?? (subs ?? []).length, recent: subs ?? [] },
        });
      }

      default:
        return json({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (e) {
    console.error("admin-api error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
