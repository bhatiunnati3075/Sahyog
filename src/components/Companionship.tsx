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
  Star
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';

// Initialize Gemini with API key directly (for demo purposes)
const genAI = new GoogleGenerativeAI('AIzaSyBbVF2qPA7VXsLoYmFNWqa6U4JmsoZvKW4'); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'sahyog';
  timestamp: Date;
  emotion?: 'happy' | 'caring' | 'encouraging' | 'thoughtful';
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
  }
};

const Companionship: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I\'m so happy to see you today. How are you feeling?',
      sender: 'sahyog',
      timestamp: new Date(),
      emotion: 'happy'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showMoodAnimation, setShowMoodAnimation] = useState(false);
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
      Keep responses under 2 sentences. Choose an appropriate emotion (happy, caring, encouraging, thoughtful).
      
      User message: "${userMessage}"
      
      Respond in this JSON format:
      {
        "text": "your response here",
        "emotion": "chosen_emotion"
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
      // Fallback response
      return {
        text: "I'm here for you. Would you like to talk more about this?",
        emotion: "caring"
      };
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);

      try {
        // Get response from Gemini
        const geminiResponse = await getGeminiResponse(inputMessage);
        
        const sahyogMessage: Message = {
          id: Date.now().toString() + '_sahyog',
          text: geminiResponse.text,
          sender: 'sahyog',
          timestamp: new Date(),
          emotion: geminiResponse.emotion
        };

        setMessages(prev => [...prev, sahyogMessage]);
      } catch (error) {
        console.error('Error generating response:', error);
        // Fallback to simple response if Gemini fails
        const sahyogMessage: Message = {
          id: Date.now().toString() + '_sahyog',
          text: "I'm here to listen. Tell me more about how you're feeling.",
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

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
    setShowMoodAnimation(true);
    
    // Add user mood message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `I'm feeling ${mood.toLowerCase()} today`,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Add Sahyog's response after a short delay
    setTimeout(() => {
      const response = moodResponses[mood as keyof typeof moodResponses];
      const sahyogMessage: Message = {
        id: Date.now().toString() + '_sahyog',
        text: response.text,
        sender: 'sahyog',
        timestamp: new Date(),
        emotion: response.emotion as any
      };
      
      setMessages(prev => [...prev, sahyogMessage]);
      setIsTyping(false);
    }, 1500);
    
    // Hide animation after 3 seconds
    setTimeout(() => {
      setShowMoodAnimation(false);
    }, 3000);
  };

  const quickReplies = [
    "I'm feeling good today",
    "Tell me a story",
    "I'm feeling lonely",
    "What's the weather like?",
    "I need some encouragement",
    "Let's chat about family"
  ];

  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return <Smile className="h-4 w-4 text-yellow-500" />;
      case 'caring': return <Heart className="h-4 w-4 text-red-500" />;
      case 'encouraging': return <Sparkles className="h-4 w-4 text-purple-500" />;
      case 'thoughtful': return <Coffee className="h-4 w-4 text-blue-500" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-4 rounded-full">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-2">Chat with Sahyog</h2>
            <p className="text-xl">{greeting}! I'm here to listen and chat with you</p>
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
              <div
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
              </div>
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
        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Quick replies:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(reply)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors duration-200"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex space-x-4">
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message here..."
                className="flex-1 p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-4 rounded-xl transition-colors duration-200"
              >
                <Mic className="h-6 w-6" />
              </button>
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white p-4 rounded-xl transition-colors duration-200"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mood Check */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">How are you feeling today?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(moodResponses).map(([mood, { color, icon: Icon }]) => (
            <motion.button
              key={mood}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelection(mood)}
              className={`${color} p-6 rounded-xl transition-colors duration-200 relative overflow-hidden`}
            >
              <Icon className="h-8 w-8 mx-auto mb-2" />
              <p className="text-lg font-semibold">{mood}</p>
              
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