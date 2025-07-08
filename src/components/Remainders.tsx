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
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Morning Medicine',
      time: '09:00',
      type: 'medication',
      completed: true,
      recurring: true,
      description: 'Blood pressure tablets - 2 pills'
    },
    {
      id: '2',
      title: 'Doctor Appointment',
      time: '14:00',
      type: 'appointment',
      completed: false,
      recurring: false,
      description: 'Dr. Sharma - Cardiology checkup'
    },
    {
      id: '3',
      title: 'Evening Medicine',
      time: '20:00',
      type: 'medication',
      completed: false,
      recurring: true,
      description: 'Diabetes medicine - 1 tablet'
    },
    {
      id: '4',
      title: 'Family Call',
      time: '18:00',
      type: 'family',
      completed: false,
      recurring: true,
      description: 'Weekly call with Priya beta'
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

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-4xl font-bold mb-4">Reminders</h2>
        <p className="text-xl">Your voice, our care</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{upcomingReminders.length}</h3>
              <p className="text-gray-600 text-lg">Reminders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{completedReminders.length}</h3>
              <p className="text-gray-600 text-lg">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-4 w-full hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
          >
            <div className="bg-orange-100 p-4 rounded-full">
              <Plus className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">Add New</h3>
              <p className="text-gray-600">Create a new reminder</p>
            </div>
          </button>
        </div>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Reminder</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="What to remember"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newReminder.type}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="medication">Medicine</option>
                  <option value="appointment">Appointment</option>
                  <option value="meal">Meal</option>
                  <option value="water">Water</option>
                  <option value="family">Family</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Add extra details"
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
              <label htmlFor="recurring" className="text-lg text-gray-700">Repeat daily</label>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={addReminder}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-6 rounded-lg transition-colors duration-200"
              >
                Add Reminder
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-lg font-medium py-4 px-6 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Reminders */}
      {upcomingReminders.length > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Today</h3>
          <div className="space-y-4">
            {upcomingReminders.map((reminder) => {
              const IconComponent = getTypeIcon(reminder.type);
              return (
                <div key={reminder.id} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
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
                    <button
                      onClick={() => toggleComplete(reminder.id)}
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors duration-200"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-colors duration-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Completed Today ✓</h3>
          <div className="space-y-4">
            {completedReminders.map((reminder) => {
              const IconComponent = getTypeIcon(reminder.type);
              return (
                <div key={reminder.id} className="flex items-center space-x-4 p-6 bg-green-50 rounded-xl opacity-75">
                  <div className="bg-green-500 p-3 rounded-full">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800 line-through">{reminder.title}</h4>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Completed
                      </span>
                    </div>
                    {reminder.description && (
                      <p className="text-gray-600 text-lg">{reminder.description}</p>
                    )}
                  </div>

                  <button
                    onClick={() => toggleComplete(reminder.id)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 p-3 rounded-lg transition-colors duration-200"
                  >
                    <Edit3 className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;