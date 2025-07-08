import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Smartphone, 
  Wifi, 
  HelpCircle,
  Users,
  PhoneCall,
  Send,
  Lightbulb,
  Shield,
  Copy,
  Check
} from 'lucide-react';

const TechAssist: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const techServices = [
    {
      id: 'calls',
      title: 'Make Phone Calls',
      description: 'Help with calling family and friends',
      icon: Phone,
      color: 'bg-green-500'
    },
    {
      id: 'messages',
      title: 'Send Messages',
      description: 'WhatsApp message assistance',
      icon: MessageSquare,
      color: 'bg-green-500' // Changed to WhatsApp green
    },
    {
      id: 'device',
      title: 'Device Help',
      description: 'Phone and tablet support',
      icon: Smartphone,
      color: 'bg-purple-500'
    },
    {
      id: 'internet',
      title: 'Internet Issues',
      description: 'WiFi and connection help',
      icon: Wifi,
      color: 'bg-orange-500'
    }
  ];

  const quickContacts = [
    { name: 'Priya Beta', number: '919876543210', relation: 'Daughter' },
    { name: 'Rahul Beta', number: '918765432109', relation: 'Son' },
    { name: 'Dr. Sharma', number: '919999911111', relation: 'Doctor' },
    { name: 'Geeta Ji', number: '918888822222', relation: 'Neighbor' }
  ];

  const commonIssues = [
    {
      issue: 'Phone screen is too small to read',
      solution: 'Go to Settings > Display > Font Size and increase it'
    },
    {
      issue: 'Cannot hear phone calls clearly',
      solution: 'Check volume buttons and try using speaker phone'
    },
    {
      issue: 'WhatsApp messages not sending',
      solution: 'Check internet connection and restart the app'
    },
    {
      issue: 'Phone battery drains quickly',
      solution: 'Close unused apps and reduce screen brightness'
    }
  ];

  const makeCall = (number: string, name: string) => {
    // In a real app, this would initiate a call
    alert(`Calling ${name} at ${number}`);
  };

  const sendWhatsAppMessage = () => {
    if (message && phoneNumber) {
      // Format phone number (remove all non-digit characters)
      const formattedNumber = phoneNumber.replace(/\D/g, '');
      
      if (formattedNumber.length < 10) {
        alert('Please enter a valid phone number with country code');
        return;
      }

      // Create WhatsApp deep link
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
      
      // Try to open WhatsApp
      const newWindow = window.open(whatsappUrl, '_blank');
      
      // Fallback if WhatsApp can't be opened
      setTimeout(() => {
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          const fallbackMessage = `Couldn't open WhatsApp automatically. You can manually send this message to ${formattedNumber}:\n\n${message}`;
          navigator.clipboard.writeText(message);
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
          alert(fallbackMessage);
        }
      }, 500);
      
      setMessage('');
      setPhoneNumber('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCallService = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Call Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{contact.name}</h4>
                  <p className="text-gray-600">{contact.relation}</p>
                  <p className="text-gray-500 text-sm">+{contact.number}</p>
                </div>
              </div>
              <button
                onClick={() => makeCall(contact.number, contact.name)}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-200"
              >
                <PhoneCall className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Call Someone New</h3>
        <div className="flex space-x-4">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number with country code"
            className="flex-1 p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={() => makeCall(phoneNumber, 'New Contact')}
            disabled={!phoneNumber}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-8 py-4 rounded-lg transition-colors duration-200"
          >
            <PhoneCall className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMessageService = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Send WhatsApp Message</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Example: 919876543210 (with country code)"
                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {phoneNumber && (
                <button 
                  onClick={() => copyToClipboard(phoneNumber)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
                  title="Copy number"
                >
                  {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">Include country code without + sign (e.g., 91 for India)</p>
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            onClick={sendWhatsAppMessage}
            disabled={!message || !phoneNumber}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white text-lg font-medium py-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Send className="h-6 w-6" />
            <span>Send via WhatsApp</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Message Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Hello, how are you doing today?',
            'Can you please call me when you get a chance?',
            'Thank you for your help! I appreciate it.',
            'Good morning! Have a wonderful day.',
            'I will call you later today.'
          ].map((template, index) => (
            <button
              key={index}
              onClick={() => setMessage(template)}
              className="p-4 text-left bg-gray-50 hover:bg-green-50 rounded-lg transition-colors duration-200 border border-gray-200"
            >
              <p className="text-lg text-gray-700">{template}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDeviceHelp = () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Common Device Issues</h3>
      <div className="space-y-6">
        {commonIssues.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-2 rounded-full mt-1">
                <HelpCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.issue}</h4>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 text-lg">{item.solution}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInternetHelp = () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Internet Connection Help</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-orange-50 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Wifi className="h-8 w-8 text-orange-600" />
              <h4 className="text-xl font-semibold text-gray-800">WiFi Issues</h4>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• Check if WiFi is turned on</li>
              <li>• Restart your router</li>
              <li>• Move closer to the router</li>
              <li>• Check password spelling</li>
            </ul>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Smartphone className="h-8 w-8 text-blue-600" />
              <h4 className="text-xl font-semibold text-gray-800">Mobile Data</h4>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• Check data balance</li>
              <li>• Turn airplane mode on/off</li>
              <li>• Restart your phone</li>
              <li>• Check network coverage</li>
            </ul>
          </div>
        </div>

        <div className="p-6 bg-green-50 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-green-600" />
            <h4 className="text-xl font-semibold text-gray-800">Need More Help?</h4>
          </div>
          <p className="text-lg text-gray-700 mb-4">
            If these steps don't work, you can call your internet service provider or ask a family member for help.
          </p>
          <button 
            onClick={() => makeCall('18001234567', 'Technical Support')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Call Technical Support
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
        <h2 className="text-4xl font-bold mb-4">Technology Assistant</h2>
        <p className="text-xl">Get help with calls, WhatsApp messages, and device issues</p>
      </div>

      {/* Service Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {techServices.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`p-6 rounded-2xl transition-all duration-200 ${
              selectedService === service.id
                ? 'bg-white shadow-xl ring-4 ring-blue-200'
                : 'bg-white shadow-lg hover:shadow-xl'
            }`}
          >
            <div className={`${service.color} p-4 rounded-full w-fit mb-4 mx-auto`}>
              <service.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </button>
        ))}
      </div>

      {/* Service Content */}
      {selectedService === 'calls' && renderCallService()}
      {selectedService === 'messages' && renderMessageService()}
      {selectedService === 'device' && renderDeviceHelp()}
      {selectedService === 'internet' && renderInternetHelp()}

      {!selectedService && (
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="bg-gray-100 p-6 rounded-full w-fit mx-auto mb-6">
            <HelpCircle className="h-16 w-16 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Choose a Service Above</h3>
          <p className="text-xl text-gray-600">Select what you need help with to get started</p>
        </div>
      )}
    </div>
  );
};

export default TechAssist;