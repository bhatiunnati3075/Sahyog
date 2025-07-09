import React, { useEffect } from 'react';
import { 
  Calendar, 
  Heart, 
  MessageCircle, 
  Phone, 
  Users,
  Bell,
  Activity,
  BookOpen,
  Sun
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardProps {
  onSectionChange: (section: string) => void;
  voiceCommand?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange, voiceCommand }) => {
  const { t, i18n } = useTranslation();
  
  // Handle voice commands
  useEffect(() => {
    if (voiceCommand) {
      const normalizedCommand = voiceCommand.toLowerCase().trim();
      const matchingAction = quickActions.find(action => 
        normalizedCommand.includes(action.id) || 
        normalizedCommand.includes(action.title.toLowerCase())
      );
      
      if (matchingAction) {
        onSectionChange(matchingAction.id);
      }
    }
  }, [voiceCommand, onSectionChange]);

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
      hoverColor: 'hover:bg-blue-600',
      keywords: ['reminder', 'alarm', 'notification']
    },
    {
      id: 'health',
      title: t('healthCheck'),
      subtitle: t('healthSubtitle'),
      icon: Activity,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      keywords: ['health', 'medical', 'doctor']
    },
    {
      id: 'companionship',
      title: t('chatWithAssistant'),
      subtitle: t('chatSubtitle'),
      icon: MessageCircle,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      keywords: ['chat', 'talk', 'companion']
    },
    {
      id: 'spiritual',
      title: t('spiritualTitle'),
      subtitle: t('spiritualSubtitle'),
      icon: BookOpen,
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      keywords: ['prayer', 'spiritual', 'meditation']
    },
    {
      id: 'tech-assist',
      title: t('techAssistTitle'),
      subtitle: t('techAssistSubtitle'),
      icon: Phone,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      keywords: ['tech', 'help', 'support']
    },
    {
      id: 'caregiver',
      title: t('familyUpdates'),
      subtitle: t('familySubtitle'),
      icon: Users,
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
      keywords: ['family', 'caregiver', 'update']
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
    <div className="space-y-8 p-4 md:p-6">
      {/* Welcome Section */}
      <section aria-labelledby="welcome-heading" className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 id="welcome-heading" className="text-3xl md:text-4xl font-bold mb-2">{t('welcome')}</h2>
            <p className="text-lg md:text-xl mb-4">{t('greeting')}</p>
            <div className="flex flex-wrap gap-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5" aria-hidden="true" />
                <span className="text-base md:text-lg">{currentTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" aria-hidden="true" />
                <span className="text-base md:text-lg">{currentDate}</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <Heart className="h-12 md:h-16 w-12 md:w-16 text-white mx-auto mb-2" aria-hidden="true" />
              <p className="text-center text-sm md:text-base">{t('caringCompanion')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Message */}
      <section aria-labelledby="personal-message-heading" className="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-indigo-100 p-3 sm:p-4 rounded-2xl">
            <BookOpen className="h-6 sm:h-8 w-6 sm:w-8 text-indigo-600" aria-hidden="true" />
          </div>
          <div>
            <h3 id="personal-message-heading" className="text-lg sm:text-xl font-bold text-indigo-800 mb-1">Spiritual Nourishment</h3>
            <p className="text-indigo-600">"Take time today to connect with your spiritual side. A moment of reflection can bring peace to your day."</p>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section aria-labelledby="quick-actions-heading">
        <h3 id="quick-actions-heading" className="text-xl md:text-2xl font-bold text-gray-800 mb-6">{t('quickActionsTitle')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onSectionChange(action.id)}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label={`Go to ${action.title}`}
            >
              <div className={`${action.color} ${action.hoverColor} p-3 md:p-4 rounded-2xl w-fit mb-3 md:mb-4 transition-colors duration-200`}>
                <action.icon className="h-6 md:h-8 w-6 md:w-8 text-white" aria-hidden="true" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">{action.title}</h4>
              <p className="text-gray-600 text-base md:text-lg">{action.subtitle}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Today's Schedule */}
      <section aria-labelledby="schedule-heading" className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <h3 id="schedule-heading" className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">{t('todaysSchedule')}</h3>
        <div className="space-y-3 md:space-y-4">
          {todayHighlights.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50">
              <div className="text-left sm:text-center min-w-[80px]">
                <p className="text-base md:text-lg font-bold text-blue-600">{item.time}</p>
              </div>
              <div className="flex-1">
                <h4 className="text-base md:text-lg font-semibold text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
              </div>
              <div className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium ${
                item.status === 'completed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {item.status === 'completed' ? t('completed') : t('upcoming')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;