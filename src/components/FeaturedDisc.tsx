
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const discs = [
  { image: "/images/brand/treasure-hunt-promo.webp", name: "Treasure Hunt" },
  { image: "/images/brand/kiekkoesittely-02.webp", name: "Bank Robber" },
  { image: "/images/brand/kiekkoesittely-03.webp", name: "Money Shot" },
  { image: "/images/brand/kiekkoesittely-04.webp", name: "Jailbreak" },
];

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

        {/* Promo-kortit — täydet kiekkoesittelykuvat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {discs.map((disc) => (
            <button
              key={disc.name}
              type="button"
              onClick={() => (language === 'fi' ? navigate('/shop') : navigate('/wholesale'))}
              aria-label={disc.name}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-lucky-green/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={disc.image}
                alt={`Lucky Discs ${disc.name}`}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <span className="mb-5 inline-flex items-center gap-2 bg-lucky-green text-black font-display font-semibold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full">
                  {language === 'fi' ? t('featured.shopNow') : t('nav.getWholesaleAccess')}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
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
