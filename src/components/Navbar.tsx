import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/lucky-discs-transparent-logo.png";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Aktiivinen sivu korostuu vihreällä + alleviivauksella
const navClass = ({ isActive }: { isActive: boolean }) =>
  `font-semibold transition-colors duration-200 whitespace-nowrap relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-lucky-green after:transition-all after:duration-300 ${
    isActive
      ? "text-lucky-green after:w-full"
      : "text-white hover:text-lucky-green after:w-0 hover:after:w-full"
  }`;

const shopClass = ({ isActive }: { isActive: boolean }) =>
  `font-bold transition-colors duration-200 whitespace-nowrap relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#FFD700] after:transition-all after:duration-300 ${
    isActive
      ? "text-[#FFE55C] after:w-full"
      : "text-[#FFD700] hover:text-[#FFE55C] after:w-0 hover:after:w-full"
  }`;

const mobileClass = ({ isActive }: { isActive: boolean }) =>
  `text-lg py-2 border-b border-gray-800 transition-colors ${
    isActive ? "text-lucky-green" : "text-white hover:text-lucky-green"
  }`;

const Navbar = () => {
  const { t, language } = useTranslation();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((o) => !o);
  const blogPath = language === "fi" ? "/blogi" : "/blog";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-2 transition-colors duration-300 ${
        isScrolled ? "bg-black/95 text-white shadow-md" : "bg-black/80 md:bg-transparent text-white"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center">
        {/* LEFT: logo */}
        <div className="flex-1 flex items-center">
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={logo}
              alt="Lucky Discs - Premium Disc Golf Equipment"
              className="h-16 md:h-20 lg:h-24 w-auto transition-transform duration-300 group-hover:scale-105"
              width={160}
              height={160}
            />
          </Link>
        </div>

        {/* CENTER: nav links */}
        <div className="hidden md:flex items-center justify-center gap-5 lg:gap-7">
          <NavLink to="/" end className={navClass}>{t("nav.home")}</NavLink>
          <NavLink to="/discs" className={navClass}>{t("nav.discs")}</NavLink>
          {language === "fi" && (
            <NavLink to="/shop" className={shopClass}>Shop</NavLink>
          )}
          <NavLink to="/wholesale" className={navClass}>{t("nav.wholesale")}</NavLink>
          <NavLink to="/brand" className={navClass}>{t("nav.brand")}</NavLink>
          <NavLink to="/team" className={navClass}>{t("nav.team")}</NavLink>
          <NavLink to="/contact" className={navClass}>{t("nav.contact")}</NavLink>
          <NavLink to={blogPath} className={navClass}>{t("nav.blog")}</NavLink>
          <NavLink to="/faq" className={navClass}>FAQ</NavLink>
        </div>

        {/* RIGHT: language + cart */}
        <div className="flex-1 hidden md:flex items-center justify-end gap-4">
          <LanguageSwitcher />
          {language === "fi" && (
            <Link
              to="/shop/kassa"
              className="relative hover:text-[#FFD700] transition-colors"
              aria-label="Ostoskori"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFD700] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden ml-auto text-2xl" onClick={toggleMenu} aria-label="Valikko">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 absolute top-full left-0 w-full">
          <div className="container px-4 py-6 flex flex-col space-y-4">
            <NavLink to="/" end className={mobileClass} onClick={toggleMenu}>{t("nav.home")}</NavLink>
            <NavLink to="/discs" className={mobileClass} onClick={toggleMenu}>{t("nav.discs")}</NavLink>
            {language === "fi" && (
              <NavLink to="/shop" className={({ isActive }) => `text-lg py-2 border-b border-gray-800 font-bold ${isActive ? "text-[#FFE55C]" : "text-[#FFD700]"}`} onClick={toggleMenu}>Shop</NavLink>
            )}
            <NavLink to="/wholesale" className={mobileClass} onClick={toggleMenu}>{t("nav.wholesale")}</NavLink>
            <NavLink to="/brand" className={mobileClass} onClick={toggleMenu}>{t("nav.brand")}</NavLink>
            <NavLink to="/team" className={mobileClass} onClick={toggleMenu}>{t("nav.team")}</NavLink>
            <NavLink to="/contact" className={mobileClass} onClick={toggleMenu}>{t("nav.contact")}</NavLink>
            <NavLink to={blogPath} className={mobileClass} onClick={toggleMenu}>{t("nav.blog")}</NavLink>
            <NavLink to="/faq" className={mobileClass} onClick={toggleMenu}>FAQ</NavLink>
            <div className="flex justify-between items-center mt-4">
              <LanguageSwitcher />
              {language === "fi" && (
                <Link to="/shop/kassa" onClick={toggleMenu} className="relative text-white hover:text-[#FFD700]" aria-label="Ostoskori">
                  <ShoppingCart size={24} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FFD700] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
