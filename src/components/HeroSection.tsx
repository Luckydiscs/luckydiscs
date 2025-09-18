
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/disc-golf-sunset-hero.png";
import { useTranslation } from "@/hooks/useTranslation";

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hero-gradient min-h-[75vh] md:min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/60"></div>
      
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lucky-green/20 to-transparent absolute inset-0"></div>
      </div>
      
      {/* Animated discs in background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-lucky-green/10 blur-xl animate-spin-slow"></div>
        <div className="absolute top-3/4 -right-20 w-60 h-60 rounded-full bg-lucky-gold/10 blur-xl animate-spin-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-foreground mb-12 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 leading-tight text-white">
              <span className="text-primary">{t('hero.modernDiscs')}</span><br />
              <span>{t('hero.wildStyle')}</span><br />
              <span>{t('hero.luckyThrows')}</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-lg">
              {t('hero.subtitle')}
            </p>
            
            {/* Navigation Guide */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-lucky-green">{t('hero.whatAreYouLookingFor')}</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/wholesale')}
                  className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lucky-green text-xl">🏪</span>
                    <div>
                      <div className="font-semibold text-white group-hover:text-lucky-green transition-colors">
                        {t('nav.wholesale')}
                      </div>
                      <div className="text-sm text-white/70">
                        {t('hero.wholesaleDescription').split(': ')[1]}
                      </div>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => navigate('/discs')}
                  className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lucky-green text-xl">🥏</span>
                    <div>
                      <div className="font-semibold text-white group-hover:text-lucky-green transition-colors">
                        {t('nav.discs')}
                      </div>
                      <div className="text-sm text-white/70">
                        {t('hero.discsDescription').split(': ')[1]}
                      </div>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => navigate('/team')}
                  className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lucky-green text-xl">👥</span>
                    <div>
                      <div className="font-semibold text-white group-hover:text-lucky-green transition-colors">
                        {t('nav.team')}
                      </div>
                      <div className="text-sm text-white/70">
                        {t('hero.teamDescription').split(': ')[1]}
                      </div>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => navigate('/brand')}
                  className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lucky-green text-xl">📖</span>
                    <div>
                      <div className="font-semibold text-white group-hover:text-lucky-green transition-colors">
                        {t('nav.brand')}
                      </div>
                      <div className="text-sm text-white/70">
                        {t('hero.brandDescription').split(': ')[1]}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                size="lg"
                className="bg-lucky-green text-black hover:bg-white hover:text-black px-8 font-semibold text-lg"
                onClick={() => navigate('/wholesale')}
              >
                {t('hero.getWholesaleAccess')}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 bg-transparent text-lg"
                onClick={() => navigate('/discs')}
              >
                {t('hero.exploreOurDiscs')}
              </Button>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-sm w-full sm:w-auto">
              <button 
                className="bg-lucky-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                onClick={() => navigate('/team')}
              >
                <span>👥</span>
                {t('hero.ourTeam')}
              </button>
              <button 
                className="bg-transparent border-2 border-lucky-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-lucky-green hover:text-black transition-colors duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                onClick={() => navigate('/brand')}
              >
                <span>📖</span>
                {t('hero.ourStory')}
              </button>
              <button 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                onClick={() => navigate('/contact')}
              >
                <span>✉️</span>
                {t('hero.contact')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
