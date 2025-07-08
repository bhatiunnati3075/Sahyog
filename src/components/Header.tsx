import React from 'react';
import { Heart, Home, Bell, Activity, Music, MessageCircle, Phone, Shield, Users } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'health', label: 'Health', icon: Activity },
    { id: 'entertainment', label: 'Entertainment', icon: Music },
    { id: 'companionship', label: 'Chat', icon: MessageCircle },
    { id: 'tech-assist', label: 'Tech Help', icon: Phone },
    { id: 'emergency', label: 'Emergency', icon: Shield },
    { id: 'caregiver', label: 'Family', icon: Users },
  ];

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
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`flex flex-col items-center px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium ${
                  activeSection === id
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                } ${id === 'emergency' ? 'bg-red-50 text-red-600 hover:bg-red-100' : ''}`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`flex flex-col items-center px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeSection === id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                } ${id === 'emergency' ? 'bg-red-50 text-red-600' : ''}`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;