import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Package, CreditCard, Check } from "lucide-react";

const SHIPPING_COST = 5.9;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <h1 className="text-2xl font-bold mb-4">Ostoskori on tyhjä</h1>
          <p className="text-gray-400 mb-8">Lisää tuotteita ostoskoriin ennen kassalle siirtymistä.</p>
          <Button onClick={() => navigate("/shop")} className="bg-[#FFD700] text-black hover:bg-[#FFC000]">
            Siirry kauppaan
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Etunimi vaaditaan";
    if (!formData.lastName.trim()) newErrors.lastName = "Sukunimi vaaditaan";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Syötä kelvollinen sähköpostiosoite";
    if (!formData.phone.trim()) newErrors.phone = "Puhelinnumero vaaditaan";
    if (!formData.address.trim()) newErrors.address = "Osoite vaaditaan";
    if (!formData.postalCode.trim() || !/^\d{5}$/.test(formData.postalCode))
      newErrors.postalCode = "Syötä kelvollinen postinumero (5 numeroa)";
    if (!formData.city.trim()) newErrors.city = "Kaupunki vaaditaan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (step === 1) {
      if (validate()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/shop/vahvistus", {
      state: {
        orderNumber: `LD-${Date.now().toString(36).toUpperCase()}`,
        email: formData.email,
        total: totalPrice + SHIPPING_COST,
      },
    });
  };

  const orderTotal = totalPrice + SHIPPING_COST;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back button */}
        <button onClick={() => (step > 1 ? setStep(step - 1) : navigate("/shop"))} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {step > 1 ? "Takaisin" : "Takaisin kauppaan"}
        </button>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1, label: "Toimitustiedot" },
            { num: 2, label: "Yhteenveto" },
            { num: 3, label: "Maksu" },
          ].map(({ num, label }) => (
            <div key={num} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= num ? "bg-[#FFD700] text-black" : "bg-gray-700 text-gray-400"}`}>
                {step > num ? <Check className="w-4 h-4" /> : num}
              </div>
              <span className={`hidden sm:inline text-sm ${step >= num ? "text-white" : "text-gray-500"}`}>{label}</span>
              {num < 3 && <div className={`w-8 h-px ${step > num ? "bg-[#FFD700]" : "bg-gray-700"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Toimitustiedot</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">Etunimi *</Label>
                    <Input id="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="bg-gray-900 border-gray-700 text-white mt-1" />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Sukunimi *</Label>
                    <Input id="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="bg-gray-900 border-gray-700 text-white mt-1" />
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Sähköposti *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-gray-900 border-gray-700 text-white mt-1" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">Puhelinnumero *</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-gray-900 border-gray-700 text-white mt-1" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="address" className="text-gray-300">Katuosoite *</Label>
                  <Input id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="bg-gray-900 border-gray-700 text-white mt-1" />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode" className="text-gray-300">Postinumero *</Label>
                    <Input id="postalCode" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} className="bg-gray-900 border-gray-700 text-white mt-1" maxLength={5} />
                    {errors.postalCode && <p className="text-red-400 text-xs mt-1">{errors.postalCode}</p>}
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-gray-300">Kaupunki *</Label>
                    <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="bg-gray-900 border-gray-700 text-white mt-1" />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Tilauksen yhteenveto</h2>
                <div className="bg-gray-900 rounded-lg p-4 space-y-2">
                  <p><span className="text-gray-400">Nimi:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="text-gray-400">Sähköposti:</span> {formData.email}</p>
                  <p><span className="text-gray-400">Puhelin:</span> {formData.phone}</p>
                  <p><span className="text-gray-400">Osoite:</span> {formData.address}, {formData.postalCode} {formData.city}</p>
                </div>
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-gray-900 rounded-lg p-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-400">{item.plastic} · {item.weight} · {item.color}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">{item.quantity} kpl</p>
                        <p className="font-bold">{(item.price * item.quantity).toFixed(2)} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Maksutapa</h2>
                <div className="bg-gray-900 rounded-lg p-8 text-center">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 text-[#FFD700]" />
                  <p className="text-lg font-medium mb-2">Maksuintegraatio tulossa pian</p>
                  <p className="text-gray-400 mb-6">Paytrail / Stripe -maksuintegraatio on kehityksessä. Voit nyt tehdä testitilauksen.</p>
                  <Button onClick={handlePlaceOrder} className="bg-[#FFD700] text-black hover:bg-[#FFC000] font-bold text-lg px-8 py-3">
                    Tee testitilaus — {orderTotal.toFixed(2)} €
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Tilaus</h3>
              <div className="space-y-2 text-sm">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-gray-400">{item.name} x{item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Välisumma</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Toimitus</span>
                  <span>{SHIPPING_COST.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700">
                  <span>Yhteensä</span>
                  <span className="text-[#FFD700]">{orderTotal.toFixed(2)} €</span>
                </div>
              </div>
              {step < 3 && (
                <Button onClick={handleSubmit} className="w-full mt-6 bg-[#FFD700] text-black hover:bg-[#FFC000] font-bold">
                  {step === 1 ? "Jatka yhteenvetoon" : "Siirry maksamaan"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
