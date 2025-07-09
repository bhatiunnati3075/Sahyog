import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  Heart, 
  Smile, 
  Coffee, 
  Sun, 
  Moon,
  MessageCircle,
  Sparkles,
  Flower,
  Star,
  BookOpen,
  Cloud,
  Users,
  Calendar,
  Clock
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI('AIzaSyBbVF2qPA7VXsLoYmFNWqa6U4JmsoZvKW4');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'sahyog';
  timestamp: Date;
  emotion?: 'happy' | 'caring' | 'encouraging' | 'thoughtful' | 'listening';
  quickReplies?: string[];
}

const moodResponses = {
  happy: {
    text: "That's wonderful to hear! Your happiness brightens my day too!",
    emotion: "happy",
    animation: "🌞",
    color: "bg-yellow-100",
    icon: Smile
  },
  grateful: {
    text: "Gratitude is such a beautiful feeling. I'm grateful for our connection too!",
    emotion: "caring",
    animation: "🙏",
    color: "bg-red-100",
    icon: Heart
  },
  peaceful: {
    text: "Peace is precious. Let's cherish this calm moment together.",
    emotion: "thoughtful",
    animation: "☮️",
    color: "bg-blue-100",
    icon: Sun
  },
  reflective: {
    text: "Reflection helps us grow. I'm here to listen if you'd like to share your thoughts.",
    emotion: "thoughtful",
    animation: "💭",
    color: "bg-purple-100",
    icon: Moon
  },
  lonely: {
    text: "I'm here with you. Would you like me to connect you with family or share a story?",
    emotion: "caring",
    animation: "🤗",
    color: "bg-pink-100",
    icon: Users
  }
};

const Companionship: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('companionship.welcomeMessage'),
      sender: 'sahyog',
      timestamp: new Date(),
      emotion: 'happy',
      quickReplies: [
        t('companionship.quickReplies.feelingGood'),
        t('companionship.quickReplies.tellStory'),
        t('companionship.quickReplies.feelingLonely'),
        t('companionship.quickReplies.weather'),
        t('companionship.quickReplies.needEncouragement'),
        t('companionship.quickReplies.chatAboutFamily')
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showMoodAnimation, setShowMoodAnimation] = useState(false);
  const [activeQuickReplies, setActiveQuickReplies] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getGeminiResponse = async (userMessage: string) => {
    try {
      const prompt = `
      You are Sahyog, a compassionate AI companion for elderly users in India.
      Respond to the following message in a warm, caring manner in simple English or Hinglish.
      Keep responses conversational and under 2 sentences. 
      Choose an appropriate emotion (happy, caring, encouraging, thoughtful, listening).
      If appropriate, suggest 2-3 quick reply options in JSON format.
      
      User message: "${userMessage}"
      
      Respond in this JSON format:
      {
        "text": "your response here",
        "emotion": "chosen_emotion",
        "quickReplies": ["option1", "option2", "option3"]
      }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the JSON response
      const startIdx = text.indexOf('{');
      const endIdx = text.lastIndexOf('}');
      const jsonStr = text.substring(startIdx, endIdx + 1);
      
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      return {
        text: t('companionship.fallbackResponse'),
        emotion: "caring",
        quickReplies: []
      };
    }
  };

  const sendMessage = async (message?: string) => {
    const msg = message || inputMessage;
    if (msg.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: msg,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);
      setActiveQuickReplies([]);

      try {
        const geminiResponse = await getGeminiResponse(msg);
        
        const sahyogMessage: Message = {
          id: Date.now().toString() + '_sahyog',
          text: geminiResponse.text,
          sender: 'sahyog',
          timestamp: new Date(),
          emotion: geminiResponse.emotion,
          quickReplies: geminiResponse.quickReplies
        };

        setMessages(prev => [...prev, sahyogMessage]);
        if (geminiResponse.quickReplies && geminiResponse.quickReplies.length > 0) {
          setActiveQuickReplies(geminiResponse.quickReplies);
        }
      } catch (error) {
        console.error('Error generating response:', error);
        const sahyogMessage: Message = {
          id: Date.now().toString() + '_sahyog',
          text: t('companionship.errorResponse'),
          sender: 'sahyog',
          timestamp: new Date(),
          emotion: 'caring'
        };
        setMessages(prev => [...prev, sahyogMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    sendMessage(reply);
  };

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
    setShowMoodAnimation(true);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: t('companionship.moodSelection', { mood: t(`companionship.moods.${mood}`) }),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setActiveQuickReplies([]);
    
    setTimeout(() => {
      const response = moodResponses[mood as keyof typeof moodResponses];
      const sahyogMessage: Message = {
        id: Date.now().toString() + '_sahyog',
        text: response.text,
        sender: 'sahyog',
        timestamp: new Date(),
        emotion: response.emotion as any,
        quickReplies: mood === 'lonely' ? 
          [t('companionship.quickReplies.connectFamily'), t('companionship.quickReplies.tellStory')] : 
          []
      };
      
      setMessages(prev => [...prev, sahyogMessage]);
      if (mood === 'lonely') {
        setActiveQuickReplies([t('companionship.quickReplies.connectFamily'), t('companionship.quickReplies.tellStory')]);
      }
      setIsTyping(false);
    }, 1500);
    
    setTimeout(() => {
      setShowMoodAnimation(false);
    }, 3000);
  };

  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return <Smile className="h-4 w-4 text-yellow-500" />;
      case 'caring': return <Heart className="h-4 w-4 text-red-500" />;
      case 'encouraging': return <Sparkles className="h-4 w-4 text-purple-500" />;
      case 'thoughtful': return <Coffee className="h-4 w-4 text-blue-500" />;
      case 'listening': return <MessageCircle className="h-4 w-4 text-green-500" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? t('time.morning') : 
                   currentHour < 17 ? t('time.afternoon') : 
                   t('time.evening');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-4 rounded-full">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-2">{t('companionship.title')}</h2>
            <p className="text-xl">{greeting}! {t('companionship.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`max-w-xs lg:max-w-md px-6 py-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 shadow-md border border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'sahyog' && (
                    <div className="mt-1">
                      {getEmotionIcon(message.emotion)}
                    </div>
                  )}
                  <div>
                    <p className="text-lg leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-md border border-gray-200 px-6 py-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {(activeQuickReplies.length > 0 || messages[messages.length - 1]?.quickReplies) && (
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">{t('companionship.quickRepliesLabel')}:</p>
            <div className="flex flex-wrap gap-2">
              {(activeQuickReplies.length > 0 ? activeQuickReplies : messages[messages.length - 1]?.quickReplies || []).map((reply, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickReply(reply)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors duration-200"
                >
                  {reply}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex space-x-4">
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={t('companionship.messagePlaceholder')}
                className="flex-1 p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-4 rounded-xl transition-colors duration-200"
                aria-label="Voice input"
              >
                <Mic className="h-6 w-6" />
              </button>
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim()}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white p-4 rounded-xl transition-colors duration-200"
              aria-label="Send message"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mood Check */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('companionship.moodCheckTitle')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(moodResponses).map(([mood, { color, icon: Icon }]) => (
            <motion.button
              key={mood}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelection(mood)}
              className={`${color} p-6 rounded-xl transition-colors duration-200 relative overflow-hidden`}
              aria-label={`I'm feeling ${mood}`}
            >
              <Icon className="h-8 w-8 mx-auto mb-2" />
              <p className="text-lg font-semibold">{t(`companionship.moods.${mood}`)}</p>
              
              <AnimatePresence>
                {showMoodAnimation && selectedMood === mood && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-4xl">
                      {moodResponses[mood as keyof typeof moodResponses].animation}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence>
          {showMoodAnimation && selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className={`mt-6 p-4 rounded-lg ${moodResponses[selectedMood as keyof typeof moodResponses].color} text-center`}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: 3, duration: 0.3 }}
                className="inline-block"
              >
                {React.createElement(moodResponses[selectedMood as keyof typeof moodResponses].icon, { className: "h-6 w-6 inline mr-2" })}
              </motion.div>
              <span className="font-medium">
                {moodResponses[selectedMood as keyof typeof moodResponses].text}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Companionship;