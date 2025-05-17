import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeaderboard } from '../store/leaderboardSlice';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { players, loading, error } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">อันดับผู้เล่น</h2>
      {loading && <p>กำลังโหลด...</p>}
      {error && <p className="text-red-500">เกิดข้อผิดพลาด: {error}</p>}
      {!loading && !error && (
        <ul>
          {players.map((player, index) => (
            <li key={player.id} className="border-b py-2 flex justify-between">
              <span>{index + 1}. {player.username}</span>
              <span className="font-semibold">{player.score}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
