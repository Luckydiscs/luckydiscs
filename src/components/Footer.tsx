import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/lucky-discs-transparent-logo.png";
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Lucky Discs logo"
                className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
              />
            </div>
            <p className="text-gray-400">
              Modern disc golf equipment with wild style and premium performance.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-lucky-green transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-lucky-green transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-lucky-green transition-colors"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-lucky-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/discs" className="text-gray-400 hover:text-lucky-green transition-colors">
                  Discs
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-gray-400 hover:text-lucky-green transition-colors">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/brand" className="text-gray-400 hover:text-lucky-green transition-colors">
                  Brand
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-lucky-green transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-lucky-green transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <strong className="text-white">Email:</strong> info@luckydiscs.com
              </li>
              <li className="text-gray-400">
                <strong className="text-white">Phone:</strong> +1 (555) 123-4567
              </li>
              <li className="text-gray-400">
                <strong className="text-white">Address:</strong> 123 Lucky Lane,<br />
                Disc City, CA 90210
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and product launches.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 border-gray-700 focus:border-lucky-green"
              />
              <Button size="icon" className="bg-lucky-green text-black hover:bg-opacity-80">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p className="mb-4">© {new Date().getFullYear()} Lucky Discs. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/privacy" className="hover:text-lucky-green transition-colors">
              Tietosuojaseloste
            </Link>
            <Link to="/terms" className="hover:text-lucky-green transition-colors">
              Käyttöehdot
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
