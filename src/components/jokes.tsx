import React, { useState, useEffect } from 'react';
import { RefreshCw, Volume2 } from 'lucide-react';

interface JokesProps {
  speakJoke: (text: string) => void;
  displayJokes: string[];
  setDisplayJokes: React.Dispatch<React.SetStateAction<string[]>>;
}

const allJokes = [
  'टीचर: बताओ बच्चो, अगर धरती से सोना निकालें तो क्या बचेगा? छात्र: सर गड्ढा!',
  'डॉक्टर: अब पहले से कैसे हो? मरीज: पहले से ज्यादा बीमार हूं!',
  'पप्पू: मम्मी मुझसे शादी नहीं करनी! मम्मी: क्यों बेटा? पप्पू: बीवी भी ऑनलाइन मिलती होगी!',
  'पत्नी: सुनिए, आप बदल क्यों नहीं जाते? पति: अच्छा, लो मैं बन गया कुतुबमीनार!',
  'डॉक्टर: वजन कैसे घटा रहे हो? मरीज: मोबाइल में बैलेंस नहीं है, पैदल चल रहा हूं!',
  'टीचर: सबसे तेज़ कौन दौड़ सकता है? छात्र: मोबाइल की बैटरी!',
  'पप्पू: शादी करूं या IAS की तैयारी? दोस्त: दोनों ही मुश्किल हैं भाई!',
  'टीचर: पढ़ते क्यों नहीं? छात्र: ताकि बड़े होकर पढ़ाई से बदला ले सकूं!',
  'पत्नी: मुझे कुछ दिन मायके भेज दो। पति: लो जी, जिंदगी ही भेज देता हूं!',
  'मरीज: डॉक्टर साहब मुझे भूलने की बीमारी हो गई है! डॉक्टर: कब से? मरीज: कब से क्या?',
  'टीचर: जो काम तुम कल कर सकते हो, उसे आज क्यों करते हो? छात्र: ताकि टीचर डांटे ना!',
];

const getRandomJokes = (count = 5) => {
  const shuffled = [...allJokes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Jokes: React.FC<JokesProps> = ({ speakJoke, displayJokes, setDisplayJokes }) => {
  const refreshJokes = () => {
    setDisplayJokes(getRandomJokes());
  };

  useEffect(() => {
    if (displayJokes.length === 0) {
      refreshJokes();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={refreshJokes}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mx-auto"
        >
          <RefreshCw size={18} /> Refresh Jokes
        </button>
      </div>
      <div className="space-y-4">
        {displayJokes.map((joke, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-start"
          >
            <p className="text-gray-800">{joke}</p>
            <button
              onClick={() => speakJoke(joke)}
              className="text-blue-500 hover:text-blue-600"
              title="Speak"
            >
              <Volume2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jokes;
