
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WholesaleForm from "@/components/WholesaleForm";
import { Briefcase, CheckCircle2, Package, Truck } from "lucide-react";

const Wholesale = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            Lucky Discs Wholesale
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Partner with Lucky Discs to bring our premium disc golf products to your customers. 
            We offer competitive wholesale pricing, unique designs, and reliable support.
          </p>
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
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
              Wholesale Program Details
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3">Minimum Order Requirements</h3>
                <p className="text-gray-300">
                  Initial orders start at 24 discs, with a minimum reorder of 12 discs. 
                  Mix and match different models and colors to find the perfect inventory for your customer base.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3">Pricing Structure</h3>
                <p className="text-gray-300">
                  Wholesale pricing varies by model, with standard keystone pricing at 50% of MSRP. 
                  Volume discounts are available for larger orders, and we offer special pricing for new retailer introductory packages.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3">Shipping & Lead Times</h3>
                <p className="text-gray-300">
                  Orders are typically processed within 3 business days. Domestic shipping via UPS or FedEx with tracking provided. 
                  International shipping available with competitive rates. Drop shipping services available for qualifying partners.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-3">Payment Terms</h3>
                <p className="text-gray-300">
                  We accept credit cards, PayPal, and bank transfers. Net 30 terms available for established retailers 
                  after 3 successful orders. All prices are in USD unless otherwise specified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Application Form */}
      <section className="py-16 bg-gradient-to-b from-black/80 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading mb-6 text-center">
              Apply for Wholesale Access
            </h2>
            <p className="text-gray-300 text-center mb-8">
              Complete the form below to apply for a wholesale account. Our team will review your application 
              and be in touch within 2 business days.
            </p>
            
            <div className="bg-white/5 rounded-lg p-6 md:p-8 border border-white/10">
              <WholesaleForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Wholesale;
