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
    document.title = t('faq.title') + " - Lucky Discs";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('faq.metaDescription'));
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-6">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                {t('faq.general.title')}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="what-is-disc-golf" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.whatIsDiscGolf.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.whatIsDiscGolf.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disc-choice" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.discChoice.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.discChoice.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="flight-numbers" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.flightNumbers.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.flightNumbers.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disc-stability" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.discStability.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.discStability.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                {t('faq.ordering.title')}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="shipping" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.shipping.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.shipping.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.payment.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.payment.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="returns" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.returns.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.returns.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="wholesale" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.wholesale.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.wholesale.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                {t('faq.products.title')}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="daniel-collaboration" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.danielCollaboration.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.danielCollaboration.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disc-durability" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.discDurability.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.discDurability.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="custom-stamps" className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                    {t('faq.customStamps.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {t('faq.customStamps.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          <section className="mt-12 p-8 bg-card border border-border rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
              {t('faq.contactUs.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
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