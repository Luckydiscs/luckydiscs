import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const baseStyles = {
  bodyBg: "#0b0b0b",
  cardBg: "#101010",
  dark: "#0b0b0b",
  text: "#e5e5e5",
  muted: "#a1a1aa",
  border: "#262626",
  accent: "#39ff14",
  accentDark: "#1ade00",
};

const headerHtml = (logoUrl: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${baseStyles.accent};">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <img src="${logoUrl}" alt="Lucky Discs" width="180" height="auto" style="display:block;border:0;outline:none;text-decoration:none;">
        <div style="font:600 14px/1.4, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial; color:#000; margin-top:6px;">Premium Disc Golf Equipment</div>
      </td>
    </tr>
  </table>`;

const footerHtml = () => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;border-top:1px solid ${baseStyles.border};">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <div style="font:500 13px/1.6, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial; color:${baseStyles.muted};">
          Lucky Discs • Nokia, Finland
          <br />This is an automated message — you can reply directly to this email.
        </div>
      </td>
    </tr>
  </table>`;

const containerOpen = () => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${baseStyles.bodyBg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:${baseStyles.cardBg};border:1px solid ${baseStyles.border};border-radius:14px;">
          <tr><td style="padding:32px 28px 8px 28px;">`;

const containerClose = () => `
          </td></tr>
        </table>
      </td>
    </tr>
  </table>`;

const section = (content: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px 0;">
    <tr><td>${content}</td></tr>
  </table>`;

const button = (href: string, label: string) => `
  <table role="presentation" cellspacing="0" cellpadding="0">
    <tr>
      <td style="border-radius:10px;" bgcolor="${baseStyles.accent}">
        <a href="${href}" style="display:inline-block;padding:14px 22px;border-radius:10px;font:700 15px/1, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:#000;text-decoration:none;background:${baseStyles.accent};">${label}</a>
      </td>
    </tr>
  </table>`;

const adminBlock = (label: string, value: string) => `
  <div style="font:600 13px/1.4, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:${baseStyles.muted};margin:0 0 6px 0;">${label}</div>
  <div style="font:500 16px/1.6, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:${baseStyles.text};word-break:break-word;">${value}</div>`;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactNotificationRequest = await req.json();

    const origin = req.headers.get("origin") ?? "https://luckydiscs.fi";
    const logoUrl = "https://luckydiscs.fi/lucky-discs-logo.png";
    const discsUrl = `${origin}/discs`;

    // Admin notification (beautiful but information-dense)
    const adminHtml = `
      ${headerHtml(logoUrl)}
      ${containerOpen()}
        ${section(`<h1 style=\"margin:0 0 4px 0;font:800 22px/1.2, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:${baseStyles.accent};\">New contact message</h1>
        <div style=\"font:500 14px/1.6, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:${baseStyles.muted};margin:6px 0 0 0;\">A customer just reached out via website contact form.</div>`)}
        ${section(`
          ${adminBlock('Name', data.name)}
          ${adminBlock('Email', `<a href=\"mailto:${data.email}\" style=\"color:${baseStyles.accent};text-decoration:none;\">${data.email}</a>`)}
          ${adminBlock('Subject', data.subject)}
        `)}
        ${section(`
          <div style=\"font:700 14px/1.4, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:${baseStyles.accent};margin:10px 0;\">Message</div>
          <div style=\"background:#0f0f0f;border:1px solid ${baseStyles.border};border-radius:12px;padding:16px;color:${baseStyles.text};font:500 15px/1.7, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;white-space:pre-wrap;\">${data.message}</div>
        `)}
        ${section(button(`mailto:${data.email}?subject=Re:%20${encodeURIComponent(data.subject)}`,'Reply to customer'))}
      ${containerClose()}
      ${footerHtml()}
    `;

    const customerServiceResponse = await resend.emails.send({
      from: "Lucky Discs <onboarding@resend.dev>",
      to: ["laplandvibe@gmail.com"],
      subject: `[LUCKY DISCS CONTACT] ${data.subject} - ${data.name}`,
      html: adminHtml,
    });

    // Customer confirmation (brand-first, clean layout)
    const confirmationHtml = `
      ${headerHtml(logoUrl)}
      ${containerOpen()}
        ${section(`<h1 style=\"margin:0 0 10px 0;font:800 26px/1.2, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:${baseStyles.accent};\">Thank you for contacting us! 🥏</h1>
        <div style=\"font:500 16px/1.7, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:${baseStyles.text};\">Hi ${data.name}, we received your message about \"${data.subject}\".</div>`)}
        ${section(`
          <div style=\"background:#0f0f0f;border:1px solid ${baseStyles.border};border-radius:12px;padding:16px;\">
            <div style=\"font:700 13px/1.4, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:${baseStyles.accent};margin:0 0 8px 0;\">Your message</div>
            <div style=\"color:${baseStyles.text};font:500 15px/1.7, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;white-space:pre-wrap;\">${data.message}</div>
          </div>
        `)}
        ${section(`
          <div style=\"background:${baseStyles.accent};color:#000;border-radius:12px;padding:18px;text-align:center;font:700 15px/1.4, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;\">We'll respond within 24 hours (weekdays)</div>
        `)}
        ${section(`
          <div style=\"font:500 14px/1.7, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;color:${baseStyles.muted};\">
            For urgent matters, contact us: 
            <a href=\"mailto:asiakaspalvelu@luckydiscs.fi\" style=\"color:${baseStyles.accent};text-decoration:none;\">asiakaspalvelu@luckydiscs.fi</a> • +358 44 989 4225
          </div>
        `)}
        ${section(`<div style=\"text-align:center;\">${button(discsUrl,'Browse our discs')}</div>`)}
      ${containerClose()}
      ${footerHtml()}
    `;

    const confirmationResponse = await resend.emails.send({
      from: "Lucky Discs <onboarding@resend.dev>",
      to: [data.email],
      subject: "Message received – Lucky Discs",
      html: confirmationHtml,
    });

    console.log("Contact emails sent successfully:", { customerServiceResponse, confirmationResponse });

    return new Response(
      JSON.stringify({
        success: true,
        customerServiceId: customerServiceResponse.data?.id,
        confirmationId: confirmationResponse.data?.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
