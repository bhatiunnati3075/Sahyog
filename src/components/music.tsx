import React, { useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface MusicProps {
  currentlyPlaying: string | null;
  setCurrentlyPlaying: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  audioSrc: string;
}

const songs: Song[] = [
  { 
    id: '1', 
    title: 'Lag Ja Gale', 
    artist: 'Lata Mangeshkar', 
    album: 'Woh Kaun Thi', 
    year: '1964',
    audioSrc: '/assets/Lag Ja Gale (Arijit Singh Version) - 320Kbps-(Mr-Jat.in).mp3'
  },
  { 
    id: '2', 
    title: 'Pal pal dil ke pass', 
    artist: 'Lata Mangeshkar', 
    album: 'Mughal-E-Azam', 
    year: '1960',
    audioSrc: '/assets/Pal Pal Dil Ke Paas I-(Mr-Jat.in).mp3'
  },
  { 
    id: '3', 
    title: 'Neele Neele Ambar parr', 
    artist: 'Lata Mangeshkar', 
    album: 'Patriotic', 
    year: '1963',
    audioSrc: '/assets/Neele Neele Ambar Par Kishore Kumar-(Mr-Jat.in).mp3'
  },
];

const MusicTab: React.FC<MusicProps> = ({ currentlyPlaying, setCurrentlyPlaying }) => {
  const audioRefs = useRef<{[key: string]: HTMLAudioElement | null}>({});

  useEffect(() => {
    // Pause all other audio when a new one plays
    Object.keys(audioRefs.current).forEach(id => {
      if (id !== currentlyPlaying && audioRefs.current[id]) {
        audioRefs.current[id]?.pause();
      }
    });

    // Play the current audio if it exists
    if (currentlyPlaying && audioRefs.current[currentlyPlaying]) {
      audioRefs.current[currentlyPlaying]?.play();
    }
  }, [currentlyPlaying]);

  const handlePlayPause = (songId: string) => {
    if (currentlyPlaying === songId) {
      // Pause current song
      audioRefs.current[songId]?.pause();
      setCurrentlyPlaying(null);
    } else {
      // Play new song
      setCurrentlyPlaying(songId);
    }
  };

  return (
    <div className="space-y-6">
      {songs.map((song) => (
        <div key={song.id} className="relative flex items-center space-x-4 bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow">
          {/* Hidden audio element */}
          <audio
            ref={(el) => (audioRefs.current[song.id] = el)}
            src={song.audioSrc}
            onEnded={() => setCurrentlyPlaying(null)}
          />
          
          {/* Play/Pause button */}
          <button
            onClick={() => handlePlayPause(song.id)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors"
            aria-label={currentlyPlaying === song.id ? 'Pause' : 'Play'}
          >
            {currentlyPlaying === song.id ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          {/* Song info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-lg truncate">{song.title}</h4>
            <p className="text-sm text-gray-600 truncate">
              {song.artist} • {song.album} ({song.year})
            </p>
          </div>
          
          {/* Now playing indicator */}
          {currentlyPlaying === song.id && (
            <div className="absolute top-2 right-2 flex items-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <span className="ml-2 text-xs text-orange-600">Playing</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MusicTab;