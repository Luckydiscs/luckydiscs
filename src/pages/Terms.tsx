import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-32">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading mb-8">Käyttöehdot</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">1. Yleistä</h2>
              <p className="text-gray-300 mb-4">
                Nämä käyttöehdot koskevat Lucky Discs -verkkosivuston käyttöä. 
                Käyttämällä sivustoa hyväksyt nämä ehdot kokonaisuudessaan.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">2. Palveluntarjoaja</h2>
              <p className="text-gray-300 mb-4">
                VESITIIVIS Oy<br />
                Y-tunnus: 3368925-4<br />
                Sähköposti: asiakaspalvelu@luckydiscs.fi<br />
                Puhelin: +358 44 989 4225
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">3. Sivuston käyttö</h2>
              <p className="text-gray-300 mb-4">
                Sivustoa tulee käyttää lainmukaisesti ja hyvän tavan mukaisesti. 
                Kiellettyä on:
              </p>
              <ul className="text-gray-300 mb-4 list-disc list-inside">
                <li>Sivuston tai sen sisällön luvaton kopiointi</li>
                <li>Haitallisen koodin tai ohjelmiston käyttö</li>
                <li>Muiden käyttäjien häirintä</li>
                <li>Valheellisen tiedon antaminen</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">4. Tekijänoikeudet</h2>
              <p className="text-gray-300 mb-4">
                Kaikki sivuston sisältö on tekijänoikeudellisesti suojattua. 
                Sisällön käyttö on sallittu vain henkilökohtaiseen, 
                ei-kaupalliseen tarkoitukseen.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">5. Tukkukauppa</h2>
              <p className="text-gray-300 mb-4">
                Tukkukaupan ehdot ja hinnat sovitaan erikseen. 
                Tukkukauppahakemus ei sido kumpaakaan osapuolta sopimukseen.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">6. Vastuunrajoitus</h2>
              <p className="text-gray-300 mb-4">
                VESITIIVIS Oy ei vastaa sivuston käytöstä aiheutuvista 
                välillisistä tai välittömistä vahingoista. Sivuston 
                toiminnallisuutta ei taata keskeytyksettömäksi.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">7. Ehtojen muuttaminen</h2>
              <p className="text-gray-300 mb-4">
                Pidätämme oikeuden muuttaa näitä ehtoja milloin tahansa. 
                Muutokset astuvat voimaan heti julkaisemisen jälkeen.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">8. Sovellettava laki</h2>
              <p className="text-gray-300 mb-4">
                Näihin ehtoihin sovelletaan Suomen lakia. 
                Mahdolliset riitaisuudet ratkaistaan Suomen tuomioistuimissa.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">9. Yhteydenotto</h2>
              <p className="text-gray-300">
                Kysymykset käyttöehdoista:<br />
                Sähköposti: asiakaspalvelu@luckydiscs.fi<br />
                Puhelin: +358 44 989 4225
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