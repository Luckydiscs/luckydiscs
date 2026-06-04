// Lucky Discs — cart-reminder edge function
// Lähettää "jäikö ostos kesken" -muistutuksen maksamattomille (pending) tilauksille.
// Ajastetaan (esim. 15 min välein) pg_cron / Supabase-cron kutsumaan tätä.
//
// Suojaus: x-cron-secret -header verrataan CRON_SECRET-secretiin.
//
// Ympäristömuuttujat (Supabase secrets):
//   CRON_SECRET                - jaettu salaisuus ajastetulle kutsulle
//   RESEND_API_KEY             - sähköpostien lähetys
//   PUBLIC_SITE_URL            - esim. https://www.luckydiscs.fi
//   SUPABASE_URL               - automaattinen
//   SUPABASE_SERVICE_ROLE_KEY  - automaattinen
//
// Logiikka: status='pending' JA reminder_sent_at IS NULL JA luotu 1 h–7 vrk sitten.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@2.0.0";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const CRON_SECRET = Deno.env.get("CRON_SECRET") ?? "";
const SITE_URL = Deno.env.get("PUBLIC_SITE_URL") ?? "https://www.luckydiscs.fi";

const GREEN = "#1E8549";
const GOLD = "#E2AD28";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...cors } });

const eur = (c: number) => (c / 100).toFixed(2).replace(".", ",");

function reminderEmail(order: any, items: any[]) {
  const itemsHtml = items
    .map((i) => {
      const sub = [i.color, i.weight].filter(Boolean).join(" · ");
      const head = `${i.variant ? `${i.variant} ` : ""}${i.product_name}`;
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a1a;">${head}${sub ? `<div style="font-size:12px;color:#888;margin-top:2px;">${sub}</div>` : ""}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:center;color:#666;">${i.quantity} kpl</td>
      </tr>`;
    })
    .join("");

  return `
  <div style="margin:0;padding:24px 0;background:#f4f4f5;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">
      <div style="background:${GREEN};padding:24px;text-align:center;">
        <div style="font-size:26px;font-weight:800;letter-spacing:2px;color:#ffffff;">🍀 LUCKY DISCS</div>
        <div style="font-size:11px;letter-spacing:3px;color:#d1fae5;text-transform:uppercase;margin-top:4px;">Premium Disc Golf</div>
      </div>
      <div style="padding:28px 24px;color:#1a1a1a;">
        <h2 style="margin:0 0 8px;font-size:20px;">Jäikö kiekot kesken, ${order.customer_first_name}?</h2>
        <p style="margin:0 0 20px;color:#444;line-height:1.6;">Huomasimme, ettei tilauksesi ehtinyt aivan maaliin. Tuotteesi odottavat sinua — viimeistele tilaus alta, niin postitamme paketin 1–3 työpäivässä.</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${itemsHtml}</table>
        <div style="text-align:center;margin:24px 0;">
          <a href="${SITE_URL}/shop" style="display:inline-block;background:${GREEN};color:#fff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:999px;">Jatka ostoksia →</a>
        </div>
        <p style="margin:0;color:#888;font-size:13px;line-height:1.6;">Jos olet jo viimeistellyt tilauksen tai et halua jatkaa, voit jättää tämän viestin huomiotta. Kysyttävää? <a href="mailto:asiakaspalvelu@luckydiscs.fi" style="color:${GREEN};">asiakaspalvelu@luckydiscs.fi</a></p>
      </div>
      <div style="background:#0a0a0a;padding:20px 24px;text-align:center;">
        <div style="color:#ffffff;font-weight:700;letter-spacing:1px;margin-bottom:6px;">🍀 LUCKY DISCS</div>
        <div style="color:#9ca3af;font-size:12px;line-height:1.7;">
          VESITIIVIS Oy (Y-tunnus 3368925-4)<br>
          <a href="${SITE_URL}" style="color:${GOLD};text-decoration:none;">${SITE_URL.replace("https://", "")}</a>
        </div>
      </div>
    </div>
  </div>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  // Auth: jaettu salaisuus
  const secret = req.headers.get("x-cron-secret") ?? "";
  if (!CRON_SECRET || secret !== CRON_SECRET) {
    return json({ error: "Unauthorized" }, 401);
  }

  try {
    const now = Date.now();
    const oneHourAgo = new Date(now - 60 * 60 * 1000).toISOString();
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "pending")
      .is("reminder_sent_at", null)
      .lt("created_at", oneHourAgo)
      .gt("created_at", sevenDaysAgo)
      .order("created_at", { ascending: true })
      .limit(50);
    if (error) throw error;

    let sent = 0;
    for (const order of orders ?? []) {
      try {
        const { data: items } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", order.id);

        await resend.emails.send({
          from: "Lucky Discs <tilaukset@luckydiscs.fi>",
          to: order.customer_email,
          subject: `Jäikö ostos kesken? 🍀 ${order.order_number}`,
          html: reminderEmail(order, items ?? []),
        });

        await supabase
          .from("orders")
          .update({ reminder_sent_at: new Date().toISOString() })
          .eq("id", order.id);
        sent++;
      } catch (e) {
        console.error("cart-reminder send failed for", order.order_number, e);
      }
    }

    return json({ ok: true, candidates: orders?.length ?? 0, sent });
  } catch (e) {
    console.error("cart-reminder error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
