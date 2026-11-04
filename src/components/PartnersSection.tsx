import { ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Yhteistyökumppanit (Vesa 4.11.2026). LaplandStore (LaplandVibes-verkosto) näyttää
// Lucky Discsin tuoterivin etusivullaan; tämä on vastaosio. Kumppanin merkki on
// sen oma tiedosto (public/lv-footer-logo.webp, valkoinen + pinkki), joten se
// istuu vain tummalle pohjalle. Linkit ovat tavallisia lähdelinkkejä, ei mainoksia.
const PARTNERS = [
  {
    key: "laplandstore",
    logo: "/lv-footer-logo.webp",
    logoW: 640,
    logoH: 91,
    href: "https://laplandstore.fi/",
    label: "laplandstore.fi",
    hubHref: "https://laplandvibes.com/",
    hubLabel: "laplandvibes.com",
  },
];

const PartnersSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-heading text-white mb-3">{t("partners.title")}</h2>
          <p className="text-gray-400">{t("partners.lead")}</p>
        </div>
        {PARTNERS.map((p) => (
          <div
            key={p.key}
            className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6"
          >
            <img
              src={p.logo}
              alt="LaplandVibes"
              width={p.logoW}
              height={p.logoH}
              loading="lazy"
              className="w-56 md:w-64 h-auto shrink-0 mx-auto md:mx-0"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-300 leading-relaxed mb-4">{t(`partners.${p.key}.body`)}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  className="lv-tap inline-flex items-center gap-2 text-lucky-green hover:text-white transition-colors font-medium"
                >
                  {p.label} <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={p.hubHref}
                  target="_blank"
                  rel="noopener"
                  className="lv-tap inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  {p.hubLabel} <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
