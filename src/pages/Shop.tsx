import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Minus, X, Truck, Shield, ChevronDown, Star, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SHIPPING_COST = 5.90;

// Google Drive product images
const IMAGES = {
  moneyshot: "https://lh3.googleusercontent.com/d/1JbjeGjuNwWg4j09FZehByL5h4Z9Zakqw=s800",
  bankRobberPremium: "https://lh3.googleusercontent.com/d/1oxOJmncBb9ld1nobByJZPSqltF14-QMs=s800",
  bankRobberUltrium: "https://lh3.googleusercontent.com/d/1JcQpwuVIq8kSzRTsoEWQbeyyhQcOBruX=s800",
  heroBanner: "https://lh3.googleusercontent.com/d/1i95k2PsgQ_7VNOaFmWYdTio2ZnWeravI=s1200",
  treasureHuntPremium: "https://lh3.googleusercontent.com/d/1nTgPULSHQOjwukObdiKAoBiStYR5rB9P=s800",
  treasureHuntUltrium: "https://lh3.googleusercontent.com/d/1xrZNuTgvVO8SYhD4tAwU8auZdvai-dh8=s800",
};

interface Product {
  id: string;
  name: string;
  plastic: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  type: string;
  flightNumbers: { speed: number; glide: number; turn: number; fade: number };
  weights: string[];
  colors: string[];
  badge?: string;
}

const products: Product[] = [
  {
    id: "basic-money-shot",
    name: "Basic Money Shot",
    plastic: "Basic muovi",
    price: 9.90,
    originalPrice: 13.90,
    description: "Luotettava lähestymiskiekko basic-muovissa. Erinomainen tuntuma ja suora lentolinja.",
    image: IMAGES.moneyshot,
    type: "Midrange",
    flightNumbers: { speed: 5, glide: 5, turn: -1, fade: 1 },
    weights: ["169-172g", "173-175g"],
    colors: ["Keltainen", "Oranssi", "Vihre\u00e4", "Sininen"],
    badge: "Suosittu",
  },
  {
    id: "premium-money-shot",
    name: "Premium Money Shot",
    plastic: "Premium muovi",
    price: 9.90,
    originalPrice: 10.90,
    description: "Money Shot premium-muovissa. Paras tuntuma ja pitk\u00e4 kesto.",
    image: IMAGES.moneyshot,
    type: "Midrange",
    flightNumbers: { speed: 5, glide: 5, turn: -1, fade: 1 },
    weights: ["165-168g", "169-172g"],
    colors: ["Keltainen", "Punainen", "Sininen", "Valkoinen"],
  },
  {
    id: "ultrium-money-shot",
    name: "Ultrium Money Shot",
    plastic: "Ultrium muovi",
    price: 9.90,
    originalPrice: 17.90,
    description: "Huippumuovissa. Ultrium tarjoaa parhaan gripin ja pitk\u00e4n k\u00e4ytt\u00f6i\u00e4n.",
    image: IMAGES.moneyshot,
    type: "Midrange",
    flightNumbers: { speed: 5, glide: 5, turn: -1, fade: 1 },
    weights: ["169-172g", "173-175g"],
    colors: ["Keltainen", "Oranssi", "Pinkki"],
    badge: "-45%",
  },
  {
    id: "ultrium-treasure-hunt",
    name: "Ultrium Treasure Hunt",
    plastic: "Ultrium muovi",
    price: 9.90,
    originalPrice: 19.90,
    description: "Pitk\u00e4n matkan v\u00e4yl\u00e4draiveri Ultrium-muovissa. Huikea liito ja luotettavuus.",
    image: IMAGES.treasureHuntUltrium,
    type: "Fairway Driver",
    flightNumbers: { speed: 7, glide: 5, turn: -1, fade: 1 },
    weights: ["169-172g", "173-175g"],
    colors: ["Keltainen", "Oranssi", "Vihre\u00e4"],
    badge: "-50%",
  },
  {
    id: "lucky-discs-markkeri",
    name: "Lucky Discs Markkeri",
    plastic: "Vakio",
    price: 6.90,
    originalPrice: 6.90,
    description: "Virallinen Lucky Discs markkeri pelikiekkona. T\u00e4ydellinen lis\u00e4 varustepakkiin.",
    image: IMAGES.moneyshot,
    type: "Marker",
    flightNumbers: { speed: 0, glide: 0, turn: 0, fade: 0 },
    weights: ["Yksi koko"],
    colors: ["Vakio"],
  },
];

// ---- Product Card ----
function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    addItem({
      id: product.id + "-" + selectedWeight + "-" + selectedColor,
      name: product.name,
      plastic: product.plastic,
      price: product.price,
      originalPrice: product.originalPrice,
      weight: selectedWeight,
      color: selectedColor,
      image: product.image,
      quantity: 1,
      flightNumbers: product.flightNumbers,
    });
  };

  return (
    <div className="group relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-lucky-green/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lucky-green/10">
      {/* Badge */}
      {(product.badge || discount > 0) && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
            {product.badge || `-${discount}%`}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-lucky-green/30 border-t-lucky-green rounded-full animate-spin" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-lucky-green font-semibold uppercase tracking-wider">{product.type}</p>
            <h3 className="text-xl font-bold text-white mt-1 font-display">{product.name}</h3>
            <p className="text-sm text-gray-400 mt-0.5">{product.plastic}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">\u20ac{product.price.toFixed(2)}</p>
            {discount > 0 && <p className="text-sm text-gray-500 line-through">\u20ac{product.originalPrice.toFixed(2)}</p>}
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">{product.description}</p>

        {product.type !== "Marker" && (
          <div className="flex gap-2">
            {Object.entries(product.flightNumbers).map(([key, val]) => (
              <div key={key} className="flex-1 bg-gray-800/60 rounded-lg py-2 text-center border border-gray-700/50">
                <p className="text-lg font-bold text-white">{val}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {key === "speed" ? "Nopeus" : key === "glide" ? "Liito" : key === "turn" ? "Vakaus" : "Feidi"}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <div className="relative flex-1">
            <select
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="w-full bg-gray-800/80 text-white text-sm rounded-lg px-3 py-2.5 border border-gray-700/50 appearance-none cursor-pointer focus:border-lucky-green focus:outline-none"
            >
              {product.weights.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full bg-gray-800/80 text-white text-sm rounded-lg px-3 py-2.5 border border-gray-700/50 appearance-none cursor-pointer focus:border-lucky-green focus:outline-none"
            >
              {product.colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-lucky-green hover:bg-lucky-green/90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-lucky-green/20"
        >
          <ShoppingCart className="w-5 h-5" />
          Lis\u00e4\u00e4 koriin
        </button>
      </div>
    </div>
  );
}

// ---- Cart Sidebar ----
function CartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, isOpen, setIsOpen } = useCart();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = items.length > 0 ? subtotal + SHIPPING_COST : 0;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-gray-950 border-l border-gray-800 z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-lucky-green" /> Ostoskori
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Ostoskori on tyhj\u00e4</p>
              <p className="text-gray-600 text-sm mt-2">Lis\u00e4\u00e4 tuotteita ostoskoriin</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-gray-900/50 rounded-xl p-3 border border-gray-800/50">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">{item.name}</h4>
                  <p className="text-gray-500 text-xs">{item.weight} / {item.color}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-gray-800 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-gray-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                      <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-gray-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">\u20ac{(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.id)} className="text-gray-600 hover:text-red-400 p-1"><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-800 p-5 space-y-3">
            <div className="flex justify-between text-sm text-gray-400">
              <span>V\u00e4litulos</span>
              <span>\u20ac{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Toimitus (Posti/Matkahuolto)</span>
              <span>\u20ac{SHIPPING_COST.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-gray-800">
              <span>Yhteens\u00e4</span>
              <span>\u20ac{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => alert("Stripe-maksu aktivoidaan pian!")}
              className="w-full bg-lucky-green hover:bg-lucky-green/90 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-lg shadow-lg shadow-lucky-green/20"
            >
              Siirry maksamaan \u2192
            </button>
            <button
              onClick={clearCart}
              className="w-full text-gray-500 hover:text-red-400 text-sm py-2 transition-colors"
            >
              Tyhjenn\u00e4 ostoskori
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ---- Main Shop Page ----
const Shop = () => {
  const { items, setIsOpen } = useCart();
  const [filter, setFilter] = useState("Kaikki");
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const types = ["Kaikki", ...Array.from(new Set(products.map(p => p.type)))];
  const filtered = filter === "Kaikki" ? products : products.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <CartSidebar />

      {/* Hero Banner */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lucky-green/5 via-transparent to-black z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-lucky-green/10 border border-lucky-green/20 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-lucky-green" />
                <span className="text-lucky-green text-sm font-medium">Varastontyhjennys k\u00e4ynniss\u00e4</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Lucky Discs<br />
                <span className="text-lucky-green">Verkkokauppa</span>
              </h1>
              <p className="text-lg text-gray-400 mt-4 max-w-lg leading-relaxed">
                Premium-frisbeegolfkiekkoja suoraan valmistajalta. Kaikki kiekot Suomen varastosta, nopea toimitus Postilla tai Matkahuollolla.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Truck className="w-4 h-4 text-lucky-green" />
                  <span>Toimitus \u20ac5.90</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-lucky-green" />
                  <span>Turvallinen maksu</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Star className="w-4 h-4 text-lucky-green" />
                  <span>Suomalainen laatu</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-lucky-green/5 rounded-3xl blur-2xl" />
              <img
                src={IMAGES.heroBanner}
                alt="Lucky Discs tuotevalikoima"
                className="relative rounded-2xl shadow-2xl shadow-lucky-green/10 w-full object-cover border border-gray-800/50"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === type
                  ? "bg-lucky-green text-white shadow-lg shadow-lucky-green/20"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Shipping Info */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-900/50 rounded-2xl p-8 border border-gray-800/50">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-lucky-green/10 p-3 rounded-xl">
                <Truck className="w-6 h-6 text-lucky-green" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Nopea toimitus</h3>
                <p className="text-gray-400 text-sm mt-1">Posti tai Matkahuolto, kiinte\u00e4 \u20ac5.90. L\u00e4hetys 1-2 arkip\u00e4iv\u00e4ss\u00e4.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-lucky-green/10 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-lucky-green" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Turvallinen maksu</h3>
                <p className="text-gray-400 text-sm mt-1">Stripe-maksu korttimaksulla tai verkkopankilla. SSL-suojattu.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-lucky-green/10 p-3 rounded-xl">
                <Star className="w-6 h-6 text-lucky-green" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Suomalaista laatua</h3>
                <p className="text-gray-400 text-sm mt-1">Kaikki kiekot suunniteltu ja testattu Suomessa. Turnauskelpoiset.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-lucky-green hover:bg-lucky-green/90 text-white p-4 rounded-full shadow-2xl shadow-lucky-green/30 z-30 transition-all hover:scale-110 active:scale-95"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Shop;
