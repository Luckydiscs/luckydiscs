import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useShopProducts, type ShopProduct, type ShopVariant } from "@/hooks/useShopProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, ShieldCheck, RotateCcw, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";

// Tuotteet + variantit + stock luetaan Supabase-kannasta (useShopProducts).
type Product = ShopProduct;
type Variant = ShopVariant;

const COLOR_HEX: Record<string, string> = {
  keltainen: "#F5C518",
  oranssi: "#FF7A1A",
  punainen: "#E53935",
  sininen: "#2563EB",
  vaaleansininen: "#7DD3FC",
  violetti: "#8B5CF6",
  pinkki: "#EC4899",
  vaaleanpunainen: "#F9A8D4",
  vihrea: "#22C55E",
  valkoinen: "#F1F1F1",
};
const colorLabel = (c: string) => {
  const map: Record<string, string> = { vihrea: "Vihreä" };
  if (map[c]) return map[c];
  return c.charAt(0).toUpperCase() + c.slice(1);
};


const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "Kaikki" },
  { key: "signature", label: "Signature" },
  { key: "distance-driver", label: "Distance Driver" },
  { key: "fairway-driver", label: "Fairway Driver" },
  { key: "midrange", label: "Midrange" },
  { key: "bundle", label: "Paketit" },
  { key: "marker", label: "Tarvikkeet" },
];

// ───────────────────────────────
const Shop = () => {
  const navigate = useNavigate();
  const { addItem, totalItems, totalPrice } = useCart();
  const { products, loading, error } = useShopProducts();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((p) => p.category === activeFilter);
  }, [activeFilter, products]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleAddToCart = (
    product: Product,
    sel?: { color: string; weight: string },
    qty: number = 1,
  ) => {
    const item = {
      id: product.id,
      name: product.variant ? `${product.name} ${product.variant}` : product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      plastic: product.plastic,
      weight: sel?.weight ?? product.weight,
      color: sel ? colorLabel(sel.color) : undefined,
      image: product.image,
      flightNumbers: product.flight,
    };
    for (let i = 0; i < qty; i++) addItem(item);
    const variantTxt = sel ? ` — ${colorLabel(sel.color)} ${sel.weight}` : "";
    showToast(
      `Lisätty${qty > 1 ? ` ${qty} kpl` : ""}: ${product.name}${product.variant ? ` ${product.variant}` : ""}${variantTxt}`,
    );
  };

  const shippingThreshold = 50;
  const remainsToFree = Math.max(0, shippingThreshold - totalPrice);
  const orderTotal = totalPrice + (remainsToFree > 0 && totalPrice > 0 ? 5.9 : 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* TOP TRUST BAR — pt clears the fixed navbar */}
      <div className="pt-20 md:pt-24 bg-gradient-to-r from-emerald-900/40 via-emerald-800/30 to-emerald-900/40 border-b border-emerald-800/30">
        <div className="container mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:text-sm text-emerald-100">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> Toimitus 5,90 € · ilmainen yli 50 €
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Suomalainen verkkokauppa
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> 14 pv palautusoikeus
          </span>
        </div>
      </div>

      {/* HERO — kansibanneri */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-8 md:py-12 text-center">
          <h1 className="sr-only">Lucky Discs Shop — premium frisbeegolfkiekot</h1>
          <img
            src="/images/brand/shop-hero.webp"
            alt="Lucky Discs Shop"
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl border border-white/5"
            width={1600}
            height={675}
          />
          <p className="text-gray-200 text-base md:text-lg max-w-xl mx-auto mt-6 mb-4">
            Premium-frisbeegolfkiekkoja suoraan valmistajalta. Suunniteltu ja testattu Suomessa.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-300">
            <span>{products.length} tuotetta</span>
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span>1–3 päivän toimitus</span>
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span>Paytrail-maksu</span>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2 py-5 sticky top-16 z-30 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5">
          {FILTERS.map((f) => {
            const count =
              f.key === "all"
                ? products.length
                : products.filter((p) => p.category === f.key).length;
            if (count === 0) return null;
            const active = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                }`}
              >
                {f.label} <span className="opacity-60 ml-1">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PRODUCT GRID — full width, centered (aligns with navbar) */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mb-3" />
            Ladataan tuotteita…
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">
            Tuotteiden lataus epäonnistui. Päivitä sivu tai yritä myöhemmin.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-500">Ei tuotteita tässä kategoriassa.</div>
            )}
          </>
        )}
      </div>

      {/* FLOATING CART BUTTON (when items) */}
      {totalItems > 0 && (
        <button
          onClick={() => navigate("/shop/kassa")}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3.5 rounded-full shadow-2xl shadow-emerald-500/40 flex items-center gap-3"
        >
          <ShoppingBag className="w-5 h-5" />
          Kassalle ({totalItems})
          <span className="font-mono">{orderTotal.toFixed(2).replace(".", ",")} €</span>
        </button>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-24 right-5 z-50 bg-emerald-500 text-black px-4 py-3 rounded-lg shadow-2xl shadow-emerald-500/30 flex items-center gap-2 font-medium max-w-xs">
          <ShoppingBag className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{toast}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

// ────────────────────────────────
const ProductCard = ({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product, sel?: { color: string; weight: string }, qty?: number) => void;
}) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const hasVariants = !!product.variants?.length;

  const colors = useMemo(
    () => (hasVariants ? Array.from(new Set(product.variants!.map((v) => v.color))) : []),
    [product.variants, hasVariants],
  );

  const [selColor, setSelColor] = useState<string | null>(
    colors.length === 1 ? colors[0] : null,
  );
  const [selWeight, setSelWeight] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const weightsForColor = useMemo(() => {
    if (!hasVariants || !selColor) return [];
    return product
      .variants!.filter((v) => v.color === selColor && v.stock > 0)
      .map((v) => v.weight);
  }, [product.variants, hasVariants, selColor]);

  const effectiveWeight =
    selWeight && weightsForColor.includes(selWeight)
      ? selWeight
      : weightsForColor.length === 1
        ? weightsForColor[0]
        : null;

  const selectedVariant = useMemo(() => {
    if (!hasVariants || !selColor || !effectiveWeight) return null;
    return product.variants!.find(
      (v) => v.color === selColor && v.weight === effectiveWeight,
    );
  }, [product.variants, hasVariants, selColor, effectiveWeight]);

  const colorInStock = (c: string) =>
    product.variants!.some((v) => v.color === c && v.stock > 0);

  const soldOut = hasVariants && !product.variants!.some((v) => v.stock > 0);
  const canAdd = hasVariants ? !!selectedVariant : true;

  const handleClick = () => {
    if (hasVariants) {
      if (selColor && effectiveWeight) {
        onAdd(product, { color: selColor, weight: effectiveWeight }, qty);
        // Valinta säilyy → voit lisätä toisen värin vaihtamalla swatchia (ei tarvitse aloittaa alusta)
        setQty(1);
      }
    } else {
      onAdd(product, undefined, qty);
      setQty(1);
    }
  };

  return (
    <article className="group relative h-full bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:border-emerald-500/30 rounded-2xl overflow-hidden transition-colors duration-300 flex flex-col">
      {/* Badges — pinottu pystyyn, kumpikin oma leveys */}
      <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
        {product.badge && (
          <span className="bg-yellow-500 text-black font-bold tracking-wider text-[10px] px-2 py-0.5 rounded-md shadow">
            {product.badge}
          </span>
        )}
        {discount > 0 && !soldOut && (
          <span className="bg-red-500 text-white font-bold tracking-wider text-[10px] px-2 py-0.5 rounded-md shadow">
            -{discount}%
          </span>
        )}
        {soldOut && (
          <span className="bg-gray-700 text-gray-200 font-bold tracking-wider text-[10px] px-2 py-0.5 rounded-md shadow">
            LOPPUUNMYYTY
          </span>
        )}
      </div>
      <div className="absolute top-3 right-3 z-10">
        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-black/40 backdrop-blur px-2 py-1 rounded">
          {product.categoryLabel}
        </span>
      </div>

      {/* Image — linkki tuotesivulle */}
      <Link to={`/shop/${product.id}`} className="relative aspect-square bg-gradient-to-br from-emerald-950/40 to-black overflow-hidden block">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/shop/${product.id}`} className="mb-2 block hover:text-emerald-400 transition-colors">
          <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
          {product.variant && (
            <p className="text-sm text-gray-400 mt-0.5">{product.variant}</p>
          )}
        </Link>

        <p className="text-xs text-gray-500 line-clamp-2 mb-1">{product.description}</p>
        <Link to={`/shop/${product.id}`} className="text-xs text-emerald-400 hover:text-emerald-300 mb-3 inline-block">
          Lue lisää →
        </Link>

        {/* Flight numbers */}
        {product.flight && (
          <div className="grid grid-cols-4 gap-1 mb-4 bg-black/30 rounded-lg p-2 border border-white/5">
            {[
              { label: "Speed", value: product.flight.speed },
              { label: "Glide", value: product.flight.glide },
              { label: "Turn", value: product.flight.turn },
              { label: "Fade", value: product.flight.fade },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[9px] uppercase tracking-wider text-gray-500">
                  {s.label}
                </div>
                <div className="text-base font-bold text-white">{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Variant selector */}
        {hasVariants && !soldOut && (
          <div className="space-y-3 mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">
                Väri{selColor ? `: ${colorLabel(selColor)}` : ""}
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const inStock = colorInStock(c);
                  const active = selColor === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      disabled={!inStock}
                      onClick={() => {
                        setSelColor(c);
                        setSelWeight(null);
                      }}
                      title={colorLabel(c)}
                      aria-label={colorLabel(c)}
                      className={`relative w-7 h-7 rounded-full border-2 transition-all ${
                        active
                          ? "border-emerald-400 scale-110 ring-2 ring-emerald-400/30"
                          : "border-white/20 hover:border-white/50"
                      } ${!inStock ? "opacity-25 cursor-not-allowed" : ""}`}
                      style={{ backgroundColor: COLOR_HEX[c] ?? "#888" }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Weight dropdown */}
            {selColor && weightsForColor.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">
                  Paino
                </div>
                <select
                  value={effectiveWeight ?? ""}
                  onChange={(e) => setSelWeight(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none"
                >
                  {weightsForColor.length > 1 && (
                    <option value="" className="bg-gray-900">
                      Valitse paino…
                    </option>
                  )}
                  {weightsForColor.map((w) => (
                    <option key={w} value={w} className="bg-gray-900">
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity stepper */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">
                Määrä
              </div>
              <div className="inline-flex items-center border border-white/10 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10"
                  aria-label="Vähennä"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10"
                  aria-label="Lisää"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simple product weight/qty */}
        {!hasVariants && (
          <div className="space-y-3 mb-4">
            {product.weight && (
              <div className="text-[11px] text-gray-500">{product.weight}</div>
            )}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">
                Määrä
              </div>
              <div className="inline-flex items-center border border-white/10 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10"
                  aria-label="Vähennä"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10"
                  aria-label="Lisää"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Price + button pinned to bottom */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-emerald-400 whitespace-nowrap">
              {(product.price * qty).toFixed(2).replace(".", ",")}&nbsp;€
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through whitespace-nowrap">
                {(product.originalPrice * qty).toFixed(2).replace(".", ",")}&nbsp;€
              </span>
            )}
            {qty > 1 && (
              <span className="text-xs text-gray-500">({qty} kpl)</span>
            )}
          </div>
          {soldOut ? (
            <Button
              disabled
              className="w-full bg-gray-700 text-gray-300 font-bold rounded-full cursor-not-allowed opacity-70"
            >
              Loppuunmyyty
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              disabled={!canAdd}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-1" />
              {hasVariants && !selColor
                ? "Valitse väri"
                : hasVariants && !effectiveWeight
                  ? "Valitse paino"
                  : "Lisää koriin"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Shop;
