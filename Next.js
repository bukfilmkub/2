// ตัวอย่างโครงสร้าง Next.js พร้อม Redux และ Theme Toggle

// pages/_app.js
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '@/store';
import Header from '@/components/Header';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import walletReducer from './walletSlice';
import leaderboardReducer from './leaderboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;

// components/Header.js
import React from 'react';
import { useTheme } from 'next-themes';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
      <h1 className="text-lg font-bold">Game Wallet</h1>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Theme
      </button>
    </header>
  );
};

export default Header;

// styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white dark:bg-gray-900 text-gray-900 dark:text-white;
}
