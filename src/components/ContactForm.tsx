
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

const ContactForm = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Bot protection field
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
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
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }
        ]);

      if (dbError) {
        throw dbError;
      }

      // Send notification emails
      const emailResponse = await supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      });

      if (emailResponse.error) {
        console.error('Email sending failed:', emailResponse.error);
        // Still show success to user as the data was saved
      }

      toast({
        title: t('contactForm.successTitle'),
        description: t('contactForm.successDescription'),
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
      });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: t('contactForm.errorTitle'),
        description: t('contactForm.errorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t('contactForm.yourName')}</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('contactForm.placeholders.name')}
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t('contactForm.emailAddress')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('contactForm.placeholders.email')}
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
      
      <div className="space-y-2">
        <Label htmlFor="subject">{t('contactForm.subject')}</Label>
        <Select onValueChange={handleSelectChange} value={formData.subject}>
          <SelectTrigger id="subject" className="bg-black/5 border-gray-700 focus:border-lucky-green">
            <SelectValue placeholder={t('contactForm.selectSubject')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">{t('contactForm.generalInquiry')}</SelectItem>
            <SelectItem value="wholesale">{t('contactForm.wholesaleQuestion')}</SelectItem>
            <SelectItem value="sponsorship">{t('contactForm.sponsorship')}</SelectItem>
            <SelectItem value="support">{t('contactForm.productSupport')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">{t('contactForm.yourMessage')}</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('contactForm.placeholders.message')}
          required
          className="min-h-[150px] bg-black/5 border-gray-700 focus:border-lucky-green"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full md:w-auto bg-lucky-green text-white hover:bg-white hover:text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('contactForm.sending') : t('contactForm.sendMessage')}
      </Button>
    </form>
  );
};

export default ContactForm;
