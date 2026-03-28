
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface DiscCard {
  image: string;
  name: string;
  nameKey: string;
  descKey: string;
  type: string;
  flightNumbers: { speed: number; glide: number; turn: number; fade: number };
  accentColor: string;
}

const discs: DiscCard[] = [
  {
    image: "/images/brand/treasure-hunt-promo.webp",
    name: "Treasure Hunt",
    nameKey: "discs.treasureHunt",
    descKey: "discs.treasureHuntDesc",
    type: "Distance Driver",
    flightNumbers: { speed: 12, glide: 6, turn: -1, fade: 3 },
    accentColor: "lucky-gold",
  },
  {
    image: "/images/brand/kiekkoesittely-02.webp",
    name: "Bank Robber",
    nameKey: "discs.bankRobber",
    descKey: "discs.bankRobberDesc",
    type: "Fairway Driver",
    flightNumbers: { speed: 9, glide: 5, turn: -1, fade: 2 },
    accentColor: "lucky-green",
  },
  {
    image: "/images/brand/kiekkoesittely-03.webp",
    name: "Money Shot",
    nameKey: "discs.moneyShot",
    descKey: "discs.moneyShotDesc",
    type: "Putter",
    flightNumbers: { speed: 3, glide: 3, turn: 0, fade: 1 },
    accentColor: "lucky-gold",
  },
];

const FlightStat = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl font-heading text-white leading-none">{value}</span>
    <span className="text-[10px] font-display uppercase tracking-widest text-white/40 mt-0.5">{label}</span>
  </div>
);

const FeaturedDisc = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  return (
    <section className="bg-black py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-lucky-gold/50" />
            <span className="font-display text-lucky-gold text-sm uppercase tracking-[0.35em]">
              {t('featured.featuredDisc')}
            </span>
            <div className="h-px w-16 bg-lucky-gold/50" />
          </div>
          <h2 className="font-heading text-5xl md:text-6xl text-white tracking-wide mb-4">
            {t('featured.title')}
          </h2>
          <p className="font-sans text-white/50 max-w-xl mx-auto text-base">
            {t('featured.subtitle')}
          </p>
        </div>

        {/* Three disc cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {discs.map((disc) => (
            <div
              key={disc.name}
              className="group relative bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/30 hover:-translate-y-1 hover:shadow-2xl"
              onClick={() => language === 'fi'
                ? window.open(`https://kesapelit.fi/?utm_source=luckydiscs&utm_medium=website&utm_campaign=featured&utm_content=${disc.name.toLowerCase().replace(' ', '-')}`, '_blank')
                : navigate('/wholesale')
              }
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b ${
                  disc.accentColor === "lucky-gold"
                    ? "from-lucky-gold/10 to-transparent"
                    : "from-lucky-green/10 to-transparent"
                }`}
              />

              {/* Disc type label */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`font-display text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${
                    disc.accentColor === "lucky-gold"
                      ? "border-lucky-gold/40 text-lucky-gold bg-lucky-gold/10"
                      : "border-lucky-green/40 text-lucky-green bg-lucky-green/10"
                  }`}
                >
                  {disc.type}
                </span>
              </div>

              {/* Disc image */}
              <div className="relative pt-14 pb-6 px-6 flex justify-center">
                <div
                  className={`absolute inset-0 opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40 ${
                    disc.accentColor === "lucky-gold" ? "bg-lucky-gold" : "bg-lucky-green"
                  } rounded-full scale-75`}
                />
                <img
                  src={disc.image}
                  alt={disc.name}
                  className="relative z-10 w-52 h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-2xl"
                  loading="lazy"
                />
              </div>

              {/* Disc info */}
              <div className="px-6 pb-6">
                <h3 className="font-heading text-3xl text-white tracking-wide mb-1">
                  {t(disc.nameKey)}
                </h3>
                <p className="font-sans text-white/50 text-sm mb-5 line-clamp-2">
                  {t(disc.descKey)}
                </p>

                {/* Flight numbers */}
                <div className="flex justify-between border-t border-white/10 pt-4 mb-6">
                  <FlightStat label={t('featured.speed')} value={disc.flightNumbers.speed} />
                  <FlightStat label={t('featured.glide')} value={disc.flightNumbers.glide} />
                  <FlightStat label={t('featured.turn')} value={disc.flightNumbers.turn} />
                  <FlightStat label={t('featured.fade')} value={disc.flightNumbers.fade} />
                </div>

                {/* CTA */}
                <button
                  className={`w-full flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-widest text-sm py-3 rounded-xl transition-all duration-200 group-hover:gap-3 ${
                    disc.accentColor === "lucky-gold"
                      ? "bg-lucky-gold/15 hover:bg-lucky-gold/25 text-lucky-gold border border-lucky-gold/30"
                      : "bg-lucky-green/15 hover:bg-lucky-green/25 text-lucky-green border border-lucky-green/30"
                  }`}
                >
                  {language === 'fi' ? t('featured.shopNow') : t('nav.getWholesaleAccess')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-display font-semibold uppercase tracking-widest text-sm px-10 py-6 h-auto bg-transparent transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => navigate('/discs')}
          >
            {t('featured.viewAllDiscs')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDisc;
