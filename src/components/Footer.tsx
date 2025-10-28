import { Building2, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-allali-red" />
              <span className="text-xl font-bold text-white font-serif">ALLALI</span>
            </div>
            <p className="text-sm leading-relaxed">
              Promoteur immobilier de confiance au Maroc, offrant des solutions de logement de qualité supérieure.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 font-serif">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-allali-red" />
                <span className="text-sm">+212 XXX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-allali-red" />
                <span className="text-sm">contact@allali.ma</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-allali-red" />
                <span className="text-sm">Casablanca, Maroc</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 font-serif">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-allali-red transition-colors duration-300">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-allali-red transition-colors duration-300">
                  Nos projets
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-allali-red transition-colors duration-300">
                  Services
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 ALLALI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
