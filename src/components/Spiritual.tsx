import React, { useEffect } from 'react';
import { FaOm, FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import spiritualLogo from '../assets/spirituallogo.jpeg'; // Replace with your logo path
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type AudioItem = {
  title: string;
  src: string;
  description: string;
  duration?: string;
};

// Import audio files
import ramRaksha from '../assets/Shree Ramraksha Stotra - (Raag.Fm).mp3';
import hanumanChalisa from '../assets/Shri Hanuman Chalisa.mp3';
import ganpatiAtharvashirsha from '../assets/Ganpati-Atharvashirsha.mp3';

const spiritualContent: AudioItem[] = [
  {
    title: 'Shri Ram Raksha Stotra',
    src: ramRaksha,
    description: 'Powerful protective chant dedicated to Lord Rama',
    duration: '12:45'
  },
  {
    title: 'Hanuman Chalisa',
    src: hanumanChalisa,
    description: '40-verse devotional hymn to Lord Hanuman',
    duration: '08:30'
  },
  {
    title: 'Ganpati Atharvashirsha',
    src: ganpatiAtharvashirsha,
    description: 'Vedic hymn dedicated to Lord Ganesha',
    duration: '15:20'
  }
];

const Spiritual: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState<number | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const togglePlay = (index: number) => {
    const audioElements = document.getElementsByTagName('audio');
    
    // Pause all other audio elements
    Array.from(audioElements).forEach((audio, i) => {
      if (i !== index) {
        audio.pause();
      }
    });

    setCurrentlyPlaying(currentlyPlaying === index ? null : index);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };


  const floatingOm = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut" as const
      }
    }
  };

  const floatingOmWave = (delay: number) => ({
    y: [0, -10, 0],
    transition: {
      delay,
      duration: 8,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut" as const
    }
  });

  const backgroundOmAnimation = {
    y: [0, (Math.random() - 0.5) * 40],
    x: [0, (Math.random() - 0.5) * 40],
    rotate: [0, Math.random() * 360],
    transition: {
      duration: Math.random() * 20 + 10,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "linear" as const
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-indigo-200 text-indigo-900 overflow-hidden">
      {/* Floating Om symbols in background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-indigo-100 opacity-10"
            style={{
              fontSize: `${Math.random() * 50 + 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={backgroundOmAnimation}
          >
            <FaOm />
          </motion.div>
        ))}
      </div>

      {/* Header with Logo */}
      <motion.header 
        className="py-8 px-6 text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center items-center mb-6">
          <motion.img 
            src={spiritualLogo} 
            alt="Spiritual Logo" 
            className="h-24 w-24 object-contain"
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
          <div className="ml-4">
            <motion.h1 
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Divine Chants
            </motion.h1>
            <motion.p 
              className="text-indigo-600 mt-2 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Elevate your consciousness through sacred sounds
            </motion.p>
          </div>
        </div>
        <motion.div 
          className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Introduction */}
        <motion.div 
          className="bg-indigo-50 rounded-2xl p-6 mb-12 border border-indigo-200 shadow-sm"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center">
            <motion.div
              variants={floatingOm}
              animate="animate"
            >
              <FaOm className="text-indigo-600 text-4xl mr-4" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-indigo-800">Sacred Sound Journey</h2>
              <p className="text-indigo-700">
                Immerse yourself in these divine vibrations for peace, protection and spiritual awakening.
                Listen with devotion and an open heart.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Audio Cards */}
        <motion.div 
          className="space-y-8"
          variants={container}
          initial="hidden"
          animate="visible"
          ref={ref}
        >
          {spiritualContent.map((item, index) => (
            <motion.div 
              key={index}
              className={`bg-gradient-to-br rounded-2xl overflow-hidden transition-all duration-300 
                ${currentlyPlaying === index ? 
                  'from-indigo-400 to-indigo-500 shadow-lg shadow-indigo-500/20 text-white' : 
                  'from-white to-indigo-50 hover:shadow-lg hover:shadow-indigo-200/50 text-indigo-800'}
                border ${currentlyPlaying === index ? 'border-indigo-300' : 'border-indigo-100'}`}
              variants={item}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <motion.button 
                    onClick={() => togglePlay(index)}
                    className={`flex-shrink-0 mr-6 text-4xl transition-colors ${
                      currentlyPlaying === index ? 'text-white' : 'text-indigo-600 hover:text-indigo-800'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {currentlyPlaying === index ? <FaPauseCircle /> : <FaPlayCircle />}
                  </motion.button>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-2xl font-bold mb-1 ${
                          currentlyPlaying === index ? 'text-white' : 'text-indigo-800'
                        }`}>{item.title}</h3>
                        <p className={`mb-3 ${
                          currentlyPlaying === index ? 'text-indigo-100' : 'text-indigo-600'
                        }`}>{item.description}</p>
                      </div>
                      {item.duration && (
                        <motion.span 
                          className={`px-3 py-1 rounded-full text-sm ${
                            currentlyPlaying === index ? 
                            'bg-indigo-600 text-indigo-50' : 
                            'bg-indigo-100 text-indigo-700'
                          }`}
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          {item.duration}
                        </motion.span>
                      )}
                    </div>
                    
                    <audio
                      controls
                      className="w-full mt-4"
                      onPlay={() => setCurrentlyPlaying(index)}
                      onPause={() => currentlyPlaying === index && setCurrentlyPlaying(null)}
                    >
                      <source src={item.src} type="audio/mpeg" />
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="py-8 text-center text-indigo-500 text-sm mt-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="container mx-auto px-4">
          <p>May these sacred sounds bring you peace and enlightenment</p>
          <div className="flex justify-center space-x-4 mt-4">
            <motion.div
              animate={floatingOmWave(0)}
            >
              <FaOm className="text-indigo-600" />
            </motion.div>
            <motion.div
              animate={floatingOmWave(0.5)}
            >
              <FaOm className="text-indigo-600" />
            </motion.div>
            <motion.div
              animate={floatingOmWave(1)}
            >
              <FaOm className="text-indigo-600" />
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Spiritual;