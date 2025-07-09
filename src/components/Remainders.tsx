import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  Pill, 
  Calendar, 
  Utensils, 
  Droplets, 
  Users, 
  Plus,
  Check,
  X,
  Edit3
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface Reminder {
  id: string;
  title: string;
  time: string;
  type: 'medication' | 'appointment' | 'meal' | 'water' | 'family' | 'other';
  completed: boolean;
  recurring: boolean;
  description?: string;
}

const Reminders: React.FC = () => {
  const { t } = useTranslation();

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: t('morningMedicine'),
      time: '09:00',
      type: 'medication',
      completed: true,
      recurring: true,
      description: t('bpMedication')
    },
    {
      id: '2',
      title: t('doctorAppointment'),
      time: '14:00',
      type: 'appointment',
      completed: false,
      recurring: false,
      description: t('cardiology')
    },
    {
      id: '3',
      title: t('eveningMedicine'),
      time: '20:00',
      type: 'medication',
      completed: false,
      recurring: true,
      description: t('diabetesMedicine')
    },
    {
      id: '4',
      title: t('familyCall'),
      time: '18:00',
      type: 'family',
      completed: false,
      recurring: true,
      description: t('weeklyCall')
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '',
    type: 'other' as const,
    description: '',
    recurring: false
  });

  const toggleComplete = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const addReminder = () => {
    if (newReminder.title && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        ...newReminder,
        completed: false
      };
      setReminders(prev => [...prev, reminder]);
      setNewReminder({
        title: '',
        time: '',
        type: 'other',
        description: '',
        recurring: false
      });
      setShowAddForm(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication': return Pill;
      case 'appointment': return Calendar;
      case 'meal': return Utensils;
      case 'water': return Droplets;
      case 'family': return Users;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-green-500';
      case 'appointment': return 'bg-blue-500';
      case 'meal': return 'bg-orange-500';
      case 'water': return 'bg-cyan-500';
      case 'family': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const upcomingReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };


  const formVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4">{t('reminders')}</h2>
        <p className="text-xl">{t('voiceCare')}</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{upcomingReminders.length}</h3>
              <p className="text-gray-600 text-lg">{t('reminders')}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{completedReminders.length}</h3>
              <p className="text-gray-600 text-lg">{t('completedText')}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-4 w-full hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
          >
            <div className="bg-orange-100 p-4 rounded-full">
              <Plus className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">{t('addNew')}</h3>
              <p className="text-gray-600">{t('createNewReminder')}</p>
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* Add Reminder Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('addNewReminder')}</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">{t('title')}</label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t('whatToRemember')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">{t('time')}</label>
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">{t('type')}</label>
                  <select
                    value={newReminder.type}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="medication">{t('medicine')}</option>
                    <option value="appointment">{t('appointment')}</option>
                    <option value="meal">{t('meal')}</option>
                    <option value="water">{t('water')}</option>
                    <option value="family">{t('family')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">{t('description')}</label>
                <textarea
                  value={newReminder.description}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder={t('addExtraDetails')}
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={newReminder.recurring}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, recurring: e.target.checked }))}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="recurring" className="text-lg text-gray-700">{t('repeatDaily')}</label>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  onClick={addReminder}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-6 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('addReminder')}
                </motion.button>
                <motion.button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-lg font-medium py-4 px-6 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('cancel')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upcoming Reminders */}
      {upcomingReminders.length > 0 && (
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('upcomingToday')}</h3>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {upcomingReminders.map((reminder) => {
              const IconComponent = getTypeIcon(reminder.type);
              return (
                <motion.div 
                  key={reminder.id}
                  className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  layout
                >
                  <div className={`${getTypeColor(reminder.type)} p-3 rounded-full`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800">{reminder.title}</h4>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {reminder.time}
                      </span>
                    </div>
                    {reminder.description && (
                      <p className="text-gray-600 text-lg">{reminder.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <motion.button 
                      onClick={() => toggleComplete(reminder.id)} 
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Check className="h-5 w-5" />
                    </motion.button>
                    <motion.button 
                      onClick={() => deleteReminder(reminder.id)} 
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      )}

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('completedToday')}</h3>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {completedReminders.map((reminder) => {
              const IconComponent = getTypeIcon(reminder.type);
              return (
                <motion.div 
                  key={reminder.id}
                  className="flex items-center space-x-4 p-6 bg-green-50 rounded-xl opacity-75"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  layout
                >
                  <div className="bg-green-500 p-3 rounded-full">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800 line-through">{reminder.title}</h4>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {t('completedText')}
                      </span>
                    </div>
                    {reminder.description && (
                      <p className="text-gray-600 text-lg">{reminder.description}</p>
                    )}
                  </div>
                  <motion.button 
                    onClick={() => toggleComplete(reminder.id)} 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 p-3 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit3 className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Reminders;