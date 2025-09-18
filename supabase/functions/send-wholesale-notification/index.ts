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
      from: "Lucky Discs <noreply@luckydiscs.fi>",
      to: ["asiakaspalvelu@luckydiscs.fi"],
      subject: `New Wholesale Inquiry from ${data.company_name}`,
      html: `
        <h2>New Wholesale Application</h2>
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h3>Company Information:</h3>
          <p><strong>Company Name:</strong> ${data.company_name}</p>
          <p><strong>Contact Person:</strong> ${data.contact_person}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Country:</strong> ${data.country}</p>
          <p><strong>Business Type:</strong> ${data.business_type}</p>
          
          ${data.message ? `
            <h3>Message:</h3>
            <p>${data.message}</p>
          ` : ''}
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was sent automatically from the Lucky Discs wholesale application form.
          </p>
        </div>
      `,
    });

    // Send confirmation to applicant
    const confirmationResponse = await resend.emails.send({
      from: "Lucky Discs <noreply@luckydiscs.fi>",
      to: [data.email],
      subject: "Wholesale Application Received - Lucky Discs",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thank you for your wholesale application!</h2>
          
          <p>Hi ${data.contact_person},</p>
          
          <p>We have successfully received your wholesale application for <strong>${data.company_name}</strong>.</p>
          
          <p>Our team will review your application and contact you within 2 business days. In the meantime, feel free to reach out if you have any questions.</p>
          
          <h3>Your Application Details:</h3>
          <ul>
            <li><strong>Company:</strong> ${data.company_name}</li>
            <li><strong>Country:</strong> ${data.country}</li>
            <li><strong>Business Type:</strong> ${data.business_type}</li>
          </ul>
          
          <p>Best regards,<br>
          Lucky Discs Team<br>
          <a href="mailto:asiakaspalvelu@luckydiscs.fi">asiakaspalvelu@luckydiscs.fi</a></p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
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