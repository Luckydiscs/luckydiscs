
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/lucky-discs-transparent-logo.png";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const { t, language } = useTranslation();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-2 transition-colors duration-300 ${
        isScrolled
          ? "bg-black/95 text-white shadow-md"
          : "bg-black/80 md:bg-transparent text-white"
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group shrink-0">
          <img
            src={logo}
            alt="Lucky Discs - Premium Disc Golf Equipment"
            className="h-12 md:h-14 lg:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            width={128}
            height={128}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/" className="hover:text-primary transition-all duration-300 font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {t('nav.home')}
          </Link>
          <Link to="/discs" className="hover:text-primary transition-all duration-300 font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {t('nav.discs')}
          </Link>
          {language === "fi" && (
            <Link to="/shop" className="hover:text-primary transition-all duration-300 font-bold text-[#FFD700] relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#FFD700] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Shop
            </Link>
          )}
          <Link to="/wholesale" className="hover:text-primary transition-all duration-300 font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {t('nav.wholesale')}
          </Link>
          <Link to="/brand" className="hover:text-primary transition-all duration-300 font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {t('nav.brand')}
          </Link>
          <Link to="/team" className="hover:text-primary transition-all duration-300 font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {t('nav.team')}
          </Link>
          <Link to="/contact" className="hover:text-primary transition-all duration-300 font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {t('nav.contact')}
          </Link>
          <Link to={language === "fi" ? "/blogi" : "/blog"} className="hover:text-primary transition-all duration-300 font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {t('nav.blog')}
          </Link>
          <Link to="/faq" className="hover:text-primary transition-all duration-300 font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            FAQ
          </Link>
          <LanguageSwitcher />
          {language === "fi" && (
            <Link to="/shop/kassa" className="relative hover:text-[#FFD700] transition-colors" aria-label="Ostoskori">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFD700] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 absolute top-full left-0 w-full">
          <div className="container px-4 py-6 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/discs"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              {t('nav.discs')}
            </Link>
            {language === "fi" && (
              <Link
                to="/shop"
                className="text-lg py-2 border-b border-gray-800 text-[#FFD700] font-bold"
                onClick={toggleMenu}
              >
                Shop
              </Link>
            )}
            <Link
              to="/wholesale"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              {t('nav.wholesale')}
            </Link>
            <Link
              to="/brand"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              {t('nav.brand')}
            </Link>
            <Link
              to="/team"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              {t('nav.team')}
            </Link>
            <Link
              to="/contact"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              {t('nav.contact')}
            </Link>
            <Link
              to={language === "fi" ? "/blogi" : "/blog"}
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/faq"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
            <div className="flex justify-between items-center mt-4">
              <LanguageSwitcher />
              {language === "fi" && (
                <Link
                  to="/shop/kassa"
                  onClick={toggleMenu}
                  className="relative text-white hover:text-[#FFD700]"
                  aria-label="Ostoskori"
                >
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
