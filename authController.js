const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const { saveRefreshToken } = require('./tokenController');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashed, 'user']);
  res.json({ message: 'Registered' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const [[user]] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  await saveRefreshToken(user.id, refreshToken);
  res.json({ accessToken, refreshToken });
};
