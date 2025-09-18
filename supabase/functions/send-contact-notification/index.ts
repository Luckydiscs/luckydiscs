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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactNotificationRequest = await req.json();

    // Send notification to customer service
    const customerServiceResponse = await resend.emails.send({
      from: "Lucky Discs <onboarding@resend.dev>",
      to: ["asiakaspalvelu@luckydiscs.fi"],
      subject: `Contact Form: ${data.subject} - ${data.name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h3>Contact Information:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          
          <h3>Message:</h3>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was sent automatically from the Lucky Discs contact form.
          </p>
        </div>
      `,
    });

    // Send confirmation to sender
    const confirmationResponse = await resend.emails.send({
      from: "Lucky Discs <onboarding@resend.dev>",
      to: [data.email],
      subject: "Message Received - Lucky Discs",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thank you for contacting us!</h2>
          
          <p>Hi ${data.name},</p>
          
          <p>We have successfully received your message regarding "<strong>${data.subject}</strong>".</p>
          
          <p>Our team will get back to you as soon as possible, typically within 24 hours during business days.</p>
          
          <h3>Your Message:</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 0;">${data.message}</p>
          </div>
          
          <p>If you have any urgent questions, you can reach us directly at:</p>
          <ul>
            <li>Email: <a href="mailto:asiakaspalvelu@luckydiscs.fi">asiakaspalvelu@luckydiscs.fi</a></li>
            <li>Phone: +358 44 989 4225</li>
          </ul>
          
          <p>Best regards,<br>
          Lucky Discs Team</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation email. You can reply directly to this email if needed.
          </p>
        </div>
      `,
    });

    console.log("Contact emails sent successfully:", { customerServiceResponse, confirmationResponse });

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
    console.error("Error in send-contact-notification function:", error);
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