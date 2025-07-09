import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Home,
  Bell,
  Activity,
  Music,
  MessageCircle,
  Phone,
  Shield,
  Users,
  LogOut,
} from 'lucide-react';
import coupleImage from '../assets/couple.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: any;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange, user }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navItems = [
    { id: 'dashboard', label: t('home'), icon: Home },
    { id: 'reminders', label: t('reminders'), icon: Bell, highlight: true, color: 'orange' },
    { id: 'health', label: t('health'), icon: Activity, highlight: true, color: 'green' },
    { id: 'entertainment', label: t('entertainment'), icon: Music, highlight: true, color: 'purple' },
    { id: 'companionship', label: t('chat'), icon: MessageCircle, highlight: true, color: 'pink' },
    { id: 'tech-assist', label: t('techHelp'), icon: Phone, highlight: true, color: 'blue' },
    { id: 'emergency', label: t('emergency'), icon: Shield, color: 'red' },
    { id: 'caregiver', label: t('family'), icon: Users },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getButtonClasses = (item: typeof navItems[0]) => {
    const base = 'flex flex-col items-center px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium';
    if (activeSection === item.id) {
      return item.color
        ? `${base} bg-${item.color}-100 text-${item.color}-700 shadow-md border-2 border-${item.color}-300`
        : `${base} bg-gray-100 text-gray-700 shadow-md`;
    }
    return item.color
      ? `${base} text-${item.color}-600 hover:bg-${item.color}-50 hover:border hover:border-${item.color}-200`
      : `${base} text-gray-600 hover:bg-gray-100 hover:text-blue-600`;
  };

  const getMobileButtonClasses = (item: typeof navItems[0]) => {
    const base = 'flex flex-col items-center px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200';
    if (activeSection === item.id) {
      return item.color
        ? `${base} bg-${item.color}-100 text-${item.color}-700 border-2 border-${item.color}-300`
        : `${base} bg-gray-100 text-gray-700`;
    }
    return item.color
      ? `${base} text-${item.color}-600 hover:bg-${item.color}-50`
      : `${base} text-gray-600 hover:bg-gray-100`;
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-orange-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-1 rounded-full">
              <img src={coupleImage} alt="Couple" className="h-12 w-12 object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sahyog AI</h1>
              <p className="text-lg text-gray-600">{t('caringCompanion')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
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
              
              {/* Language Selector - Moved after navigation items */}
              <div className="flex items-center ml-2">
                <select
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="border rounded px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  defaultValue={i18n.language}
                >
                  <option value="en">EN</option>
                  <option value="hi">हिंदी</option>
                </select>
              </div>
            </nav>

            {/* Sign Out */}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">{t('signOut')}</span>
              </button>
            )}
          </div>
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
            
            {/* Mobile Language Selector */}
            <div className="flex items-center px-2">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                className="border rounded px-2 py-1 bg-gray-100 text-gray-700 text-xs"
                defaultValue={i18n.language}
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
              </select>
            </div>
            
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs">{t('signOut')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;