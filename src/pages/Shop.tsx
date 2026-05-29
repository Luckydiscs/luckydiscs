import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Plus,
  Minus,
  X,
} from "lucide-react";
// Real product photos from Lucky Discs Drive (2026-05-29)
const BANK_ROBBER_PREMIUM = "/images/products/bank-robber-premium.jpg";
const BANK_ROBBER_ULTRIUM = "/images/products/bank-robber-ultrium.jpg";
const TREASURE_HUNT_PREMIUM = "/images/products/treasure-hunt-premium.jpg";
const TREASURE_HUNT_ULTRIUM = "/images/products/treasure-hunt-ultrium.jpg";
const MONEY_SHOT_ULTRIUM = "/images/products/money-shot-ultrium.png";
const MONEY_SHOT_GROUP = "/images/products/moneyshots-all.jpg"; // 3 Money Shot variants together
const DANIEL_JACKPOT = "/images/products/daniel-jackpot.png";

const MARKER_IMG = "/images/brand/logo-primary.webp";
const SUPER_PACK_IMG = "/images/brand/disc-collection-rock.webp";

// ───────────────────────────────
// PRODUCT CATALOG — sync kesäpelit.fi (variantit + stockit 2026-05-29)
// ───────────────────────────────
type ProductCategory =
  | "midrange"
  | "fairway-driver"
  | "distance-driver"
  | "marker"
  | "bundle"
  | "signature";

// Värinimet → hex (swatch-napit). Vain todelliset kesäpelit.fi-värit.
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
const colorLabel = (c: string) => c.charAt(0).toUpperCase() + c.slice(1).replace("vihrea", "vihreä").replace("Vihrea", "Vihreä");

// Yksi ostettava variantti = väri + paino + varastosaldo (oikea WooCommerce-data)
interface Variant {
  color: string; // avain COLOR_HEX:iin
  weight: string; // esim. "169-172g"
  stock: number;
}

interface Product {
  id: string;
  name: string;
  variant?: string;
  plastic?: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  flight?: { speed: number; glide: number; turn: number; fade: number };
  weight?: string;
  color?: string;
  inStock: boolean;
  stockCount?: number;
  badge?: string;
  /** Ostettavat variantit (väri × paino × stock). Jos puuttuu → yksinkertainen tuote. */
  variants?: Variant[];
}

const products: Product[] = [
  {
    id: "daniel-jackpot",
    name: "Daniel Davidsson – Jackpot",
    variant: "Tournament Edition",
    plastic: "Premium",
    category: "signature",
    categoryLabel: "Signature",
    price: 14.9,
    originalPrice: 24.9,
    description:
      "Signature-painos tournament-tason kiekosta. Rajoitettu erä, painettu erityisellä Jackpot-grafiikalla.",
    image: DANIEL_JACKPOT,
    flight: { speed: 9, glide: 5, turn: -1, fade: 2 },
    inStock: true,
    badge: "LIMITED",
    variants: [
      { color: "oranssi", weight: "169-172g", stock: 44 },
    ],
  },
  {
    id: "premium-bank-robber",
    name: "Bank Robber",
    variant: "Premium",
    plastic: "Premium",
    category: "fairway-driver",
    categoryLabel: "Fairway Driver",
    price: 14.9,
    originalPrice: 19.9,
    description:
      "Luotettava fairway driver, joka hallitsee tuulen. Wild west -teemainen Premium-muovi.",
    image: BANK_ROBBER_PREMIUM,
    flight: { speed: 8, glide: 5, turn: -1, fade: 2 },
    inStock: true,
    variants: [
      { color: "vaaleanpunainen", weight: "169-172g", stock: 24 },
      { color: "oranssi", weight: "169-172g", stock: 6 },
      { color: "keltainen", weight: "169-172g", stock: 2 },
      { color: "pinkki", weight: "169-172g", stock: 14 },
      { color: "punainen", weight: "173-176g", stock: 1 },
    ],
  },
  {
    id: "ultrium-treasure-hunt",
    name: "Treasure Hunt",
    variant: "Ultrium",
    plastic: "Ultrium",
    category: "distance-driver",
    categoryLabel: "Distance Driver",
    price: 14.9,
    originalPrice: 19.9,
    description:
      "Maksimaalinen pituus ja hallittavuus huippumuovissa. Aarteenmetsästäjän työkalu.",
    image: TREASURE_HUNT_ULTRIUM,
    flight: { speed: 12, glide: 6, turn: -1, fade: 3 },
    inStock: true,
    variants: [
      { color: "vaaleansininen", weight: "169-172g", stock: 3 },
      { color: "vaaleansininen", weight: "173-176g", stock: 10 },
      { color: "violetti", weight: "169-172g", stock: 4 },
      { color: "sininen", weight: "173-176g", stock: 1 },
    ],
  },
  {
    id: "premium-treasure-hunt",
    name: "Treasure Hunt",
    variant: "Premium",
    plastic: "Premium",
    category: "distance-driver",
    categoryLabel: "Distance Driver",
    price: 14.9,
    originalPrice: 19.9,
    description:
      "Distance driver Premium-muovissa. Loistava pelikiekko jokaiselle pelaajalle.",
    image: TREASURE_HUNT_PREMIUM,
    flight: { speed: 12, glide: 6, turn: -1, fade: 3 },
    inStock: true,
    variants: [
      { color: "oranssi", weight: "169-172g", stock: 13 },
      { color: "oranssi", weight: "173-176g", stock: 57 },
      { color: "vihrea", weight: "173-176g", stock: 20 },
    ],
  },
  {
    id: "basic-money-shot",
    name: "Money Shot",
    variant: "Basic",
    plastic: "Basic",
    category: "midrange",
    categoryLabel: "Midrange",
    price: 12.9,
    description:
      "Äärimmäisen luotettava lähestymiskiekko. Kestää tuulen, paineen ja kovatkin vedot. Aloittelijan paras kaveri.",
    image: MONEY_SHOT_GROUP,
    flight: { speed: 5, glide: 5, turn: -1, fade: 1 },
    inStock: true,
    variants: [
      { color: "oranssi", weight: "173-176g", stock: 20 },
      { color: "keltainen", weight: "169-172g", stock: 1 },
      { color: "keltainen", weight: "173-176g", stock: 18 },
      { color: "sininen", weight: "173-176g", stock: 24 },
      { color: "valkoinen", weight: "169-172g", stock: 12 },
      { color: "valkoinen", weight: "173-176g", stock: 1 },
    ],
  },
  {
    id: "premium-money-shot",
    name: "Money Shot",
    variant: "Premium",
    plastic: "Premium",
    category: "midrange",
    categoryLabel: "Midrange",
    price: 14.9,
    originalPrice: 19.9,
    description:
      "Money Shot Premium-muovissa. Paras tuntuma ja kesto, sopii kaikille pelaajille.",
    image: MONEY_SHOT_GROUP,
    flight: { speed: 5, glide: 5, turn: -1, fade: 1 },
    inStock: true,
    variants: [
      { color: "keltainen", weight: "169-172g", stock: 42 },
      { color: "keltainen", weight: "173-176g", stock: 19 },
      { color: "pinkki", weight: "169-172g", stock: 7 },
      { color: "pinkki", weight: "173-176g", stock: 16 },
      { color: "vaaleanpunainen", weight: "169-172g", stock: 14 },
    ],
  },
  {
    id: "ultrium-money-shot",
    name: "Money Shot",
    variant: "Ultrium",
    plastic: "Ultrium",
    category: "midrange",
    categoryLabel: "Midrange",
    price: 14.9,
    originalPrice: 17.9,
    description:
      "Money Shot huippumuovissa. Ultrium tarjoaa erinomaisen gripin ja pitkän käyttöiän.",
    image: MONEY_SHOT_ULTRIUM,
    flight: { speed: 5, glide: 5, turn: -1, fade: 1 },
    inStock: true,
    variants: [
      { color: "vaaleansininen", weight: "169-172g", stock: 85 },
      { color: "vaaleansininen", weight: "173-176g", stock: 36 },
      { color: "keltainen", weight: "173-176g", stock: 46 },
      { color: "oranssi", weight: "173-176g", stock: 72 },
      { color: "punainen", weight: "173-176g", stock: 9 },
      { color: "pinkki", weight: "169-172g", stock: 5 },
      { color: "pinkki", weight: "173-176g", stock: 5 },
    ],
  },
  {
    id: "lucky-discs-marker",
    name: "Lucky Discs Markkeri",
    category: "marker",
    categoryLabel: "Marker",
    price: 6.9,
    description: "Virallinen Lucky Discs -markkeri pelikiekkojen merkkaamiseen.",
    image: MARKER_IMG,
    weight: "Yksi koko",
    color: "Vakio",
    inStock: true,
    stockCount: 50,
  },
  {
    id: "super-starter-pack",
    name: "Super Starter Pack",
    variant: "6 kiekkoa",
    category: "bundle",
    categoryLabel: "Bundle",
    price: 59.0,
    originalPrice: 87.45,
    description:
      "Säästä 28 €! Kuusi kiekkoa täydellisenä aloituspakkauksena: driver, midrange, putteri — kaikki, mitä radalle tarvitset.",
    image: SUPER_PACK_IMG,
    inStock: true,
    stockCount: 4,
    badge: "SÄÄSTÄ -32%",
  },
];

const FILTERS: { key: ProductCategory | "all"; label: string }[] = [
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
  const {
    addItem,
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    isOpen,
  } = useCart();
  const [activeFilter, setActiveFilter] = useState<ProductCategory | "all">("all");
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleAddToCart = (product: Product, sel?: { color: string; weight: string }) => {
    addItem({
      id: product.id,
      name: product.variant ? `${product.name} ${product.variant}` : product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      plastic: product.plastic,
      weight: sel?.weight ?? product.weight,
      color: sel ? colorLabel(sel.color) : product.color,
      image: product.image,
      flightNumbers: product.flight,
    });
    const variantTxt = sel ? ` — ${colorLabel(sel.color)} ${sel.weight}` : "";
    showToast(
      `Lisätty: ${product.name}${product.variant ? ` ${product.variant}` : ""}${variantTxt}`,
    );
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shippingThreshold = 50;
  const remainsToFreeShipping = Math.max(0, shippingThreshold - totalPrice);
  const orderTotal = totalPrice + (remainsToFreeShipping > 0 ? 5.9 : 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* TOP TRUST BAR */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-emerald-800/30 to-emerald-900/40 border-b border-emerald-800/30">
        <div className="container mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:text-sm text-emerald-100">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> Toimitus 5,90 € · ilmainen yli 50 €
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Suomalainen verkkokauppa
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> 14 pv palautusoikeus
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-black pointer-events-none" />
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-14 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Varastontyhjennys käynnissä
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Lucky Discs <span className="text-emerald-400">Shop</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-6">
            Premium-frisbeegolfkiekkoja suoraan valmistajalta. Suunniteltu ja
            testattu Suomessa.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
            <span>{products.filter((p) => p.inStock).length} tuotetta varastossa</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>1–3 päivän toimitus</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>Paytrail-maksu</span>
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-8 sticky top-16 z-30 bg-[#0a0a0a]/95 backdrop-blur py-3 -mx-4 px-4 border-b border-white/5">
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
                    onClick={() => setActiveFilter(f.key as ProductCategory | "all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      active
                        ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {f.label}{" "}
                    <span className="opacity-60 ml-1">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                Ei tuotteita tässä kategoriassa.
              </div>
            )}
          </div>

          {/* CART SIDEBAR (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  Ostoskori
                </h3>
                {totalItems > 0 && (
                  <span className="text-xs text-gray-400">
                    {totalItems} tuote{totalItems > 1 ? "tta" : ""}
                  </span>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  Ostoskorisi on tyhjä.
                  <br />
                  Tutustu kiekkoihin →
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    {remainsToFreeShipping > 0 ? (
                      <div className="text-xs text-gray-400 mb-2">
                        Lisää{" "}
                        <span className="text-emerald-400 font-bold">
                          {remainsToFreeShipping.toFixed(2)} €
                        </span>{" "}
                        ja saat ilmaisen toimituksen
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-400 mb-2 font-medium flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Ilmainen toimitus aktivoitu
                      </div>
                    )}
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (totalPrice / shippingThreshold) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 max-h-80 overflow-y-auto -mr-2 pr-2 mb-5">
                    {items.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover bg-white/5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {item.name}
                          </div>
                          {item.plastic && (
                            <div className="text-xs text-gray-500">
                              {item.plastic}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1,
                                  item.weight,
                                  item.color,
                                )
                              }
                              className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center"
                              aria-label="Vähennä"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  item.weight,
                                  item.color,
                                )
                              }
                              className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center"
                              aria-label="Lisää"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() =>
                                removeItem(item.id, item.weight, item.color)
                              }
                              className="ml-auto text-gray-500 hover:text-red-400 transition-colors"
                              aria-label="Poista"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-emerald-400 whitespace-nowrap">
                          {(item.price * item.quantity).toFixed(2)} €
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Välisumma</span>
                      <span>{totalPrice.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Toimitus</span>
                      <span>
                        {remainsToFreeShipping > 0 ? "5,90 €" : "Ilmainen"}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span>Yhteensä</span>
                      <span className="text-emerald-400">
                        {orderTotal.toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate("/shop/kassa")}
                    className="w-full mt-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 text-base"
                  >
                    Kassalle →
                  </Button>
                  <p className="text-[10px] text-center text-gray-500 mt-3">
                    Maksu Paytrailin kautta · Kortit, pankit, MobilePay
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE FLOATING CART BUTTON */}
      {totalItems > 0 && (
        <button
          onClick={() => navigate("/shop/kassa")}
          className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3.5 rounded-full shadow-2xl shadow-emerald-500/40 flex items-center gap-3"
        >
          <ShoppingBag className="w-5 h-5" />
          Kassalle ({totalItems})
          <span className="font-mono">{orderTotal.toFixed(2)} €</span>
        </button>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-20 right-5 z-50 bg-emerald-500 text-black px-4 py-3 rounded-lg shadow-2xl shadow-emerald-500/30 flex items-center gap-2 font-medium">
          <Check className="w-5 h-5" />
          {toast}
        </div>
      )}

      <Footer />
    </div>
  );
};

const ProductCard = ({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product, sel?: { color: string; weight: string }) => void;
}) => {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const hasVariants = !!product.variants?.length;

  // Uniikit värit ja painot varianteista
  const colors = useMemo(
    () => (hasVariants ? Array.from(new Set(product.variants!.map((v) => v.color))) : []),
    [product.variants, hasVariants],
  );

  const [selColor, setSelColor] = useState<string | null>(
    colors.length === 1 ? colors[0] : null,
  );
  const [selWeight, setSelWeight] = useState<string | null>(null);

  // Painot jotka ovat saatavilla valitulle värille
  const weightsForColor = useMemo(() => {
    if (!hasVariants || !selColor) return [];
    return product
      .variants!.filter((v) => v.color === selColor && v.stock > 0)
      .map((v) => v.weight);
  }, [product.variants, hasVariants, selColor]);

  // Auto-valitse paino jos vain yksi
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

  // Onko väri kokonaan loppu (kaikki painot stock 0)?
  const colorInStock = (c: string) =>
    product.variants!.some((v) => v.color === c && v.stock > 0);

  const totalStock = hasVariants
    ? product.variants!.reduce((s, v) => s + v.stock, 0)
    : (product.stockCount ?? 0);

  const canAdd = hasVariants ? !!selectedVariant : product.inStock;

  const handleClick = () => {
    if (hasVariants) {
      if (selColor && effectiveWeight) {
        onAdd(product, { color: selColor, weight: effectiveWeight });
        // nollaa paino jotta seuraava valinta on tietoinen
        setSelWeight(null);
      }
    } else {
      onAdd(product);
    }
  };

  return (
    <article className="group relative bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:border-emerald-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col">
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold tracking-wider text-[10px]">
            {product.badge}
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="bg-red-500 text-white hover:bg-red-400 font-bold tracking-wider text-[10px]">
            -{discount}%
          </Badge>
        )}
      </div>
      <div className="absolute top-3 right-3 z-10">
        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-black/40 backdrop-blur px-2 py-1 rounded">
          {product.categoryLabel}
        </span>
      </div>

      <div className="relative aspect-square bg-gradient-to-br from-emerald-950/40 to-black overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
        />
        {totalStock > 0 && totalStock <= 10 && (
          <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider font-bold text-orange-300 bg-orange-950/60 backdrop-blur px-2 py-1 rounded border border-orange-500/30">
            Vain {totalStock} jäljellä
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
          {product.variant && (
            <p className="text-sm text-gray-400 mt-0.5">{product.variant}</p>
          )}
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

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

        {/* VARIANTTI-VALITSIN — väri-swatchit + paino-chipit (oikea WooCommerce-data) */}
        {hasVariants && (
          <div className="mb-4 space-y-3">
            {/* Värit */}
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
                      title={`${colorLabel(c)}${inStock ? "" : " (loppu)"}`}
                      aria-label={colorLabel(c)}
                      className={`relative w-7 h-7 rounded-full border-2 transition-all ${
                        active
                          ? "border-emerald-400 scale-110 ring-2 ring-emerald-400/30"
                          : "border-white/20 hover:border-white/50"
                      } ${!inStock ? "opacity-30 cursor-not-allowed" : ""}`}
                      style={{ backgroundColor: COLOR_HEX[c] ?? "#888" }}
                    >
                      {!inStock && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                          ✕
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Painot — näkyy kun väri valittu */}
            {selColor && weightsForColor.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">
                  Paino
                </div>
                <div className="flex flex-wrap gap-2">
                  {weightsForColor.map((w) => {
                    const active = effectiveWeight === w;
                    return (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setSelWeight(w)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          active
                            ? "bg-emerald-500 text-black border-emerald-500"
                            : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock valitulle variantille */}
            {selectedVariant && (
              <div className="text-[11px] text-gray-400">
                {selectedVariant.stock <= 5 ? (
                  <span className="text-orange-300 font-medium">
                    Vain {selectedVariant.stock} kpl jäljellä
                  </span>
                ) : (
                  <span className="text-emerald-400">Varastossa ({selectedVariant.stock} kpl)</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Yksinkertaisten tuotteiden paino/väri-info */}
        {!hasVariants && (product.weight || product.color) && (
          <div className="text-[11px] text-gray-500 mb-4">
            {product.weight}
            {product.weight && product.color && " · "}
            {product.color}
          </div>
        )}

        <div className="flex items-end justify-between gap-3 mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400">
                {product.price.toFixed(2).replace(".", ",")} €
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice.toFixed(2).replace(".", ",")} €
                </span>
              )}
            </div>
          </div>
          <Button
            onClick={handleClick}
            disabled={!canAdd}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full px-5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 mr-1" />
            {hasVariants && !selColor
              ? "Valitse väri"
              : hasVariants && !effectiveWeight
                ? "Valitse paino"
                : "Koriin"}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Shop;
