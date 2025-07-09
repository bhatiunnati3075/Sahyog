import React, { useState } from 'react';
import { Music, Gamepad2, Smile } from 'lucide-react';

import MusicTab from './music';
import GamesTab from './games';
import JokesTab from './jokes';

const Entertainment: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('music');
  const [displayJokes, setDisplayJokes] = useState<string[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const entertainmentCategories = [
    { id: 'music', label: 'Music', icon: Music },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'jokes', label: 'Jokes', icon: Smile },
  ];

  const speakJoke = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-4xl font-bold mb-2">Entertainment Center</h2>
        <p className="text-xl opacity-90">Fun music, games, and jokes for joy and relaxation!</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-4 bg-white rounded-2xl p-6 shadow-lg">
        {entertainmentCategories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id)}
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              selectedCategory === id 
                ? 'bg-purple-100 text-purple-700 shadow-md transform scale-[1.02]' 
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon size={32} className="mb-2" />
            <span className="text-base font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {selectedCategory === 'music' && (
          <MusicTab
            currentlyPlaying={currentlyPlaying}
            setCurrentlyPlaying={setCurrentlyPlaying}
          />
        )}
        {selectedCategory === 'games' && <GamesTab />}
        {selectedCategory === 'jokes' && (
          <JokesTab
            speakJoke={speakJoke}
            displayJokes={displayJokes}
            setDisplayJokes={setDisplayJokes}
          />
        )}
      </div>
    </div>
  );
};

export default Entertainment;