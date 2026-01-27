import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Lucky Discs FAQ - Frequently Asked Questions | Customer Support";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lucky Discs FAQ with answers about shipping, products, wholesale, disc golf basics and Lucky Discs customer support. Get help with questions.');
    }

    // Structured data for FAQ
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('faq.shipping.question'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.shipping.answer')
          }
        },
        {
          "@type": "Question", 
          "name": t('faq.discChoice.question'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.discChoice.answer')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.flightNumbers.question'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.flightNumbers.answer')
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-gray-100 via-lucky-green to-gray-100 bg-clip-text text-transparent">
            Lucky Discs FAQ
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">

          <section className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading mb-6 text-gray-200">
                {t('faq.general.title')}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="what-is-disc-golf" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.whatIsDiscGolf.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.whatIsDiscGolf.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disc-choice" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.discChoice.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.discChoice.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="flight-numbers" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.flightNumbers.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.flightNumbers.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disc-stability" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.discStability.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.discStability.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-heading mb-6 text-gray-200">
                {t('faq.ordering.title')}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="shipping" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.shipping.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.shipping.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.payment.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.payment.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="returns" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.returns.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.returns.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="wholesale" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.wholesale.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.wholesale.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-heading mb-6 text-gray-200">
                {t('faq.products.title')}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="daniel-collaboration" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.danielCollaboration.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.danielCollaboration.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disc-durability" className="bg-white/5 border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
                    {t('faq.discDurability.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-3 text-lg md:text-xl leading-relaxed">
                    {t('faq.discDurability.answer')}
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>
          </section>

          <section className="mt-12 p-8 bg-white/5 border border-white/10 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-heading mb-4 text-gray-200">
              {t('faq.contactUs.title')}
            </h2>
            <p className="text-gray-200 mb-6">
              {t('faq.contactUs.subtitle')}
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="/contact">
                {t('faq.contactUs.button')}
              </a>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;