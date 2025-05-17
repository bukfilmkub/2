// models/userModel.js
const db = require('./db');

const UserModel = {
  async getUserByUsername(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  async createUser(username, passwordHash) {
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, passwordHash]);
    return result;
  },

  async getUserById(userId) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    return rows[0];
  },

  async updateBalance(userId, newBalance) {
    const [result] = await db.query('UPDATE users SET balance = ? WHERE id = ?', [newBalance, userId]);
    return result;
  },

  async getBalance(userId) {
    const [rows] = await db.query('SELECT balance FROM users WHERE id = ?', [userId]);
    return rows[0]?.balance || 0;
  }
};

module.exports = UserModel;
