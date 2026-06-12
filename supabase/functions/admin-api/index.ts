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
import { Resend } from "npm:resend@2.0.0";

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

// ── Lähetysmaili (Resend) ──────────────────────────────────────
const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
const SITE_URL = "https://www.luckydiscs.fi";
const GREEN = "#1E8549";
const GOLD = "#E2AD28";
const DARK = "#0a0a0a";

const brandHeader = () => `
  <div style="background:${GREEN};padding:28px 24px;text-align:center;">
    <div style="font-size:26px;font-weight:800;letter-spacing:2px;color:#ffffff;">🍀 LUCKY DISCS</div>
    <div style="font-size:11px;letter-spacing:3px;color:#d1fae5;text-transform:uppercase;margin-top:4px;">Premium Disc Golf</div>
  </div>`;
const brandFooter = () => `
  <div style="background:${DARK};padding:20px 24px;text-align:center;">
    <div style="color:#ffffff;font-weight:700;letter-spacing:1px;margin-bottom:6px;">🍀 LUCKY DISCS</div>
    <div style="color:#9ca3af;font-size:12px;line-height:1.7;">
      Y-tunnus 3368925-4<br>
      <a href="${SITE_URL}" style="color:${GOLD};text-decoration:none;">www.luckydiscs.fi</a>
    </div>
  </div>`;
const absImg = (raw: string) => {
  if (!raw) return "";
  if (raw.startsWith("http")) return raw;
  return `${SITE_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;
};
// deno-lint-ignore no-explicit-any
const itemLabel = (i: any) => {
  const head = `${i.variant ? `${i.variant} ` : ""}${i.product_name}`;
  const sub = [i.color, i.weight].filter(Boolean).join(" · ");
  const img = absImg(i.image_url || "");
  const imgCell = img
    ? `<td style="padding-right:12px;width:48px;" valign="middle"><img src="${img}" width="48" height="48" alt="" style="display:block;border-radius:8px;background:#f4f4f5;border:1px solid #eee;"></td>`
    : "";
  const text = `${head}${sub ? `<div style="font-size:12px;color:#888;margin-top:2px;">${sub}</div>` : ""}`;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${imgCell}<td valign="middle" style="color:#1a1a1a;">${text}</td></tr></table>`;
};

// Lähettää asiakkaalle "Tilauksesi on lähetetty" -mailin seurantanumeron kanssa.
// Palauttaa true jos maili lähti. Heittää virheen vain Resend-virheessä (kutsuja try/catchaa).
async function sendShippingEmail(orderId: string, trackingNumber?: string): Promise<boolean> {
  const { data: order } = await supabase.from("orders").select("*").eq("id", orderId).single();
  if (!order || !order.customer_email) return false;
  const { data: items } = await supabase.from("order_items").select("*").eq("order_id", orderId);
  const tn = String(trackingNumber ?? order.tracking_number ?? "").trim();

  const itemsHtml = (items ?? [])
    // deno-lint-ignore no-explicit-any
    .map((i: any) =>
      `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;">${itemLabel(i)}</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;color:#666;">${i.quantity} kpl</td></tr>`)
    .join("");

  const trackingHtml = tn
    ? `<div style="background:#f4f4f5;border-radius:10px;padding:16px;margin:20px 0;text-align:center;">
         <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:4px;">Seurantanumero</div>
         <div style="font-size:20px;font-weight:800;color:${GREEN};letter-spacing:1px;">${tn}</div>
         <div style="margin-top:12px;">
           <a href="https://www.posti.fi/fi/seuranta#/lahetys/${encodeURIComponent(tn)}" style="display:inline-block;background:${GREEN};color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700;margin:4px;">Seuraa Postissa</a>
           <a href="https://www.matkahuolto.fi/seuranta" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700;margin:4px;">Seuraa Matkahuollossa</a>
         </div>
         <div style="font-size:12px;color:#888;margin-top:10px;">Seuranta voi aktivoitua muutaman tunnin viiveellä.</div>
       </div>`
    : `<p style="margin:20px 0;color:#444;line-height:1.6;">Paketti on matkalla. Saat seurantatiedot tarvittaessa erikseen.</p>`;

  await resend.emails.send({
    from: "Lucky Discs <tilaukset@luckydiscs.fi>",
    to: order.customer_email,
    subject: `Tilauksesi on lähetetty! ${order.order_number}`,
    html: `
      <div style="margin:0;padding:24px 0;background:#f4f4f5;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">
          ${brandHeader()}
          <div style="padding:28px 24px;color:#1a1a1a;">
            <h2 style="margin:0 0 8px;font-size:20px;">Tilauksesi on matkalla, ${order.customer_first_name}! 📦</h2>
            <p style="margin:0 0 4px;color:#444;line-height:1.6;">Hyvä uutinen — tilauksesi <strong>${order.order_number}</strong> on pakattu ja lähetetty. Toimitus saapuu Postin tai Matkahuollon kautta 1–3 arkipäivässä.</p>
            ${trackingHtml}
            <h3 style="margin:8px 0 8px;font-size:15px;">Lähetyksen sisältö</h3>
            <table style="width:100%;border-collapse:collapse;">${itemsHtml}</table>
            <h3 style="margin:24px 0 8px;font-size:15px;">Toimitusosoite</h3>
            <p style="margin:0;color:#444;line-height:1.6;">
              ${order.customer_first_name} ${order.customer_last_name}<br>
              ${order.shipping_address}<br>
              ${order.shipping_postal_code} ${order.shipping_city}<br>
              ${order.shipping_country}
            </p>
            <p style="margin:24px 0 0;color:#444;">Kysyttävää? <a href="mailto:asiakaspalvelu@luckydiscs.fi" style="color:${GREEN};">asiakaspalvelu@luckydiscs.fi</a></p>
          </div>
          ${brandFooter()}
        </div>
      </div>`,
  });
  return true;
}

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
        // Aiempi status → tunnistetaan vasta nyt tapahtuva siirtymä shippediin
        // (estää duplikaattimailin jos nappia painetaan uudestaan)
        const { data: prev } = await supabase
          .from("orders").select("status").eq("id", orderId).single();
        const patch: Record<string, unknown> = { status };
        if (status === "shipped") patch.shipped_at = new Date().toISOString();
        if (trackingNumber !== undefined) patch.tracking_number = trackingNumber;
        const { error } = await supabase.from("orders").update(patch).eq("id", orderId);
        if (error) throw error;
        let emailed = false;
        if (status === "shipped" && prev?.status !== "shipped") {
          try {
            emailed = await sendShippingEmail(orderId, trackingNumber);
          } catch (e) {
            console.error("Lähetysmaili epäonnistui:", e);
          }
        }
        return json({ ok: true, emailed });
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

      case "list_subscribers": {
        const { data, error } = await supabase
          .from("newsletter_subscriptions")
          .select("email,subscribed_at")
          .order("subscribed_at", { ascending: false });
        if (error) throw error;
        return json({ subscribers: data ?? [] });
      }

      default:
        return json({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (e) {
    console.error("admin-api error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
