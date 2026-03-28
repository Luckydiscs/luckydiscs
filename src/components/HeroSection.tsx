
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Full-viewport background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/brand/finnish-sunset-course.webp')`,
        }}
      />

      {/* Deep cinematic gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />

      {/* Subtle green atmospheric glow */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 z-0 bg-lucky-green/10 blur-3xl rounded-full" />

      {/* Main content */}
      <div className="container mx-auto px-4 z-10 pt-20 pb-20 md:pt-28 md:pb-32">
        <div className="flex items-center gap-8">
        <div className="flex-1 max-w-3xl">
          {/* Pre-heading label + summer sale badge */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-lucky-gold" />
              <span className="font-display text-lucky-gold text-sm uppercase tracking-[0.3em]">
                {t('hero.premiumLabel')}
              </span>
            </div>
            {language === 'fi' && (
              <div className="relative inline-block self-start sm:self-auto">
                <div className="absolute inset-0 rounded-full bg-lucky-gold/30 blur-md animate-pulse" />
                <div
                  className="relative bg-lucky-gold text-black font-display font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-lucky-gold/50"
                  style={{ animation: "badge-pulse 3s ease-in-out infinite" }}
                >
                  {t('hero.summerSale')}
                </div>
              </div>
            )}
          </div>

          {/* Main headline */}
          <h1 className="font-heading text-[clamp(4rem,12vw,9rem)] leading-none tracking-wide text-white mb-2">
            LUCKY DISC
            <span className="text-lucky-gold">$</span>
          </h1>

          {/* Secondary headline in Barlow Condensed */}
          <p className="font-display text-[clamp(1.25rem,3vw,2rem)] font-semibold uppercase tracking-[0.2em] text-white/60 mb-8">
            {t('hero.modernDiscs')} &nbsp;
            <span className="text-lucky-green">{t('hero.wildStyle')}</span>
          </p>

          {/* Body copy */}
          <p className="font-sans text-lg text-white/75 max-w-xl mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTAs - FI: kesapelit.fi shop, EN: wholesale inquiry */}
          <div className="flex flex-row gap-3 sm:gap-4">
            {language === 'fi' ? (
              <a
                href="https://kesapelit.fi/?utm_source=luckydiscs&utm_medium=website&utm_campaign=hero&utm_content=osta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-lucky-green hover:bg-lucky-green/90 text-white font-display font-semibold uppercase tracking-wider text-xs sm:text-base px-4 sm:px-8 py-4 sm:py-6 h-auto transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-lucky-green/30"
                >
                  {t('hero.shopDiscs')}
                </Button>
              </a>
            ) : (
              <Button
                size="lg"
                className="bg-lucky-green hover:bg-lucky-green/90 text-white font-display font-semibold uppercase tracking-wider text-xs sm:text-base px-4 sm:px-8 py-4 sm:py-6 h-auto transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-lucky-green/30"
                onClick={() => navigate('/wholesale')}
              >
                {t('nav.getWholesaleAccess')}
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/40 text-white hover:border-white hover:bg-white/10 font-display font-semibold uppercase tracking-wider text-xs sm:text-base px-4 sm:px-8 py-4 sm:py-6 h-auto bg-transparent transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => navigate('/discs')}
            >
              {t('hero.exploreDiscs')}
            </Button>
          </div>
        </div>

        {/* Desktop disc image - baked into background layer */}
        <div
          className="hidden lg:block flex-1 h-[500px] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/brand/treasure-hunt-promo.webp')` }}
          role="img"
          aria-label="Lucky Discs Treasure Hunt"
        />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="font-display text-xs uppercase tracking-[0.3em]">{t('hero.scrollDown')}</span>
        <ChevronDown
          className="w-5 h-5 animate-bounce"
        />
      </div>

      <style>{`
        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
