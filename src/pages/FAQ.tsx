import { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import useSEO from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { HelpCircle, Truck, Package, Mail, ArrowRight, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqLink = { to?: string; hrefKey?: string; label: string; external?: boolean };
type FaqItem = { value: string; q: string; a: string; links?: FaqLink[] };
type FaqSection = { title: string; Icon: typeof HelpCircle; items: FaqItem[] };

const FAQ = () => {
  const { t } = useTranslation();

  const sections: FaqSection[] = [
    {
      title: "faq.general.title",
      Icon: HelpCircle,
      items: [
        {
          value: "what-is-disc-golf",
          q: "faq.whatIsDiscGolf.question",
          a: "faq.whatIsDiscGolf.answer",
          links: [
            { to: "/disc-guide", label: "faq.link.guide" },
            { hrefKey: "faq.link.federationUrl", label: "faq.link.federation", external: true },
          ],
        },
        {
          value: "disc-choice",
          q: "faq.discChoice.question",
          a: "faq.discChoice.answer",
          links: [
            { to: "/disc-guide", label: "faq.link.guide" },
            { to: "/shop", label: "faq.link.shop" },
          ],
        },
        {
          value: "flight-numbers",
          q: "faq.flightNumbers.question",
          a: "faq.flightNumbers.answer",
          links: [
            { to: "/disc-guide", label: "faq.link.guide" },
            { to: "/discs", label: "faq.link.discs" },
          ],
        },
        {
          value: "disc-stability",
          q: "faq.discStability.question",
          a: "faq.discStability.answer",
          links: [{ to: "/disc-guide", label: "faq.link.guide" }],
        },
      ],
    },
    {
      title: "faq.ordering.title",
      Icon: Truck,
      items: [
        {
          value: "shipping",
          q: "faq.shipping.question",
          a: "faq.shipping.answer",
          links: [{ to: "/shop", label: "faq.link.shop" }],
        },
        {
          value: "payment",
          q: "faq.payment.question",
          a: "faq.payment.answer",
          links: [
            { to: "/wholesale", label: "faq.link.wholesale" },
            { to: "/contact", label: "faq.link.contact" },
          ],
        },
        {
          value: "returns",
          q: "faq.returns.question",
          a: "faq.returns.answer",
          links: [{ to: "/contact", label: "faq.link.contact" }],
        },
        {
          value: "wholesale",
          q: "faq.wholesale.question",
          a: "faq.wholesale.answer",
          links: [
            { to: "/team", label: "faq.link.team" },
            { to: "/contact", label: "faq.link.contact" },
          ],
        },
      ],
    },
    {
      title: "faq.products.title",
      Icon: Package,
      items: [
        {
          value: "daniel-collaboration",
          q: "faq.danielCollaboration.question",
          a: "faq.danielCollaboration.answer",
          links: [{ to: "/team", label: "faq.link.team" }],
        },
        {
          value: "disc-durability",
          q: "faq.discDurability.question",
          a: "faq.discDurability.answer",
          links: [
            { to: "/discs", label: "faq.link.discs" },
            { to: "/shop", label: "faq.link.shop" },
          ],
        },
      ],
    },
  ];

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('faq.shipping.question'),
        "acceptedAnswer": { "@type": "Answer", "text": t('faq.shipping.answer') }
      },
      {
        "@type": "Question",
        "name": t('faq.discChoice.question'),
        "acceptedAnswer": { "@type": "Answer", "text": t('faq.discChoice.answer') }
      },
      {
        "@type": "Question",
        "name": t('faq.flightNumbers.question'),
        "acceptedAnswer": { "@type": "Answer", "text": t('faq.flightNumbers.answer') }
      }
    ]
  }), [t]);

  useSEO({
    title: "Lucky Discs UKK - Usein Kysytyt Kysymykset | FAQ & Customer Support",
    description: "Lucky Discs UKK: vastauksia toimituksista, tuotteista ja tukkumyynnistä. FAQ about shipping, disc golf products, wholesale and customer support.",
    keywords: "Lucky Discs FAQ, usein kysytyt kysymykset, frisbeegolf UKK, toimitus, tukkumyynti, disc golf questions, customer support",
    canonicalPath: "/faq",
    structuredData: structuredData
  });

  const chipClass =
    "inline-flex items-center gap-1.5 text-sm font-medium text-lucky-green border border-lucky-green/30 bg-lucky-green/10 hover:bg-lucky-green/20 hover:text-white rounded-full px-3 py-1.5 transition-colors";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-gray-100 via-lucky-green to-gray-100 bg-clip-text text-transparent">
            Usein kysytyt kysymykset
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">

          <section className="space-y-8">
            {sections.map(({ title, Icon, items }) => (
              <div key={title}>
                <h2 className="text-3xl md:text-4xl font-heading mb-6 text-gray-200 flex items-center gap-3">
                  <Icon className="h-8 w-8 text-lucky-green shrink-0" aria-hidden="true" />
                  {t(title)}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {items.map((item) => (
                    <AccordionItem
                      key={item.value}
                      value={item.value}
                      className="bg-white/5 border border-white/10 rounded-lg px-6 transition-colors duration-200 hover:border-lucky-green/40 data-[state=open]:border-lucky-green/40 data-[state=open]:bg-lucky-green/5"
                    >
                      <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                        {t(item.q)}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                        <p>{t(item.a)}</p>
                        {item.links && item.links.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.links.map((l) =>
                              l.external ? (
                                <a
                                  key={l.label}
                                  href={t(l.hrefKey as string)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={chipClass}
                                >
                                  {t(l.label)}
                                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                                </a>
                              ) : (
                                <Link key={l.label} to={l.to as string} className={chipClass}>
                                  {t(l.label)}
                                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </section>

          <section className="mt-12 p-8 bg-gradient-to-br from-lucky-green/15 via-lucky-green/5 to-transparent border border-lucky-green/40 rounded-2xl text-center shadow-lg shadow-lucky-green/5">
            <h2 className="text-3xl md:text-4xl font-heading mb-4 text-gray-100">
              {t('faq.contactUs.title')}
            </h2>
            <p className="text-gray-200 mb-6">
              {t('faq.contactUs.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/contact">
                  {t('faq.contactUs.button')}
                </Link>
              </Button>
              <a
                href="mailto:asiakaspalvelu@luckydiscs.fi"
                className="inline-flex items-center gap-2 text-lucky-green hover:text-lucky-green/80 font-medium transition-colors"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                asiakaspalvelu@luckydiscs.fi
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
