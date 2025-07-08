import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Reminders from './components/Remainders';
import Health from './components/Health';
import Entertainment from './components/Entertainment';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

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
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

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