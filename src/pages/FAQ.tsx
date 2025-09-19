import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
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
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </header>

          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                {t('faq.general.title')}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="what-is-disc-golf" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.whatIsDiscGolf.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t('faq.whatIsDiscGolf.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disc-choice" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.discChoice.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t('faq.discChoice.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="flight-numbers" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.flightNumbers.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t('faq.flightNumbers.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disc-stability" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.discStability.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
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
                <AccordionItem value="shipping" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.shipping.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t('faq.shipping.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.payment.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t('faq.payment.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="returns" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.returns.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t('faq.returns.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="wholesale" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.wholesale.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
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
                <AccordionItem value="daniel-collaboration" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.danielCollaboration.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t('faq.danielCollaboration.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disc-durability" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.discDurability.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t('faq.discDurability.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="custom-stamps" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t('faq.customStamps.question')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t('faq.customStamps.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          <section className="mt-12 p-8 bg-muted/50 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t('faq.contactUs.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('faq.contactUs.subtitle')}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {t('faq.contactUs.button')}
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;