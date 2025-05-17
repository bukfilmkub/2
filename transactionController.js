// controllers/transactionController.js
const db = require('../db/mysql');

exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const [transactions] = await db.query(
      'SELECT type, amount, created_at FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: 'ไม่สามารถโหลดประวัติธุรกรรมได้', error: err });
  }
};
