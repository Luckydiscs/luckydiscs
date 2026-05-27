import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Package, CreditCard, Check, Loader2 } from "lucide-react";

const SHIPPING_COST = 5.9;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

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

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            plastic: i.plastic,
            weight: i.weight,
            color: i.color,
            price: i.price,
            quantity: i.quantity,
          })),
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            postalCode: formData.postalCode,
            city: formData.city,
            country: "FI",
          },
          shippingCents: Math.round(SHIPPING_COST * 100),
        },
      });

      if (error) throw error;
      if (!data?.href) throw new Error("Paytrail ei palauttanut maksu-URLia");

      // Redirect Paytrailiin maksamaan
      window.location.href = data.href;
    } catch (err) {
      console.error("Payment failed:", err);
      setPaymentError(
        err instanceof Error
          ? err.message
          : "Maksun käynnistys epäonnistui. Yritä uudelleen tai ota yhteyttä asiakaspalvelu@luckydiscs.fi",
      );
      setIsProcessing(false);
    }
  };

  const orderTotal = totalPrice + SHIPPING_COST;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 md:pt-40 pb-12 max-w-4xl">
        {/* Back button */}
        <button
          type="button"
          onClick={() => (step > 1 ? setStep(step - 1) : navigate("/shop"))}
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2 -ml-4 mb-8 rounded-md text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
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
                  <p className="text-lg font-medium mb-2">Maksu Paytrailin kautta</p>
                  <p className="text-gray-400 mb-6">
                    Valitse seuraavalla sivulla pankki-, kortti- tai mobiilimaksu (MobilePay, Pivo).
                    Maksunkäsittely on PCI-yhteensopiva ja turvallinen.
                  </p>

                  {paymentError && (
                    <div className="bg-red-950/40 border border-red-800 rounded-md p-4 mb-6 text-sm text-red-300">
                      {paymentError}
                    </div>
                  )}

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="bg-[#FFD700] text-black hover:bg-[#FFC000] font-bold text-lg px-8 py-3 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Käynnistetään maksua…
                      </>
                    ) : (
                      <>Siirry maksamaan — {orderTotal.toFixed(2)} €</>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 mt-6">
                    Tilauksen tekemällä hyväksyt <a href="/terms" className="underline">käyttöehdot</a> ja{" "}
                    <a href="/privacy" className="underline">tietosuojaselosteen</a>.
                    Etämyynnin peruutusoikeus 14 päivää.
                  </p>
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
                  <div key={idx} className="flex justify-between gap-3">
                    <span className="text-gray-400 min-w-0 truncate">{item.name} x{item.quantity}</span>
                    <span className="whitespace-nowrap flex-shrink-0">{(item.price * item.quantity).toFixed(2).replace(".", ",")} €</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 mt-4 pt-4 space-y-2">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-400">Välisumma</span>
                  <span className="whitespace-nowrap">{totalPrice.toFixed(2).replace(".", ",")} €</span>
                </div>
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-400">Toimitus</span>
                  <span className="whitespace-nowrap">{SHIPPING_COST.toFixed(2).replace(".", ",")} €</span>
                </div>
                <div className="flex justify-between gap-3 font-bold text-lg pt-2 border-t border-gray-700">
                  <span>Yhteensä</span>
                  <span className="text-[#FFD700] whitespace-nowrap">{orderTotal.toFixed(2).replace(".", ",")} €</span>
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
