import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Reminders from './components/Remainders';
import Health from './components/Health';
import Entertainment from './components/Entertainment';
import Companionship from './components/Companionship';
import TechAssist from './components/TechAssist';
import logo from './assets/couple.png'; 

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [authLoading, setAuthLoading] = useState(true);
  const [splashVisible, setSplashVisible] = useState(true);

  // Simulate loading/authentication
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
      setSplashVisible(false);
    }, 3000); // 3 second splash screen

    return () => clearTimeout(timer);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setActiveSection} />;
      case 'reminders':
        return <Reminders />;
      case 'health':
        return <Health />;
      case 'entertainment':
        return <Entertainment />;
      case 'companionship':
        return <Companionship />;
      case 'tech-assist':
        return <TechAssist />;
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  // Show splash screen while loading
  if (authLoading || splashVisible) {
    return (
      <AnimatePresence>
        <motion.div
          key="splash"
          className="flex flex-col justify-center items-center min-h-screen bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={logo}
            alt="Sahyog Logo"
            className="w-40 h-40 rounded-full shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
          />
          <motion.div
            className="mt-6 text-lg font-semibold text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Your Voice, Our Care
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Main app content
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;