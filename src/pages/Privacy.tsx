import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  useEffect(() => {
    // SEO optimization
    document.title = "Privacy Policy - Lucky Discs | Data Protection & Cookie Information";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lucky Discs privacy policy and data protection information. Learn how we handle personal data, cookies, and your rights under Finnish and EU privacy laws.');
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Lucky Discs Privacy Policy - Data Protection Information');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Comprehensive privacy policy covering data collection, usage, storage and your rights. GDPR compliant data protection practices.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">1. Data Controller</h2>
              <p className="text-gray-300 mb-4">
                VESITIIVIS Oy<br />
                Business ID: 3368925-4<br />
                Email: asiakaspalvelu@luckydiscs.fi<br />
                Phone: +358 44 989 4225
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">2. Purpose of Personal Data Processing</h2>
              <p className="text-gray-300 mb-4">
                We process your personal data for the following purposes:
              </p>
              <ul className="text-gray-300 mb-4 list-disc list-inside">
                <li>Customer service and handling inquiries</li>
                <li>Processing wholesale applications</li>
                <li>Sending marketing communications (with consent)</li>
                <li>Improving website functionality</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">3. Personal Data Processed</h2>
              <p className="text-gray-300 mb-4">
                We may collect and process the following personal data:
              </p>
              <ul className="text-gray-300 mb-4 list-disc list-inside">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company information (for wholesale customers)</li>
                <li>IP address and browser information</li>
                <li>Data collected through cookies</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">4. Disclosure of Personal Data</h2>
              <p className="text-gray-300 mb-4">
                We do not disclose your personal data to third parties without your consent, 
                except in cases required by law or to service providers who 
                assist us in providing services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">5. Retention Period of Personal Data</h2>
              <p className="text-gray-300 mb-4">
                We retain personal data only as long as necessary 
                for the purpose of processing or as required by law.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">6. Data Subject Rights</h2>
              <p className="text-gray-300 mb-4">
                You have the right to:
              </p>
              <ul className="text-gray-300 mb-4 list-disc list-inside">
                <li>Receive information about the processing of your personal data</li>
                <li>Access your stored data</li>
                <li>Correct incorrect information</li>
                <li>Delete your data (right to be forgotten)</li>
                <li>Restrict processing</li>
                <li>Transfer your data to another service provider</li>
                <li>Object to processing</li>
                <li>Withdraw your given consent</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">7. Cookies</h2>
              <p className="text-gray-300 mb-4">
                Our website uses cookies to improve website functionality 
                and optimize user experience. 
                You can manage cookie settings in your browser settings.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">8. Contact</h2>
              <p className="text-gray-300 mb-4">
                If you have questions about privacy or wish to exercise 
                your rights, please contact us:
              </p>
              <p className="text-gray-300">
                Email: asiakaspalvelu@luckydiscs.fi<br />
                Phone: +358 44 989 4225
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;