
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/disc-golf-sunset-hero.webp";
import { useTranslation } from "@/hooks/useTranslation";

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hero-gradient min-h-[70vh] md:min-h-[85vh] flex items-center relative overflow-hidden">
      {/* Optimized Background Image with lazy loading concept */}
      <div 
        className="md:hidden absolute inset-0 z-0 opacity-50 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: '65% center',
          willChange: 'transform'
        }}
      ></div>
      
      {/* Desktop background positioning */}
      <div 
        className="hidden md:block absolute inset-0 z-0 opacity-50 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center right',
          willChange: 'transform'
        }}
      ></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/50 md:bg-black/60"></div>
      
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lucky-green/20 to-transparent absolute inset-0"></div>
      </div>
      
      {/* Animated discs in background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-lucky-green/10 blur-xl animate-spin-slow"></div>
        <div className="absolute top-3/4 -right-20 w-60 h-60 rounded-full bg-lucky-gold/10 blur-xl animate-spin-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-foreground mb-12 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 leading-tight text-white">
              <span className="text-primary">{t('hero.luckyDiscs')}</span><br />
              <span>{t('hero.discGolfEquipment')}</span><br />
              <span>{t('hero.premiumQuality')}</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-lg">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                size="lg"
                className="bg-lucky-green text-white hover:bg-white hover:text-black px-8 font-semibold text-lg"
                onClick={() => navigate('/wholesale')}
              >
                {t('nav.getWholesaleAccess')}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 px-8 bg-transparent text-lg"
                onClick={() => navigate('/discs')}
              >
                {t('hero.exploreOurDiscs')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
