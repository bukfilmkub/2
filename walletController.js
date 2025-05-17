// controllers/walletController.js
const db = require('../db/mysql');

exports.deposit = async (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || !amount || isNaN(amount)) {
    return res.status(400).json({ message: 'ข้อมูลไม่ถูกต้อง' });
  }
  try {
    await db.query('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, userId]);
    await db.query('INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)', [userId, 'deposit', amount]);
    res.json({ message: 'เติมเงินสำเร็จ' });
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
  }
};

exports.withdraw = async (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || !amount || isNaN(amount)) {
    return res.status(400).json({ message: 'ข้อมูลไม่ถูกต้อง' });
  }
  try {
    const [rows] = await db.query('SELECT balance FROM users WHERE id = ?', [userId]);
    const user = rows[0];
    if (!user || user.balance < amount) {
      return res.status(400).json({ message: 'ยอดเงินไม่พอ' });
    }
    await db.query('UPDATE users SET balance = balance - ? WHERE id = ?', [amount, userId]);
    await db.query('INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)', [userId, 'withdraw', amount]);
    res.json({ message: 'ถอนเงินสำเร็จ' });
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
  }
};
// controllers/walletController.js
const db = require('../db/mysql');

exports.deposit = async (req, res) => {
  // ... เดิม
};

exports.withdraw = async (req, res) => {
  // ... เดิม
};

exports.getTransactionHistory = async (req, res) => {
  // ... เดิม
};

exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query('SELECT balance FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ balance: rows[0].balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
