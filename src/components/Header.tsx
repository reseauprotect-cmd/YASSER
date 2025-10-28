import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="https://www.allali.ma/" className="flex items-center">
              <img
                src="/image.png"
                alt="ALLALI"
                className="h-12 w-auto"
              />
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="https://www.allali.ma/"
              className="text-gray-800 hover:text-allali-red transition-colors duration-300 font-medium text-sm"
            >
              Accueil
            </a>
            <a
              href="https://www.allali.ma/projets"
              className="text-gray-800 hover:text-allali-red transition-colors duration-300 font-medium text-sm"
            >
              Projets
            </a>
            <a
              href="https://www.allali.ma/actualites"
              className="text-gray-800 hover:text-allali-red transition-colors duration-300 font-medium text-sm"
            >
              Actualités
            </a>
            <a
              href="https://www.allali.ma/contact"
              className="text-gray-800 hover:text-allali-red transition-colors duration-300 font-medium text-sm"
            >
              Contact
            </a>
          </nav>


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
              className="text-gray-800 hover:text-allali-red transition-colors duration-300 font-medium py-2"
            >
              Accueil
            </a>
            <a
              href="https://www.allali.ma/projets"
              className="text-gray-800 hover:text-allali-red transition-colors duration-300 font-medium py-2"
            >
              Projets
            </a>
            <a
              href="https://www.allali.ma/actualites"
              className="text-gray-800 hover:text-allali-red transition-colors duration-300 font-medium py-2"
            >
              Actualités
            </a>
            <a
              href="https://www.allali.ma/contact"
              className="text-gray-800 hover:text-allali-red transition-colors duration-300 font-medium py-2"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
