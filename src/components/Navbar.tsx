
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-95 text-white py-2 shadow-md"
          : "bg-black bg-opacity-80 md:bg-transparent text-white py-2 md:py-2"
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={logo}
            alt="Lucky Discs - Premium Disc Golf Equipment"
            className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto transition-all duration-300 group-hover:scale-105"
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
          {/* Shop hidden - not public yet */}
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
          {/* Cart icon hidden - shop not public yet */}
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
            {/* Shop hidden - not public yet */}
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
              {/* Cart button hidden - shop not public yet */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
