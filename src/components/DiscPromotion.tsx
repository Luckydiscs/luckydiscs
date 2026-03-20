import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface DiscPromotionProps {
  discName: 'bankRobber' | 'treasureHunt' | 'moneyShot' | 'jailbreak';
  discImage: string;
  flightNumbers?: {
    speed: number;
    glide: number;
    turn: number;
    fade: number;
  };
  buyUrl: string;
  variant?: 'featured' | 'compact' | 'inline';
  showFlightNumbers?: boolean;
  lightBackground?: boolean;
}

const DiscPromotion = ({ 
  discName, 
  discImage, 
  flightNumbers, 
  buyUrl, 
  variant = 'featured',
  showFlightNumbers = true,
  lightBackground = false 
}: DiscPromotionProps) => {
  const { t } = useTranslation();

  const discNames = {
    bankRobber: t('discs.bankRobber') || 'Bank Robber',
    treasureHunt: t('featured.treasureHunt') || 'Treasure Hunt', 
    moneyShot: t('discs.moneyShot') || 'Money Shot',
    jailbreak: t('discs.jailbreak') || 'Jailbreak'
  };

  const discDescriptions = {
    bankRobber: t('discs.bankRobberDesc'),
    treasureHunt: t('featured.treasureHuntDescription'),
    moneyShot: t('discs.moneyShotDesc'),
    jailbreak: t('discs.jailbreakDesc')
  };

  if (variant === 'inline') {
    // Dynamic colors for light/green backgrounds
    const textPrimary = lightBackground ? 'text-black' : 'text-primary';
    const textMuted = lightBackground ? 'text-gray-700' : 'text-muted-foreground';
    const bgGradient = lightBackground 
      ? 'bg-gradient-to-r from-black/10 to-black/20 border-black/30' 
      : 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20';
    const glowColor = lightBackground ? 'bg-black/20' : 'bg-primary/20';

    return (
      <div className={`${bgGradient} rounded-xl p-6 border`}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className={`absolute inset-0 ${glowColor} rounded-full blur-xl `}></div>
            <img 
              src={discImage} 
              alt={discNames[discName]} 
              className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 object-contain"
            />
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <Star className={`w-4 h-4 ${lightBackground ? 'text-black' : 'text-accent'} fill-current`} />
              <span className={`text-sm font-medium ${lightBackground ? 'text-black' : 'text-accent'} uppercase tracking-wide`}>
                Lucky Discs
              </span>
            </div>
            <h3 className={`text-xl font-heading mb-2 ${textPrimary}`}>
              {discNames[discName]}
            </h3>
            <p className={`text-sm ${textMuted} mb-4 line-clamp-2`}>
              {discDescriptions[discName]}
            </p>
            
            {showFlightNumbers && flightNumbers && (
              <div className="flex justify-center sm:justify-start gap-3 mb-4">
                <div className="text-center">
                  <div className={`text-lg font-bold ${textPrimary}`}>{flightNumbers.speed}</div>
                  <div className={`text-xs ${textMuted} uppercase`}>{t('featured.speed')}</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${textPrimary}`}>{flightNumbers.glide}</div>
                  <div className={`text-xs ${textMuted} uppercase`}>{t('featured.glide')}</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${textPrimary}`}>{flightNumbers.turn}</div>
                  <div className={`text-xs ${textMuted} uppercase`}>{t('featured.turn')}</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${textPrimary}`}>{flightNumbers.fade}</div>
                  <div className={`text-xs ${textMuted} uppercase`}>{t('featured.fade')}</div>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            size="lg"
            className={lightBackground 
              ? "bg-black text-white hover:bg-gray-800 px-6 shrink-0" 
              : "bg-primary text-primary-foreground hover:bg-primary/90 px-6 shrink-0"}
            onClick={() => window.open(buyUrl, '_blank')}
          >
            {t('featured.shopNow')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden p-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-4 h-4 text-accent fill-current" />
            <span className="text-sm font-medium text-accent uppercase tracking-wide">
              Lucky Discs
            </span>
          </div>
          
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl "></div>
            <img 
              src={discImage} 
              alt={discNames[discName]} 
              className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 mx-auto object-contain transition-all duration-500 hover:scale-110 hover:rotate-12"
              width={256}
              height={256}
            />
          </div>
          
          <h3 className="text-xl font-heading mb-3 text-primary">
            {discNames[discName]}
          </h3>
          
          {showFlightNumbers && flightNumbers && (
            <div className="flex justify-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{flightNumbers.speed}</div>
                <div className="text-xs text-muted-foreground uppercase">{t('featured.speed')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{flightNumbers.glide}</div>
                <div className="text-xs text-muted-foreground uppercase">{t('featured.glide')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{flightNumbers.turn}</div>
                <div className="text-xs text-muted-foreground uppercase">{t('featured.turn')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{flightNumbers.fade}</div>
                <div className="text-xs text-muted-foreground uppercase">{t('featured.fade')}</div>
              </div>
            </div>
          )}
          
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 w-full"
            onClick={() => window.open(buyUrl, '_blank')}
          >
            {t('featured.shopNow')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Default 'featured' variant
  return (
    <div className="bg-gradient-to-r from-black/90 via-black/95 to-black/90 backdrop-blur-sm rounded-2xl border border-primary/20 overflow-hidden shadow-2xl">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-8 lg:p-16 flex justify-center relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150 "></div>
            <img 
              src={discImage} 
              alt={discNames[discName]} 
              className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 drop-shadow-2xl"
            />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-10 bg-black/40 rounded-full blur-lg"></div>
          </div>
        </div>
        
        <div className="lg:w-1/2 p-8 lg:p-12 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <Star className="w-5 h-5 text-accent fill-current" />
            <span className="text-sm font-medium text-accent uppercase tracking-wide">
              Lucky Discs
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading mb-4 text-primary">
            {discNames[discName]}
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0">
            {discDescriptions[discName]}
          </p>
          
          {showFlightNumbers && flightNumbers && (
            <div className="flex justify-center lg:justify-start gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{flightNumbers.speed}</div>
                <div className="text-xs text-muted-foreground uppercase">{t('featured.speed')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{flightNumbers.glide}</div>
                <div className="text-xs text-muted-foreground uppercase">{t('featured.glide')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{flightNumbers.turn}</div>
                <div className="text-xs text-muted-foreground uppercase">{t('featured.turn')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{flightNumbers.fade}</div>
                <div className="text-xs text-muted-foreground uppercase">{t('featured.fade')}</div>
              </div>
            </div>
          )}
          
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            onClick={() => window.open(buyUrl, '_blank')}
          >
            {t('featured.shopNow')} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscPromotion;