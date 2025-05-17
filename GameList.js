// frontend/components/GameList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get('/api/games');
        setGames(res.data);
      } catch (err) {
        console.error('Error fetching games:', err);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {games.map((game) => (
        <div key={game.id} className="bg-white rounded-xl shadow p-4">
          <img src={game.thumbnail} alt={game.name} className="w-full h-32 object-cover rounded" />
          <h3 className="text-lg font-semibold mt-2">{game.name}</h3>
          <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            เล่นเลย
          </button>
        </div>
      ))}
    </div>
  );
};

export default GameList;
