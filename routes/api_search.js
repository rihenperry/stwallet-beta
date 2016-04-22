var express = require('express')
var router = express.Router()

var search = require('../api/search')

router.post('/addSearchEarning', search.addSearchEarning) // Add Keyword Search Earning For User API
router.post('/deductSearchEarning', search.deductSearchEarning) // Deduct Keyword Search Earning For User API
router.post('/deductQualifiedSearches', search.deductQualifiedSearches) // Deduct Qualified Searches For User API
router.post('/addunQualifiedSearches', search.addunQualifiedSearches) // Add UnQualified Searches For User API
router.post('/updateLastHourValue', search.updateLastHourValue) // Update Last Hour Timing For User API
router.post('/recentSearches', search.recentSearches) // Add Recent Searches For User API
router.post('/checkExistanceEmail', search.checkExistanceEmail) // Check Email Existance API

module.exports = router
