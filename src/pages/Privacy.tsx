import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading mb-8">Tietosuojaseloste</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">1. Rekisterinpitäjä</h2>
              <p className="text-gray-300 mb-4">
                VESITIIVIS Oy<br />
                Y-tunnus: 3368925-4<br />
                Sähköposti: asiakaspalvelu@luckydiscs.fi<br />
                Puhelin: +358 44 989 4225
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">2. Henkilötietojen käyttötarkoitus</h2>
              <p className="text-gray-300 mb-4">
                Käsittelemme henkilötietojasi seuraaviin tarkoituksiin:
              </p>
              <ul className="text-gray-300 mb-4 list-disc list-inside">
                <li>Asiakaspalvelun ja yhteydenottojen hoitaminen</li>
                <li>Tukkukauppahakemusten käsittely</li>
                <li>Markkinointiviestinnän lähettäminen (suostumuksella)</li>
                <li>Verkkosivuston toiminnallisuuden parantaminen</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">3. Käsiteltävät henkilötiedot</h2>
              <p className="text-gray-300 mb-4">
                Voimme kerätä ja käsitellä seuraavia henkilötietoja:
              </p>
              <ul className="text-gray-300 mb-4 list-disc list-inside">
                <li>Nimi</li>
                <li>Sähköpostiosoite</li>
                <li>Puhelinnumero</li>
                <li>Yrityksen tiedot (tukkukauppa-asiakkailla)</li>
                <li>IP-osoite ja selaintiedot</li>
                <li>Evästeiden kautta kerätyt tiedot</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">4. Henkilötietojen luovuttaminen</h2>
              <p className="text-gray-300 mb-4">
                Emme luovuta henkilötietojasi ulkopuolisille tahoille ilman suostumustasi, 
                paitsi lain edellyttämissä tapauksissa tai palveluntarjoajille, jotka 
                auttavat meitä palvelujen tuottamisessa.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">5. Henkilötietojen säilytysaika</h2>
              <p className="text-gray-300 mb-4">
                Säilytämme henkilötietoja vain niin kauan kuin se on tarpeellista 
                käsittelyn tarkoituksen kannalta tai lain vaatimana aikana.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">6. Rekisteröidyn oikeudet</h2>
              <p className="text-gray-300 mb-4">
                Sinulla on oikeus:
              </p>
              <ul className="text-gray-300 mb-4 list-disc list-inside">
                <li>Saada tietoa henkilötietojesi käsittelystä</li>
                <li>Tarkastaa sinusta tallennetut tiedot</li>
                <li>Oikaista virheellisiä tietoja</li>
                <li>Poistaa tietosi (oikeus tulla unohdetuksi)</li>
                <li>Rajoittaa käsittelyä</li>
                <li>Siirtää tietosi toiselle palveluntarjoajalle</li>
                <li>Vastustaa käsittelyä</li>
                <li>Peruuttaa antamasi suostumus</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">7. Evästeet</h2>
              <p className="text-gray-300 mb-4">
                Verkkosivustomme käyttää evästeitä sivuston toiminnallisuuden 
                parantamiseksi ja käyttökokemuksen optimoimiseksi. 
                Voit hallita evästeasetuksia selaimen asetuksista.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-4">8. Yhteydenotto</h2>
              <p className="text-gray-300 mb-4">
                Jos sinulla on kysymyksiä tietosuojasta tai haluat käyttää 
                oikeuksiasi, ota yhteyttä:
              </p>
              <p className="text-gray-300">
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

export default Privacy;