
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Have questions about our products, wholesale opportunities, or anything else? 
            We're here to help and would love to hear from you.
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
                <h2 className="text-2xl md:text-3xl font-heading mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                  Tiimimme on käytettävissä maanantaista perjantaihin, klo 9-17 (EET). 
                  Pyrimme vastaamaan kaikkiin kyselyihin 24 tunnin sisällä.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sähköposti</p>
                    <p className="font-medium">asiakaspalvelu@luckydiscs.fi</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Puhelin</p>
                    <p className="font-medium">+358 44 989 4225</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Yhteydenotto</p>
                    <p className="font-medium">Lucky Discs Finland</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-xl font-heading mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors duration-300"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors duration-300"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-lucky-green w-10 h-10 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors duration-300"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-xl font-heading mb-4">Business Hours</h3>
                <table className="w-full text-left">
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 font-medium">Maanantai - Perjantai</td>
                      <td className="py-2 text-gray-400">9:00 - 17:00 (EET)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 font-medium">Lauantai</td>
                      <td className="py-2 text-gray-400">Suljettu</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Sunnuntai</td>
                      <td className="py-2 text-gray-400">Suljettu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white/5 p-6 md:p-8 rounded-lg border border-white/10">
              <h2 className="text-2xl md:text-3xl font-heading mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading mb-8 text-center">
              Frequently Asked <span className="text-lucky-green">Questions</span>
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-2">Do you ship internationally?</h3>
                <p className="text-gray-400">
                  Yes, we ship worldwide! Shipping rates and delivery times vary by location. 
                  International customers may be responsible for any import duties or taxes.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-2">What is your return policy?</h3>
                <p className="text-gray-400">
                  We offer a 30-day satisfaction guarantee on all purchases. If you're not completely 
                  satisfied, you can return unworn/unused merchandise for a full refund or exchange.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-2">How do I become a sponsored player?</h3>
                <p className="text-gray-400">
                  We review sponsorship applications quarterly. Please email your player resume, 
                  social media links, and tournament history to sponsorships@luckydiscs.com.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-2">Can I request custom disc designs?</h3>
                <p className="text-gray-400">
                  Yes! We offer custom designs for tournaments, events, and businesses. 
                  Minimum order quantities apply. Please contact us for details and pricing.
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
