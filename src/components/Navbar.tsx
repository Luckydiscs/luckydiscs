
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
          ? "bg-black bg-opacity-90 text-white py-2 shadow-md"
          : "bg-transparent text-white py-4"
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/src/assets/lucky-discs-transparent-logo.png"
            alt="Lucky Discs logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-lucky-green transition-colors font-medium">
            Home
          </Link>
          <Link to="/discs" className="hover:text-lucky-green transition-colors font-medium">
            Discs
          </Link>
          <Link to="/wholesale" className="hover:text-lucky-green transition-colors font-medium">
            Wholesale
          </Link>
          <Link to="/brand" className="hover:text-lucky-green transition-colors font-medium">
            Brand
          </Link>
          <Link to="/team" className="hover:text-lucky-green transition-colors font-medium">
            Team
          </Link>
          <Link to="/contact" className="hover:text-lucky-green transition-colors font-medium">
            Contact
          </Link>
          <Button
            variant="outline"
            className="border-lucky-green text-lucky-green hover:bg-lucky-green hover:text-black transition-all duration-300"
          >
            Get Wholesale Access
          </Button>
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
              Home
            </Link>
            <Link
              to="/discs"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              Discs
            </Link>
            <Link
              to="/wholesale"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              Wholesale
            </Link>
            <Link
              to="/brand"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              Brand
            </Link>
            <Link
              to="/team"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              Team
            </Link>
            <Link
              to="/contact"
              className="text-lg py-2 border-b border-gray-800 hover:text-lucky-green"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Button
              variant="outline"
              className="border-lucky-green text-lucky-green hover:bg-lucky-green hover:text-black transition-all duration-300 mt-4"
              onClick={toggleMenu}
            >
              Get Wholesale Access
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
