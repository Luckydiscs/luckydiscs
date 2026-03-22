import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, email, total } = location.state || {};

  if (!orderNumber) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-400 mb-4">Ei tilaustietoja.</p>
          <Button onClick={() => navigate("/shop")} className="bg-[#FFD700] text-black hover:bg-[#FFC000]">
            Siirry kauppaan
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
          <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-400" />
          <h1 className="text-3xl font-bold mb-2">Kiitos tilauksestasi!</h1>
          <p className="text-gray-400 mb-8">Tilausvahvistus on lähetetty osoitteeseen {email}</p>

          <div className="bg-black/50 rounded-lg p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Tilausnumero</span>
              <span className="font-mono font-bold text-[#FFD700]">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Summa</span>
              <span className="font-bold">{total?.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Toimitus</span>
              <span>Posti — 3–5 arkipäivää</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-sm text-gray-400 mb-8">
            <Package className="w-5 h-5" />
            <span>Saat seurantatunnuksen sähköpostitse kun tilaus on lähetetty.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/shop")} className="bg-[#FFD700] text-black hover:bg-[#FFC000] font-bold">
              Jatka ostoksia <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
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
