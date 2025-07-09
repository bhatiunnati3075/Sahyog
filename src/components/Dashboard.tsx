import React from 'react';
import { 
  Calendar, 
  Heart, 
  Music, 
  MessageCircle, 
  Phone, 
  Shield, 
  Sun, 
  Users,
  Bell,
  Activity
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange }) => {
  const { t, i18n } = useTranslation();
  
  // Date and time formatting based on current language
  const currentTime = new Date().toLocaleTimeString(i18n.language, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const currentDate = new Date().toLocaleDateString(i18n.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const quickActions = [
    {
      id: 'reminders',
      title: t('todaysReminders'),
      subtitle: t('remindersSubtitle', { count: 3 }),
      icon: Bell,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'health',
      title: t('healthCheck'),
      subtitle: t('healthSubtitle'),
      icon: Activity,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'companionship',
      title: t('chatWithAssistant'),
      subtitle: t('chatSubtitle'),
      icon: MessageCircle,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      id: 'entertainment',
      title: t('entertainmentTitle'),
      subtitle: t('entertainmentSubtitle'),
      icon: Music,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    {
      id: 'tech-assist',
      title: t('techAssistTitle'),
      subtitle: t('techAssistSubtitle'),
      icon: Phone,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600'
    },
    {
      id: 'caregiver',
      title: t('familyUpdates'),
      subtitle: t('familySubtitle'),
      icon: Users,
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600'
    }
  ];

  const todayHighlights = [
    {
      time: '9:00 AM',
      title: t('morningMedicine'),
      description: t('bpMedication'),
      status: 'completed'
    },
    {
      time: '2:00 PM',
      title: t('doctorAppointment'),
      description: t('cardiology'),
      status: 'upcoming'
    },
    {
      time: '6:00 PM',
      title: t('familyCall'),
      description: t('weeklyCall'),
      status: 'upcoming'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">{t('welcome')}</h2>
            <p className="text-xl mb-4">{t('greeting')}</p>
            <div className="flex items-center space-x-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5" />
                <span className="text-lg">{currentTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span className="text-lg">{currentDate}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <Heart className="h-16 w-16 text-white mx-auto mb-2" />
              <p className="text-center text-sm">{t('caringCompanion')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Button */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-red-700 mb-2">{t('emergencyHelp')}</h3>
            <p className="text-red-600 text-lg">{t('emergencySubtitle')}</p>
          </div>
          <button
            onClick={() => onSectionChange('emergency')}
            className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <Shield className="h-12 w-12" />
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('quickActionsTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onSectionChange(action.id)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-left"
            >
              <div className={`${action.color} ${action.hoverColor} p-4 rounded-2xl w-fit mb-4 transition-colors duration-200`}>
                <action.icon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{action.title}</h4>
              <p className="text-gray-600 text-lg">{action.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('todaysSchedule')}</h3>
        <div className="space-y-4">
          {todayHighlights.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50">
              <div className="text-center min-w-[80px]">
                <p className="text-lg font-bold text-blue-600">{item.time}</p>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.status === 'completed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {item.status === 'completed' ? t('completed') : t('upcoming')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;