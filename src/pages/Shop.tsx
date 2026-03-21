import { useState } from "react";
import { useCart, CartItem } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, X, Trash2, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Google Drive product images
const DRIVE_IMAGES = {
  moneyshot: "https://lh3.googleusercontent.com/d/1JbjeGjuNwWg4j09FZehByL5h4Z9Zakqw=s800",
  treasureHuntUltrium: "https://lh3.googleusercontent.com/d/1xrZNuTgvVO8SYhD4tAwU8auZdvai-dh8=s800",
  heroBanner: "https://lh3.googleusercontent.com/d/1i95k2PsgQ_7VNOaFmWYdTio2ZnWeravI=s1200",
};

interface Product {
  id: string;
  name: string;
  discModel: string;
  plastic: string;
  type: string;
  price: number;
  originalPrice?: number;
  description: string;
  flightNumbers: { speed: number; glide: number; turn: number; fade: number };
  weights: string[];
  colors: { name: string; value: string }[];
  image: string;
  inStock: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: "basic-money-shot",
    name: "Basic Money Shot",
    discModel: "Money Shot",
    plastic: "Basic",
    type: "Midrange",
    price: 9.90,
    originalPrice: 13.90,
    description: "Äärimmäisen luotettava lähestymiskiekko. Kestää tuulen, paineen ja kovatkin vedot.",
    flightNumbers: { speed: 5, glide: 5, turn: -1, fade: 1 },
    weights: ["169-172g", "173-176g"],
    colors: [
      { name: "Keltainen", value: "#EAB308" },
      { name: "Oranssi", value: "#F97316" },
      { name: "Punainen", value: "#EF4444" },
      { name: "Sininen", value: "#3B82F6" },
      { name: "Vaaleansininen", value: "#7DD3FC" },
      { name: "Valkoinen", value: "#F8FAFC" }
    ],
    image: DRIVE_IMAGES.moneyshot,
    inStock: true
  },
  {
    id: "premium-money-shot",
    name: "Premium Money Shot",
    discModel: "Money Shot",
    plastic: "Premium",
    type: "Midrange",
    price: 9.90,
    originalPrice: 19.90,
    description: "Äärimmäisen luotettava lähestymiskiekko premium-muovissa. Paras tuntuma ja kesto.",
    flightNumbers: { speed: 5, glide: 5, turn: -1, fade: 1 },
    weights: ["165-168g", "169-172g", "173-176g"],
    colors: [
      { name: "Keltainen", value: "#EAB308" },
      { name: "Pinkki", value: "#EC4899" },
      { name: "Vaaleanpunainen", value: "#F9A8D4" }
    ],
    image: DRIVE_IMAGES.moneyshot,
    inStock: true
  },
  {
    id: "ultrium-money-shot",
    name: "Ultrium Money Shot",
    discModel: "Money Shot",
    plastic: "Ultrium",
    type: "Midrange",
    price: 9.90,
    originalPrice: 17.90,
    description: "Money Shot huippumuovissa. Ultrium tarjoaa erinomaisen gripin ja pitkän käyttöiän.",
    flightNumbers: { speed: 5, glide: 5, turn: -1, fade: 1 },
    weights: ["169-172g", "173-176g"],
    colors: [
      { name: "Keltainen", value: "#EAB308" },
      { name: "Oranssi", value: "#F97316" },
      { name: "Pinkki", value: "#EC4899" },
      { name: "Punainen", value: "#EF4444" },
      { name: "Sininen", value: "#3B82F6" },
      { name: "Vaaleansininen", value: "#7DD3FC" }
    ],
    image: DRIVE_IMAGES.moneyshot,
    inStock: true
  },
  {
    id: "ultrium-treasure-hunt",
    name: "Ultrium Treasure Hunt",
    discModel: "Treasure Hunt",
    plastic: "Ultrium",
    type: "Fairway Driver",
    price: 9.90,
    originalPrice: 19.90,
    description: "Pitkien avauksien aarre! Huikeaa liitoa, maksimaalista pituutta ja luotettavuutta.",
    flightNumbers: { speed: 7, glide: 5, turn: -1, fade: 1 },
    weights: ["169-172g", "173-176g"],
    colors: [
      { name: "Oranssi", value: "#F97316" },
      { name: "Sininen", value: "#3B82F6" },
      { name: "Vaaleansininen", value: "#7DD3FC" },
      { name: "Violetti", value: "#8B5CF6" }
    ],
    image: DRIVE_IMAGES.treasureHuntUltrium,
    inStock: true
  },
  {
    id: "lucky-discs-markkeri",
    name: "Lucky Discs Markkeri",
    discModel: "Markkeri",
    plastic: "",
    type: "Marker",
    price: 6.90,
    description: "Virallinen Lucky Discs markkeri pelikiekkona.",
    flightNumbers: { speed: 0, glide: 0, turn: 0, fade: 0 },
    weights: ["Yksi koko"],
    colors: [{ name: "Vakio", value: "#22C55E" }],
    image: DRIVE_IMAGES.moneyshot,
    inStock: true
  }
];

const SHIPPING_COST = 5.90;

function FlightNumber({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-lucky-green font-bold text-lg">{value}</div>
      <div className="text-gray-500 text-xs uppercase">{label}</div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product, weight: string, color: string) => void }) {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="group bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-lucky-green/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lucky-green/10 transition-all duration-500">
      <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-48 h-48 object-contain" loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
        {product.originalPrice && (
          <Badge className="absolute top-3 right-3 bg-red-600 text-white font-bold">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </Badge>
        )}
        <Badge className="absolute top-3 left-3 bg-gray-800/90 text-gray-300 text-xs">{product.type}</Badge>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-bold text-lg">{product.name}</h3>
            {product.plastic && <span className="text-lucky-green text-sm">{product.plastic} muovi</span>}
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-xl">€{product.price.toFixed(2)}</div>
            {product.originalPrice && <div className="text-gray-500 line-through text-sm">€{product.originalPrice.toFixed(2)}</div>}
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

        {product.type !== "Marker" && (
          <div className="grid grid-cols-4 gap-2 mb-4 py-3 bg-gray-800/50 rounded-lg">
            <FlightNumber label="Nopeus" value={product.flightNumbers.speed} />
            <FlightNumber label="Liito" value={product.flightNumbers.glide} />
            <FlightNumber label="Vakaus" value={product.flightNumbers.turn} />
            <FlightNumber label="Feidi" value={product.flightNumbers.fade} />
          </div>
        )}

        <button onClick={() => setShowOptions(!showOptions)}
          className="w-full flex items-center justify-between text-gray-300 text-sm mb-3 hover:text-white transition-colors">
          <span>{selectedWeight} • {selectedColor}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showOptions ? "rotate-180" : ""}`} />
        </button>

        {showOptions && (
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Paino</label>
              <div className="flex flex-wrap gap-2">
                {product.weights.map((w) => (
                  <button key={w} onClick={() => setSelectedWeight(w)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${selectedWeight === w ? "bg-lucky-green text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>{w}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Väri</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c.name ? "border-lucky-green scale-110" : "border-gray-600 hover:border-gray-400"}`}
                    style={{ backgroundColor: c.value }} title={c.name} />
                ))}
              </div>
            </div>
          </div>
        )}

        <Button onClick={() => onAddToCart(product, selectedWeight, selectedColor)}
          className="w-full bg-lucky-green text-white hover:bg-lucky-green/80 font-semibold">
          <ShoppingCart className="w-4 h-4 mr-2" /> Lisää koriin
        </Button>
      </div>
    </div>
  );
}

function CartSidebar() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, isOpen, setIsOpen, clearCart } = useCart();
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setIsOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white font-bold text-xl">Ostoskori ({totalItems})</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Ostoskori on tyhjä</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.weight}-${item.color}`} className="flex gap-4 bg-gray-800/50 rounded-lg p-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">{item.name}</h4>
                  <p className="text-gray-400 text-xs">{item.weight} • {item.color}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.weight, item.color, item.quantity - 1)}
                        className="w-7 h-7 rounded bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600"><Minus className="w-3 h-3" /></button>
                      <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.weight, item.color, item.quantity + 1)}
                        className="w-7 h-7 rounded bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600"><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="text-white font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id, item.weight, item.color)}
                  className="text-gray-500 hover:text-red-400 self-start"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-800 p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300"><span>Välisumma</span><span>€{totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-300"><span>Toimitus (Posti/Matkahuolto)</span><span>€{SHIPPING_COST.toFixed(2)}</span></div>
              <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700">
                <span>Yhteensä</span><span>€{(totalPrice + SHIPPING_COST).toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full bg-lucky-green text-white hover:bg-lucky-green/80 font-bold text-lg py-6"
              onClick={() => alert("Stripe-maksu aktivoidaan pian!")}>Siirry maksamaan</Button>
            <button onClick={clearCart} className="w-full text-gray-500 hover:text-gray-300 text-sm text-center">Tyhjennä ostoskori</button>
          </div>
        )}
      </div>
    </>
  );
}

export default function Shop() {
  const { addItem, totalItems, setIsOpen } = useCart();
  const [filter, setFilter] = useState<string>("all");

  const filteredProducts = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.type === filter);

  const handleAddToCart = (product: Product, weight: string, color: string) => {
    addItem({
      id: product.id,
      name: product.name,
      plastic: product.plastic,
      price: product.price,
      originalPrice: product.originalPrice,
      weight,
      color,
      image: product.image,
      flightNumbers: product.flightNumbers,
    });
  };

  const types = ["all", ...new Set(PRODUCTS.map((p) => p.type))];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {/* Hero Banner */}
      <section className="relative pt-8 pb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lucky-green/5 via-transparent to-black z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-lucky-green/10 border border-lucky-green/20 rounded-full px-4 py-1.5 mb-4">
                <span className="text-lucky-green text-sm font-medium">✨ Varastontyhjennys käynnissä</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Lucky Discs<br /><span className="text-lucky-green">Verkkokauppa</span></h1>
              <p className="text-gray-400 mt-4 max-w-lg">Premium-frisbeegolfkiekkoja suoraan valmistajalta. Nopea toimitus Postilla tai Matkahuollolla.</p>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -inset-4 bg-lucky-green/5 rounded-3xl blur-2xl" />
              <img src={DRIVE_IMAGES.heroBanner} alt="Lucky Discs tuotevalikoima" className="relative rounded-2xl shadow-2xl shadow-lucky-green/10 w-full object-cover border border-gray-800/50" />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-24 pb-12 px-4 text-center bg-gradient-to-b from-lucky-green/10 to-black">
        <div className="container mx-auto max-w-4xl">
          <Badge className="bg-lucky-green/20 text-lucky-green mb-4">Verkkokauppa</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display uppercase">Lucky Discs Kauppa</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Tilaa suomalaiset huippukiekot suoraan kotiovelle. Toimitus Posti/Matkahuolto €5.90.</p>
        </div>
      </section>

      {totalItems > 0 && (
        <button onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-30 bg-lucky-green text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-lucky-green/80 transition-all">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">{totalItems}</span>
        </button>
      )}

      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {types.map((type) => (
              <button key={type} onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === type ? "bg-lucky-green text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>
                {type === "all" ? "Kaikki" : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          <div className="mt-16 bg-gray-900/40 border border-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-4">Toimitustiedot</h3>
            <div className="grid sm:grid-cols-3 gap-6 text-gray-300">
              <div><div className="text-lucky-green font-bold text-2xl mb-1">€5.90</div><div className="text-sm">Posti / Matkahuolto</div></div>
              <div><div className="text-lucky-green font-bold text-2xl mb-1">1-3 pv</div><div className="text-sm">Toimitusaika</div></div>
              <div><div className="text-lucky-green font-bold text-2xl mb-1">Suomi</div><div className="text-sm">Toimitusalue</div></div>
            </div>
          </div>
        </div>
      </section>

      <CartSidebar />
      <Footer />
    </div>
  );
}
