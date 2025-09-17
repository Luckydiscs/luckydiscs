import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-t border-gray-800 p-4 md:p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-2">🍪 Evästeet</h3>
            <p className="text-gray-300 text-sm md:text-base">
              Käytämme evästeitä sivuston toiminnallisuuden parantamiseksi ja 
              käyttökokemuksen optimoimiseksi. Jatkamalla sivuston käyttöä 
              hyväksyt evästeiden käytön.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Kieltäydy
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="bg-lucky-green text-black hover:bg-lucky-green/90"
            >
              Hyväksy evästeet
            </Button>
          </div>
          
          <button
            onClick={declineCookies}
            className="absolute top-2 right-2 md:relative md:top-0 md:right-0 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;