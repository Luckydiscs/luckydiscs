import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

type Section = { title: string; body: string; pre?: boolean; list?: string };

const Terms = () => {
  const { t, language } = useTranslation();

  useEffect(() => {
    const title = language === 'fi'
      ? "Lucky Discs Terms | Käyttöehdot & Verkkokaupan ehdot"
      : "Lucky Discs Terms | Terms of Service & Webshop Conditions";
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'fi'
        ? 'Lucky Discs käyttöehdot ja verkkokaupan ehdot: tilaaminen, maksaminen, toimitus, 14 päivän peruutusoikeus ja kuluttajan oikeudet.'
        : 'Lucky Discs terms of service and webshop conditions: ordering, payment, delivery, 14-day right of withdrawal and consumer rights.';
      metaDescription.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', language === 'fi'
        ? 'Lucky Discs Käyttöehdot & Verkkokaupan ehdot'
        : 'Lucky Discs Terms of Service & Webshop Conditions');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', language === 'fi'
        ? 'Verkkokaupan ehdot, peruutusoikeus, maksaminen ja toimitus. Suomen laki ja kuluttajansuoja.'
        : 'Webshop terms, right of withdrawal, payment and delivery. Finnish law and consumer protection.');
    }
  }, [language]);

  const sections: Section[] = [
    { title: 'terms.general', body: 'terms.generalContent' },
    { title: 'terms.serviceProvider', body: 'terms.serviceProviderContent', pre: true },
    { title: 'terms.products', body: 'terms.productsContent' },
    { title: 'terms.ordering', body: 'terms.orderingContent' },
    { title: 'terms.payment', body: 'terms.paymentContent' },
    { title: 'terms.delivery', body: 'terms.deliveryContent' },
    { title: 'terms.withdrawal', body: 'terms.withdrawalContent' },
    { title: 'terms.warranty', body: 'terms.warrantyContent' },
    { title: 'terms.disputeResolution', body: 'terms.disputeResolutionContent' },
    { title: 'terms.websiteUsage', body: 'terms.websiteUsageContent', list: 'terms.prohibitedList' },
    { title: 'terms.copyright', body: 'terms.copyrightContent' },
    { title: 'terms.wholesale', body: 'terms.wholesaleContent' },
    { title: 'terms.liability', body: 'terms.liabilityContent' },
    { title: 'terms.changes', body: 'terms.changesContent' },
    { title: 'terms.applicableLaw', body: 'terms.applicableLawContent' },
    { title: 'terms.contact', body: 'terms.contactContent', list: 'terms.contactInfo' },
  ];

  const lastUpdated = language === 'fi' ? 'Päivitetty 4.6.2026' : 'Last updated 4 June 2026';

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading mb-2">{t('terms.title')}</h1>
          <p className="text-sm text-gray-500 mb-10">{lastUpdated}</p>

          <div className="prose prose-invert max-w-none">
            {sections.map((section, i) => (
              <section key={section.title} className="mb-10">
                <h2 className="text-2xl font-heading mb-4">
                  {i + 1}. {t(section.title)}
                </h2>
                {section.pre ? (
                  <div className="text-gray-300 mb-2 whitespace-pre-line">{t(section.body)}</div>
                ) : (
                  <p className="text-gray-300 mb-2">{t(section.body)}</p>
                )}
                {section.list && (
                  <div className="text-gray-300 mt-3 whitespace-pre-line">{t(section.list)}</div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
