import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useCart } from "@/contexts/CartContext";
import { useShopProducts } from "@/hooks/useShopProducts";
import useSEO from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ShoppingCart, Plus, Minus, Truck, ShieldCheck, RotateCcw, Loader2, Check,
} from "lucide-react";

const COLOR_HEX: Record<string, string> = {
  keltainen: "#F5C518", oranssi: "#FF7A1A", punainen: "#E53935", sininen: "#2563EB",
  vaaleansininen: "#7DD3FC", violetti: "#8B5CF6", pinkki: "#EC4899",
  vaaleanpunainen: "#F9A8D4", vihrea: "#22C55E", valkoinen: "#F1F1F1",
};
const colorLabel = (c: string) => (c === "vihrea" ? "Vihreä" : c.charAt(0).toUpperCase() + c.slice(1));

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products, loading } = useShopProducts();

  const product = products.find((p) => p.id === slug);
  const hasVariants = !!product?.variants?.length;

  const colors = useMemo(
    () => (hasVariants ? Array.from(new Set(product!.variants!.map((v) => v.color))) : []),
    [product, hasVariants],
  );
  const [selColor, setSelColor] = useState<string | null>(null);
  const [selWeight, setSelWeight] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const effColor = selColor ?? (colors.length === 1 ? colors[0] : null);
  const weights = useMemo(() => {
    if (!hasVariants || !effColor) return [];
    return product!.variants!.filter((v) => v.color === effColor && v.stock > 0).map((v) => v.weight);
  }, [product, hasVariants, effColor]);
  const effWeight = selWeight && weights.includes(selWeight) ? selWeight : weights.length === 1 ? weights[0] : null;
  const colorInStock = (c: string) => product!.variants!.some((v) => v.color === c && v.stock > 0);

  useSEO({
    title: product ? `${product.name}${product.variant ? ` ${product.variant}` : ""} | Lucky Discs` : "Lucky Discs",
    description: product?.description ?? "",
    canonicalPath: `/shop/${slug}`,
    structuredData: product
      ? {
          "@context": "https://schema.org", "@type": "Product",
          name: `${product.name}${product.variant ? ` ${product.variant}` : ""}`,
          description: product.description, image: `https://www.luckydiscs.fi${product.image}`,
          brand: { "@type": "Brand", name: "Lucky Discs" },
          offers: {
            "@type": "Offer", price: product.price.toFixed(2), priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: `https://www.luckydiscs.fi/shop/${slug}`,
          },
        }
      : undefined,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-32"><Loader2 className="w-8 h-8 animate-spin text-emerald-400" /></main>
        <Footer />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 text-center px-4">
          <h1 className="text-2xl font-bold mb-4">Tuotetta ei löytynyt</h1>
          <Button asChild className="bg-emerald-500 text-black hover:bg-emerald-400 font-bold"><Link to="/shop">Takaisin kauppaan</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const canAdd = hasVariants ? !!(effColor && effWeight) : true;

  const handleAdd = () => {
    const item = {
      id: product.id,
      name: product.variant ? `${product.name} ${product.variant}` : product.name,
      price: product.price, originalPrice: product.originalPrice, plastic: product.plastic,
      weight: effWeight ?? product.weight, color: effColor ? colorLabel(effColor) : undefined,
      image: product.image, flightNumbers: product.flight,
    };
    for (let i = 0; i < qty; i++) addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          <button onClick={() => navigate("/shop")} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Takaisin kauppaan
          </button>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* KUVA */}
            <div className="relative">
              <div className="sticky top-28 aspect-square bg-gradient-to-br from-emerald-950/40 to-black rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1.5">
                  {product.badge && <span className="bg-yellow-500 text-black font-bold tracking-wider text-xs px-2.5 py-1 rounded-md shadow">{product.badge}</span>}
                  {discount > 0 && <span className="bg-red-500 text-white font-bold tracking-wider text-xs px-2.5 py-1 rounded-md shadow">-{discount}%</span>}
                </div>
                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8" />
              </div>
            </div>

            {/* TIEDOT */}
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">{product.categoryLabel}</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {product.name}
              </h1>
              {product.variant && <p className="text-lg text-gray-400 mb-4">{product.variant}{product.plastic ? ` · ${product.plastic}-muovi` : ""}</p>}

              {/* Hinta */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-emerald-400 whitespace-nowrap">{(product.price * qty).toFixed(2).replace(".", ",")}&nbsp;€</span>
                {product.originalPrice && <span className="text-lg text-gray-500 line-through whitespace-nowrap">{(product.originalPrice * qty).toFixed(2).replace(".", ",")}&nbsp;€</span>}
                {qty > 1 && <span className="text-sm text-gray-500">({qty} kpl)</span>}
              </div>

              {/* KOKO kuvaus */}
              <p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>

              {/* Lentonumerot isona */}
              {product.flight && (
                <div className="grid grid-cols-4 gap-2 mb-6 bg-black/30 rounded-xl p-4 border border-white/5">
                  {[
                    { label: "Speed", value: product.flight.speed }, { label: "Glide", value: product.flight.glide },
                    { label: "Turn", value: product.flight.turn }, { label: "Fade", value: product.flight.fade },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{s.label}</div>
                      <div className="text-2xl font-bold text-white">{s.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Variantit */}
              {hasVariants && (
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Väri{effColor ? `: ${colorLabel(effColor)}` : ""}</div>
                    <div className="flex flex-wrap gap-2.5">
                      {colors.map((c) => {
                        const inStock = colorInStock(c);
                        const active = effColor === c;
                        return (
                          <button key={c} type="button" disabled={!inStock}
                            onClick={() => { setSelColor(c); setSelWeight(null); }}
                            title={colorLabel(c)} aria-label={colorLabel(c)}
                            className={`w-9 h-9 rounded-full border-2 transition-all ${active ? "border-emerald-400 scale-110 ring-2 ring-emerald-400/30" : "border-white/20 hover:border-white/50"} ${!inStock ? "opacity-25 cursor-not-allowed" : ""}`}
                            style={{ backgroundColor: COLOR_HEX[c] ?? "#888" }} />
                        );
                      })}
                    </div>
                  </div>
                  {effColor && weights.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Paino</div>
                      <select value={effWeight ?? ""} onChange={(e) => setSelWeight(e.target.value)}
                        className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-white focus:border-emerald-400 focus:outline-none min-w-[160px]">
                        {weights.length > 1 && <option value="">Valitse paino…</option>}
                        {weights.map((w) => <option key={w} value={w} className="bg-gray-900">{w}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              )}
              {!hasVariants && product.weight && (
                <div className="text-sm text-gray-400 mb-6">{product.weight}</div>
              )}

              {/* Määrä + koriin */}
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center border border-white/15 rounded-lg overflow-hidden">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-white/10" aria-label="Vähennä"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-medium">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-white/10" aria-label="Lisää"><Plus className="w-4 h-4" /></button>
                </div>
                <Button onClick={handleAdd} disabled={!canAdd}
                  className="flex-1 h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base rounded-full disabled:opacity-40 disabled:cursor-not-allowed">
                  {added ? <><Check className="w-5 h-5 mr-2" /> Lisätty koriin</> : hasVariants && !effColor ? "Valitse väri" : hasVariants && !effWeight ? "Valitse paino" : <><ShoppingCart className="w-5 h-5 mr-2" /> Lisää koriin</>}
                </Button>
              </div>
              {added && (
                <Button onClick={() => navigate("/shop/kassa")} variant="outline" className="w-full mb-6 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                  Siirry kassalle →
                </Button>
              )}

              {/* Trust */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-sm text-gray-400">
                <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-emerald-400" /> Toimitus 1–3 pv</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Paytrail-maksu</div>
                <div className="flex items-center gap-2"><RotateCcw className="w-4 h-4 text-emerald-400" /> 14 pv palautus</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
