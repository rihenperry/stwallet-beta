var express = require('express')
var router = express.Router()

var mw = require('../config/middleware');
var search = require('../api/search');

router.post('/addSearchEarning', mw.checkEmail, search.addSearchEarning);                           // Add Keyword Search Earning For User API
router.post('/deductSearchEarning', mw.checkEmail, search.deductSearchEarning);                     // Deduct Keyword Search Earning For User API
router.post('/deductQualifiedSearches', mw.checkEmail, search.deductQualifiedSearches);				// Deduct Qualified Searches For User API
router.post('/addunQualifiedSearches', mw.checkEmail, search.addunQualifiedSearches);				// Add UnQualified Searches For User API
router.post('/updateLastHourValue', mw.checkEmail, search.updateLastHourValue);	// Update Last Hour Timing For User API
router.post('/recentSearches', mw.checkEmail, search.recentSearches); // Add Recent Searches For User API
router.post('/checkExistanceEmail', mw.checkEmail, search.checkExistanceEmail);						// Check Email Existance API

module.exports = router
