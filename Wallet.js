// frontend/components/Wallet.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '../store/walletSlice';

const Wallet = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.wallet.balance);
  const status = useSelector((state) => state.wallet.status);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">กระเป๋าเงินของคุณ</h2>
      {status === 'loading' ? (
        <p>กำลังโหลด...</p>
      ) : (
        <p>ยอดเงินคงเหลือ: {balance} บาท</p>
      )}
    </div>
  );
};

export default Wallet;
