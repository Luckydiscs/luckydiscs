import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/contexts/CartContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import { TranslationProvider } from "@/hooks/useTranslation";

import Index from "./pages/Index";

// Lazy load pages for better performance (code splitting)
const Discs = lazy(() => import("./pages/Discs"));
const DiscGuide = lazy(() => import("./pages/DiscGuide"));
const Wholesale = lazy(() => import("./pages/Wholesale"));
const Brand = lazy(() => import("./pages/Brand"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Hero3DDemo = lazy(() => import("./pages/Hero3DDemo"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <TranslationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/discs" element={<Discs />} />
                <Route path="/disc-guide" element={<DiscGuide />} />
                <Route path="/wholesale" element={<Wholesale />} />
                <Route path="/brand" element={<Brand />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                {/* Shop disabled - not public yet */}
                <Route path="/shop" element={<Navigate to="/" replace />} />
                <Route path="/shop/kassa" element={<Navigate to="/" replace />} />
                <Route path="/shop/vahvistus" element={<Navigate to="/" replace />} />
                <Route path="/shop/:slug" element={<Navigate to="/" replace />} />
                <Route path="/3d-demo" element={<Hero3DDemo />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CookieBanner />
          </BrowserRouter>
        </TranslationProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
