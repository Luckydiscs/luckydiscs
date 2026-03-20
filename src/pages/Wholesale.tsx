import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WholesaleForm from "@/components/WholesaleForm";
import { Briefcase, CheckCircle2, Package, Truck } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import useSEO from "@/hooks/useSEO";

const Wholesale = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useSEO({
    title: "Lucky Discs Wholesale Program - Partner With Premium Finnish Disc Golf Brand",
    description: "Join Lucky Discs wholesale program. Competitive margins, unique casino-themed designs, reliable shipping from Finland. Partner with the fastest-growing Finnish disc golf brand.",
    keywords: "disc golf wholesale, retailer program, bulk disc orders, Lucky Discs wholesale, disc golf distributor, wholesale partnership, Finnish disc golf wholesale",
    canonicalPath: "/wholesale",
    ogImage: "https://www.luckydiscs.fi/lucky-discs-logo.png",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Wholesale Distribution",
      "provider": {
        "@type": "Organization",
        "name": "Lucky Discs",
        "url": "https://www.luckydiscs.fi"
      },
      "name": "Disc Golf Wholesale Program",
      "description": "Join Lucky Discs wholesale program. Competitive margins, unique casino-themed designs, reliable shipping from Finland. Partner with the fastest-growing Finnish disc golf brand.",
      "areaServed": "Worldwide",
      "offers": {
        "@type": "Offer",
        "description": "Wholesale partnership for disc golf retailers and distributors"
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-12 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            {t('wholesale.title')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('wholesale.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Application Form - Moved to top for better conversion */}
      <section className="py-16 bg-gradient-to-b from-gray-900/50 to-black/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading mb-4">
                {t('wholesale.applyTitle')}
              </h2>
              <p className="text-gray-300 text-lg">
                {t('wholesale.applySubtitle')}
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 md:p-8 border border-white/10 backdrop-blur-sm">
              <WholesaleForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Partner With Us */}
      <section className="py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-12 text-center">
            {t('wholesale.whyPartner')}
          </h2>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-heading mb-3">{t('wholesale.competitiveMargins')}</h3>
              <p className="text-gray-300">
                {t('wholesale.competitiveMarginsDesc')}
              </p>
            </div>
            
            <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white mb-4">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-heading mb-3">{t('wholesale.uniqueProducts')}</h3>
              <p className="text-gray-300">
                {t('wholesale.uniqueProductsDesc')}
              </p>
            </div>
            
            <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-heading mb-3">{t('wholesale.reliableShipping')}</h3>
              <p className="text-gray-300">
                {t('wholesale.reliableShippingDesc')}
              </p>
            </div>
            
            <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white mb-4">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-heading mb-3">{t('wholesale.marketingSupport')}</h3>
              <p className="text-gray-300">
                {t('wholesale.marketingSupportDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Wholesale Program Details */}
      <section className="py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
              {t('wholesale.programDetails')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3 text-lucky-green">{t('wholesale.minimumOrders')}</h3>
                <p className="text-gray-300" style={{ whiteSpace: 'pre-line' }}>
                  {t('wholesale.minimumOrdersDesc')}
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3 text-lucky-green">{t('wholesale.pricing')}</h3>
                <p className="text-gray-300" style={{ whiteSpace: 'pre-line' }}>
                  {t('wholesale.pricingDesc')}
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3 text-lucky-green">{t('wholesale.shipping')}</h3>
                <p className="text-gray-300" style={{ whiteSpace: 'pre-line' }}>
                  {t('wholesale.shippingDesc')}
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3 text-lucky-green">{t('wholesale.payment')}</h3>
                <p className="text-gray-300" style={{ whiteSpace: 'pre-line' }}>
                  {t('wholesale.paymentDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Wholesale;