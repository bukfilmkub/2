const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getWallet, topUpWallet } = require('../controllers/walletController');

router.get('/:userId', authenticateToken, getWallet);
router.post('/topup', authenticateToken, topUpWallet);

module.exports = router;
