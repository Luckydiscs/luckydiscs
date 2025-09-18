
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

const WholesaleForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    country: "",
    business_type: "",
    message: "",
    newsletter: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('wholesale_inquiries')
        .insert([
          {
            company_name: formData.company_name,
            contact_person: formData.contact_person,
            email: formData.email,
            phone: formData.phone || null,
            country: formData.country,
            business_type: formData.business_type,
            message: formData.message || null,
          }
        ]);

      if (error) {
        throw error;
      }

      // Subscribe to newsletter if opted in
      if (formData.newsletter) {
        await supabase
          .from('newsletter_subscriptions')
          .insert([
            {
              email: formData.email,
              source: 'wholesale_form'
            }
          ]);
      }

      // Send notification emails
      const emailResponse = await supabase.functions.invoke('send-wholesale-notification', {
        body: {
          company_name: formData.company_name,
          contact_person: formData.contact_person,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          business_type: formData.business_type,
          message: formData.message,
        }
      });

      if (emailResponse.error) {
        console.error('Email sending failed:', emailResponse.error);
        // Still show success to user as the data was saved
      }

      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your wholesale application and contact you within 2 business days. You'll receive a confirmation email shortly.",
      });

      // Reset form
      setFormData({
        company_name: "",
        contact_person: "",
        email: "",
        phone: "",
        country: "",
        business_type: "",
        message: "",
        newsletter: true
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly if the problem persists.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company and Contact Info - Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name *</Label>
          <Input
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Your Business Name"
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact_person">Contact Person *</Label>
          <Input
            id="contact_person"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
      </div>
      
      {/* Email and Phone - Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
      </div>
      
      {/* Country and Business Type - Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United States"
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="business_type">Business Type *</Label>
          <Input
            id="business_type"
            name="business_type"
            value={formData.business_type}
            onChange={handleChange}
            placeholder="Retail Store, Pro Shop, Online Store, etc."
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
      </div>
      
      {/* Message - Full width */}
      <div className="space-y-2">
        <Label htmlFor="message">Tell us about your business</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your business, your customers, expected volume, or any questions you may have."
          className="min-h-[100px] bg-black/5 border-gray-700 focus:border-lucky-green"
        />
      </div>
      
      {/* Newsletter checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="newsletter" 
          checked={formData.newsletter}
          onCheckedChange={(checked) => 
            handleCheckboxChange("newsletter", checked as boolean)
          }
        />
        <Label htmlFor="newsletter" className="text-sm">
          Subscribe to our wholesale newsletter for product updates and special offers
        </Label>
      </div>
      
      {/* Submit button */}
      <Button 
        type="submit" 
        className="w-full md:w-auto bg-lucky-green text-black hover:bg-white hover:text-black font-semibold px-8"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting Application..." : "Submit Wholesale Application"}
      </Button>
    </form>
  );
};

export default WholesaleForm;
