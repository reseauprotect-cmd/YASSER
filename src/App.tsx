import { useState } from 'react';
import UserInfoPage from './components/UserInfoPage';
import LoanCalculatorPage from './components/LoanCalculatorPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'info' | 'calculator'>('info');
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    project: ''
  });

  const handleContinue = (data: typeof userInfo) => {
    setUserInfo(data);
    setCurrentPage('calculator');
  };

  const handleBack = () => {
    setCurrentPage('info');
  };

  return (
    <>
      {currentPage === 'info' ? (
        <UserInfoPage onContinue={handleContinue} initialData={userInfo} />
      ) : (
        <LoanCalculatorPage onBack={handleBack} userInfo={userInfo} />
      )}
    </>
  );
}

export default App;
