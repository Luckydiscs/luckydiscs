import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const CookieBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      // Delay showing cookie banner for better user experience (3 seconds)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3 md:py-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-gray-400 text-xs sm:text-sm leading-snug text-center sm:text-left">
          {t('cookie.description')}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={declineCookies}
            className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-md"
          >
            {t('cookie.decline')}
          </button>
          <Button
            size="sm"
            onClick={acceptCookies}
            className="bg-lucky-green text-white hover:bg-lucky-green/80 font-semibold text-xs px-4 py-1.5 border-0 rounded-md"
          >
            {t('cookie.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;