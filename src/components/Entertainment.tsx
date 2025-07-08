import React, { useState } from 'react';
import { 
  Music, 
  BookOpen, 
  Radio, 
  Gamepad2, 
  Newspaper, 
  Heart,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Smile,
  Users,
  Star
} from 'lucide-react';

const Entertainment: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('stories');

  const stories = [
    {
      id: '1',
      title: 'The Wise Old Banyan Tree',
      description: 'A heartwarming tale from the village',
      duration: '15 min',
      category: 'Folk Tales'
    },
    {
      id: '2',
      title: 'Birbal Ki Khichdi',
      description: 'A clever story from Akbar-Birbal',
      duration: '12 min',
      category: 'Classic'
    },
    {
      id: '3',
      title: 'The Golden Mangoes',
      description: 'A moral story about kindness',
      duration: '18 min',
      category: 'Moral Stories'
    }
  ];

  const songs = [
    {
      id: '1',
      title: 'Lag Ja Gale',
      artist: 'Lata Mangeshkar',
      album: 'Woh Kaun Thi',
      year: '1964'
    },
    {
      id: '2',
      title: 'Pyar Kiya To Darna Kya',
      artist: 'Lata Mangeshkar',
      album: 'Mughal-E-Azam',
      year: '1960'
    },
    {
      id: '3',
      title: 'Ae Mere Watan Ke Logo',
      artist: 'Lata Mangeshkar',
      album: 'Patriotic',
      year: '1963'
    }
  ];

  const games = [
    {
      id: '1',
      title: 'Memory Cards',
      description: 'Match pairs to improve memory',
      difficulty: 'Easy'
    },
    {
      id: '2',
      title: 'Word Search',
      description: 'Find hidden words in the grid',
      difficulty: 'Medium'
    },
    {
      id: '3',
      title: 'Number Puzzle',
      description: 'Simple number puzzles',
      difficulty: 'Easy'
    }
  ];

  const jokes = [
    "बेटा ने पापा से पूछा: 'पापा, मम्मी कहाँ है?'\nपापा: 'मार्केट गई है।'\nबेटा: 'अच्छा तो अब हम पार्टी कर सकते हैं!'",
    
    "डॉक्टर: 'आपको रोज़ाना टहलना चाहिए।'\nमरीज़: 'डॉक्टर साहब, मैं तो रोज़ बीवी के पीछे भागता हूँ!'\nडॉक्टर: 'वो तो ठीक है, लेकिन कभी पकड़ना भी चाहिए!'",
    
    "पत्नी: 'आज खाना बहुत स्वादिष्ट बना है ना?'\nपति: 'हाँ, आज तुमने कम नमक डाला है।'"
  ];

  const togglePlay = (id: string) => {
    setCurrentlyPlaying(currentlyPlaying === id ? null : id);
  };

  const renderStories = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stories.map((story) => (
        <div key={story.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h4>
              <p className="text-gray-600 text-lg mb-3">{story.description}</p>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {story.category}
                </span>
                <span className="text-gray-500 text-sm">{story.duration}</span>
              </div>
              <button
                onClick={() => togglePlay(story.id)}
                className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                {currentlyPlaying === story.id ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
                <span>{currentlyPlaying === story.id ? 'Pause' : 'Listen'}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMusic = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Classic Hindi Songs</h3>
        <div className="space-y-4">
          {songs.map((song) => (
            <div key={song.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <button
                onClick={() => togglePlay(song.id)}
                className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors duration-200"
              >
                {currentlyPlaying === song.id ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{song.title}</h4>
                <p className="text-gray-600">{song.artist} • {song.album} ({song.year})</p>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Radio Stations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['AIR FM Gold', 'Radio Mirchi Purani Jeans', 'Vividh Bharati', 'FM Rainbow'].map((station, index) => (
            <button
              key={index}
              className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-orange-50 rounded-lg transition-colors duration-200"
            >
              <Radio className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-medium text-gray-800">{station}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <div key={game.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Gamepad2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">{game.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                game.difficulty === 'Easy' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {game.difficulty}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-lg mb-4">{game.description}</p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-3 rounded-lg transition-colors duration-200">
            Play Now
          </button>
        </div>
      ))}
    </div>
  );

  const renderJokes = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jokes.map((joke, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Smile className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{joke}</p>
              <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                😄 Funny!
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const categories = [
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'jokes', label: 'Jokes', icon: Smile }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-8 text-white">
        <h2 className="text-4xl font-bold mb-4">Entertainment Center</h2>
        <p className="text-xl">Stories, music, games, and laughter await you!</p>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={`flex flex-col items-center p-6 rounded-xl transition-all duration-200 ${
                selectedCategory === id
                  ? 'bg-purple-100 text-purple-700 shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-12 w-12 mb-3" />
              <span className="text-lg font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div>
        {selectedCategory === 'stories' && renderStories()}
        {selectedCategory === 'music' && renderMusic()}
        {selectedCategory === 'games' && renderGames()}
        {selectedCategory === 'jokes' && renderJokes()}
      </div>

      {/* Now Playing Bar */}
      {currentlyPlaying && (
        <div className="fixed bottom-24 left-6 right-6 bg-white rounded-2xl p-4 shadow-2xl border-2 border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <Music className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-800">Now Playing</p>
              <p className="text-gray-600">Content ID: {currentlyPlaying}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-purple-600">
                <SkipForward className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentlyPlaying(null)}
                className="p-2 text-gray-600 hover:text-red-600"
              >
                <Pause className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Entertainment