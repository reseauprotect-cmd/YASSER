import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="https://www.allali.ma/" className="flex items-center">
              <svg
                className="h-14 w-auto"
                viewBox="0 0 200 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="10" y="15" width="35" height="50" fill="#eb5c5d" />
                <rect x="50" y="25" width="35" height="40" fill="#1a1a1a" />
                <rect x="90" y="20" width="35" height="45" fill="#eb5c5d" />
                <text
                  x="135"
                  y="50"
                  fontFamily="Inter, sans-serif"
                  fontSize="32"
                  fontWeight="700"
                  fill="#1a1a1a"
                >
                  ALLALI
                </text>
              </svg>
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="https://www.allali.ma/"
              className="text-gray-700 hover:text-allali-red transition-colors duration-300 font-medium"
            >
              Accueil
            </a>
            <a
              href="https://www.allali.ma/projets"
              className="text-gray-700 hover:text-allali-red transition-colors duration-300 font-medium"
            >
              Nos Projets
            </a>
            <a
              href="https://www.allali.ma/a-propos"
              className="text-gray-700 hover:text-allali-red transition-colors duration-300 font-medium"
            >
              À Propos
            </a>
            <a
              href="#"
              className="text-allali-red font-semibold border-b-2 border-allali-red"
            >
              Simulateur de Crédit
            </a>
            <a
              href="https://www.allali.ma/contact"
              className="text-gray-700 hover:text-allali-red transition-colors duration-300 font-medium"
            >
              Contact
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3 bg-red-50 hover:bg-allali-red hover:text-white transition-all duration-300 px-4 py-3 rounded-lg cursor-pointer group">
              <Phone className="w-5 h-5 text-allali-red group-hover:text-white" />
              <div className="text-left">
                <p className="text-xs text-gray-600 group-hover:text-white/80">Appelez-nous</p>
                <p className="font-bold text-sm text-gray-900 group-hover:text-white">
                  +212 5XX-XXXXXX
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700 p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 animate-slideDown">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="https://www.allali.ma/"
              className="text-gray-700 hover:text-allali-red transition-colors duration-300 font-medium py-2"
            >
              Accueil
            </a>
            <a
              href="https://www.allali.ma/projets"
              className="text-gray-700 hover:text-allali-red transition-colors duration-300 font-medium py-2"
            >
              Nos Projets
            </a>
            <a
              href="https://www.allali.ma/a-propos"
              className="text-gray-700 hover:text-allali-red transition-colors duration-300 font-medium py-2"
            >
              À Propos
            </a>
            <a
              href="#"
              className="text-allali-red font-semibold py-2 border-l-4 border-allali-red pl-4"
            >
              Simulateur de Crédit
            </a>
            <a
              href="https://www.allali.ma/contact"
              className="text-gray-700 hover:text-allali-red transition-colors duration-300 font-medium py-2"
            >
              Contact
            </a>
            <div className="flex items-center gap-3 bg-red-50 px-4 py-3 rounded-lg mt-2">
              <Phone className="w-5 h-5 text-allali-red" />
              <div className="text-left">
                <p className="text-xs text-gray-600">Appelez-nous</p>
                <p className="font-bold text-sm text-gray-900">+212 5XX-XXXXXX</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
