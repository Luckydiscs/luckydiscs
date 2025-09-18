import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WholesaleNotificationRequest {
  company_name: string;
  contact_person: string;
  email: string;
  phone?: string;
  country: string;
  business_type: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: WholesaleNotificationRequest = await req.json();

      // Send notification to customer service
      const customerServiceResponse = await resend.emails.send({
        from: "Lucky Discs <onboarding@resend.dev>",
        to: ["laplandvibe@gmail.com"], // Temporary - using your verified email  
        subject: `[LUCKY DISCS WHOLESALE] ${data.company_name} - ${data.contact_person}`,
        html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #f5f5f5;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%); padding: 30px; text-align: center;">
            <h1 style="color: black; margin: 0; font-size: 28px; font-weight: bold;">Lucky Discs</h1>
            <p style="color: black; margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">New Wholesale Application</p>
          </div>
          
          <!-- Content -->
          <div style="background: white; padding: 30px;">
            <h2 style="color: #333; margin: 0 0 20px 0;">Company Information:</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0; color: #333;"><strong>Company Name:</strong> ${data.company_name}</p>
              <p style="margin: 5px 0; color: #333;"><strong>Contact Person:</strong> ${data.contact_person}</p>
              <p style="margin: 5px 0; color: #333;"><strong>Email:</strong> ${data.email}</p>
              <p style="margin: 5px 0; color: #333;"><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              <p style="margin: 5px 0; color: #333;"><strong>Country:</strong> ${data.country}</p>
              <p style="margin: 5px 0; color: #333;"><strong>Business Type:</strong> ${data.business_type}</p>
            </div>
            
            ${data.message ? `
              <h3 style="color: #333; margin: 25px 0 15px 0;">Additional Message:</h3>
              <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; border-left: 4px solid #00ff41;">
                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
            ` : ''}
          </div>
          
          <!-- Footer -->
          <div style="background: #333; padding: 20px; text-align: center;">
            <p style="margin: 0; color: #ccc; font-size: 12px;">
              This email was sent automatically from the Lucky Discs wholesale application form.
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation to applicant
    const confirmationResponse = await resend.emails.send({
      from: "Lucky Discs <onboarding@resend.dev>",
      to: [data.email],
      subject: "Wholesale Application Received - Lucky Discs 🥏",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: white;">
          <!-- Header with Logo -->
          <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%);">
            <h1 style="color: black; margin: 0; font-size: 32px; font-weight: bold; text-shadow: none;">Lucky Discs</h1>
            <p style="color: black; margin: 10px 0 0 0; font-size: 16px; opacity: 0.8;">Premium Disc Golf Equipment</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #00ff41; margin: 0 0 20px 0; font-size: 28px;">Thank you for your wholesale application! 🏪</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">Hi ${data.contact_person},</p>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0; color: #e0e0e0;">
              We have successfully received your wholesale application for <strong style="color: #00ff41;">${data.company_name}</strong>.
            </p>
            
            <div style="background: linear-gradient(135deg, #00ff41 10%, #00cc33 100%); color: black; padding: 25px; border-radius: 10px; margin: 30px 0; text-align: center;">
              <h3 style="margin: 0 0 10px 0;">⚡ Application Review Process</h3>
              <p style="margin: 0; font-weight: 500;">Our wholesale team will review your application and contact you within 2 business days.</p>
            </div>
            
            <div style="background: #222; padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #00ff41;">
              <h3 style="color: #00ff41; margin: 0 0 15px 0;">Your Application Details:</h3>
              <p style="color: #e0e0e0; margin: 5px 0;"><strong style="color: #00ff41;">Company:</strong> ${data.company_name}</p>
              <p style="color: #e0e0e0; margin: 5px 0;"><strong style="color: #00ff41;">Country:</strong> ${data.country}</p>
              <p style="color: #e0e0e0; margin: 5px 0;"><strong style="color: #00ff41;">Business Type:</strong> ${data.business_type}</p>
            </div>
            
            <p style="font-size: 16px; color: #e0e0e0; margin: 30px 0;">
              If you have any questions about your application, feel free to contact us:
            </p>
            
            <div style="background: #111; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0; color: #e0e0e0;"><strong style="color: #00ff41;">📧 Email:</strong> <a href="mailto:asiakaspalvelu@luckydiscs.fi" style="color: #00ff41; text-decoration: none;">asiakaspalvelu@luckydiscs.fi</a></p>
              <p style="margin: 5px 0; color: #e0e0e0;"><strong style="color: #00ff41;">📞 Phone:</strong> +358 44 989 4225</p>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://luckydiscs.fi/discs" style="display: inline-block; background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%); color: black; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                🥏 Browse Our Products
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #111; padding: 30px; text-align: center; border-top: 2px solid #00ff41;">
            <p style="color: #888; font-size: 14px; margin: 0 0 10px 0;">
              Lucky Discs Wholesale Team<br>
              Premium Disc Golf Equipment
            </p>
            <p style="color: #666; font-size: 12px; margin: 0;">
              Nokia, Finland | Made with 🍀 for disc golf businesses
            </p>
            <p style="color: #666; font-size: 11px; margin: 20px 0 0 0;">
              This is an automated confirmation email. You can reply directly to this email if needed.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { customerServiceResponse, confirmationResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      customerServiceId: customerServiceResponse.data?.id,
      confirmationId: confirmationResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-wholesale-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);