
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import DiscPromotion from "@/components/DiscPromotion";
import treasureHuntDisc from "@/assets/treasure-hunt-disc.png";

const Contact = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // SEO Meta Tags
    const pageTitle = "Contact Lucky Discs - Customer Service & Business Inquiries";
    const pageDescription = "Contact Lucky Discs for customer support, wholesale inquiries, sponsorships, and partnerships. Email, phone, and social media support available. Based in Finland.";
    const pageKeywords = "Lucky Discs contact, customer service, wholesale inquiry, business contact, disc golf support, Finland contact, sponsorship inquiry";
    const canonicalUrl = "https://www.luckydiscs.fi/contact";
    const ogImage = "https://www.luckydiscs.fi/lucky-discs-logo.png";
    
    document.title = pageTitle;
    
    // Meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', pageDescription);
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', pageKeywords);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    
    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', pageDescription);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
    
    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) ogImageTag.setAttribute('content', ogImage);
    
    // Twitter Card
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', pageDescription);
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', ogImage);
    
    // Hreflang
    const updateOrCreateHreflang = (lang: string, url: string) => {
      let hreflang = document.querySelector(`link[hreflang="${lang}"]`);
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', lang);
        document.head.appendChild(hreflang);
      }
      hreflang.setAttribute('href', url);
    };
    
    updateOrCreateHreflang('en', canonicalUrl);
    updateOrCreateHreflang('fi', canonicalUrl);
    updateOrCreateHreflang('x-default', canonicalUrl);
    
    // Structured Data - Contact Page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": pageTitle,
      "description": pageDescription,
      "url": canonicalUrl,
      "about": {
        "@type": "Organization",
        "name": "Lucky Discs",
        "email": "info@luckydiscs.fi",
        "telephone": "+358 44 989 4225",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nokia",
          "addressCountry": "FI"
        }
      }
    };
    
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            Lucky Discs Contact
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading mb-6">{t('contact.contactInfo')}</h2>
                <p className="text-gray-400 mb-8">
                  {t('contact.contactInfoDesc')}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black mr-4">
                    <Mail size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t('contact.email')}</p>
                    <p className="font-medium">{t('contact.emailAddress')}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black mr-4">
                    <Phone size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t('contact.phone')}</p>
                    <p className="font-medium">+358 44 989 4225</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black mr-4">
                    <MapPin size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t('contact.location')}</p>
                    <p className="font-medium">{t('contact.companyLocation')}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-xl font-heading mb-4">{t('contact.followUs')}</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/luckydiscsofficial" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors duration-300"
                  >
                    <Instagram size={24} strokeWidth={2} />
                  </a>
                  <a 
                    href="https://www.facebook.com/LuckyDiscs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors duration-300"
                  >
                    <Facebook size={24} strokeWidth={2} />
                  </a>
                  <a 
                    href="https://www.youtube.com/@LuckyDiscs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors duration-300"
                  >
                    <Youtube size={24} strokeWidth={2} />
                  </a>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-xl font-heading mb-4">{t('contact.businessHours')}</h3>
                <table className="w-full text-left">
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 font-medium">{t('contact.mondayFriday')}</td>
                      <td className="py-2 text-gray-400">{t('contact.mondayFridayHours')}</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 font-medium">{t('contact.saturday')}</td>
                      <td className="py-2 text-gray-400">{t('contact.closed')}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">{t('contact.sunday')}</td>
                      <td className="py-2 text-gray-400">{t('contact.closed')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white/5 p-6 md:p-8 rounded-lg border border-white/10">
              <h2 className="text-2xl md:text-3xl font-heading mb-6">{t('contact.sendMessage')}</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {/* Treasure Hunt Disc Promotion */}
          <div className="mb-16">
            <DiscPromotion 
              discName="treasureHunt"
              discImage={treasureHuntDisc}
              flightNumbers={{ speed: 12, glide: 6, turn: -1, fade: 3 }}
              buyUrl="https://kesapelit.fi/tuote/premium-treasure-hunt"
              variant="compact"
              showFlightNumbers={true}
            />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading mb-8 text-center">
              {t('contact.faqTitle')}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-2">{t('contact.shippingQuestion')}</h3>
                <p className="text-gray-400">
                  {t('contact.shippingAnswer')}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-2">{t('contact.returnQuestion')}</h3>
                <p className="text-gray-400">
                  {t('contact.returnAnswer')}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-2">{t('contact.sponsorshipQuestion')}</h3>
                <p className="text-gray-400">
                  {t('contact.sponsorshipAnswer')}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-2">{t('contact.customQuestion')}</h3>
                <p className="text-gray-400">
                  {t('contact.customAnswer')}
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

export default Contact;
