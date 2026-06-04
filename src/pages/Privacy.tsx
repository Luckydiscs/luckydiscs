import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

type Section = { title: string; body: string; pre?: boolean; list?: string };

const Privacy = () => {
  const { t, language } = useTranslation();

  useEffect(() => {
    const title = language === 'fi'
      ? "Lucky Discs Tietosuoja | Tietosuojakäytäntö & Evästeet"
      : "Lucky Discs Privacy | Privacy Policy & Data Protection";
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'fi'
        ? 'Lucky Discs tietosuojakäytäntö: miten käsittelemme henkilö- ja tilaustietoja, maksunvälittäjä Paytrail, evästeet ja oikeutesi EU:n ja Suomen lakien mukaan.'
        : 'Lucky Discs privacy policy: how we process personal and order data, payment processor Paytrail, cookies, and your rights under EU and Finnish law.';
      metaDescription.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', language === 'fi'
        ? 'Lucky Discs Tietosuojakäytäntö'
        : 'Lucky Discs Privacy Policy');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', language === 'fi'
        ? 'Tietosuojakäytäntö: henkilö- ja tilaustietojen käsittely, maksunvälittäjä, säilytys ja oikeutesi. GDPR.'
        : 'Privacy policy: processing of personal and order data, payment processor, retention and your rights. GDPR compliant.');
    }
  }, [language]);

  const sections: Section[] = [
    { title: 'privacy.dataController', body: 'privacy.dataControllerContent', pre: true },
    { title: 'privacy.purposeOfProcessing', body: 'privacy.purposeOfProcessingContent', list: 'privacy.purposeList' },
    { title: 'privacy.dataProcessed', body: 'privacy.dataProcessedContent', list: 'privacy.dataList' },
    { title: 'privacy.orderData', body: 'privacy.orderDataContent' },
    { title: 'privacy.processors', body: 'privacy.processorsContent' },
    { title: 'privacy.disclosure', body: 'privacy.disclosureContent' },
    { title: 'privacy.retention', body: 'privacy.retentionContent' },
    { title: 'privacy.rights', body: 'privacy.rightsContent', list: 'privacy.rightsList' },
    { title: 'privacy.cookies', body: 'privacy.cookiesContent' },
    { title: 'privacy.socialMedia', body: 'privacy.socialMediaContent' },
    { title: 'privacy.contact', body: 'privacy.contactContent', list: 'privacy.contactInfo' },
  ];

  const lastUpdated = language === 'fi' ? 'Päivitetty 4.6.2026' : 'Last updated 4 June 2026';

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading mb-2">{t('privacy.title')}</h1>
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

export default Privacy;
