import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle, Package, ArrowRight, XCircle, Loader2 } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  // Paytrail palauttaa nämä query-parametreina
  const ptReference = searchParams.get("checkout-reference");
  const ptStatus = searchParams.get("checkout-status");
  const ptTotal = searchParams.get("checkout-amount");

  const [view, setView] = useState<"loading" | "success" | "cancel" | "fail" | "no-data">("loading");
  const [orderNumber, setOrderNumber] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [total, setTotal] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Polku 1: tultiin Paytrailistä
    if (ptReference && ptStatus) {
      if (ptStatus === "ok") {
        setView("success");
        setOrderNumber(ptReference);
        if (ptTotal) setTotal(Number(ptTotal) / 100);
        clearCart();
      } else if (ptStatus === "fail") {
        setView("fail");
      } else if (ptStatus === "cancel") {
        setView("cancel");
      } else {
        setView("no-data");
      }
      return;
    }

    // Polku 2: tultiin location.state:n kautta (esim. legacy/testi)
    const state = location.state as
      | { orderNumber?: string; email?: string; total?: number }
      | null;
    if (state?.orderNumber) {
      setView("success");
      setOrderNumber(state.orderNumber);
      setEmail(state.email);
      setTotal(state.total);
      return;
    }

    setView("no-data");
  }, [ptReference, ptStatus, ptTotal, location.state, clearCart]);

  // ── LOADING ─────────────
  if (view === "loading") {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 md:pt-40 pb-20 text-center">
          <Loader2 className="w-16 h-16 mx-auto mb-4 text-[#FFD700] animate-spin" />
          <p className="text-gray-400">Vahvistetaan maksua…</p>
        </div>
        <Footer />
      </div>
    );
  }

  // ── NO DATA ─────────────
  if (view === "no-data") {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 md:pt-40 pb-20 text-center">
          <p className="text-gray-400 mb-4">Ei tilaustietoja.</p>
          <Button onClick={() => navigate("/shop")} className="bg-[#FFD700] text-black hover:bg-[#FFC000]">
            Siirry kauppaan
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // ── FAIL ─────────────────
  if (view === "fail") {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 md:pt-40 pb-16 max-w-2xl text-center">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
            <XCircle className="w-20 h-20 mx-auto mb-6 text-red-400" />
            <h1 className="text-3xl font-bold mb-2">Maksu epäonnistui</h1>
            <p className="text-gray-400 mb-8">
              Maksua ei voitu käsitellä. Ostoskorisi on tallessa — voit yrittää uudelleen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/shop/kassa")} className="bg-[#FFD700] text-black hover:bg-[#FFC000] font-bold">
                Yritä uudelleen
              </Button>
              <Button onClick={() => navigate("/shop")} variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full">
                Takaisin kauppaan
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── CANCEL ───────────────
  if (view === "cancel") {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 md:pt-40 pb-16 max-w-2xl text-center">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
            <XCircle className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h1 className="text-3xl font-bold mb-2">Maksu peruutettu</h1>
            <p className="text-gray-400 mb-8">
              Peruutit maksun. Ostoskorisi on tallessa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/shop/kassa")} className="bg-[#FFD700] text-black hover:bg-[#FFC000] font-bold">
                Jatka kassalla
              </Button>
              <Button onClick={() => navigate("/shop")} variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full">
                Takaisin kauppaan
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── SUCCESS ──────────────
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
          <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-400" />
          <h1 className="text-3xl font-bold mb-2">Kiitos tilauksestasi!</h1>
          <p className="text-gray-400 mb-8">
            {email
              ? `Tilausvahvistus on lähetetty osoitteeseen ${email}`
              : "Tilausvahvistus on lähetetty sähköpostiisi."}
          </p>

          <div className="bg-black/50 rounded-lg p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Tilausnumero</span>
              <span className="font-mono font-bold text-[#FFD700]">{orderNumber}</span>
            </div>
            {total !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-400">Summa</span>
                <span className="font-bold">{total.toFixed(2).replace(".", ",")} €</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Toimitus</span>
              <span>Posti tai Matkahuolto — 1–3 arkipäivää</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-sm text-gray-400 mb-8">
            <Package className="w-5 h-5" />
            <span>Saat seurantatunnuksen sähköpostitse kun tilaus on lähetetty.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/shop")} className="bg-emerald-500 text-black hover:bg-emerald-400 font-bold rounded-full">
              Jatka ostoksia <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full">
              Etusivulle
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
