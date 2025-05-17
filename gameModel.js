// models/gameModel.js
const db = require('./db');

const GameModel = {
  async getAllGames() {
    const [rows] = await db.query('SELECT * FROM games');
    return rows;
  },

  async getGameById(id) {
    const [rows] = await db.query('SELECT * FROM games WHERE id = ?', [id]);
    return rows[0];
  },

  async getTopRanked(limit = 10) {
    const [rows] = await db.query('SELECT * FROM games ORDER BY popularity DESC LIMIT ?', [limit]);
    return rows;
  },

  async addFavorite(userId, gameId) {
    const [result] = await db.query('INSERT INTO favorite_games (user_id, game_id) VALUES (?, ?)', [userId, gameId]);
    return result;
  },

  async getFavorites(userId) {
    const [rows] = await db.query(
      'SELECT g.* FROM games g JOIN favorite_games f ON g.id = f.game_id WHERE f.user_id = ?',
      [userId]
    );
    return rows;
  }
};

module.exports = GameModel;
