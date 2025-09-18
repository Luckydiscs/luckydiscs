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
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Lucky Discs logo"
                className="h-24 w-auto"
              />
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Premium disc golf equipment with wild style and exceptional performance. Lucky Discs - bringing luck to your game.
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
            <h3 className="text-xl font-heading mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/discs" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  Discs
                </Link>
              </li>
              <li>
                <Link to="/disc-guide" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  Disc Guide
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-lucky-green transition-colors text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">Email:</strong><br />
                asiakaspalvelu@luckydiscs.fi
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading mb-4 text-white">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get special offers, free giveaways, and product launches.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 border-gray-700 focus:border-lucky-green text-white placeholder:text-gray-500"
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
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-lucky-green transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
