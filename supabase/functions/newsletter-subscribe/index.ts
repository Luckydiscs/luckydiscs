import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSubscribeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter subscribe function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterSubscribeRequest = await req.json();
    console.log("Newsletter subscription request for:", email);

    if (!email || !email.includes("@")) {
      throw new Error("Valid email address is required");
    }

    // Check if email already exists
    const { data: existingSubscription } = await supabase
      .from('newsletter_subscriptions')
      .select('email')
      .eq('email', email)
      .single();

    if (existingSubscription) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email already subscribed",
          alreadyExists: true
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Add to newsletter subscriptions
    const { error: dbError } = await supabase
      .from('newsletter_subscriptions')
      .insert([{
        email: email,
        subscribed_at: new Date().toISOString()
      }]);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save subscription");
    }

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "Lucky Discs <info@luckydiscs.fi>",
      to: [email],
      subject: "Tervetuloa Lucky Discs -uutiskirjeen tilaajaksi!",
      html: `
        <div style="margin:0;padding:24px 0;background:#f4f4f5;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">
            <div style="background:#1E8549;padding:28px 24px;text-align:center;">
              <div style="font-size:26px;font-weight:800;letter-spacing:2px;color:#ffffff;">LUCKY DISCS</div>
              <div style="font-size:11px;letter-spacing:3px;color:#d1fae5;text-transform:uppercase;margin-top:4px;">Premium Disc Golf</div>
            </div>
            <div style="padding:28px 24px;color:#1a1a1a;">
              <h2 style="margin:0 0 12px;font-size:22px;">Tervetuloa mukaan!</h2>
              <p style="margin:0 0 16px;color:#444;line-height:1.6;">Kiitos, etta liityit Lucky Discs -uutiskirjeen tilaajaksi! Saat ensimmaisten joukossa tiedon:</p>
              <ul style="color:#444;line-height:1.9;padding-left:20px;margin:0 0 20px;">
                <li>uutuuskiekoista ja ennakkojulkaisuista</li>
                <li>tarjouksista ja tilaajaeduista</li>
                <li>kilpailu- ja tiimikuulumisista</li>
                <li>vinkeista kiekonvalintaan ja heittotekniikkaan</li>
              </ul>
              <div style="text-align:center;margin:28px 0;">
                <a href="https://www.luckydiscs.fi/shop" style="display:inline-block;background:#1E8549;color:#fff;text-decoration:none;padding:14px 28px;border-radius:9999px;font-weight:700;">Siirry verkkokauppaan</a>
              </div>
            </div>
            <div style="background:#0a0a0a;padding:20px 24px;text-align:center;">
              <div style="color:#ffffff;font-weight:700;letter-spacing:1px;margin-bottom:6px;">LUCKY DISCS</div>
              <div style="color:#9ca3af;font-size:12px;line-height:1.7;">VESITIIVIS Oy (Y-tunnus 3368925-4)<br>asiakaspalvelu@luckydiscs.fi &middot; <a href="https://www.luckydiscs.fi" style="color:#E2AD28;text-decoration:none;">luckydiscs.fi</a></div>
              <div style="color:#666;font-size:11px;margin-top:12px;">Voit perua tilauksen milloin tahansa vastaamalla viestiin sanalla PERU.</div>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Welcome email response:", emailResponse);

    if (emailResponse.error) {
      console.error("Email sending failed:", emailResponse.error);
      // Don't throw error - subscription was saved successfully
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully subscribed to newsletter",
        emailSent: !emailResponse.error
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in newsletter subscribe function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);