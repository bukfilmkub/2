// controllers/gameController.js
const db = require('../db/mysql');

exports.launchGame = async (req, res) => {
  const { userId, gameCode } = req.body;
  if (!userId || !gameCode) {
    return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน' });
  }
  try {
    const [userRows] = await db.query('SELECT token FROM users WHERE id = ?', [userId]);
    if (!userRows.length) return res.status(404).json({ message: 'ไม่พบผู้ใช้' });

    const token = userRows[0].token;
    const launchUrl = `https://brabobet.top/${gameCode}/index.html?operator_token=Zm9saWFiZXQ=&btt=1&t=${token}&or=brabobet.top&api=brabobet.top`;

    await db.query('INSERT INTO game_logs (user_id, game_code) VALUES (?, ?)', [userId, gameCode]);

    res.json({ launchUrl });
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
  }
};
