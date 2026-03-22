import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, ChevronRight } from "lucide-react";
import discs from "@/data/discs";

const shopProducts = [
  {
    slug: "treasure-hunt",
    discId: 2,
    name: "Treasure Hunt",
    tagline: "Voimakas distance driver pitkiin heittöihin",
    price: 9.9,
    originalPrice: 24.9,
    inStock: true,
    plastics: ["Premium"],
    weights: ["173-175g"],
    colors: ["Punainen", "Sininen", "Valkoinen", "Keltainen"],
    description: "Treasure Hunt on suunniteltu pelaajille, jotka etsivät maksimaalista etäisyyttä. Tämä nopea distance driver tarjoaa vakaan lennon ja luotettavan feidin.",
    features: ["Erinomainen pitävyys kaikissa olosuhteissa", "Vakaa lentorata tuulessa", "Premium-muovi kestää kulutusta"],
  },
  {
    slug: "money-shot",
    discId: 3,
    name: "Money Shot",
    tagline: "Tarkka midrange lähestymisheittöihin",
    price: 9.9,
    originalPrice: 24.9,
    inStock: true,
    plastics: ["Premium"],
    weights: ["177-179g"],
    colors: ["Vihreä", "Oranssi", "Pinkki", "Sininen"],
    description: "Money Shot on luotettava midrange-kiekko, joka lentää sinne minne tähtäät. Suora lentorata pienellä feidillä tekee siitä täydellisen lähestymiskiekon.",
    features: ["Suora ja ennakoitava lentorata", "Loistava sekä reppäri- että hyzer-heittoihin", "Helppo hallita kaikilla voimatasoilla"],
  },
  {
    slug: "money-shot-basic",
    discId: 3,
    name: "Money Shot Basic",
    tagline: "Edullinen aloituskiekko",
    price: 4.9,
    originalPrice: null,
    inStock: true,
    plastics: ["Basic"],
    weights: ["175-177g"],
    colors: ["Valkoinen", "Keltainen"],
    description: "Money Shot Basic tarjoaa saman erinomaisen lentoradan edullisemmassa perusmuovissa. Täydellinen harjoittelukiekko tai lahja aloittevalle frisbeegolfarille.",
    features: ["Sama vakaa lentorata kuin Premium-versiossa", "Edullinen hinta", "Hyvä grip perusmuovissa"],
  },
  {
    slug: "treasure-hunt-basic",
    discId: 2,
    name: "Treasure Hunt Basic",
    tagline: "Pitkän matkan driver perusmuovissa",
    price: 4.9,
    originalPrice: null,
    inStock: true,
    plastics: ["Basic"],
    weights: ["170-172g"],
    colors: ["Valkoinen", "Oranssi"],
    description: "Treasure Hunt Basic tarjoaa saman voimakkaan lentoradan edullisemmassa muovissa.",
    features: ["Sama lentorata kuin Premium-versiossa", "Edullinen hinta", "Hyvä aloituskiekko distance-heittoihin"],
  },
  {
    slug: "jailbreak",
    discId: 4,
    name: "Jailbreak",
    tagline: "Tulossa pian — monipuolinen fairway driver",
    price: null,
    originalPrice: null,
    inStock: false,
    plastics: ["Premium"],
    weights: ["TBA"],
    colors: ["TBA"],
    description: "Jailbreak on tulossa oleva fairway driver, joka yhdistää hallinnan ja etäisyyden.",
    features: ["Tulossa pian"],
  },
  {
    slug: "bank-robber",
    discId: 1,
    name: "Bank Robber",
    tagline: "Tulossa pian — vakaa fairway driver",
    price: null,
    originalPrice: null,
    inStock: false,
    plastics: ["Premium"],
    weights: ["TBA"],
    colors: ["TBA"],
    description: "Bank Robber on tulossa oleva fairway driver, joka tarjoaa vakaan ja ennustettavan lennon.",
    features: ["Tulossa pian"],
  },
];

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, setIsOpen } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");

  const product = shopProducts.find((p) => p.slug === slug);
  const discData = product ? discs.find((d) => d.id === product.discId) : null;

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || "");
      setSelectedWeight(product.weights[0] || "");
      document.title = `${product.name} — Lucky Discs`;
    }
  }, [product]);

  if (!product || !discData) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Tuotetta ei löytynyt</h1>
          <Button onClick={() => navigate("/shop")} className="bg-[#FFD700] text-black hover:bg-[#FFC000]">
            Takaisin kauppaan
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock || !product.price) return;
    addItem({
      id: product.slug,
      name: product.name,
      plastic: product.plastics[0],
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      weight: selectedWeight,
      color: selectedColor,
      image: discData.imageSrc,
      flightNumbers: {
        speed: Number(discData.speed),
        glide: Number(discData.glide),
        turn: Number(discData.turn),
        fade: Number(discData.fade),
      },
    });
    setIsOpen(true);
  };

  const relatedProducts = shopProducts.filter(
    (p) => p.slug !== slug && p.inStock
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Etusivu</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-white transition-colors">Kauppa</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Product image */}
          <div className="flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 min-h-[400px]">
            <img src={discData.imageSrc} alt={product.name} className="w-full max-w-md object-contain drop-shadow-2xl" />
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <p className="text-[#FFD700] text-sm font-medium uppercase tracking-wide mb-1">
                {discData.type === "driver" ? "Distance Driver" : discData.type === "fairway" ? "Fairway Driver" : discData.type === "midrange" ? "Midrange" : "Putter"}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-400">{product.tagline}</p>
            </div>

            {/* Flight numbers */}
            <div className="flex gap-4">
              {[
                { label: "Speed", value: discData.speed },
                { label: "Glide", value: discData.glide },
                { label: "Turn", value: discData.turn },
                { label: "Fade", value: discData.fade },
              ].map(({ label, value }) => (
                <div key={label} className="text-center bg-gray-900 rounded-lg p-3 flex-1">
                  <div className="text-xl font-bold text-[#FFD700]">{value}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {product.price ? (
                <>
                  <span className="text-3xl font-bold text-[#FFD700]">{product.price.toFixed(2)} €</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">{product.originalPrice.toFixed(2)} €</span>
                  )}
                </>
              ) : (
                <span className="text-xl text-gray-400">Tulossa pian</span>
              )}
            </div>

            {/* Color selector */}
            {product.inStock && product.colors[0] !== "TBA" && (
              <div>
                <label className="text-sm text-gray-400 block mb-2">Väri</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button key={color} onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                        selectedColor === color
                          ? "border-[#FFD700] bg-[#FFD700]/10 text-white"
                          : "border-gray-700 text-gray-400 hover:border-gray-500"
                      }`}>{color}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Weight selector */}
            {product.inStock && product.weights[0] !== "TBA" && (
              <div>
                <label className="text-sm text-gray-400 block mb-2">Paino</label>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((weight) => (
                    <button key={weight} onClick={() => setSelectedWeight(weight)}
                      className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                        selectedWeight === weight
                          ? "border-[#FFD700] bg-[#FFD700]/10 text-white"
                          : "border-gray-700 text-gray-400 hover:border-gray-500"
                      }`}>{weight}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            {product.inStock ? (
              <Button onClick={handleAddToCart} className="w-full bg-[#FFD700] text-black hover:bg-[#FFC000] font-bold text-lg py-6">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Lisää ostoskoriin — {product.price?.toFixed(2)} €
              </Button>
            ) : (
              <Button disabled className="w-full bg-gray-700 text-gray-400 font-bold text-lg py-6">
                Tulossa pian
              </Button>
            )}

            {/* Description */}
            <div className="border-t border-gray-800 pt-6">
              <h2 className="font-bold text-lg mb-3">Kuvaus</h2>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features.length > 0 && product.features[0] !== "Tulossa pian" && (
              <div>
                <h3 className="font-bold mb-2">Ominaisuudet</h3>
                <ul className="space-y-1">
                  {product.features.map((f, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">•</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Muut tuotteet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => {
                const rd = discs.find((d) => d.id === rp.discId);
                return (
                  <Link key={rp.slug} to={`/shop/${rp.slug}`} className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors group">
                    <div className="aspect-square flex items-center justify-center mb-3">
                      <img src={rd?.imageSrc} alt={rp.name} className="w-32 h-32 object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <h3 className="font-bold">{rp.name}</h3>
                    <p className="text-[#FFD700] font-bold">{rp.price?.toFixed(2)} €</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Product Schema JSON-LD */}
      {product.inStock && product.price && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: product.description,
              image: discData.imageSrc,
              brand: { "@type": "Brand", name: "Lucky Discs" },
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: `https://www.luckydiscs.fi/shop/${product.slug}`,
              },
            }),
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
