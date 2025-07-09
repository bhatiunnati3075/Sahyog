import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          // Existing translations
          home: 'Home',
          reminders: 'Reminders',
          health: 'Health',
          entertainment: 'Entertainment',
          chat: 'Chat',
          techHelp: 'Tech Help',
          emergency: 'Emergency',
          family: 'Family',
          signOut: 'Sign Out',
          caringCompanion: 'Your Caring Companion',
          welcome: 'Namaste! 🙏',
          greeting: 'Good to see you today',
          emergencyHelp: 'Emergency Help',
          emergencySubtitle: 'Press for immediate assistance',
          quickActionsTitle: 'What would you like to do?',
          todaysSchedule: "Today's Schedule",
          completed: '✓ Done',
          upcoming: 'Upcoming',

          // Time
          time: {
            morning: 'Good Morning',
            afternoon: 'Good Afternoon',
            evening: 'Good Evening'
          },

          // Quick Actions
          todaysReminders: "Today's Reminders",
          remindersSubtitle: '{{count}} pending reminders',
          healthCheck: 'Health Check',
          healthSubtitle: 'Track vitals & medications',
          chatWithAssistant: 'Chat with Sahyog',
          chatSubtitle: "I'm here to listen",
          entertainmentTitle: 'Entertainment',
          entertainmentSubtitle: 'Stories, music & more',
          techAssistTitle: 'Tech Help',
          techAssistSubtitle: 'Calls, messages & devices',
          familyUpdates: 'Family Updates',
          familySubtitle: 'Connect with loved ones',

          // Schedule items
          morningMedicine: 'Morning Medicine',
          bpMedication: 'Blood pressure medication',
          doctorAppointment: 'Doctor Appointment',
          cardiology: 'Dr. Sharma - Cardiology',
          familyCall: 'Family Call',
          weeklyCall: 'Weekly call with Priya',

          // Reminders Page
          voiceCare: 'Your voice, our care',
          addNew: 'Add New',
          createNewReminder: 'Create a new reminder',
          addNewReminder: 'Add New Reminder',
          title: 'Title',
          whatToRemember: 'What to remember',
          time: 'Time',
          type: 'Type',
          medicine: 'Medicine',
          appointment: 'Appointment',
          meal: 'Meal',
          water: 'Water',
          other: 'Other',
          description: 'Description',
          addExtraDetails: 'Add extra details',
          repeatDaily: 'Repeat daily',
          addReminder: 'Add Reminder',
          cancel: 'Cancel',
          completedText: 'Completed',

          // Health Page
          healthDashboard: 'Health Dashboard',
          healthWelcome: 'Keep track of your health and wellness',
          bloodPressure: 'Blood Pressure',
          bloodSugar: 'Blood Sugar',
          weight: 'Weight',
          temperature: 'Temperature',
          oxygenLevel: 'Oxygen Level',
          addReading: 'Add Reading',
          normal: 'Normal',
          stable: 'Stable',
          healthTrends: 'Health Trends',
          week: 'Week',
          month: 'Month',
          allData: 'All Data',
          addHealthReading: 'Add Health Reading',
          reading: 'Reading',
          todaysReadings: "Today's Readings",
          noReadings: 'No readings recorded today',
          addYourFirstReading: 'Add your first health reading above',
          dailyHealthTips: 'Daily Health Tips',
          healthEmergency: 'Health Emergency?',
          healthEmergencyText: 'If you feel unwell or have concerning symptoms, contact your doctor or emergency services immediately.',

          // Health Metrics
          healthMetrics: {
            bp: 'Blood Pressure',
            sugar: 'Blood Sugar',
            weight: 'Weight',
            temperature: 'Temperature',
            oxygen: 'Oxygen Level'
          },
          healthUnits: {
            mmHg: 'mmHg',
            mgdL: 'mg/dL',
            kg: 'kg',
            celsius: '°C',
            percent: '%'
          },
          healthStatus: {
            normal: 'Normal',
            stable: 'Stable',
            warning: 'Warning',
            critical: 'Critical'
          },
          healthChart: {
            overTime: 'Over Time',
            lineChart: 'Line Chart',
            barChart: 'Bar Chart'
          },
          healthPlaceholders: {
            bp: 'e.g. 120/80',
            sugar: 'e.g. 110 mg/dL',
            weight: 'e.g. 68 kg',
            temperature: 'e.g. 98.6°F',
            oxygen: 'e.g. 98%'
          },
          healthTips: {
            medicines: 'Take your medicines on time as prescribed',
            hydration: 'Stay hydrated - drink at least 8 glasses of water daily',
            walk: 'Take a 30-minute walk every day',
            sleep: 'Get 7-8 hours of quality sleep each night',
            nutrition: 'Eat balanced meals with plenty of fruits and vegetables'
          },

          // Tech Assist Translations
          techAssist: {
            title: 'Technology Assistant',
            subtitle: 'Get help with calls, WhatsApp messages, and device issues',
            selectService: 'Choose a service above',
            servicePrompt: 'Select what you need help with to get started',
            
            services: {
              calls: {
                title: 'Make Phone Calls',
                description: 'Help with calling family and friends',
              },
              messages: {
                title: 'Send Messages',
                description: 'WhatsApp message assistance',
              },
              device: {
                title: 'Device Help',
                description: 'Phone and tablet support',
              },
              internet: {
                title: 'Internet Issues',
                description: 'WiFi and connection help',
              }
            },

            calls: {
              quickContacts: 'Quick Call Contacts',
              callNew: 'Call Someone New',
              phonePlaceholder: 'Enter phone number with country code',
              callButton: 'Call',
              contact: {
                relation: 'Relation',
                number: 'Number',
              }
            },

            messages: {
              whatsappTitle: 'Send WhatsApp Message',
              phonePlaceholder: 'Example: 919876543210 (with country code)',
              phoneHelp: 'Include country code without + sign (e.g., 91 for India)',
              messagePlaceholder: 'Type your message here...',
              sendButton: 'Send via WhatsApp',
              templatesTitle: 'Quick Message Templates',
              copyNumber: 'Copy number',
              copied: 'Copied!',
              templates: [
                'Hello, how are you doing today?',
                'Can you please call me when you get a chance?',
                'Thank you for your help! I appreciate it.',
                'Good morning! Have a wonderful day.',
                'I will call you later today.'
              ]
            },

            device: {
              commonIssues: 'Common Device Issues',
              issues: [
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
              ]
            },

            internet: {
              title: 'Internet Connection Help',
              wifiTitle: 'WiFi Issues',
              wifiTips: [
                'Check if WiFi is turned on',
                'Restart your router',
                'Move closer to the router',
                'Check password spelling'
              ],
              dataTitle: 'Mobile Data',
              dataTips: [
                'Check data balance',
                'Turn airplane mode on/off',
                'Restart your phone',
                'Check network coverage'
              ],
              moreHelp: 'Need More Help?',
              moreHelpText: 'If these steps don\'t work, you can call your internet service provider or ask a family member for help.',
              callSupport: 'Call Technical Support'
            }
          },

          // Companionship Translations
          companionship: {
            title: "Chat with Sahyog",
            subtitle: "I'm here to listen and chat with you",
            welcomeMessage: "Namaste! I'm so happy to see you today. How are you feeling?",
            moodCheckTitle: "How are you feeling today?",
            quickRepliesLabel: "Quick replies",
            messagePlaceholder: "Type your message here...",
            moodSelection: "I'm feeling {mood} today",
            fallbackResponse: "I'm here for you. Would you like to talk more about this?",
            errorResponse: "I'm here to listen. Tell me more about how you're feeling.",
            quickReplies: {
              feelingGood: "I'm feeling good today",
              tellStory: "Tell me a story",
              feelingLonely: "I'm feeling lonely",
              weather: "What's the weather like?",
              needEncouragement: "I need some encouragement",
              chatAboutFamily: "Let's chat about family"
            },
            moodResponses: {
              happy: "That's wonderful to hear! Your happiness brightens my day too!",
              grateful: "Gratitude is such a beautiful feeling. I'm grateful for our connection too!",
              peaceful: "Peace is precious. Let's cherish this calm moment together.",
              reflective: "Reflection helps us grow. I'm here to listen if you'd like to share your thoughts."
            },
            moods: {
              happy: "Happy",
              grateful: "Grateful",
              peaceful: "Peaceful",
              reflective: "Reflective"
            }
          }
        }
      },
      hi: {
        translation: {
          // Existing Hindi translations
          home: 'होम',
          reminders: 'अनुस्मारक',
          health: 'स्वास्थ्य',
          entertainment: 'मनोरंजन',
          chat: 'चैट',
          techHelp: 'तकनीकी सहायता',
          emergency: 'आपातकाल',
          family: 'परिवार',
          signOut: 'साइन आउट',
          caringCompanion: 'आपका सहायक साथी',
          welcome: 'नमस्ते! 🙏',
          greeting: 'आज आपको देखकर अच्छा लगा',
          emergencyHelp: 'आपातकालीन सहायता',
          emergencySubtitle: 'तत्काल सहायता के लिए दबाएं',
          quickActionsTitle: 'आप क्या करना चाहेंगे?',
          todaysSchedule: "आज का कार्यक्रम",
          completed: '✓ पूर्ण',
          upcoming: 'आगामी',

          // Time
          time: {
            morning: 'सुप्रभात',
            afternoon: 'नमस्कार',
            evening: 'शुभ संध्या'
          },

          // Quick Actions
          todaysReminders: "आज के अनुस्मारक",
          remindersSubtitle: '{{count}} लंबित अनुस्मारक',
          healthCheck: 'स्वास्थ्य जांच',
          healthSubtitle: 'महत्वपूर्ण संकेत और दवाएं ट्रैक करें',
          chatWithAssistant: 'सहयोग से चैट करें',
          chatSubtitle: "मैं सुनने के लिए यहां हूं",
          entertainmentTitle: 'मनोरंजन',
          entertainmentSubtitle: 'कहानियाँ, संगीत और बहुत कुछ',
          techAssistTitle: 'तकनीकी सहायता',
          techAssistSubtitle: 'कॉल, संदेश और उपकरण',
          familyUpdates: 'परिवार के समाचार',
          familySubtitle: 'प्रियजनों के साथ जुड़ें',

          // Schedule items
          morningMedicine: 'सुबह की दवा',
          bpMedication: 'ब्लड प्रेशर की दवा',
          doctorAppointment: 'डॉक्टर की नियुक्ति',
          cardiology: 'डॉ. शर्मा - कार्डियोलॉजी',
          familyCall: 'परिवार की कॉल',
          weeklyCall: 'प्रिया के साथ साप्ताहिक कॉल',

          // Reminders Page
          voiceCare: 'आपकी आवाज़, हमारी देखभाल',
          addNew: 'नया जोड़ें',
          createNewReminder: 'नया अनुस्मारक बनाएं',
          addNewReminder: 'नया अनुस्मारक जोड़ें',
          title: 'शीर्षक',
          whatToRemember: 'क्या याद रखना है',
          timeme: 'समय',
          type: 'प्रकार',
          medicine: 'दवा',
          appointment: 'नियुक्ति',
          meal: 'भोजन',
          water: 'पानी',
          other: 'अन्य',
          description: 'विवरण',
          addExtraDetails: 'अतिरिक्त जानकारी जोड़ें',
          repeatDaily: 'हर दिन दोहराएं',
          addReminder: 'अनुस्मारक जोड़ें',
          cancel: 'रद्द करें',
          completedText: 'पूर्ण',

          // Health Page
          healthDashboard: 'स्वास्थ्य डैशबोर्ड',
          healthWelcome: 'अपने स्वास्थ्य और तंदुरुस्ती पर नज़र रखें',
          bloodPressure: 'ब्लड प्रेशर',
          bloodSugar: 'ब्लड शुगर',
          weight: 'वजन',
          temperature: 'तापमान',
          oxygenLevel: 'ऑक्सीजन स्तर',
          addReading: 'पढ़ाई जोड़ें',
          normal: 'सामान्य',
          stable: 'स्थिर',
          healthTrends: 'स्वास्थ्य प्रवृत्तियाँ',
          week: 'सप्ताह',
          month: 'महीना',
          allData: 'सभी डेटा',
          addHealthReading: 'स्वास्थ्य पढ़ाई जोड़ें',
          reading: 'पढ़ाई',
          todaysReadings: 'आज की पढ़ाइयाँ',
          noReadings: 'आज कोई पढ़ाई दर्ज नहीं की गई है',
          addYourFirstReading: 'ऊपर अपनी पहली स्वास्थ्य पढ़ाई जोड़ें',
          dailyHealthTips: 'दैनिक स्वास्थ्य सुझाव',
          healthEmergency: 'स्वास्थ्य आपातकाल?',
          healthEmergencyText: 'यदि आप अस्वस्थ महसूस करते हैं या चिंताजनक लक्षण हैं, तो तुरंत अपने डॉक्टर या आपातकालीन सेवाओं से संपर्क करें।',

          // Health Metrics
          healthMetrics: {
            bp: 'रक्तचाप',
            sugar: 'रक्त शर्करा',
            weight: 'वजन',
            temperature: 'तापमान',
            oxygen: 'ऑक्सीजन स्तर'
          },
          healthUnits: {
            mmHg: 'mmHg',
            mgdL: 'mg/dL',
            kg: 'किलो',
            celsius: '°C',
            percent: '%'
          },
          healthStatus: {
            normal: 'सामान्य',
            stable: 'स्थिर',
            warning: 'चेतावनी',
            critical: 'गंभीर'
          },
          healthChart: {
            overTime: 'समय के साथ',
            lineChart: 'लाइन चार्ट',
            barChart: 'बार चार्ट'
          },
          healthPlaceholders: {
            bp: 'जैसे 120/80',
            sugar: 'जैसे 110 mg/dL',
            weight: 'जैसे 68 किलो',
            temperature: 'जैसे 98.6°F',
            oxygen: 'जैसे 98%'
          },
          healthTips: {
            medicines: 'निर्धारित समय पर अपनी दवाएं लें',
            hydration: 'हाइड्रेटेड रहें - प्रतिदिन कम से कम 8 गिलास पानी पिएं',
            walk: 'प्रतिदिन 30 मिनट की सैर करें',
            sleep: 'प्रति रात 7-8 घंटे की अच्छी नींद लें',
            nutrition: 'फलों और सब्जियों से भरपूर संतुलित भोजन करें'
          },

          // Tech Assist Translations (Hindi)
          techAssist: {
            title: 'तकनीकी सहायक',
            subtitle: 'कॉल, व्हाट्सएप संदेश और डिवाइस समस्याओं में सहायता प्राप्त करें',
            selectService: 'ऊपर एक सेवा चुनें',
            servicePrompt: 'शुरू करने के लिए चुनें कि आपको किसमें सहायता चाहिए',
            
            services: {
              calls: {
                title: 'फोन कॉल करें',
                description: 'परिवार और दोस्तों को कॉल करने में सहायता',
              },
              messages: {
                title: 'संदेश भेजें',
                description: 'व्हाट्सएप संदेश सहायता',
              },
              device: {
                title: 'डिवाइस सहायता',
                description: 'फोन और टैबलेट समर्थन',
              },
              internet: {
                title: 'इंटरनेट समस्याएं',
                description: 'वाईफाई और कनेक्शन सहायता',
              }
            },

            calls: {
              quickContacts: 'त्वरित कॉल संपर्क',
              callNew: 'किसी नए व्यक्ति को कॉल करें',
              phonePlaceholder: 'देश कोड के साथ फोन नंबर दर्ज करें',
              callButton: 'कॉल करें',
              contact: {
                relation: 'संबंध',
                number: 'नंबर',
              }
            },

            messages: {
              whatsappTitle: 'व्हाट्सएप संदेश भेजें',
              phonePlaceholder: 'उदाहरण: 919876543210 (देश कोड के साथ)',
              phoneHelp: 'बिना + चिह्न के देश कोड शामिल करें (उदाहरण के लिए, भारत के लिए 91)',
              messagePlaceholder: 'अपना संदेश यहाँ टाइप करें...',
              sendButton: 'व्हाट्सएप के माध्यम से भेजें',
              templatesTitle: 'त्वरित संदेश टेम्पलेट्स',
              copyNumber: 'नंबर कॉपी करें',
              copied: 'कॉपी किया गया!',
              templates: [
                'नमस्ते, आज आप कैसे हैं?',
                'क्या आप कृपया मुझे कॉल कर सकते हैं जब आपको समय मिले?',
                'आपकी मदद के लिए धन्यवाद! मैं इसकी सराहना करता हूं।',
                'सुप्रभात! आपका दिन शुभ हो।',
                'मैं आपको आज बाद में कॉल करूंगा।'
              ]
            },

            device: {
              commonIssues: 'सामान्य डिवाइस समस्याएं',
              issues: [
                {
                  issue: 'फोन स्क्रीन पढ़ने के लिए बहुत छोटी है',
                  solution: 'सेटिंग्स > डिस्प्ले > फॉन्ट साइज पर जाएं और इसे बढ़ाएं'
                },
                {
                  issue: 'फोन कॉल स्पष्ट रूप से सुनाई नहीं दे रही हैं',
                  solution: 'वॉल्यूम बटन की जांच करें और स्पीकर फोन का उपयोग करने का प्रयास करें'
                },
                {
                  issue: 'व्हाट्सएप संदेश नहीं भेजे जा रहे हैं',
                  solution: 'इंटरनेट कनेक्शन की जांच करें और ऐप को पुनरारंभ करें'
                },
                {
                  issue: 'फोन की बैटरी जल्दी खत्म हो रही है',
                  solution: 'अनुपयोगी ऐप्स बंद करें और स्क्रीन की चमक कम करें'
                }
              ]
            },

            internet: {
              title: 'इंटरनेट कनेक्शन सहायता',
              wifiTitle: 'वाईफाई समस्याएं',
              wifiTips: [
                'जांचें कि क्या वाईफाई चालू है',
                'अपने राउटर को पुनरारंभ करें',
                'राउटर के पास जाएं',
                'पासवर्ड की वर्तनी जांचें'
              ],
              dataTitle: 'मोबाइल डेटा',
              dataTips: [
                'डेटा बैलेंस जांचें',
                'एयरप्लेन मोड चालू/बंद करें',
                'अपना फोन पुनरारंभ करें',
                'नेटवर्क कवरेज जांचें'
              ],
              moreHelp: 'अधिक सहायता चाहिए?',
              moreHelpText: 'यदि ये चरण काम नहीं करते हैं, तो आप अपने इंटरनेट सेवा प्रदाता को कॉल कर सकते हैं या परिवार के किसी सदस्य से मदद मांग सकते हैं।',
              callSupport: 'तकनीकी सहायता को कॉल करें'
            }
          },

          // Companionship Translations (Hindi)
          companionship: {
            title: "सहयोग से चैट करें",
            subtitle: "मैं आपकी बात सुनने और चैट करने के लिए यहां हूं",
            welcomeMessage: "नमस्ते! आज आपको देखकर बहुत खुशी हुई। आप कैसा महसूस कर रहे हैं?",
            moodCheckTitle: "आज आप कैसा महसूस कर रहे हैं?",
            quickRepliesLabel: "त्वरित उत्तर",
            messagePlaceholder: "अपना संदेश यहाँ टाइप करें...",
            moodSelection: "मैं आज {mood} महसूस कर रहा हूँ",
            fallbackResponse: "मैं आपके लिए यहां हूं। क्या आप इस बारे में और बात करना चाहेंगे?",
            errorResponse: "मैं सुनने के लिए यहां हूं। मुझे बताएं कि आप कैसा महसूस कर रहे हैं।",
            quickReplies: {
              feelingGood: "मैं आज अच्छा महसूस कर रहा हूँ",
              tellStory: "मुझे एक कहानी सुनाओ",
              feelingLonely: "मैं अकेला महसूस कर रहा हूँ",
              weather: "मौसम कैसा है?",
              needEncouragement: "मुझे प्रोत्साहन की आवश्यकता है",
              chatAboutFamily: "परिवार के बारे में बात करते हैं"
            },
            moodResponses: {
              happy: "यह सुनकर बहुत अच्छा लगा! आपकी खुशी से मेरा दिन भी खुशनुमा हो गया!",
              grateful: "कृतज्ञता एक सुंदर भावना है। मैं भी हमारे संबंध के लिए आभारी हूँ!",
              peaceful: "शांति अनमोल है। आइए इस शांत क्षण का साथ में आनंद लें।",
              reflective: "चिंतन हमें बढ़ने में मदद करता है। यदि आप अपने विचार साझा करना चाहें तो मैं सुनने के लिए यहां हूं।"
            },
            moods: {
              happy: "खुश",
              grateful: "आभारी",
              peaceful: "शांत",
              reflective: "चिंतनशील"
            }
          }
        }
      }
    }
  });

export default i18n;