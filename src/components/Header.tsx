import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-t-4 border-red-600 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img
            src="/image copy.png"
            alt="Allali"
            className="h-10 w-auto"
          />
        </div>

        <nav className="hidden md:flex space-x-10 text-lg font-medium text-gray-800">
          <a href="#" className="hover:text-red-600 transition">Accueil</a>
          <a href="#" className="hover:text-red-600 transition">Projets</a>
          <a href="#" className="hover:text-red-600 transition">Actualités</a>
          <a href="#" className="hover:text-red-600 transition">Contact</a>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-700 p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-6 py-4 flex flex-col space-y-3">
            <a href="#" className="text-lg font-medium text-gray-800 hover:text-red-600 transition py-2">
              Accueil
            </a>
            <a href="#" className="text-lg font-medium text-gray-800 hover:text-red-600 transition py-2">
              Projets
            </a>
            <a href="#" className="text-lg font-medium text-gray-800 hover:text-red-600 transition py-2">
              Actualités
            </a>
            <a href="#" className="text-lg font-medium text-gray-800 hover:text-red-600 transition py-2">
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
