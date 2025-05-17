const db = require('../config/db');

const checkRefreshTokenInDB = async (token) => {
  const [rows] = await db.execute('SELECT * FROM refresh_tokens WHERE token = ?', [token]);
  return rows.length > 0;
};

const saveRefreshToken = async (userId, token) => {
  await db.execute('INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)', [userId, token]);
};

module.exports = { checkRefreshTokenInDB, saveRefreshToken };
