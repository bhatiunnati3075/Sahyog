import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Bot, ChevronDown } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface VoiceInterfaceProps {
  onVoiceCommand: (command: string) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onVoiceCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Initialize speech synthesis
    speechSynthesisRef.current = window.speechSynthesis || null;

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech Recognition API not supported');
      if (!isMuted) {
        speakMessage("Voice features are not supported in your browser");
      }
      return;
    }

    const recognizer = new SpeechRecognition();
    recognizer.continuous = false;  // Set to false for faster response
    recognizer.interimResults = false;  // No interim results for faster processing
    recognizer.maxAlternatives = 1;  // Only get the top alternative
    recognizer.lang = 'en-US';

    recognizer.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setCurrentMessage(transcript);
      await processVoiceCommand(transcript);
    };

    recognizer.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      if (!isMuted && event.error !== 'aborted') {
        speakMessage("Sorry, I didn't catch that. Could you please repeat?");
      }
    };

    recognizer.onend = () => {
      if (isListening) {
        // Don't automatically restart - let user initiate
        setIsListening(false);
      }
    };

    recognitionRef.current = recognizer;

    // Play welcome message after a short delay
    const welcomeTimeout = setTimeout(() => {
      if (!isMuted) {
        speakMessage("Hello! I'm your Sahyog assistant. How can I help?");
      }
    }, 800);

    return () => {
      clearTimeout(welcomeTimeout);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, [isMuted]);

  const getGeminiResponse = async (userInput: string) => {
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyBbVF2qPA7VXsLoYmFNWqa6U4JmsoZvKW4');
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `You are Sahyog, a friendly voice assistant for elderly users. Respond to this in a warm, helpful tone (1-2 sentences max): "${userInput}"`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      return "I couldn't process that request. Please try again.";
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      if (!isMuted) {
        speakMessage("Voice features are not available");
      }
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setCurrentMessage('');
    } else {
      try {
        // Cancel any ongoing speech
        if (speechSynthesisRef.current) {
          speechSynthesisRef.current.cancel();
          setIsSpeaking(false);
        }
        
        setCurrentMessage("Listening...");
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting recognition:', err);
        if (!isMuted) {
          speakMessage("Please allow microphone access to use voice commands");
        }
      }
    }
  };

  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    setIsListening(false); // Stop listening while processing
    onVoiceCommand(command);

    try {
      // Show immediate feedback
      setCurrentMessage(`Processing: "${command}"`);
      
      const response = await getGeminiResponse(command);
      setCurrentMessage(response);

      if (!isMuted) {
        speakMessage(response);
      }
    } catch (error) {
      console.error('Error processing command:', error);
      if (!isMuted) {
        speakMessage("Sorry, I'm having trouble understanding.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const speakMessage = (message: string) => {
    if (!speechSynthesisRef.current || isMuted) {
      setCurrentMessage(message);
      const messageTimeout = setTimeout(() => setCurrentMessage(''), 3000);
      return () => clearTimeout(messageTimeout);
    }

    speechSynthesisRef.current.cancel();
    setIsSpeaking(true);
    setCurrentMessage(message);

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1.0; // Slightly faster rate
    utterance.pitch = 1.0; // Normal pitch for clearer speech
    utterance.volume = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentMessage('');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    speechSynthesisRef.current.speak(utterance);
  };

  const toggleMute = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isMinimized ? (
        <div 
          onClick={toggleMinimize}
          className="bg-blue-500 p-4 rounded-full shadow-2xl cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          aria-label="Open Sahyog Assistant"
        >
          <Bot className="h-8 w-8 text-white" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-80">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-blue-500" />
              <h3 className="font-medium text-gray-800">Sahyog Assistant</h3>
            </div>
            <button 
              onClick={toggleMinimize}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Minimize"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {(isListening || isSpeaking || isProcessing || currentMessage) && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg min-h-16">
              <div className="flex items-center space-x-2 mb-2">
                {isListening && (
                  <>
                    <div className="animate-pulse bg-red-500 rounded-full h-3 w-3"></div>
                    <span className="text-sm text-blue-700 font-medium">Listening...</span>
                  </>
                )}
                {isProcessing && (
                  <>
                    <div className="animate-pulse bg-purple-500 rounded-full h-3 w-3"></div>
                    <span className="text-sm text-purple-700 font-medium">Thinking...</span>
                  </>
                )}
                {isSpeaking && (
                  <>
                    <Volume2 className="h-4 w-4 text-green-600 animate-pulse" />
                    <span className="text-sm text-green-700 font-medium">Speaking...</span>
                  </>
                )}
              </div>
              {currentMessage && (
                <p className="text-sm text-gray-700 break-words">{currentMessage}</p>
              )}
            </div>
          )}

          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={toggleListening}
              disabled={isProcessing || isSpeaking}
              className={`p-4 rounded-full transition-all duration-200 shadow-lg ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : isProcessing || isSpeaking
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </button>
            
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full transition-all duration-200 shadow-lg ${
                isMuted
                  ? 'bg-gray-500 hover:bg-gray-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              aria-label={isMuted ? "Unmute voice" : "Mute voice"}
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInterface;