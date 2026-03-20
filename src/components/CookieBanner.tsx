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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-gray-300 text-sm leading-snug">
            {t('cookie.description')}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={declineCookies}
            className="text-sm text-white border border-gray-500 hover:border-white hover:bg-white/10 transition-colors px-3 py-1.5 rounded-md"
          >
            {t('cookie.decline')}
          </button>
          <Button
            size="sm"
            onClick={acceptCookies}
            className="bg-green-600 text-white hover:bg-green-500 font-semibold text-sm px-4 py-1.5 border-0"
          >
            {t('cookie.accept')}
          </Button>
        </div>

        <button
          onClick={declineCookies}
          className="text-gray-500 hover:text-white transition-colors -mt-1 -mr-1"
          aria-label="Sulje"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;