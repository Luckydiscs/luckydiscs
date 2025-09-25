import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

const Terms = () => {
  const { t, language } = useTranslation();
  
  useEffect(() => {
    // SEO optimization
    const title = language === 'fi' 
      ? "Lucky Discs Terms | Käyttöehdot & Verkkosivuston ehdot"
      : "Lucky Discs Terms | Terms of Service & Website Conditions";
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'fi'
        ? 'Lucky Discs terms ja käyttöehdot verkkosivuston käyttöön. Lakitiedot Lucky Discs verkkosivustomme, tukkukauppaohjelman ja tuoteostojen käytöstä.'
        : 'Lucky Discs terms of service covering website usage, wholesale program, liability, and legal conditions for Lucky Discs customers and retailers.';
      metaDescription.setAttribute('content', description);
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      const ogTitleText = language === 'fi'
        ? 'Lucky Discs Käyttöehdot - Lakitiedot'
        : 'Lucky Discs Terms of Service - Legal Information';
      ogTitle.setAttribute('content', ogTitleText);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      const ogDescText = language === 'fi'
        ? 'Käyttöehdot Lucky Discs verkkosivuston käytölle, tukkukauppakumppanuuksille ja lakimääräykset. Suomen laki ja lainkäyttö.'
        : 'Terms and conditions for Lucky Discs website usage, wholesale partnerships, and legal disclaimers. Finnish law and jurisdiction.';
      ogDescription.setAttribute('content', ogDescText);
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading mb-8">Lucky Discs Terms</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('terms.general')}</h2>
              <p className="text-gray-300 mb-4">
                {t('terms.generalContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('terms.serviceProvider')}</h2>
              <div className="text-gray-300 mb-4 whitespace-pre-line">
                {t('terms.serviceProviderContent')}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('terms.websiteUsage')}</h2>
              <p className="text-gray-300 mb-4">
                {t('terms.websiteUsageContent')}
              </p>
              <div className="text-gray-300 mb-4 whitespace-pre-line">
                {t('terms.prohibitedList')}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('terms.copyright')}</h2>
              <p className="text-gray-300 mb-4">
                {t('terms.copyrightContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('terms.wholesale')}</h2>
              <p className="text-gray-300 mb-4">
                {t('terms.wholesaleContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('terms.liability')}</h2>
              <p className="text-gray-300 mb-4">
                {t('terms.liabilityContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('terms.changes')}</h2>
              <p className="text-gray-300 mb-4">
                {t('terms.changesContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('terms.applicableLaw')}</h2>
              <p className="text-gray-300 mb-4">
                {t('terms.applicableLawContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('terms.contact')}</h2>
              <p className="text-gray-300 mb-4">
                {t('terms.contactContent')}
              </p>
              <div className="text-gray-300 whitespace-pre-line">
                {t('terms.contactInfo')}
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;