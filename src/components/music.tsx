import React from 'react';
import { Play, Pause } from 'lucide-react';

interface MusicProps {
  currentlyPlaying: string | null;
  setCurrentlyPlaying: React.Dispatch<React.SetStateAction<string | null>>;
}

const songs = [
  { id: '1', title: 'Lag Ja Gale', artist: 'Lata Mangeshkar', album: 'Woh Kaun Thi', year: '1964' },
  { id: '2', title: 'Pyar Kiya To Darna Kya', artist: 'Lata Mangeshkar', album: 'Mughal-E-Azam', year: '1960' },
  { id: '3', title: 'Ae Mere Watan Ke Logo', artist: 'Lata Mangeshkar', album: 'Patriotic', year: '1963' },
];

const MusicTab: React.FC<MusicProps> = ({ currentlyPlaying, setCurrentlyPlaying }) => {
  return (
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
            <p className="text-sm text-gray-600 truncate">
              {song.artist} • {song.album} ({song.year})
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicTab;
