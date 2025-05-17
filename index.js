// pages/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/authSlice';
import WalletPanel from '../components/WalletPanel';
import Header from '../components/Header';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome{user ? `, ${user.username}` : ''}</h1>
        <WalletPanel />
      </main>
    </div>
  );
};

export default Home;
