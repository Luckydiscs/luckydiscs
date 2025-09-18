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
      from: "Lucky Discs <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Lucky Discs Newsletter! 🥏",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: white;">
          <!-- Header with Logo -->
          <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%);">
            <h1 style="color: black; margin: 0; font-size: 32px; font-weight: bold; text-shadow: none;">Lucky Discs</h1>
            <p style="color: black; margin: 10px 0 0 0; font-size: 16px; opacity: 0.8;">Premium Disc Golf Equipment</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px; text-align: center;">
            <h2 style="color: #00ff41; margin: 0 0 20px 0; font-size: 28px;">Welcome to the Team! 🥏</h2>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0; color: #e0e0e0;">
              Thank you for subscribing to the Lucky Discs newsletter! You're now part of our exclusive community of disc golf enthusiasts.
            </p>
            
            <div style="background: #222; padding: 30px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #00ff41;">
              <h3 style="color: #00ff41; margin: 0 0 15px 0;">What to expect:</h3>
              <ul style="text-align: left; color: #e0e0e0; line-height: 1.8; padding-left: 20px;">
                <li>🆕 New product launches and exclusive previews</li>
                <li>💰 Special discounts and member-only offers</li>
                <li>🏆 Pro player insights and tournament updates</li>
                <li>📚 Disc selection guides and throwing tips</li>
                <li>🎯 Course recommendations and community highlights</li>
              </ul>
            </div>
            
            <p style="font-size: 16px; color: #e0e0e0; margin: 30px 0;">
              Keep an eye on your inbox for our weekly updates every Thursday!
            </p>
            
            <!-- CTA Button -->
            <div style="margin: 40px 0;">
              <a href="https://luckydiscs.fi" style="display: inline-block; background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%); color: black; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Shop Lucky Discs
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #111; padding: 30px; text-align: center; border-top: 2px solid #00ff41;">
            <p style="color: #888; font-size: 14px; margin: 0 0 10px 0;">
              Lucky Discs - Premium Disc Golf Equipment
            </p>
            <p style="color: #666; font-size: 12px; margin: 0;">
              Email: asiakaspalvelu@luckydiscs.fi | Phone: +358 44 989 4225
            </p>
            <p style="color: #666; font-size: 11px; margin: 20px 0 0 0;">
              You can unsubscribe from these emails at any time by replying with "UNSUBSCRIBE"
            </p>
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