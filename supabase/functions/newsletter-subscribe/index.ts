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
      from: "Lucky Discs <noreply@luckydiscs.fi>",
      to: [email],
      subject: "Welcome to Lucky Discs Newsletter! 🍀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #008800, #00cc00); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🍀 Lucky Discs</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Premium Disc Golf Equipment</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #333; margin-bottom: 20px;">Welcome to the Lucky Family! 🎯</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
              Thank you for subscribing to the Lucky Discs newsletter! You're now part of our exclusive community and will be the first to know about:
            </p>
            
            <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #008800;">
              <h3 style="margin-top: 0; color: #008800; font-size: 18px;">🎁 What You'll Get:</h3>
              <ul style="margin: 15px 0; padding-left: 20px; color: #333;">
                <li style="margin-bottom: 8px;"><strong>🔥 Exclusive Product Launches</strong> - Be first to grab new disc releases</li>
                <li style="margin-bottom: 8px;"><strong>💰 Special Offers & Discounts</strong> - Subscriber-only deals</li>
                <li style="margin-bottom: 8px;"><strong>🎯 Free Giveaways</strong> - Monthly disc giveaways and contests</li>
                <li style="margin-bottom: 8px;"><strong>🏆 Team Updates</strong> - Tournament results and player news</li>
                <li style="margin-bottom: 8px;"><strong>📚 Pro Tips</strong> - Improve your game with expert advice</li>
              </ul>
            </div>

            <div style="background-color: #008800; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <h3 style="margin: 0 0 10px 0; font-size: 20px;">🎯 Current Lineup</h3>
              <p style="margin: 0; font-size: 14px; opacity: 0.9;">Bank Robber • Treasure Hunt • Money Shot • Jailbreak</p>
              <p style="margin: 10px 0 0 0; font-size: 16px; font-weight: bold;">Modern Discs. Wild Style. Lucky Throws.</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.luckydiscs.fi/discs" style="background-color: #008800; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                🥏 Shop Our Discs
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Follow us on social media for daily updates:<br>
              <a href="https://www.instagram.com/luckydiscsofficial" style="color: #008800; text-decoration: none;">📸 Instagram</a> • 
              <a href="https://www.facebook.com/LuckyDiscs" style="color: #008800; text-decoration: none;">📘 Facebook</a> • 
              <a href="https://www.youtube.com/@LuckyDiscs" style="color: #008800; text-decoration: none;">🎥 YouTube</a>
            </p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
            <p style="margin: 0; color: #666; font-size: 12px;">
              Lucky Discs | Nokia, Finland | Made with 🍀 for disc golf lovers<br>
              <a href="mailto:asiakaspalvelu@luckydiscs.fi" style="color: #008800;">asiakaspalvelu@luckydiscs.fi</a>
            </p>
            <p style="margin: 10px 0 0 0; color: #999; font-size: 11px;">
              You can unsubscribe at any time by replying to this email.
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