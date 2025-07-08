import React from 'react';
import { Heart, Home, Bell, Activity, Music, MessageCircle, Phone, Shield, Users } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { 
      id: 'reminders', 
      label: 'Reminders', 
      icon: Bell,
      highlight: true,
      color: 'orange'
    },
    { 
      id: 'health', 
      label: 'Health', 
      icon: Activity,
      highlight: true,
      color: 'green'
    },
    { 
      id: 'entertainment', 
      label: 'Entertainment', 
      icon: Music,
      highlight: true,
      color: 'purple' // New color for entertainment
    },
    { id: 'companionship', label: 'Chat', icon: MessageCircle },
    { id: 'tech-assist', label: 'Tech Help', icon: Phone },
    { id: 'emergency', label: 'Emergency', icon: Shield, color: 'red' },
    { id: 'caregiver', label: 'Family', icon: Users },
  ];

  const getButtonClasses = (item: typeof navItems[0]) => {
    const baseClasses = 'flex flex-col items-center px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium';
    
    if (activeSection === item.id) {
      if (item.color) {
        return `${baseClasses} bg-${item.color}-100 text-${item.color}-700 shadow-md border-2 border-${item.color}-300`;
      }
      return `${baseClasses} bg-blue-100 text-blue-700 shadow-md`;
    }
    
    if (item.color) {
      return `${baseClasses} text-${item.color}-600 hover:bg-${item.color}-50 hover:border hover:border-${item.color}-200`;
    }
    
    return `${baseClasses} text-gray-600 hover:bg-gray-100 hover:text-blue-600`;
  };

  const getMobileButtonClasses = (item: typeof navItems[0]) => {
    const baseClasses = 'flex flex-col items-center px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200';
    
    if (activeSection === item.id) {
      if (item.color) {
        return `${baseClasses} bg-${item.color}-100 text-${item.color}-700 border-2 border-${item.color}-300`;
      }
      return `${baseClasses} bg-blue-100 text-blue-700`;
    }
    
    if (item.color) {
      return `${baseClasses} text-${item.color}-600 hover:bg-${item.color}-50`;
    }
    
    return `${baseClasses} text-gray-600 hover:bg-gray-100`;
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-orange-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sahyog AI</h1>
              <p className="text-lg text-gray-600">Your Caring Companion</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={getButtonClasses(item)}
              >
                <div className="relative">
                  <item.icon className="h-6 w-6 mb-1" />
                  {item.highlight && activeSection !== item.id && (
                    <span className={`absolute -top-1 -right-1 h-2 w-2 rounded-full bg-${item.color}-500`}></span>
                  )}
                </div>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={getMobileButtonClasses(item)}
              >
                <div className="relative">
                  <item.icon className="h-5 w-5 mb-1" />
                  {item.highlight && activeSection !== item.id && (
                    <span className={`absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-${item.color}-500`}></span>
                  )}
                </div>
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;