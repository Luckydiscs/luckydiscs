// Lucky Discs — payment-callback edge function
// Paytrail kutsuu tätä sekä success- että cancel-skenaariossa.
// Verifioi HMAC-signature, päivittää orders-statuksen ja lähettää Resend-vahvistusmailin.
//
// Paytrail callback docs: https://docs.paytrail.com/#/?id=redirect-and-callback-url-parameters
//
// Ympäristömuuttujat:
//   PAYTRAIL_SECRET_KEY
//   RESEND_API_KEY
//   PUBLIC_SITE_URL
//   ADMIN_NOTIFICATION_EMAIL  (esim. sales@luckydiscs.fi)
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@2.0.0";
import { crypto } from "https://deno.land/std@0.190.0/crypto/mod.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

const SECRET_KEY = Deno.env.get("PAYTRAIL_SECRET_KEY") ?? "SAIPPUAKAUPPIAS";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_NOTIFICATION_EMAIL") ??
  "asiakaspalvelu@luckydiscs.fi";
const SITE_URL = Deno.env.get("PUBLIC_SITE_URL") ?? "https://www.luckydiscs.fi";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, signature",
};

// ── HMAC-SHA256 verify ────────────
async function calculateHmac(
  secret: string,
  params: Record<string, string>,
  body: string,
): Promise<string> {
  const checkoutEntries = Object.keys(params)
    .filter((k) => k.toLowerCase().startsWith("checkout-"))
    .sort()
    .map((k) => `${k.toLowerCase()}:${params[k]}`)
    .join("\n");

  const payload = `${checkoutEntries}\n${body}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ── Brändi ───────────────────────────────────────────────
const GREEN = "#1E8549"; // lucky-green (emerald)
const GOLD = "#E2AD28"; // lucky-gold
const DARK = "#0a0a0a";
const eur = (cents: number) => (cents / 100).toFixed(2).replace(".", ",");
const VAT_RATE = 0.255; // FI ALV 25,5 % (hinnat sisältävät ALV:n)
const vatOf = (cents: number) => Math.round((cents * VAT_RATE) / (1 + VAT_RATE));
const shippingLabel = (cents: number) => (cents === 0 ? "Ilmainen" : `${eur(cents)} €`);

function brandHeader() {
  return `
    <div style="background:${GREEN};padding:28px 24px;text-align:center;">
      <div style="font-size:26px;font-weight:800;letter-spacing:2px;color:#ffffff;">🍀 LUCKY DISCS</div>
      <div style="font-size:11px;letter-spacing:3px;color:#d1fae5;text-transform:uppercase;margin-top:4px;">Premium Disc Golf</div>
    </div>`;
}

function brandFooter() {
  return `
    <div style="background:${DARK};padding:20px 24px;text-align:center;">
      <div style="color:#ffffff;font-weight:700;letter-spacing:1px;margin-bottom:6px;">🍀 LUCKY DISCS</div>
      <div style="color:#9ca3af;font-size:12px;line-height:1.7;">
        Y-tunnus 3368925-4<br>
        <a href="${SITE_URL}" style="color:${GOLD};text-decoration:none;">${SITE_URL.replace("https://", "")}</a>
      </div>
    </div>`;
}

// Tuoterivi: kuva + nimi + valittu väri ja paino
const absImg = (raw: string) => {
  if (!raw) return "";
  if (raw.startsWith("http")) return raw;
  return `${SITE_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;
};
const itemLabel = (i: any) => {
  const head = `${i.variant ? `${i.variant} ` : ""}${i.product_name}`;
  const sub = [i.color, i.weight].filter(Boolean).join(" · ");
  const img = absImg(i.image_url || "");
  const imgCell = img
    ? `<td style="padding-right:12px;width:52px;" valign="middle"><img src="${img}" width="52" height="52" alt="" style="display:block;border-radius:8px;background:#f4f4f5;border:1px solid #eee;"></td>`
    : "";
  const text = `${head}${sub ? `<div style="font-size:12px;color:#888;margin-top:2px;">${sub}</div>` : ""}`;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${imgCell}<td valign="middle" style="color:#1a1a1a;">${text}</td></tr></table>`;
};

async function sendCustomerEmail(order: any, items: any[]) {
  const itemsHtml = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a1a;">${itemLabel(i)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:center;color:#666;">${i.quantity} kpl</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;color:#1a1a1a;">${eur(i.line_total_cents)} €</td>
        </tr>`,
    )
    .join("");

  await resend.emails.send({
    from: "Lucky Discs <tilaukset@luckydiscs.fi>",
    to: order.customer_email,
    subject: `Kiitos tilauksestasi! ${order.order_number}`,
    html: `
      <div style="margin:0;padding:24px 0;background:#f4f4f5;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">
          ${brandHeader()}
          <div style="padding:28px 24px;color:#1a1a1a;">
            <h2 style="margin:0 0 8px;font-size:20px;">Kiitos tilauksestasi, ${order.customer_first_name}!</h2>
            <p style="margin:0 0 20px;color:#444;line-height:1.6;">Maksu on vastaanotettu ja tilauksesi on käsittelyssä. Lähetämme paketin 1–3 työpäivän kuluessa.</p>

            <div style="background:#f4f4f5;border-radius:10px;padding:14px 16px;margin-bottom:20px;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:2px;">Tilausnumero</div>
              <div style="font-size:16px;font-weight:700;color:${GREEN};">${order.order_number}</div>
            </div>

            <table style="width:100%;border-collapse:collapse;margin-bottom:4px;">
              <tr>
                <th align="left" style="font-size:11px;text-transform:uppercase;color:#888;padding:6px 0;border-bottom:2px solid ${GREEN};">Tuote</th>
                <th align="center" style="font-size:11px;text-transform:uppercase;color:#888;padding:6px 0;border-bottom:2px solid ${GREEN};">Määrä</th>
                <th align="right" style="font-size:11px;text-transform:uppercase;color:#888;padding:6px 0;border-bottom:2px solid ${GREEN};">Hinta</th>
              </tr>
              ${itemsHtml}
            </table>
            <table style="width:100%;border-collapse:collapse;margin-top:6px;">
              <tr><td style="padding:5px 0;color:#666;font-size:14px;">Toimitus</td><td align="right" style="padding:5px 0;font-size:14px;">${shippingLabel(order.shipping_cents)}</td></tr>
              <tr><td style="padding:5px 0;color:#999;font-size:12px;">sis. ALV 25,5 %</td><td align="right" style="padding:5px 0;color:#999;font-size:12px;">${eur(vatOf(order.total_cents))} €</td></tr>
              <tr><td style="padding:12px 0 0;font-weight:800;font-size:18px;border-top:2px solid #eee;">Yhteensä</td><td align="right" style="padding:12px 0 0;font-weight:800;font-size:18px;color:${GREEN};border-top:2px solid #eee;">${eur(order.total_cents)} €</td></tr>
            </table>

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
      </div>
    `,
  });
}

async function sendAdminEmail(order: any, items: any[]) {
  const itemsHtml = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">${itemLabel(i)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;color:#666;">${i.quantity} kpl</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${eur(i.line_total_cents)} €</td>
        </tr>`,
    )
    .join("");

  await resend.emails.send({
    from: "Lucky Discs <tilaukset@luckydiscs.fi>",
    to: ADMIN_EMAIL,
    subject: `📦 Toimita tilaus ${order.order_number} — ${eur(order.total_cents)} €`,
    html: `
      <div style="margin:0;padding:24px 0;background:#f4f4f5;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;color:#1a1a1a;">
          ${brandHeader()}
          <div style="padding:28px 24px;">
            <div style="background:${GREEN};color:#fff;border-radius:10px;padding:14px 16px;margin-bottom:20px;text-align:center;">
              <div style="font-size:18px;font-weight:800;">📦 Uusi maksettu tilaus — toimita asiakkaalle</div>
              <div style="font-size:13px;color:#d1fae5;margin-top:2px;">Lähetä paketti 1–3 työpäivän sisällä</div>
            </div>

            <h3 style="margin:0 0 6px;font-size:15px;color:${GREEN};">Toimitusosoite</h3>
            <p style="margin:0 0 20px;line-height:1.7;font-size:15px;">
              <strong>${order.customer_first_name} ${order.customer_last_name}</strong><br>
              ${order.shipping_address}<br>
              ${order.shipping_postal_code} ${order.shipping_city}<br>
              ${order.shipping_country}<br>
              <span style="color:#666;">${order.customer_email}</span><br>
              <span style="color:#666;">${order.customer_phone}</span>
            </p>

            <h3 style="margin:0 0 6px;font-size:15px;color:${GREEN};">Tilaus ${order.order_number}</h3>
            <table style="width:100%;border-collapse:collapse;">
              ${itemsHtml}
              <tr><td colspan="2" style="padding:8px 0;text-align:right;color:#666;">Toimitus</td><td style="padding:8px 0;text-align:right;">${shippingLabel(order.shipping_cents)}</td></tr>
              <tr><td colspan="2" style="padding:8px 0;text-align:right;font-weight:800;">Yhteensä</td><td style="padding:8px 0;text-align:right;font-weight:800;color:${GREEN};">${eur(order.total_cents)} €</td></tr>
            </table>

            <p style="margin:20px 0 0;font-size:12px;color:#888;">
              Maksu: ${order.paytrail_provider ?? "Paytrail"} · Transaktio: ${order.paytrail_transaction_id ?? "-"}<br>
              Hallinnoi tilausta: <a href="${SITE_URL}/admin" style="color:${GREEN};">${SITE_URL.replace("https://", "")}/admin</a>
            </p>
          </div>
          ${brandFooter()}
        </div>
      </div>
    `,
  });
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Paytrail lähettää sekä GET (redirect callbackissa) että POST (server-callback)
  const url = new URL(req.url);
  const queryParams: Record<string, string> = {};
  url.searchParams.forEach((v, k) => {
    queryParams[k] = v;
  });

  try {
    // ── verifioi HMAC ─────────────
    const receivedSignature = queryParams["signature"];
    if (!receivedSignature) {
      console.warn("payment-callback missing signature");
      return new Response("Missing signature", { status: 400 });
    }

    const expected = await calculateHmac(SECRET_KEY, queryParams, "");
    if (expected !== receivedSignature) {
      console.warn("payment-callback HMAC mismatch");
      return new Response("Invalid signature", { status: 401 });
    }

    const reference = queryParams["checkout-reference"];
    const status = queryParams["checkout-status"];
    const transactionId = queryParams["checkout-transaction-id"];
    const provider = queryParams["checkout-provider"];

    if (!reference) {
      return new Response("Missing reference", { status: 400 });
    }

    if (status === "ok") {
      // ── merkitse maksetuksi (idempotentti) ──
      const { data: order } = await supabase
        .from("orders")
        .select("*")
        .eq("reference", reference)
        .single();

      if (!order) {
        return new Response("Order not found", { status: 404 });
      }

      // jos jo maksettu, älä lähetä uudestaan (idempotency)
      if (order.status === "paid") {
        return new Response("Already processed", { status: 200 });
      }

      // mark_order_paid: merkitsee maksetuksi + vähentää varastosaldon atomisesti
      const { data: updated, error: updErr } = await supabase
        .rpc("mark_order_paid", {
          p_reference: reference,
          p_transaction_id: transactionId,
          p_provider: provider,
        })
        .single();

      if (updErr) throw updErr;
      if (!updated) {
        // ei pending-tilassa (race) — ei lähetetä mailia uudestaan
        return new Response("Not pending", { status: 200 });
      }

      const { data: items } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);

      // Liitä tuotekuvat (products.image_url) riveille sähköpostia varten
      const itemList = items ?? [];
      const productIds = [...new Set(itemList.map((i: any) => i.product_id))];
      if (productIds.length) {
        const { data: prods } = await supabase
          .from("products")
          .select("id,image_url")
          .in("id", productIds);
        const imgById: Record<string, string> = {};
        (prods ?? []).forEach((p: any) => { imgById[p.id] = p.image_url ?? ""; });
        itemList.forEach((i: any) => { i.image_url = imgById[i.product_id] ?? ""; });
      }

      // ── lähetä mailit ─────────
      try {
        await sendCustomerEmail(updated, itemList);
        await sendAdminEmail(updated, itemList);
      } catch (mailErr) {
        console.error("Email send failed (order still marked paid):", mailErr);
      }
    } else if (status === "fail") {
      await supabase
        .from("orders")
        .update({ status: "failed" })
        .eq("reference", reference)
        .eq("status", "pending");
    } else if (status === "cancel") {
      await supabase
        .from("orders")
        .update({
          status: "cancelled",
          cancelled_at: new Date().toISOString(),
        })
        .eq("reference", reference)
        .eq("status", "pending");
    }

    return new Response(JSON.stringify({ ok: true, status }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("payment-callback error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
};

serve(handler);
