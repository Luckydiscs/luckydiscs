import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

const Privacy = () => {
  const { t, language } = useTranslation();
  
  useEffect(() => {
    // SEO optimization
    const title = language === 'fi' 
      ? "Lucky Discs Tietosuojakäytäntö | Tietosuoja & Evästeet"
      : "Lucky Discs Privacy Policy | Data Protection & Cookie Information";
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'fi'
        ? 'Lucky Discs tietosuojakäytäntö. Opi kuinka käsittelemme henkilötietoja, evästeitä ja oikeuksiasi Lucky Discs palveluissa Suomen ja EU:n tietosuojalakien mukaisesti.'
        : 'Lucky Discs privacy policy explaining data processing, user rights, cookies, and contact information for Lucky Discs services under Finnish and EU data protection laws.';
      metaDescription.setAttribute('content', description);
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      const ogTitleText = language === 'fi'
        ? 'Lucky Discs Tietosuojakäytäntö - Tietosuojatiedot'
        : 'Lucky Discs Privacy Policy - Data Protection Information';
      ogTitle.setAttribute('content', ogTitleText);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      const ogDescText = language === 'fi'
        ? 'Kattava tietosuojakäytäntö tietojen keräämisestä, käytöstä, säilytyksestä ja oikeuksistasi. GDPR-yhteensopivat tietosuojakäytännöt.'
        : 'Comprehensive privacy policy covering data collection, usage, storage and your rights. GDPR compliant data protection practices.';
      ogDescription.setAttribute('content', ogDescText);
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading mb-8">Lucky Discs Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('privacy.dataController')}</h2>
              <div className="text-gray-300 mb-4 whitespace-pre-line">
                {t('privacy.dataControllerContent')}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('privacy.purposeOfProcessing')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.purposeOfProcessingContent')}
              </p>
              <div className="text-gray-300 mb-4 whitespace-pre-line">
                {t('privacy.purposeList')}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('privacy.dataProcessed')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.dataProcessedContent')}
              </p>
              <div className="text-gray-300 mb-4 whitespace-pre-line">
                {t('privacy.dataList')}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('privacy.disclosure')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.disclosureContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('privacy.retention')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.retentionContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('privacy.rights')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.rightsContent')}
              </p>
              <div className="text-gray-300 mb-4 whitespace-pre-line">
                {t('privacy.rightsList')}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('privacy.cookies')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.cookiesContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('privacy.socialMedia')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.socialMediaContent')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">{t('privacy.contact')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.contactContent')}
              </p>
              <div className="text-gray-300 whitespace-pre-line">
                {t('privacy.contactInfo')}
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;