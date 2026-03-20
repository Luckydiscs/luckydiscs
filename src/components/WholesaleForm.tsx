
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

const WholesaleForm = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    country: "",
    business_type: "",
    message: "",
    newsletter: true,
    honeypot: "", // Bot protection field
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
    
    // Bot protection - if honeypot field is filled, it's likely a bot
    if (formData.honeypot) {
      console.log('Bot detected, blocking submission');
      setIsSubmitting(false);
      return;
    }
    
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
        title: t('wholesaleForm.successTitle'),
        description: t('wholesaleForm.successDescription'),
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
        newsletter: true,
        honeypot: "",
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('wholesaleForm.errorTitle'),
        description: t('wholesaleForm.errorDescription'),
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
          <Label htmlFor="company_name">{t('wholesaleForm.companyName')} *</Label>
          <Input
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder={t('wholesaleForm.placeholders.companyName')}
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact_person">{t('wholesaleForm.contactPerson')} *</Label>
          <Input
            id="contact_person"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
            placeholder={t('wholesaleForm.placeholders.contactPerson')}
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
      </div>
      
      {/* Email and Phone - Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">{t('wholesaleForm.emailAddress')} *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('wholesaleForm.placeholders.email')}
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">{t('wholesaleForm.phoneNumber')}</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('wholesaleForm.placeholders.phone')}
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
      </div>
      
      {/* Country and Business Type - Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="country">{t('wholesaleForm.country')} *</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder={t('wholesaleForm.placeholders.country')}
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="business_type">{t('wholesaleForm.businessType')} *</Label>
          <Input
            id="business_type"
            name="business_type"
            value={formData.business_type}
            onChange={handleChange}
            placeholder={t('wholesaleForm.businessPlaceholder')}
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
      </div>
      
      {/* Honeypot field - hidden from users, used for bot detection */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      {/* Message - Full width */}
      <div className="space-y-2">
        <Label htmlFor="message">{t('wholesaleForm.message')}</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('wholesaleForm.messagePlaceholder')}
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
          {t('wholesaleForm.newsletter')}
        </Label>
      </div>
      
      {/* Submit button */}
      <Button 
        type="submit" 
        className="w-full md:w-auto bg-lucky-green text-white hover:bg-white hover:text-black font-semibold px-8"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('wholesaleForm.submitting') : t('wholesaleForm.submit')}
      </Button>
    </form>
  );
};

export default WholesaleForm;
