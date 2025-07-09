import React, { useState } from 'react';

export const MemoryGame = () => {
  const createCards = () => {
    const base = ['🍎', '🍌', '🍇', '🍓', '🥝', '🍊'];
    const shuffled = [...base, ...base].sort(() => 0.5 - Math.random());
    return shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
  };

  const [cards, setCards] = useState(createCards);
  const [selected, setSelected] = useState<any[]>([]);

  const handleFlip = (card: any) => {
    if (card.flipped || card.matched || selected.length === 2) return;

    const updated = cards.map(c => c.id === card.id ? { ...c, flipped: true } : c);
    const newSelected = [...selected, { ...card, flipped: true }];

    setCards(updated);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setTimeout(() => {
        const [a, b] = newSelected;
        if (a.emoji === b.emoji) {
          setCards(prev => prev.map(c =>
            c.emoji === a.emoji ? { ...c, matched: true } : c
          ));
        } else {
          setCards(prev => prev.map(c =>
            newSelected.some(s => s.id === c.id) ? { ...c, flipped: false } : c
          ));
        }
        setSelected([]);
      }, 1000);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <button onClick={() => { setCards(createCards()); setSelected([]); }} className="bg-blue-500 text-white px-4 py-2 rounded">
        Refresh
      </button>
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleFlip(card)}
            className={`cursor-pointer text-2xl flex items-center justify-center h-16 border rounded bg-gray-100 ${card.flipped || card.matched ? 'bg-white' : ''}`}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </div>
        ))}
      </div>
    </div>
  );
};

export const WordSearch = () => {
  const sampleWords = ['REACT', 'JAVASCRIPT', 'HTML', 'CSS', 'NODE', 'PYTHON', 'TYPESCRIPT'];

  const generateGrid = (word: string) => {
    const grid = Array.from({ length: 10 }, () => Array(10).fill(''));
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * (10 - word.length));
    for (let i = 0; i < word.length; i++) {
      grid[row][col + i] = word[i];
    }
    return grid.map(r => r.map(c => c || String.fromCharCode(65 + Math.floor(Math.random() * 26))));
  };

  const [word, setWord] = useState(sampleWords[Math.floor(Math.random() * sampleWords.length)]);
  const [grid, setGrid] = useState(generateGrid(word));

  const refresh = () => {
    const newWord = sampleWords[Math.floor(Math.random() * sampleWords.length)];
    setWord(newWord);
    setGrid(generateGrid(newWord));
  };

  return (
    <div className="p-4 space-y-4">
      <button onClick={refresh} className="bg-blue-500 text-white px-4 py-2 rounded">Refresh</button>
      <div className="text-2xl font-bold">Find this word: <span className="text-purple-600">{word}</span></div>
      <div className="grid grid-cols-10 gap-1">
        {grid.flat().map((char, i) => (
          <div key={i} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-sm">
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Sudoku = () => {
  const generateSudoku = () => [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ];

  const [grid, setGrid] = useState(generateSudoku());

  return (
    <div className="p-4 space-y-4">
      <button onClick={() => setGrid(generateSudoku())} className="bg-blue-500 text-white px-4 py-2 rounded">Refresh</button>
      <div className="grid grid-cols-9 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              className="w-10 h-10 text-center border rounded"
              value={cell ?? ''}
              readOnly={cell !== null}
            />
          ))
        )}
      </div>
    </div>
  );
};

const GamesTab: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    { id: 'memory', title: 'Memory Game', difficulty: 'Easy', component: <MemoryGame /> },
    { id: 'wordsearch', title: 'Word Search', difficulty: 'Medium', component: <WordSearch /> },
    { id: 'sudoku', title: 'Sudoku', difficulty: 'Medium', component: <Sudoku /> },
  ];

  return (
    <div className="space-y-6">
      {selectedGame ? (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <button
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedGame(null)}
          >
            Close
          </button>
          {games.find(g => g.id === selectedGame)?.component}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-bold mb-2">{game.title}</h4>
              <p className="text-gray-600 mb-4">Difficulty: {game.difficulty}</p>
              <button
                onClick={() => setSelectedGame(game.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Play
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GamesTab;
