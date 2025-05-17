// components/Header.js
import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow">
      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
        <Link href="/">MyApp</Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/wallet" className="text-gray-700 dark:text-gray-200">Wallet</Link>
        <Link href="/leaderboard" className="text-gray-700 dark:text-gray-200">Leaderboard</Link>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
