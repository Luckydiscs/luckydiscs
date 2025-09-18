import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  useEffect(() => {
    // SEO optimization
    document.title = "Terms of Service - Lucky Discs | Website Terms & Conditions";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lucky Discs terms of service and website usage conditions. Legal information about using our website, wholesale program, and product purchases.');
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Lucky Discs Terms of Service - Legal Information');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Terms and conditions for Lucky Discs website usage, wholesale partnerships, and legal disclaimers. Finnish law and jurisdiction.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">1. General</h2>
              <p className="text-gray-300 mb-4">
                These terms of service apply to the use of the Lucky Discs website. 
                By using the website, you accept these terms in their entirety.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">2. Service Provider</h2>
              <p className="text-gray-300 mb-4">
                VESITIIVIS Oy<br />
                Business ID: 3368925-4<br />
                Email: asiakaspalvelu@luckydiscs.fi<br />
                Phone: +358 44 989 4225
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">3. Website Usage</h2>
              <p className="text-gray-300 mb-4">
                The website must be used lawfully and in accordance with good practice. 
                The following is prohibited:
              </p>
              <ul className="text-gray-300 mb-4 list-disc list-inside">
                <li>Unauthorized copying of the website or its content</li>
                <li>Use of malicious code or software</li>
                <li>Harassment of other users</li>
                <li>Providing false information</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">4. Copyright</h2>
              <p className="text-gray-300 mb-4">
                All website content is protected by copyright. 
                Content usage is permitted only for personal, 
                non-commercial purposes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">5. Wholesale</h2>
              <p className="text-gray-300 mb-4">
                Wholesale terms and prices are agreed separately. 
                A wholesale application does not bind either party to an agreement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-300 mb-4">
                VESITIIVIS Oy is not responsible for indirect or direct 
                damages caused by the use of the website. Website 
                functionality is not guaranteed to be uninterrupted.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">7. Changes to Terms</h2>
              <p className="text-gray-300 mb-4">
                We reserve the right to change these terms at any time. 
                Changes take effect immediately upon publication.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">8. Applicable Law</h2>
              <p className="text-gray-300 mb-4">
                Finnish law applies to these terms. 
                Any disputes will be resolved in Finnish courts.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">9. Contact</h2>
              <p className="text-gray-300">
                Questions about terms of service:<br />
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

export default Terms;