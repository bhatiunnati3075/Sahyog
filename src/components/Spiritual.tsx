import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Phone, 
  Users, 
  MapPin, 
  AlertTriangle, 
  Heart,
  Siren,
  Clock,
  Check,
  X,
  Map
} from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  priority: 'high' | 'medium' | 'low';
}

const Emergency: React.FC = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [selectedEmergencyType, setSelectedEmergencyType] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('Getting location...');
  const [locationError, setLocationError] = useState<string | null>(null);

  const [emergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Atharva Beta',
      relation: 'Daughter',
      phone: '+918668543491',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Rahul Beta',
      relation: 'Son',
      phone: '+918765432109',
      priority: 'high'
    },
    {
      id: '3',
      name: 'Dr. Sharma',
      relation: 'Family Doctor',
      phone: '+919999911111',
      priority: 'medium'
    },
    {
      id: '4',
      name: 'Geeta Neighbor',
      relation: 'Neighbor',
      phone: '+918888822222',
      priority: 'medium'
    }
  ]);

  const emergencyTypes = [
    {
      id: 'medical',
      title: 'Medical Emergency',
      description: 'Health issue, fall, injury',
      icon: Heart,
      color: 'bg-red-500',
      number: '108'
    },
    {
      id: 'police',
      title: 'Security Emergency',
      description: 'Safety concern, intruder',
      icon: Shield,
      color: 'bg-blue-500',
      number: '100'
    },
    {
      id: 'fire',
      title: 'Fire Emergency',
      description: 'Fire, gas leak, electrical',
      icon: Siren,
      color: 'bg-orange-500',
      number: '101'
    },
    {
      id: 'general',
      title: 'General Help',
      description: 'Need assistance',
      icon: Users,
      color: 'bg-purple-500',
      number: 'family'
    }
  ];

  // Get user's current location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // In a real app, you might reverse geocode these coordinates to get an address
            setCurrentLocation(`Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`);
          },
          (_error) => {
            setLocationError('Could not get location. Using default address.');
            setCurrentLocation('123 Sample Street, City, State');
          }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser.');
        setCurrentLocation('123 Sample Street, City, State');
      }
    };

    getLocation();
  }, []);

  const makePhoneCall = (number: string) => {
    // Remove all non-digit characters
    const cleanedNumber = number.replace(/\D/g, '');
    window.open(`tel:${cleanedNumber}`, '_blank');
  };

  const sendSMS = (number: string, message: string) => {
    const cleanedNumber = number.replace(/\D/g, '');
    window.open(`sms:${cleanedNumber}?body=${encodeURIComponent(message)}`, '_blank');
  };

  const startEmergency = (type: string) => {
    setSelectedEmergencyType(type);
    setEmergencyActive(true);
    setCountdown(10);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          executeEmergency(type);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelEmergency = () => {
    setEmergencyActive(false);
    setSelectedEmergencyType(null);
    setCountdown(null);
  };

  const executeEmergency = (type: string) => {
    const emergency = emergencyTypes.find(e => e.id === type);
    if (!emergency) return;

    const emergencyMessage = `EMERGENCY ALERT (${emergency.title})! Location: ${currentLocation}. Please help!`;

    if (emergency.number === 'family') {
      // Call and message all high priority contacts
      emergencyContacts
        .filter(c => c.priority === 'high')
        .forEach(contact => {
          makePhoneCall(contact.phone);
          sendSMS(contact.phone, emergencyMessage);
        });
    } else {
      // Call emergency number and notify family
      makePhoneCall(emergency.number);
      emergencyContacts
        .filter(c => c.priority === 'high')
        .forEach(contact => {
          sendSMS(contact.phone, emergencyMessage);
        });
    }

    setEmergencyActive(false);
    setSelectedEmergencyType(null);
  };

  const quickEmergencyCall = (number: string, _name: string) => {
    makePhoneCall(number);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-gray-200 bg-gray-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Emergency Alert Modal */}
      {emergencyActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-pulse">
            <div className="bg-red-100 p-6 rounded-full w-fit mx-auto mb-6">
              <Siren className="h-16 w-16 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">EMERGENCY ACTIVATED</h2>
            <p className="text-xl text-gray-700 mb-6">
              {selectedEmergencyType === 'medical' && 'Medical emergency services will be contacted'}
              {selectedEmergencyType === 'police' && 'Police will be contacted'}
              {selectedEmergencyType === 'fire' && 'Fire services will be contacted'}
              {selectedEmergencyType === 'general' && 'Your family will be contacted'}
            </p>
            
            {countdown && (
              <div className="mb-6">
                <div className="text-6xl font-bold text-red-600 mb-2">{countdown}</div>
                <p className="text-lg text-gray-600">seconds remaining to cancel</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={cancelEmergency}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-xl font-bold py-4 rounded-lg transition-colors duration-200 flex flex-col items-center"
              >
                <X className="h-6 w-6 mb-1" />
                Cancel
              </button>
              <button
                onClick={() => executeEmergency(selectedEmergencyType!)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-4 rounded-lg transition-colors duration-200 flex flex-col items-center"
              >
                <Check className="h-6 w-6 mb-1" />
                Confirm Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-4 rounded-full">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-2">Emergency Help</h2>
            <p className="text-xl">Quick access to emergency services and contacts</p>
          </div>
        </div>
      </div>

      {/* Emergency Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emergencyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => startEmergency(type.id)}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-left active:scale-95"
          >
            <div className="flex items-center space-x-6">
              <div className={`${type.color} p-6 rounded-full`}>
                <type.icon className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-lg mb-3">{type.description}</p>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-500 font-medium">
                    {type.number === 'family' ? 'Contact Family' : `Call ${type.number}`}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Emergency Contacts</h3>
        <div className="space-y-4">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center justify-between p-6 rounded-xl border-2 ${getPriorityColor(contact.priority)}`}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">{contact.name}</h4>
                  <p className="text-gray-600 text-lg">{contact.relation}</p>
                  <p className="text-gray-500">{contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  contact.priority === 'high' 
                    ? 'bg-red-100 text-red-700' 
                    : contact.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {contact.priority} priority
                </span>
                <button
                  onClick={() => quickEmergencyCall(contact.phone, contact.name)}
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-200"
                  aria-label={`Call ${contact.name}`}
                >
                  <Phone className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location & Medical Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-800">Location Info</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-lg">Your location will be automatically shared with emergency contacts.</p>
              {locationError && (
                <p className="text-red-500 text-sm mt-2">{locationError}</p>
              )}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
              <Map className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <p className="text-blue-700 font-medium">Current Location:</p>
                <p className="text-blue-600">{currentLocation}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Heart className="h-8 w-8 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-800">Medical Info</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <p className="text-red-700 font-medium">Allergies:</p>
                <p className="text-red-600">None reported</p>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg flex items-start space-x-3">
              <Clock className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <p className="text-yellow-700 font-medium">Medications:</p>
                <p className="text-yellow-600">Blood pressure pills</p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg flex items-start space-x-3">
              <Heart className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <p className="text-green-700 font-medium">Blood Type:</p>
                <p className="text-green-600">B+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Numbers */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Important Emergency Numbers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => makePhoneCall('108')}
            className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-left"
          >
            <Heart className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Medical Emergency</p>
              <p className="text-2xl font-bold text-red-600">108</p>
            </div>
          </button>
          
          <button 
            onClick={() => makePhoneCall('100')}
            className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Police</p>
              <p className="text-2xl font-bold text-blue-600">100</p>
            </div>
          </button>
          
          <button 
            onClick={() => makePhoneCall('101')}
            className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left"
          >
            <Siren className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Fire Department</p>
              <p className="text-2xl font-bold text-orange-600">101</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emergency;