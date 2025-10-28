import { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface LoanCalculatorPageProps {
  onBack: () => void;
  userInfo: {
    fullName: string;
    phone: string;
    email: string;
    project: string;
  };
}

interface Bank {
  name: string;
  rate: number;
  tva: number;
}

const banks: Bank[] = [
  { name: 'Attijariwafa Bank', rate: 4.20, tva: 10 },
  { name: 'CIH Bank', rate: 4.25, tva: 12 },
  { name: 'Banque Populaire (BCP)', rate: 4.30, tva: 11 },
  { name: 'Bank of Africa (BOA)', rate: 4.35, tva: 10.5 }
];

export default function LoanCalculatorPage({ onBack, userInfo }: LoanCalculatorPageProps) {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [customTVA, setCustomTVA] = useState('');

  const [results, setResults] = useState({
    loanAmount: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0
  });

  useEffect(() => {
    calculateLoan();
  }, [propertyPrice, currentSavings, loanDuration, selectedBank, customTVA]);

  const calculateLoan = () => {
    const price = parseFloat(propertyPrice) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const duration = parseFloat(loanDuration) || 0;
    const tva = parseFloat(customTVA) || 0;

    if (price <= 0 || duration <= 0) {
      setResults({
        loanAmount: 0,
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0
      });
      return;
    }

    const loanAmount = Math.max(0, price - savings);

    const bank = banks.find(b => b.name === selectedBank);
    const annualRate = bank ? bank.rate : 4.25;
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = duration * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPayment = loanAmount / numberOfPayments;
    }

    const totalWithoutTVA = monthlyPayment * numberOfPayments;
    const tvaAmount = (totalWithoutTVA * tva) / 100;
    const totalPayment = totalWithoutTVA + tvaAmount;
    const monthlyWithTVA = totalPayment / numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    setResults({
      loanAmount,
      monthlyPayment: monthlyWithTVA,
      totalPayment,
      totalInterest
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Bonjour, je suis ${userInfo.fullName}. Je suis intéressé par le projet ${userInfo.project}. ` +
      `Montant du crédit: ${formatCurrency(results.loanAmount)}, ` +
      `Mensualité: ${formatCurrency(results.monthlyPayment)}.`
    );
    window.open(`https://wa.me/212660762762?text=${message}`, '_blank');
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

        <div className="relative z-10 container mx-auto px-4 py-8 min-h-[calc(100vh-280px)]">
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-white hover:text-allali-red transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Retour</span>
          </button>

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-serif">
                Calculateur de Crédit Immobilier
              </h1>
              <p className="text-gray-300">
                Bienvenue {userInfo.fullName} - Projet: {userInfo.project}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 font-serif">
                  Informations du Crédit
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2 font-serif">
                      Prix du Bien (MAD)
                    </label>
                    <input
                      type="number"
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300"
                      placeholder="1500000"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2 font-serif">
                      Salaire Mensuel (MAD)
                    </label>
                    <input
                      type="number"
                      value={monthlySalary}
                      onChange={(e) => setMonthlySalary(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300"
                      placeholder="15000"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2 font-serif">
                      Épargne Actuelle (MAD)
                    </label>
                    <input
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300"
                      placeholder="300000"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2 font-serif">
                      Durée du Crédit (Années)
                    </label>
                    <input
                      type="number"
                      value={loanDuration}
                      onChange={(e) => setLoanDuration(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300"
                      placeholder="20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2 font-serif">
                        Banque
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => {
                          const bankName = e.target.value;
                          setSelectedBank(bankName);
                          const bank = banks.find(b => b.name === bankName);
                          if (bank) {
                            setCustomTVA(bank.tva.toString());
                          }
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300"
                      >
                        <option value="">Sélectionner</option>
                        {banks.map((bank) => (
                          <option key={bank.name} value={bank.name}>
                            {bank.name} ({bank.rate}%)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-semibold mb-2 font-serif">
                        TVA (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={customTVA}
                        onChange={(e) => setCustomTVA(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 focus:border-allali-red focus:ring-2 focus:ring-allali-red/20 outline-none transition-all duration-300"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 font-serif">
                  Résultats de Simulation
                </h2>

                <div className="space-y-6">
                  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                    <p className="text-gray-300 text-sm mb-1 font-serif">Montant du Crédit</p>
                    <p className="text-3xl font-bold text-allali-red font-serif">
                      {formatCurrency(results.loanAmount)}
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                    <p className="text-gray-300 text-sm mb-1 font-serif">Mensualité</p>
                    <p className="text-3xl font-bold text-white font-serif">
                      {formatCurrency(results.monthlyPayment)}
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                    <p className="text-gray-300 text-sm mb-1 font-serif">Coût Total du Crédit</p>
                    <p className="text-2xl font-bold text-white font-serif">
                      {formatCurrency(results.totalPayment)}
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                    <p className="text-gray-300 text-sm mb-1 font-serif">Intérêts Totaux</p>
                    <p className="text-2xl font-bold text-orange-400 font-serif">
                      {formatCurrency(results.totalInterest)}
                    </p>
                  </div>

                  <button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 font-serif"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contacter via WhatsApp
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-gray-300 text-sm text-center">
                Les résultats sont donnés à titre indicatif et peuvent varier selon les conditions de la banque.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
