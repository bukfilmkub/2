// WalletPanel.js (React Component) - Updated with fallback UI
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WalletPanel = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchBalance();
    fetchHistory();
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await axios.get('/api/wallet/balance');
      setBalance(res.data.balance);
    } catch (err) {
      console.error('Error fetching balance', err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/wallet/history');
      if (Array.isArray(res.data.transactions)) {
        setHistory(res.data.transactions);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error('Error fetching transaction history', err);
      setHistory([]);
    }
  };

  const handleDeposit = async () => {
    try {
      await axios.post('/api/wallet/deposit', { amount });
      fetchBalance();
      fetchHistory();
    } catch (err) {
      console.error('Deposit failed', err);
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.post('/api/wallet/withdraw', { amount });
      fetchBalance();
      fetchHistory();
    } catch (err) {
      console.error('Withdraw failed', err);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Wallet</h2>
      <p className="mb-2">Current Balance: ฿{balance}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 rounded w-full mb-2"
        placeholder="Amount"
      />
      <div className="flex gap-2 mb-4">
        <button onClick={handleDeposit} className="bg-green-500 text-white px-4 py-2 rounded">
          Deposit
        </button>
        <button onClick={handleWithdraw} className="bg-red-500 text-white px-4 py-2 rounded">
          Withdraw
        </button>
      </div>
      <h3 className="font-semibold mb-2">Transaction History</h3>
      {history.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {history.map((tx, i) => (
            <li key={i} className="border-b py-1">
              {tx.type}: ฿{tx.amount} on {new Date(tx.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WalletPanel;
