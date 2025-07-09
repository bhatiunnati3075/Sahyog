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
import { useTranslation } from 'react-i18next';

interface TechService {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
}

interface Contact {
  name: string;
  number: string;
  relation: string;
}

interface DeviceIssue {
  issue: string;
  solution: string;
}

const TechAssist: React.FC = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const techServices: TechService[] = [
    {
      id: 'calls',
      title: t('techAssist.services.calls.title'),
      description: t('techAssist.services.calls.description'),
      icon: Phone,
      color: 'bg-green-500'
    },
    {
      id: 'messages',
      title: t('techAssist.services.messages.title'),
      description: t('techAssist.services.messages.description'),
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      id: 'device',
      title: t('techAssist.services.device.title'),
      description: t('techAssist.services.device.description'),
      icon: Smartphone,
      color: 'bg-purple-500'
    },
    {
      id: 'internet',
      title: t('techAssist.services.internet.title'),
      description: t('techAssist.services.internet.description'),
      icon: Wifi,
      color: 'bg-orange-500'
    }
  ];

  const quickContacts: Contact[] = [
    { 
      name: 'Priya Beta', 
      number: '919876543210', 
      relation: t('techAssist.calls.contact.relation', { context: 'daughter' }) 
    },
    { 
      name: 'Rahul Beta', 
      number: '918765432109', 
      relation: t('techAssist.calls.contact.relation', { context: 'son' }) 
    },
    { 
      name: 'Dr. Sharma', 
      number: '919999911111', 
      relation: t('techAssist.calls.contact.relation', { context: 'doctor' }) 
    },
    { 
      name: 'Geeta Ji', 
      number: '918888822222', 
      relation: t('techAssist.calls.contact.relation', { context: 'neighbor' }) 
    }
  ];

  const commonIssues: DeviceIssue[] = t('techAssist.device.issues', { returnObjects: true }) as DeviceIssue[];

  const makeCall = (number: string, name: string) => {
    alert(t('techAssist.calls.alert', { name, number }));
  };

  const sendWhatsAppMessage = () => {
    if (message && phoneNumber) {
      const formattedNumber = phoneNumber.replace(/\D/g, '');
      
      if (formattedNumber.length < 10) {
        alert(t('techAssist.messages.numberError'));
        return;
      }

      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
      const newWindow = window.open(whatsappUrl, '_blank');
      
      setTimeout(() => {
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          const fallbackMessage = t('techAssist.messages.fallback', { number: formattedNumber, message });
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
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('techAssist.calls.quickContacts')}</h3>
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
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('techAssist.calls.callNew')}</h3>
        <div className="flex space-x-4">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={t('techAssist.calls.phonePlaceholder')}
            className="flex-1 p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={() => makeCall(phoneNumber, t('techAssist.calls.contact.new'))}
            disabled={!phoneNumber}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-8 py-4 rounded-lg transition-colors duration-200"
          >
            <PhoneCall className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMessageService = () => {
    const messageTemplates: string[] = t('techAssist.messages.templates', { returnObjects: true }) as string[];
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('techAssist.messages.whatsappTitle')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t('techAssist.messages.phoneLabel')}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={t('techAssist.messages.phonePlaceholder')}
                  className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                {phoneNumber && (
                  <button 
                    onClick={() => copyToClipboard(phoneNumber)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
                    title={t('techAssist.messages.copyNumber')}
                  >
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">{t('techAssist.messages.phoneHelp')}</p>
            </div>
            
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t('techAssist.messages.messageLabel')}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('techAssist.messages.messagePlaceholder')}
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
              <span>{t('techAssist.messages.sendButton')}</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('techAssist.messages.templatesTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messageTemplates.map((template, index) => (
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
  };

  const renderDeviceHelp = () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('techAssist.device.commonIssues')}</h3>
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

  const renderInternetHelp = () => {
    const wifiTips: string[] = t('techAssist.internet.wifiTips', { returnObjects: true }) as string[];
    const dataTips: string[] = t('techAssist.internet.dataTips', { returnObjects: true }) as string[];
    
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('techAssist.internet.title')}</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-orange-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Wifi className="h-8 w-8 text-orange-600" />
                <h4 className="text-xl font-semibold text-gray-800">{t('techAssist.internet.wifiTitle')}</h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                {wifiTips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Smartphone className="h-8 w-8 text-blue-600" />
                <h4 className="text-xl font-semibold text-gray-800">{t('techAssist.internet.dataTitle')}</h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                {dataTips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 bg-green-50 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-green-600" />
              <h4 className="text-xl font-semibold text-gray-800">{t('techAssist.internet.moreHelp')}</h4>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              {t('techAssist.internet.moreHelpText')}
            </p>
            <button 
              onClick={() => makeCall('18001234567', t('techAssist.internet.callSupport'))}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {t('techAssist.internet.callSupport')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
        <h2 className="text-4xl font-bold mb-4">{t('techAssist.title')}</h2>
        <p className="text-xl">{t('techAssist.subtitle')}</p>
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
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('techAssist.selectService')}</h3>
          <p className="text-xl text-gray-600">{t('techAssist.servicePrompt')}</p>
        </div>
      )}
    </div>
  );
};

export default TechAssist;