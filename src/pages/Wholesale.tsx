import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WholesaleForm from "@/components/WholesaleForm";
import { Briefcase, CheckCircle2, Package, Truck } from "lucide-react";

const Wholesale = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // SEO optimization
    document.title = "Wholesale Program - Lucky Discs | Become a Retailer Partner";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join Lucky Discs wholesale program. Competitive margins, unique products, reliable shipping. Apply now to become an authorized retailer partner.');
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Lucky Discs Wholesale Program - Become a Retailer Partner');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Partner with Lucky Discs for premium disc golf products. Competitive wholesale pricing, marketing support, and reliable fulfillment.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Lucky Discs Wholesale Program",
            "description": "Join Lucky Discs wholesale program for premium disc golf products with competitive margins and marketing support.",
            "url": "https://luckydiscs.com/wholesale",
            "mainEntity": {
              "@type": "Organization",
              "name": "Lucky Discs",
              "description": "Premium disc golf equipment manufacturer offering wholesale partnerships",
              "offers": {
                "@type": "Offer",
                "description": "Wholesale disc golf products with competitive margins and marketing support"
              }
            }
          })
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-12 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            Lucky Discs Wholesale
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Partner with Lucky Discs to bring our premium disc golf products to your customers. 
            Competitive wholesale pricing, unique designs, and reliable support.
          </p>
        </div>
      </section>
      
      {/* Application Form - Moved to top for better conversion */}
      <section className="py-16 bg-gradient-to-b from-gray-900/50 to-black/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading mb-4">
                Apply for <span className="text-lucky-green">Wholesale Access</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Complete the form below and our team will contact you within 2 business days
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
            Why Partner With <span className="text-lucky-green">Lucky Discs</span>
          </h2>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-heading mb-3">Competitive Margins</h3>
              <p className="text-gray-400">
                Our wholesale pricing structure is designed to ensure healthy profit margins for our retail partners.
              </p>
            </div>
            
            <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black mb-4">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-heading mb-3">Unique Products</h3>
              <p className="text-gray-400">
                Stand out with our distinctive designs and premium quality discs that can't be found elsewhere.
              </p>
            </div>
            
            <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-heading mb-3">Reliable Shipping</h3>
              <p className="text-gray-400">
                Fast fulfillment with global shipping options to ensure your inventory is always stocked.
              </p>
            </div>
            
            <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black mb-4">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-heading mb-3">Marketing Support</h3>
              <p className="text-gray-400">
                Access to high-quality product images, descriptions, and marketing materials to help drive sales.
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
              Program <span className="text-lucky-green">Details</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3 text-lucky-green">Minimum Orders</h3>
                <p className="text-gray-300">
                  Initial orders: 24 discs minimum<br/>
                  Reorders: 12 discs minimum<br/>
                  Mix and match models and colors
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3 text-lucky-green">Pricing</h3>
                <p className="text-gray-300">
                  Standard keystone: 50% of MSRP<br/>
                  Volume discounts available<br/>
                  Special introductory pricing
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3 text-lucky-green">Shipping</h3>
                <p className="text-gray-300">
                  3 business days processing<br/>
                  Global shipping available<br/>
                  Drop shipping for qualifying partners
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3 text-lucky-green">Payment</h3>
                <p className="text-gray-300">
                  Cards, PayPal, bank transfers<br/>
                  Net 30 for established retailers<br/>
                  All prices in USD
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