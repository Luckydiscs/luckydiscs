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
  "sales@luckydiscs.fi";
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

const formatCents = (cents: number) => (cents / 100).toFixed(2);

async function sendCustomerEmail(order: any, items: any[]) {
  const itemsHtml = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${
          i.variant ? `${i.variant} ` : ""
        }${i.product_name}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${i.quantity} kpl</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${
          formatCents(i.line_total_cents)
        } €</td>
        </tr>`,
    )
    .join("");

  await resend.emails.send({
    from: "Lucky Discs <tilaukset@luckydiscs.fi>",
    to: order.customer_email,
    subject: `Kiitos tilauksestasi! ${order.order_number}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#222;">
        <div style="background:#000;color:#FFD700;padding:24px;text-align:center;">
          <h1 style="margin:0;font-family:'Bebas Neue',sans-serif;letter-spacing:2px;">LUCKY DISCS</h1>
        </div>
        <div style="padding:24px;">
          <h2>Kiitos tilauksestasi, ${order.customer_first_name}!</h2>
          <p>Maksu on vastaanotettu ja tilauksesi käsittelyyn. Lähetämme paketin 1–3 työpäivän kuluessa.</p>

          <h3>Tilaus ${order.order_number}</h3>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            ${itemsHtml}
            <tr>
              <td colspan="2" style="padding:8px;text-align:right;color:#666;">Toimitus:</td>
              <td style="padding:8px;text-align:right;">${
      formatCents(order.shipping_cents)
    } €</td>
            </tr>
            <tr>
              <td colspan="2" style="padding:8px;text-align:right;font-weight:bold;">Yhteensä:</td>
              <td style="padding:8px;text-align:right;font-weight:bold;color:#22c55e;">${
      formatCents(order.total_cents)
    } €</td>
            </tr>
          </table>

          <h3>Toimitusosoite</h3>
          <p>
            ${order.customer_first_name} ${order.customer_last_name}<br>
            ${order.shipping_address}<br>
            ${order.shipping_postal_code} ${order.shipping_city}<br>
            ${order.shipping_country}
          </p>

          <p style="margin-top:24px;">
            Jos sinulla on kysyttävää, ota yhteyttä: <a href="mailto:asiakaspalvelu@luckydiscs.fi">asiakaspalvelu@luckydiscs.fi</a>
          </p>

          <p style="font-size:12px;color:#888;margin-top:32px;border-top:1px solid #eee;padding-top:16px;">
            Lucky Discs / Zatap Oy<br>
            Nokia, Finland<br>
            <a href="${SITE_URL}">${SITE_URL}</a>
          </p>
        </div>
      </div>
    `,
  });
}

async function sendAdminEmail(order: any, items: any[]) {
  const itemsList = items
    .map((i) =>
      `- ${i.variant ? `${i.variant} ` : ""}${i.product_name} × ${i.quantity} (${
        formatCents(i.unit_price_cents)
      } €)`
    )
    .join("\n");

  await resend.emails.send({
    from: "Lucky Discs Order <tilaukset@luckydiscs.fi>",
    to: ADMIN_EMAIL,
    subject: `🎉 Uusi tilaus ${order.order_number} — ${
      formatCents(order.total_cents)
    } €`,
    text: `Uusi tilaus maksettu Paytrailin kautta.

Tilausnumero: ${order.order_number}
Asiakas: ${order.customer_first_name} ${order.customer_last_name}
Email: ${order.customer_email}
Puh: ${order.customer_phone}

Toimitusosoite:
${order.shipping_address}
${order.shipping_postal_code} ${order.shipping_city}
${order.shipping_country}

Tuotteet:
${itemsList}

Toimitus: ${formatCents(order.shipping_cents)} €
YHTEENSÄ: ${formatCents(order.total_cents)} €

Paytrail transaction: ${order.paytrail_transaction_id}
Provider: ${order.paytrail_provider}

Lähetä paketti 1-3 työpäivän sisällä.
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

      // ── lähetä mailit ─────────
      try {
        await sendCustomerEmail(updated, items ?? []);
        await sendAdminEmail(updated, items ?? []);
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
