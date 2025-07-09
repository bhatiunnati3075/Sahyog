import React, { useState, useEffect, useRef } from 'react';
import {
  Music,
  BookOpen,
  Gamepad2,
  Newspaper,
  Play,
  Pause,
  Smile,
  RefreshCw,
} from 'lucide-react';
import axios from 'axios';

const Entertainment: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('stories');
  const [news, setNews] = useState<any[]>([]);
  const [displayJokes, setDisplayJokes] = useState<string[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsCategory, setNewsCategory] = useState('general');
  const [lastNewsUpdate, setLastNewsUpdate] = useState<string>('');
  const newsRefreshInterval = useRef<NodeJS.Timeout>();

  // Jokes database
  const allJokes = [
    'टीचर: सुबह जल्दी उठने के क्या फायदे हैं?\nबच्चा: जी नींद पूरी हो जाती है।',
    'पत्नी: सुनिए जी, अगर मैं खो जाऊं तो आप क्या करेंगे?\nपति: अखबार में इश्तिहार दूंगा।\nपत्नी: क्या लिखेंगे?\nपति: जो खोया है वही पाएगा, कृपया वापस न करें।',
    'पप्पू: डॉक्टर साहब, भूलने की बीमारी हो गई है।\nडॉक्टर: कब से?\nपप्पू: कब से क्या?',
    'गोलू: मम्मी, मुझे स्कूल नहीं जाना।\nमम्मी: क्यों बेटा?\nगोलू: आज छुट्टी है।',
    'पति: चाय में शक्कर नहीं है।\nपत्नी: मुस्कुराकर पी लो, मीठी लगने लगेगी।',
    'बेटा: मम्मी, आपने मेरा टिफिन क्यों नहीं दिया?\nमम्मी: बेटा, आज तो रविवार है।',
    'राजू: पापा, आप क्या करते हैं?\nपापा: बेटा, मैं वही करता हूं जो मम्मी कहती है।',
    'टीचर: एक समझदार व्यक्ति कौन होता है?\nछात्र: जो पत्नी के सामने चुप रहना जानता है।',
    'दादी: पहले हमारे ज़माने में मोबाइल नहीं था।\nपोता: दादी, तब आप लोग कैसे झगड़ा करते थे?',
    'पंडित जी: विवाह जीवन का दूसरा जन्म है।\nदूल्हा: पहला जन्म क्या जेल था?',
  ];

  // Content databases
  const stories = [
    { id: '1', title: 'The Wise Old Banyan Tree', description: 'A heartwarming tale from the village', duration: '15 min', category: 'Folk Tales' },
    { id: '2', title: 'Birbal Ki Khichdi', description: 'A clever story from Akbar-Birbal', duration: '12 min', category: 'Classic' },
    { id: '3', title: 'The Golden Mangoes', description: 'A moral story about kindness', duration: '18 min', category: 'Moral Stories' },
  ];

  const songs = [
    { id: '1', title: 'Lag Ja Gale', artist: 'Lata Mangeshkar', album: 'Woh Kaun Thi', year: '1964' },
    { id: '2', title: 'Pyar Kiya To Darna Kya', artist: 'Lata Mangeshkar', album: 'Mughal-E-Azam', year: '1960' },
    { id: '3', title: 'Ae Mere Watan Ke Logo', artist: 'Lata Mangeshkar', album: 'Patriotic', year: '1963' },
  ];

  const games = [
    { id: '1', title: 'Memory Cards', description: 'Match pairs to improve memory', difficulty: 'Easy' },
    { id: '2', title: 'Word Search', description: 'Find hidden words in the grid', difficulty: 'Medium' },
    { id: '3', title: 'Number Puzzle', description: 'Simple number puzzles', difficulty: 'Easy' },
  ];

  const newsCategories = [
    { id: 'general', label: 'General' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Tech' },
    { id: 'health', label: 'Health' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'sports', label: 'Sports' },
  ];

  const entertainmentCategories = [
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'jokes', label: 'Jokes', icon: Smile },
    { id: 'news', label: 'News', icon: Newspaper },
  ];

  // Fetch news from API
  const fetchNews = async () => {
    try {
      setIsLoadingNews(true);
      
      // Try primary news source (NewsAPI)
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=in&category=${newsCategory}&pageSize=5`,
          {
            headers: {
              'X-Api-Key': 'a9e1eba32f49437aa669a50c07071bd3'
            }
          }
        );
        
        if (res.data?.articles?.length) {
          setNews(res.data.articles);
          setLastNewsUpdate(new Date().toLocaleTimeString());
          return;
        }
      } catch (primaryError) {
        console.log('Primary news API failed, trying fallback');
      }
      
      // Fallback to NewsData.io
      try {
        const fallbackRes = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_5c2a1e656ed24feb8edcf033eeb9c019&country=in&language=en&category=${newsCategory}`
        );
        setNews(fallbackRes.data.results.slice(0, 5));
        setLastNewsUpdate(new Date().toLocaleTimeString());
      } catch (fallbackError) {
        console.error('Both news APIs failed:', fallbackError);
        // If both APIs fail, show cached news if available
        if (news.length === 0) {
          setNews([{
            title: 'Could not load latest news. Please try again later.',
            url: '#',
            publishedAt: new Date().toISOString(),
            description: 'There was an error fetching the latest news updates.'
          }]);
        }
      }
    } finally {
      setIsLoadingNews(false);
    }
  };

  // Set up auto-refresh for news
  useEffect(() => {
    if (selectedCategory === 'news') {
      fetchNews(); // Initial fetch
      
      // Refresh every 5 minutes (300000 ms)
      newsRefreshInterval.current = setInterval(fetchNews, 300000);
      
      return () => {
        if (newsRefreshInterval.current) {
          clearInterval(newsRefreshInterval.current);
        }
      };
    }
  }, [selectedCategory, newsCategory]);

  // Change jokes randomly
  const changeJokes = () => {
    const shuffled = [...allJokes].sort(() => 0.5 - Math.random());
    setDisplayJokes(shuffled.slice(0, 4));
  };

  // Initialize jokes when jokes category is selected
  useEffect(() => {
    if (selectedCategory === 'jokes') {
      changeJokes();
    }
  }, [selectedCategory]);

  // Text-to-speech for jokes
  const speakJoke = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Render different content sections
  const renderStories = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stories.map((story) => (
        <div key={story.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h4>
          <p className="text-gray-600 text-lg mb-2">{story.description}</p>
          <div className="text-sm text-gray-500 mb-4">{story.duration} • {story.category}</div>
          <button 
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(`${story.title}. ${story.description}`);
              window.speechSynthesis.speak(utterance);
            }}
          >
            Listen to Story
          </button>
        </div>
      ))}
    </div>
  );

  const renderMusic = () => (
    <div className="space-y-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow">
          <button 
            onClick={() => setCurrentlyPlaying(currentlyPlaying === song.id ? null : song.id)} 
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors"
          >
            {currentlyPlaying === song.id ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-lg truncate">{song.title}</h4>
            <p className="text-sm text-gray-600 truncate">{song.artist} • {song.album} ({song.year})</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGames = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <div key={game.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-xl font-bold mb-2">{game.title}</h4>
          <p className="text-gray-600 mb-4">{game.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Difficulty: {game.difficulty}</span>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
              Play
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderJokes = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={changeJokes}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw size={18} />
          Get New Jokes
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayJokes.map((joke, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full flex-shrink-0">
                <Smile size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-lg text-gray-700 whitespace-pre-line mb-4">{joke}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => speakJoke(joke)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    🔊 Hear Joke
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(joke);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow">
        <div className="flex flex-wrap gap-2">
          {newsCategories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setNewsCategory(id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                newsCategory === id 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastNewsUpdate || 'Never'}
          </span>
          <button 
            onClick={fetchNews}
            disabled={isLoadingNews}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-blue-400 transition-colors"
          >
            <RefreshCw size={18} className={`${isLoadingNews ? 'animate-spin' : ''}`} />
            {isLoadingNews ? 'Loading...' : 'Refresh News'}
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {isLoadingNews ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {news.length > 0 ? (
              news.map((article, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <a 
                    href={article.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block hover:bg-gray-50 p-3 rounded-lg transition"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{article.title}</h3>
                        <p className="text-gray-600 mb-2">{article.description}</p>
                        <div className="text-sm text-gray-500">
                          {article.source?.name || 'Unknown source'} • {new Date(article.publishedAt).toLocaleString()}
                        </div>
                      </div>
                      {article.urlToImage && (
                        <div className="w-full md:w-32 h-32 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={article.urlToImage} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No news articles found. Please try refreshing.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-4xl font-bold mb-2">Entertainment Center</h2>
        <p className="text-xl opacity-90">Fun stories, music, games, and more for joy and relaxation!</p>
      </div>

      {/* Category Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white rounded-2xl p-6 shadow-lg">
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

      {/* Content Area */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {selectedCategory === 'stories' && renderStories()}
        {selectedCategory === 'music' && renderMusic()}
        {selectedCategory === 'games' && renderGames()}
        {selectedCategory === 'jokes' && renderJokes()}
        {selectedCategory === 'news' && renderNews()}
      </div>
    </div>
  );
};

export default Entertainment;