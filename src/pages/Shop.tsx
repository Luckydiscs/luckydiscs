import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, X, Trash2, Package, Truck, Star, Zap } from "lucide-react";
import moneyShotDisc from "@/assets/money-shot-disc.webp";
import treasureHuntDisc from "@/assets/treasure-hunt-disc.webp";
import bankRobberDisc from "@/assets/bank-robber-disc.webp";

const MARKER_IMG = "https://lh3.googleusercontent.com/d/1fV3SMdDhkXP6LqPdYF1Yjan73uCn8AUP";

// ── CSS Animations injected as style tag ──
const shopStyles = `
@keyframes floatDisc {
  0%, 100% { transform: translateY(0px) rotateY(0deg) rotateX(5deg); }
  25% { transform: translateY(-20px) rotateY(15deg) rotateX(0deg); }
  50% { transform: translateY(-10px) rotateY(0deg) rotateX(-5deg); }
  75% { transform: translateY(-25px) rotateY(-15deg) rotateX(3deg); }
}
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.15); }
  50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.3), 0 0 80px rgba(34, 197, 94, 0.1); }
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(60px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes heroTextReveal {
  from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.shop-card-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
}
.shop-card-3d:hover .card-inner {
  transform: rotateY(-3deg) rotateX(2deg) translateZ(20px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(34, 197, 94, 0.15);
}
.card-inner {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
}
.disc-float { animation: floatDisc 6s ease-in-out infinite; }
.glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
.hero-text { animation: heroTextReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.hero-text-delay { animation: heroTextReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
.hero-text-delay2 { animation: heroTextReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards; opacity: 0; }
.shimmer-text {
  background: linear-gradient(90deg, #22c55e 0%, #4ade80 25%, #ffffff 50%, #4ade80 75%, #22c55e 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 4s linear infinite;
}
.fade-in-card { opacity: 0; animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.particle { position: absolute; border-radius: 50%; pointer-events: none; }
`;

// ── Product Data ──
interface Product {
  id: string;
  name: string;
  variant: string;
  type: "Midrange" | "Fairway Driver" | "Marker";
  price: number;
  originalPrice?: number;
  description: string;
  speed: number;
  glide: number;
  stability: number;
  fade: number;
  weight: string;
  color: string;
  image: string;
}

const products: Product[] = [
  {
    id: "basic-money-shot",
    name: "Money Shot",
    variant: "Basic",
    type: "Midrange",
    price: 9.90,
    originalPrice: 13.90,
    description: "Äärimmäisen luotettava lähestymiskiekko. Kestää tuulen, paineen ja kovatkin vedot.",
    speed: 5, glide: 5, stability: -1, fade: 1,
    weight: "169-172g", color: "Keltainen", image: moneyShotDisc,
  },
  {
    id: "premium-money-shot",
    name: "Money Shot",
    variant: "Premium",
    type: "Midrange",
    price: 9.90,
    originalPrice: 19.90,
    description: "Äärimmäisen luotettava lähestymiskiekko premium-muovissa. Paras tuntuma ja kesto.",
    speed: 5, glide: 5, stability: -1, fade: 1,
    weight: "165-168g", color: "Keltainen", image: moneyShotDisc,
  },
  {
    id: "ultrium-money-shot",
    name: "Money Shot",
    variant: "Ultrium",
    type: "Midrange",
    price: 9.90,
    originalPrice: 17.90,
    description: "Money Shot huippumuovissa. Ultrium tarjoaa erinomaisen gripin ja pitkän käyttöiän.",
    speed: 5, glide: 5, stability: -1, fade: 1,
    weight: "169-172g", color: "Keltainen", image: moneyShotDisc,
  },
  {
    id: "ultrium-treasure-hunt",
    name: "Treasure Hunt",
    variant: "Ultrium",
    type: "Fairway Driver",
    price: 9.90,
    originalPrice: 19.90,
    description: "Pitkää liitoa, maksimaalista pituutta ja hallittavuutta. Täydellinen fairway driver.",
    speed: 7, glide: 6, stability: -1, fade: 1,
    weight: "169-172g", color: "Oranssi", image: treasureHuntDisc,
  },
  {
    id: "lucky-discs-marker",
    name: "Lucky Discs Markkeri",
    variant: "",
    type: "Marker",
    price: 6.90,
    description: "Virallinen Lucky Discs markkeri pelikiekkojesi merkkaamiseen.",
    speed: 0, glide: 0, stability: 0, fade: 0,
    weight: "Yksi koko", color: "Vakio", image: MARKER_IMG,
  },
];

// ── Scroll Animation Hook ──
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

// ── Flight Badge ──
const FlightBadge = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center">
    <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{label}</span>
    <span className="text-lg font-bold text-white tabular-nums">{value}</span>
  </div>
);

// ── 3D Product Card ──
const ShopProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { addItem } = useCart();
  const isMarker = product.type === "Marker";
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className="shop-card-3d"
      style={{
        animationDelay: `${index * 0.15}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.95)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      <div className="card-inner relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/90 to-gray-950 border border-gray-800/50 backdrop-blur-sm">
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-green-500 text-black text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-green-500/25">
              -{discount}%
            </span>
          </div>
        )}

        {/* Product type */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            {product.type}
          </span>
        </div>

        {/* Image container with 3D hover */}
        <div className="relative h-64 flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-800/30 to-transparent pt-8">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />
          <img
            src={product.image}
            alt={product.variant ? `${product.variant} ${product.name}` : product.name}
            className="h-48 w-48 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-700 ease-out"
            style={{ filter: "drop-shadow(0 20px 40px rgba(34, 197, 94, 0.15))" }}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-black uppercase tracking-wide text-white">
              {product.variant ? `${product.variant} ${product.name}` : product.name}
            </h3>
            {product.variant && (
              <p className="text-xs text-green-400/70 font-medium mt-0.5">{product.variant} muovi</p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-white">€{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">€{product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed">{product.description}</p>

          {/* Flight stats */}
          {!isMarker && (
            <div className="grid grid-cols-4 gap-2 py-3 border-t border-b border-gray-800/50">
              <FlightBadge label="Nopeus" value={product.speed} />
              <FlightBadge label="Liito" value={product.glide} />
              <FlightBadge label="Vakaus" value={product.stability} />
              <FlightBadge label="Feidi" value={product.fade} />
            </div>
          )}

          {/* Weight & Color */}
          <p className="text-xs text-gray-500">{product.weight} · {product.color}</p>

          {/* Add to cart button */}
          <button
            onClick={() => addItem({ id: product.id, name: product.variant ? `${product.variant} ${product.name}` : product.name, price: product.price, image: product.image })}
            className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 bg-green-500 hover:bg-green-400 text-black hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Lisää koriin
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Cart Sidebar ──
const CartSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
const navigate = useNavigate();
    const { items, removeItem, updateQuantity, clearCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = total > 0 ? 5.90 : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-950 border-l border-gray-800/50 z-50 transform transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
            <h2 className="text-xl font-black uppercase tracking-wider text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-green-400" />
              Ostoskori
            </h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500">Ostoskori on tyhjä</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800/30">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg bg-gray-800/30" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                    <p className="text-green-400 font-bold mt-1">€{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                        <Minus className="w-3 h-3 text-gray-400" />
                      </button>
                      <span className="text-white font-bold text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                        <Plus className="w-3 h-3 text-gray-400" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto p-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-800/50 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Välitulos</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Toimitus</span>
                  <span>€{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-black text-lg pt-2 border-t border-gray-800/50">
                  <span>Yhteensä</span>
                  <span>€{(total + shipping).toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider bg-green-500 hover:bg-green-400 text-black transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 glow-pulse" onClick={() => { onClose(); navigate('/shop/kassa'); }}>
                Siirry kassalle
              </button>
              <button onClick={clearCart} className="w-full py-2 text-xs text-gray-500 hover:text-red-400 transition-colors uppercase tracking-wider">
                Tyhjennä ostoskori
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ── Main Shop Page ──
const Shop = () => {
  const [filter, setFilter] = useState<string>("Kaikki");
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const filters = ["Kaikki", "Midrange", "Fairway Driver", "Marker"];
  const filtered = filter === "Kaikki" ? products : products.filter((p) => p.type === filter);

  // Inject styles
  useEffect(() => {
    const existing = document.getElementById("shop-cinematic-styles");
    if (!existing) {
      const style = document.createElement("style");
      style.id = "shop-cinematic-styles";
      style.textContent = shopStyles;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById("shop-cinematic-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* ── Cinematic Hero ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/5 blur-[150px]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-green-400/3 blur-[100px]" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle bg-green-500/20"
              style={{
                width: `${3 + i * 2}px`,
                height: `${3 + i * 2}px`,
                top: `${15 + i * 14}%`,
                left: `${10 + i * 15}%`,
                animation: `floatDisc ${5 + i * 1.5}s ease-in-out ${i * 0.5}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Floating disc */}
          <div className="disc-float mx-auto mb-8 w-48 h-48 md:w-64 md:h-64 relative" style={{ perspective: "800px" }}>
            <img
              src={moneyShotDisc}
              alt="Lucky Discs"
              className="w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 30px 60px rgba(34, 197, 94, 0.25))" }}
            />
          </div>

          {/* Sale banner */}
          <div className="hero-text inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-sm font-bold text-green-400 uppercase tracking-wider">Varastontyhjennys – jopa -50%</span>
          </div>

          <h1 className="hero-text-delay">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-2">Lucky Discs</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-[0.2em] shimmer-text">Verkkokauppa</span>
          </h1>

          <p className="hero-text-delay2 mt-8 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Premium-frisbeegolfkiekkoja suoraan valmistajalta.<br className="hidden md:block" />
            Suunniteltu ja testattu Suomessa.
          </p>

          {/* Feature badges */}
          <div className="hero-text-delay2 flex flex-wrap justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 text-gray-400">
              <Truck className="w-5 h-5 text-green-400" />
              <span className="text-sm">Toimitus €5.90</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Package className="w-5 h-5 text-green-400" />
              <span className="text-sm">1–3 pv toimitusaika</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Star className="w-5 h-5 text-green-400" />
              <span className="text-sm">Suomalainen laatu</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-gray-700 mx-auto flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 rounded-full bg-green-400" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Grid Section ── */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  filter === f
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                    : "bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, index) => (
              <ShopProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Floating Cart Button ── */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 text-black flex items-center justify-center shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 glow-pulse"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white text-black text-xs font-black flex items-center justify-center shadow-lg">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Shop;
