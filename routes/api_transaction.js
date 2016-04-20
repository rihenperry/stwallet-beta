var express = require('express');
var router = express.Router();

var mw = require('../config/middleware');

var W_transaction = require('../api/transaction');

router.post('/insertUserTransaction', W_transaction.insertUserTransaction);	                // Insert User TransaccreditPoolAmountKeywordstion API
router.post('/getUsersTotalTransactions', mw.checkEmail, W_transaction.getUsersTotalTransactions);         // Get Total Count Transactions of User API
router.post('/transactions', mw.checkEmail, W_transaction.getTransactions);								// Get Transactions API

module.exports = router;
