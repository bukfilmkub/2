// controllers/rankingController.js
const db = require('../db/mysql');

exports.getTopPlayers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT username, SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) AS total_deposit,
             SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END) AS total_withdraw,
             balance
      FROM users
      LEFT JOIN transactions ON users.id = transactions.user_id
      GROUP BY users.id
      ORDER BY balance DESC
      LIMIT 10
    `);
    res.json({ topPlayers: rows });
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
  }
};
