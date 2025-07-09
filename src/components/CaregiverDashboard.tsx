import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Activity, 
  Heart, 
  Bell, 
  Calendar, 
  Phone,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Pill,
  MessageSquare
} from 'lucide-react';

interface HealthMetric {
  type: string;
  value: string;
  timestamp: Date;
  status: 'normal' | 'warning' | 'critical';
}

interface ActivityLog {
  id: string;
  activity: string;
  timestamp: Date;
  type: 'health' | 'social' | 'safety' | 'medication';
}

const CaregiverDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  const healthMetrics: HealthMetric[] = [
    { type: t('healthMetrics.bp'), value: '120/80', timestamp: new Date(), status: 'normal' },
    { type: t('healthMetrics.sugar'), value: '110 mg/dL', timestamp: new Date(Date.now() - 3600000), status: 'normal' },
    { type: t('healthMetrics.weight'), value: '68 kg', timestamp: new Date(Date.now() - 86400000), status: 'normal' },
    { type: t('healthMetrics.heartRate'), value: '75 bpm', timestamp: new Date(Date.now() - 7200000), status: 'normal' }
  ];

  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      activity: t('morning Medication'),
      timestamp: new Date(Date.now() - 1800000),
      type: 'medication'
    },
    {
      id: '2',
      activity: t('blood Pressure', { value: '120/80' }),
      timestamp: new Date(Date.now() - 3600000),
      type: 'health'
    },
    {
      id: '3',
      activity: t('family Call', { name: 'Priya', duration: 15 }),
      timestamp: new Date(Date.now() - 7200000),
      type: 'social'
    },
    {
      id: '4',
      activity: t('daily Walk'),
      timestamp: new Date(Date.now() - 10800000),
      type: 'health'
    },
    {
      id: '5',
      activity: t('emergency Contact Updated'),
      timestamp: new Date(Date.now() - 86400000),
      type: 'safety'
    }
  ];

  const alerts = [
    {
      id: '1',
      message: t('missed Medication'),
      severity: 'warning',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: '2',
      message: t('doctor Appointment', { time: '2 PM' }),
      severity: 'info',
      timestamp: new Date(Date.now() - 3600000)
    }
  ];

  const upcomingReminders = [
    { time: '20:00', task: t('evening Medication'), type: 'medication' },
    { time: '21:00', task: t('family Call'), type: 'social' },
    { time: t('tomorrow At', { time: '14:00' }), task: t('doctor Appointment', { name: 'Dr. Sharma' }), type: 'health' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'health': return Activity;
      case 'medication': return Pill;
      case 'social': return Users;
      case 'safety': return AlertTriangle;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'health': return 'text-green-600 bg-green-100';
      case 'medication': return 'text-blue-600 bg-blue-100';
      case 'social': return 'text-purple-600 bg-purple-100';
      case 'safety': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-700';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">{t('caretaker.dashboard.title')}</h2>
            <p className="text-xl">{t('caretaker.dashboard.subtitle')}</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Users className="h-16 w-16 text-white mx-auto mb-2" />
              <p className="text-lg font-semibold">{t('connected')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">5/6</h3>
              <p className="text-gray-600">{t('reminders Completed')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{t('healthStatus.normal')}</h3>
              <p className="text-gray-600">{t('health Status')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">3</h3>
              <p className="text-gray-600">{t('Social Interactions')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">1</h3>
              <p className="text-gray-600">{t('Active Alerts')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('Alerts')}</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border-2 ${getAlertColor(alert.severity)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-6 w-6" />
                    <div>
                      <p className="text-lg font-semibold">{alert.message}</p>
                      <p className="text-sm opacity-75">
                        {t('time.lastUpdated', { time: alert.timestamp.toLocaleString() })}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200">
                    {t('actions.dismiss')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Metrics */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('Health Readings')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <Heart className="h-8 w-8 text-red-500" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  metric.status === 'normal' 
                    ? 'bg-green-100 text-green-700'
                    : metric.status === 'warning'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {t(`healthStatus.${metric.status}`)}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{metric.type}</h4>
              <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
              <p className="text-gray-500 text-sm">
                {t('time.lastUpdated', { time: metric.timestamp.toLocaleString() })}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Timeline */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{t('Title')}</h3>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="today">{t('today')}</option>
              <option value="week">{t('thisWeek')}</option>
              <option value="month">{t('thisMonth')}</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {activityLogs.map((log) => {
              const IconComponent = getActivityIcon(log.type);
              return (
                <div key={log.id} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${getActivityColor(log.type)}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-gray-800">{log.activity}</p>
                    <p className="text-gray-500 text-sm">
                      {log.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('Title')}</h3>
          <div className="space-y-4">
            {upcomingReminders.map((reminder, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">{reminder.task}</p>
                  <p className="text-indigo-600 font-medium">{reminder.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  reminder.type === 'medication' 
                    ? 'bg-blue-100 text-blue-700'
                    : reminder.type === 'health'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {t(`caretaker.types.${reminder.type}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contact & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Phone className="h-8 w-8 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-800">{t('Title')}</h3>
          </div>
          <div className="space-y-4">
            <button className="w-full flex items-center space-x-4 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200">
              <Phone className="h-6 w-6 text-green-600" />
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-800">{t('Call')}</p>
                <p className="text-gray-600">{t('DirectCall')}</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-800">{t('SendMessage')}</p>
                <p className="text-gray-600">{t('QuickMessage')}</p>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-800">{t('Title')}</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-lg font-semibold text-gray-800 mb-2">{t('CurrentLocation')}</p>
              <p className="text-blue-700">{t('HomeSafe')}</p>
              <p className="text-gray-600 text-sm">
                {t('time.lastUpdated', { time: t('time.minutesAgo', { count: 2 }) })}
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-lg font-semibold text-gray-800 mb-2">{t('EmergencyContacts')}</p>
              <p className="text-green-700">{t('AllContactsActive')}</p>
              <p className="text-gray-600 text-sm">
                {t('caretaker.location.contactsConfigured', { count: 4 })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;