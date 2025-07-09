import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Reminders from './components/Remainders';
import Health from './components/Health';
import Entertainment from './components/Entertainment';
import Companionship from './components/Companionship';
import TechAssist from './components/TechAssist';
import Spiritual from './components/Spiritual';
import CaregiverDashboard from './components/CaregiverDashboard';
import Login from './components/login';
import Register from './components/registration';
import VoiceInterface from './components/VoiceInterface';
import logo from './assets/couple.png';
import { CommonComponentProps } from './types';

const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [splashVisible, setSplashVisible] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');

  // Authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Voice command handler
  const handleVoiceCommand = (command: string) => {
    setVoiceCommand(command);
    const normalizedCommand = command.toLowerCase().trim();
    
    const commandMap: Record<string, string> = {
      'dashboard|home': 'dashboard',
      'remind|reminder': 'reminders',
      'health|medical': 'health',
      'entertain|fun': 'entertainment',
      'companion|friend': 'companionship',
      'tech|help': 'tech-assist',
      'spiritual|prayer': 'spiritual',
      'caregiver|helper': 'caregiver'
    };

    for (const [keywords, section] of Object.entries(commandMap)) {
      if (new RegExp(keywords).test(normalizedCommand)) {
        setActiveSection(section);
        break;
      }
    }
  };

  // Render the active section
  const renderActiveSection = () => {
    const commonProps: CommonComponentProps = {
      voiceCommand,
      onSectionChange: setActiveSection
    };

    const sectionComponents: Record<string, React.FC<CommonComponentProps>> = {
      'dashboard': Dashboard,
      'reminders': Reminders,
      'health': Health,
      'entertainment': Entertainment,
      'companionship': Companionship,
      'tech-assist': TechAssist,
      'spiritual': Spiritual,
      'caregiver': CaregiverDashboard
    };

    const SectionComponent = sectionComponents[activeSection] || Dashboard;
    return <SectionComponent {...commonProps} />;
  };

  // Splash screen render
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

  // Auth screens render
  if (!user) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-orange-50">
        {showRegister ? (
          <Register onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login onSwitchToRegister={() => setShowRegister(true)} />
        )}
      </div>
    );
  }

  // Main app render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
        user={user}
      />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {renderActiveSection()}
      </main>
      <VoiceInterface onVoiceCommand={handleVoiceCommand} />
    </div>
  );
};

export default App;