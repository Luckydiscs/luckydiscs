import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import logo from "@/assets/lucky-discs-transparent-logo.png";
const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email }
      });

      if (error) throw error;

      if (data.alreadyExists) {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
        });
      } else {
        setIsSubscribed(true);
        toast({
          title: "Successfully Subscribed! 🍀",
          description: "Welcome to Lucky Discs newsletter! Check your email for confirmation.",
        });
      }
      
      setEmail("");
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Lucky Discs logo"
                className="h-36 w-auto"
              />
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/luckydiscsofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-lucky-green transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/LuckyDiscs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-lucky-green transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.youtube.com/@LuckyDiscs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-lucky-green transition-colors"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading mb-4 text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/discs" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  {t('nav.discs')}
                </Link>
              </li>
              <li>
                <Link to="/disc-guide" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  {t('footer.discGuide')}
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  {t('nav.team')}
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  {t('nav.wholesale')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading mb-4 text-white">{t('footer.contactInfo')}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{t('footer.email')}</strong><br />
                asiakaspalvelu@luckydiscs.fi
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{t('footer.location')}</strong><br />
                Nokia, Finland
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{t('footer.businessType')}</strong><br />
                {t('footer.businessTypeValue')}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{t('footer.specialty')}</strong><br />
                {t('footer.specialtyValue')}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading mb-4 text-white">{t('footer.newsletter')}</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.newsletterDescription')}
            </p>
            
            {isSubscribed ? (
              <div className="bg-lucky-green/20 border border-lucky-green/40 rounded-lg p-4 text-center">
                <CheckCircle className="h-8 w-8 text-lucky-green mx-auto mb-2" />
                <p className="text-lucky-green font-semibold text-sm">
                  {t('footer.thanksForSubscribing')}
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  {t('footer.checkEmailConfirmation')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder={t('footer.yourEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="bg-gray-900 border-gray-700 focus:border-lucky-green text-white placeholder:text-gray-500"
                />
                <Button 
                  type="submit"
                  size="icon" 
                  disabled={isSubmitting}
                  className="bg-lucky-green text-black hover:bg-opacity-80 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                  ) : (
                    <Send size={18} />
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p className="mb-4">© {new Date().getFullYear()} Lucky Discs. {t('footer.allRightsReserved')}</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/privacy" className="hover:text-lucky-green transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="hover:text-lucky-green transition-colors">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
