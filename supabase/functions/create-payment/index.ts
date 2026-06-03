// Lucky Discs — create-payment edge function
// Vastaanottaa cart + customer-tiedot, luo orders-rivin (pending),
// kutsuu Paytrail Payments API:a ja palauttaa redirect-href:n frontille.
//
// Paytrail docs: https://docs.paytrail.com/#/?id=create
//
// Ympäristömuuttujat:
//   PAYTRAIL_MERCHANT_ID   - VESITIIVIS Oy:n merchant (Lucky Discs)
//   PAYTRAIL_SECRET_KEY    - SECRET, älä paljasta frontille
//   PUBLIC_SITE_URL        - https://www.luckydiscs.fi
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { crypto } from "https://deno.land/std@0.190.0/crypto/mod.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

// Paytrail test credentials oletuksena — Vesa vaihtaa prod-arvot Supabaseen
const MERCHANT_ID = Deno.env.get("PAYTRAIL_MERCHANT_ID") ?? "375917";
const SECRET_KEY = Deno.env.get("PAYTRAIL_SECRET_KEY") ?? "SAIPPUAKAUPPIAS";
const SITE_URL = Deno.env.get("PUBLIC_SITE_URL") ?? "https://www.luckydiscs.fi";

const PAYTRAIL_API = "https://services.paytrail.com/payments";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ── HMAC-SHA256 signing per Paytrail spec ─────────────
async function calculateHmac(
  secret: string,
  headers: Record<string, string>,
  body: string,
): Promise<string> {
  // Vain "checkout-" -alkuiset headerit, aakkosjärjestyksessä, "key:value" -muodossa
  const checkoutHeaders = Object.keys(headers)
    .filter((k) => k.toLowerCase().startsWith("checkout-"))
    .sort()
    .map((k) => `${k.toLowerCase()}:${headers[k]}`)
    .join("\n");

  const payload = `${checkoutHeaders}\n${body}`;
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

interface CartItem {
  id: string;
  name: string;
  variant?: string;
  plastic?: string;
  weight?: string;
  color?: string;
  price: number; // euroina
  quantity: number;
}

interface CreatePaymentRequest {
  items: CartItem[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    country?: string;
  };
  shippingCents?: number;
}

const SHIPPING_CENTS_DEFAULT = 590;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const { items, customer, shippingCents }: CreatePaymentRequest = await req
      .json();

    // ── validointi ─────────────────────
    if (!items?.length) throw new Error("Cart is empty");
    if (!customer?.email?.includes("@")) throw new Error("Invalid email");
    if (!customer.firstName || !customer.lastName) {
      throw new Error("Missing customer name");
    }

    // ── summan laskenta sentteinä ──────
    const subtotalCents = items.reduce(
      (sum, i) => sum + Math.round(i.price * 100) * i.quantity,
      0,
    );
    const shipping = shippingCents ?? SHIPPING_CENTS_DEFAULT;
    const totalCents = subtotalCents + shipping;

    if (totalCents < 100) throw new Error("Order too small (< 1 €)");

    // ── ordernumber + stamp ─────────────
    const ts = Date.now();
    const orderNumber = `LD-${ts.toString(36).toUpperCase()}`;
    const stamp = `${orderNumber}-${crypto.randomUUID()}`;
    const reference = orderNumber;

    // ── luo orders-rivi pendingissä ─────
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        reference,
        stamp,
        status: "pending",
        customer_first_name: customer.firstName,
        customer_last_name: customer.lastName,
        customer_email: customer.email,
        customer_phone: customer.phone,
        shipping_address: customer.address,
        shipping_postal_code: customer.postalCode,
        shipping_city: customer.city,
        shipping_country: customer.country ?? "FI",
        subtotal_cents: subtotalCents,
        shipping_cents: shipping,
        total_cents: totalCents,
      })
      .select()
      .single();

    if (orderErr) throw orderErr;

    // ── order_items rivit ──────────────
    const orderItems = items.map((i) => ({
      order_id: order.id,
      product_id: i.id,
      product_name: i.name,
      variant: i.variant ?? null,
      weight: i.weight ?? null,
      color: i.color ?? null,
      unit_price_cents: Math.round(i.price * 100),
      quantity: i.quantity,
      line_total_cents: Math.round(i.price * 100) * i.quantity,
    }));
    const { error: itemsErr } = await supabase
      .from("order_items")
      .insert(orderItems);
    if (itemsErr) throw itemsErr;

    // ── Paytrail payload ───────────────
    const paytrailBody = {
      stamp,
      reference,
      amount: totalCents,
      currency: "EUR",
      language: "FI",
      items: [
        ...items.map((i) => ({
          unitPrice: Math.round(i.price * 100),
          units: i.quantity,
          vatPercentage: 25.5, // FI ALV 2026
          productCode: i.id,
          description: i.variant ? `${i.variant} ${i.name}` : i.name,
        })),
        {
          unitPrice: shipping,
          units: 1,
          vatPercentage: 25.5,
          productCode: "shipping",
          description: "Toimitus (Posti 1-3 pv)",
        },
      ],
      customer: {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
      },
      deliveryAddress: {
        streetAddress: customer.address,
        postalCode: customer.postalCode,
        city: customer.city,
        country: customer.country ?? "FI",
      },
      invoicingAddress: {
        streetAddress: customer.address,
        postalCode: customer.postalCode,
        city: customer.city,
        country: customer.country ?? "FI",
      },
      redirectUrls: {
        success: `${SITE_URL}/shop/vahvistus`,
        cancel: `${SITE_URL}/shop/kassa?status=cancelled`,
      },
      callbackUrls: {
        success:
          `${Deno.env.get("SUPABASE_URL")}/functions/v1/payment-callback`,
        cancel:
          `${Deno.env.get("SUPABASE_URL")}/functions/v1/payment-callback`,
      },
    };

    const bodyStr = JSON.stringify(paytrailBody);

    const ptHeaders: Record<string, string> = {
      "checkout-account": MERCHANT_ID,
      "checkout-algorithm": "sha256",
      "checkout-method": "POST",
      "checkout-nonce": crypto.randomUUID(),
      "checkout-timestamp": new Date().toISOString(),
      "content-type": "application/json; charset=utf-8",
      "platform-name": "luckydiscs-supabase",
    };

    const signature = await calculateHmac(SECRET_KEY, ptHeaders, bodyStr);
    ptHeaders["signature"] = signature;

    // ── kutsu Paytrail ──────────────────
    const ptResp = await fetch(PAYTRAIL_API, {
      method: "POST",
      headers: ptHeaders,
      body: bodyStr,
    });

    const ptData = await ptResp.json();

    if (!ptResp.ok) {
      // päivitä order failed-tilaan
      await supabase
        .from("orders")
        .update({ status: "failed" })
        .eq("id", order.id);
      console.error("Paytrail error:", ptData);
      return new Response(
        JSON.stringify({ error: "Paytrail API error", details: ptData }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    // tallenna Paytrail-href orderiin
    await supabase
      .from("orders")
      .update({ paytrail_href: ptData.href })
      .eq("id", order.id);

    return new Response(
      JSON.stringify({
        success: true,
        orderNumber,
        href: ptData.href,
        transactionId: ptData.transactionId,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  } catch (err) {
    console.error("create-payment error:", err);
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
