import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface UserInfoPageProps {
  onContinue: (data: {
    fullName: string;
    phone: string;
    email: string;
    project: string;
  }) => void;
  initialData: {
    fullName: string;
    phone: string;
    email: string;
    project: string;
  };
}

const projects = [
  'Life City Zenata',
  'Natura Living',
  'Rosa Parc',
  'MOcean',
  'Joyau du Parc'
];

export default function UserInfoPage({ onContinue, initialData }: UserInfoPageProps) {
  const [formData, setFormData] = useState(initialData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Nom complet requis';
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    if (!formData.project) newErrors.project = 'Projet requis';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onContinue(formData);
  };

  const handleProjectSelect = (project: string) => {
    setFormData({ ...formData, project });
    setIsDropdownOpen(false);
    setErrors({ ...errors, project: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 min-h-[calc(100vh-280px)] flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
                Simulateur de Crédit
              </h1>
              <p className="text-gray-300 text-lg">
                Calculez votre crédit immobilier en quelques clics
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2 font-serif">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      setErrors({ ...errors, fullName: '' });
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300"
                    placeholder="Entrez votre nom"
                  />
                  {errors.fullName && (
                    <p className="text-allali-red text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2 font-serif">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      setErrors({ ...errors, phone: '' });
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300"
                    placeholder="+212 XXX-XXXXXX"
                  />
                  {errors.phone && (
                    <p className="text-allali-red text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white text-sm font-semibold mb-2 font-serif">
                  Adresse Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrors({ ...errors, email: '' });
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300"
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="text-allali-red text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-8">
                <label className="block text-white text-sm font-semibold mb-2 font-serif">
                  Type de Projet
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300 flex items-center justify-between text-left"
                  >
                    <span className={formData.project ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.project || 'Sélectionnez un projet'}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-dropdown">
                      {projects.map((project) => (
                        <button
                          key={project}
                          type="button"
                          onClick={() => handleProjectSelect(project)}
                          className="w-full px-4 py-3 text-left hover:bg-allali-red hover:text-white transition-all duration-200 text-gray-800"
                        >
                          {project}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.project && (
                  <p className="text-allali-red text-xs mt-1">{errors.project}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-allali-red text-white font-bold py-4 px-8 rounded-lg hover:bg-allali-red-dark transform hover:scale-105 transition-all duration-300 shadow-lg font-serif text-lg"
              >
                Continuer
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
