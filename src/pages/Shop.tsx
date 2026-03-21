import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, X, Trash2, ChevronDown, Package, Truck, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import moneyShotDisc from "@/assets/money-shot-disc.png";
import treasureHuntDisc from "@/assets/treasure-hunt-disc.png";
import bankRobberDisc from "@/assets/bank-robber-disc.png";

const MARKER_IMG = "https://lh3.googleusercontent.com/d/1JbjeGjuNwWg4j09FZehByL5h4Z9Zakqw=s800";

interface Product {
  id: string;
  name: string;
  variant: string;
  plastic: string;
  price: number;
  originalPrice?: number;
  image: string;
  type: string;
  description: string;
  weight: string;
  color: string;
  flightNumbers: { speed: number; glide: number; turn: number; fade: number };
}

const products: Product[] = [
  {
    id: "basic-money-shot",
    name: "Money Shot",
    variant: "Basic",
    plastic: "Basic muovi",
    price: 9.90,
    originalPrice: 13.90,
    image: moneyShotDisc,
    type: "Midrange",
    description: "\u00c4\u00e4rimm\u00e4isen luotettava l\u00e4hestymiskiekko. Kest\u00e4\u00e4 tuulen, paineen ja kovatkin vedot.",
    weight: "169-172g",
    color: "Keltainen",
    flightNumbers: { speed: 5, glide: 5, turn: -1, fade: 1 }
  },
  {
    id: "premium-money-shot",
    name: "Money Shot",
    variant: "Premium",
    plastic: "Premium muovi",
    price: 9.90,
    originalPrice: 19.90,
    image: moneyShotDisc,
    type: "Midrange",
    description: "\u00c4\u00e4rimm\u00e4isen luotettava l\u00e4hestymiskiekko premium-muovissa. Paras tuntuma ja kesto.",
    weight: "165-168g",
    color: "Keltainen",
    flightNumbers: { speed: 5, glide: 5, turn: -1, fade: 1 }
  },
  {
    id: "ultrium-money-shot",
    name: "Money Shot",
    variant: "Ultrium",
    plastic: "Ultrium muovi",
    price: 9.90,
    originalPrice: 17.90,
    image: moneyShotDisc,
    type: "Midrange",
    description: "Money Shot huippumuovissa. Ultrium tarjoaa erinomaisen gripin ja pitk\u00e4n k\u00e4ytt\u00f6i\u00e4n.",
    weight: "169-172g",
    color: "Keltainen",
    flightNumbers: { speed: 5, glide: 5, turn: -1, fade: 1 }
  },
  {
    id: "ultrium-treasure-hunt",
    name: "Treasure Hunt",
    variant: "Ultrium",
    plastic: "Ultrium muovi",
    price: 9.90,
    originalPrice: 19.90,
    image: treasureHuntDisc,
    type: "Fairway Driver",
    description: "Pitk\u00e4\u00e4 liitoa, maksimaalista pituutta ja luotettavuutta. Huippu fairway-driver!",
    weight: "169-172g",
    color: "Oranssi",
    flightNumbers: { speed: 7, glide: 5, turn: -1, fade: 1 }
  },
  {
    id: "lucky-discs-marker",
    name: "Lucky Discs Markkeri",
    variant: "",
    plastic: "",
    price: 6.90,
    image: MARKER_IMG,
    type: "Marker",
    description: "Virallinen Lucky Discs markkeri pelikiekkona.",
    weight: "Yksi koko",
    color: "Vakio",
    flightNumbers: { speed: 0, glide: 0, turn: 0, fade: 0 }
  }
];

const FlightBadge = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center">
    <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{label}</span>
    <span className="text-lg font-heading text-white w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10">
      {value}
    </span>
  </div>
);

const ShopProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const isMarker = product.type === "Marker";

  return (
    <div className="group relative bg-gradient-to-b from-gray-900/80 to-black border border-white/10 rounded-2xl overflow-hidden hover:border-lucky-green/30 transition-all duration-500 hover:shadow-xl hover:shadow-lucky-green/5 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative p-6 pb-0 flex justify-center items-center min-h-[280px]">
        {discount > 0 && (
          <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        <Badge className="absolute top-4 left-4 z-10 bg-white/10 text-gray-300 border-white/20 text-[10px] uppercase tracking-wider">
          {product.type}
        </Badge>
        <img
          src={product.image}
          alt={product.name + " " + product.variant}
          className={isMarker
            ? "w-40 h-40 object-contain transition-transform duration-500 group-hover:scale-110"
            : "w-56 h-56 object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_20px_40px_rgba(34,197,94,0.15)]"
          }
          loading="lazy"
        />
        {!isMarker && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-4 bg-black/30 rounded-full blur-lg" />
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 pt-4 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-xl font-heading tracking-wide text-white">
            {product.variant ? product.variant + " " + product.name : product.name}
          </h3>
          {product.plastic && (
            <p className="text-sm text-lucky-green/80 mt-0.5">{product.plastic}</p>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-white">\u20ac{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">\u20ac{product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{product.description}</p>

        {/* Flight Numbers */}
        {!isMarker && (
          <div className="flex justify-between gap-2 mb-5 px-2">
            <FlightBadge label="Nopeus" value={product.flightNumbers.speed} />
            <FlightBadge label="Liito" value={product.flightNumbers.glide} />
            <FlightBadge label="Vakaus" value={product.flightNumbers.turn} />
            <FlightBadge label="Feidi" value={product.flightNumbers.fade} />
          </div>
        )}

        {/* Weight/Color */}
        <div className="text-xs text-gray-500 mb-4">
          {product.weight} \u00b7 {product.color}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full bg-lucky-green hover:bg-lucky-green/90 text-black font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-lucky-green/20 active:scale-[0.98]"
        >
          <ShoppingCart className="w-4 h-4" />
          Lis\u00e4\u00e4 koriin
        </button>
      </div>
    </div>
  );
};

const CartSidebar = () => {
  const { items, removeItem, updateQuantity, clearCart, isOpen, setIsOpen } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.90;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-950 border-l border-white/10 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-lucky-green" />
            <h2 className="text-lg font-heading text-white">Ostoskori</h2>
            <span className="text-sm text-gray-400">({items.reduce((s, i) => s + i.quantity, 0)})</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-12 h-12 mx-auto text-gray-700 mb-4" />
              <p className="text-gray-500">Ostoskori on tyhj\u00e4</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-3 border border-white/5">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg bg-white/5" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                  {item.plastic && <p className="text-xs text-gray-500">{item.plastic}</p>}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm text-white w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">\u20ac{(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 p-5 space-y-3">
            <div className="flex justify-between text-sm text-gray-400">
              <span>V\u00e4litotaali</span>
              <span>\u20ac{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Toimitus</span>
              <span>\u20ac{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
              <span>Yhteens\u00e4</span>
              <span>\u20ac{(total + shipping).toFixed(2)}</span>
            </div>
            <button className="w-full bg-lucky-green hover:bg-lucky-green/90 text-black font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-lucky-green/20 active:scale-[0.98] mt-2">
              Siirry kassalle
            </button>
            <button onClick={clearCart} className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors py-1">
              Tyhjenn\u00e4 ostoskori
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Shop = () => {
  const { addItem, items, setIsOpen } = useCart();
  const [selectedType, setSelectedType] = useState("all");
  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  const filteredProducts = selectedType === "all"
    ? products
    : products.filter(p => p.type === selectedType);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.variant ? product.variant + " " + product.name : product.name,
      plastic: product.plastic,
      price: product.price,
      originalPrice: product.originalPrice,
      weight: product.weight,
      color: product.color,
      image: product.image,
      quantity: 1,
      flightNumbers: product.flightNumbers
    });
  };

  const types = ["all", "Midrange", "Fairway Driver", "Marker"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />
      <CartSidebar />

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-lucky-green text-black p-4 rounded-full shadow-lg shadow-lucky-green/30 hover:shadow-xl hover:shadow-lucky-green/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </button>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lucky-green/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-lucky-green/10 text-lucky-green border-lucky-green/20 mb-4 px-4 py-1">
              Varastontyhjennys \u2013 jopa -50%
            </Badge>
            <h1 className="text-4xl md:text-6xl font-heading tracking-tight mb-4">
              Lucky Discs
              <span className="block text-lucky-green">Verkkokauppa</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Premium-frisbeegolfkiekkoja suoraan valmistajalta. Suunniteltu ja testattu Suomessa.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-lucky-green" />
              <span>Toimitus \u20ac5.90</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-lucky-green" />
              <span>1\u20133 pv toimitusaika</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-lucky-green" />
              <span>Suomalainen laatu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedType === type
                    ? "bg-lucky-green text-black shadow-lg shadow-lucky-green/20"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {type === "all" ? "Kaikki" : type}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredProducts.map((product) => (
              <ShopProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Info Section */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading text-center mb-8">Toimitustiedot</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <Truck className="w-8 h-8 text-lucky-green mx-auto mb-3" />
                <h3 className="font-medium text-white mb-1">Nopea toimitus</h3>
                <p className="text-sm text-gray-400">1\u20133 arkip\u00e4iv\u00e4\u00e4 tilauksesta</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <Package className="w-8 h-8 text-lucky-green mx-auto mb-3" />
                <h3 className="font-medium text-white mb-1">Posti / Matkahuolto</h3>
                <p className="text-sm text-gray-400">Toimituskulut \u20ac5.90</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <Star className="w-8 h-8 text-lucky-green mx-auto mb-3" />
                <h3 className="font-medium text-white mb-1">Suomalainen laatu</h3>
                <p className="text-sm text-gray-400">Suunniteltu ja testattu Nokialla</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
