var express = require('express')
var router = express.Router()

var mw = require('../config/middleware');
var pool = require('../api/pool');

router.use(function(req, res, next) {
  //exempt this api from passing through defined middleware
  log.info('URL path ->'+ req.path);
  if (((req.path.match(/^\/admin\/resetQualifiedSearches/)) ||
      (req.path.match(/^\/refCode/))) !== null) {
    next();
  } else {
    mw.checkPubSignKey(req, res, next);
  }
});

router.post('/creditPoolAmountKeywords', pool.addTokwdIncome);                              // Add To Keyword Income API
router.post('/deductPoolAmountKeywords', pool.deductFromkwdIncome);                         // Deduct From Keyword Income API
router.post('/addTocashbackOutflow', pool.addTocashbackOutflow);                            // Add To Cashback OutFlow API
router.post('/deductcashbackOutflow', pool.deductcashbackOutflow);                          // Deduct From Cashback OutFlow API
router.post('/addToaffiliateOutflow', pool.addToaffiliateOutflow);                          // Add To Affiliate OutFlow API
router.post('/increaseTotalFeesEarning', pool.increaseTotalFeesEarning);                    // Increase Total Fees Earning API
router.post('/decreaseTotalFeesEarning', pool.decreaseTotalFeesEarning);                    // Decrease Total Fees Earning API
router.post('/addTotalKeywordOwnerPayout', pool.addTotalKeywordOwnerPayout);                // Add Total Keyword Owner Payout API
router.post('/deductTotalKeywordOwnerPayout', pool.deductTotalKeywordOwnerPayout);          // Deduct Total Keyword Owner Payout API
router.post('/addNoOfQualifeidSearches', pool.addNoOfQualifeidSearches);                    // Add Qualified Searches API
router.post('/deductNoOfQualifeidSearches', pool.deductNoOfQualifeidSearches);              // Deduct Qualified Searches API
router.post('/addNoOfunQualifeidSearches', pool.addNoOfunQualifeidSearches);                // Add unQualified Searches API
router.post('/deductNoOfunQualifeidSearches', pool.deductNoOfunQualifeidSearches);          // Deduct Qualified Searches API
router.post('/addAnonymousSearches', pool.addAnonymousSearches);                            // Add Anonymous Search API
router.post('/addAppPayout', pool.addAppPayout);                                            // Add App Payout
router.post('/addSearchTradePayout', pool.addSearchTradePayout);                            // Add Search Trade Payout
router.post('/deductSearchTradePayout', pool.deductSearchTradePayout);                      // Deduct Search Trade Payout
router.post('/addUnsoldKwdRefund', pool.addUnsoldKwdRefund);                                // Add Unsold Keyword Refund
router.post('/getPoolStats', pool.getPoolStats);                                            // Get All Feilds From Pool Table
router.post('/addTotalRenewalFees', pool.addTotalRenewalFees);								// Add Total Renewal Fees API
router.post('/deductTotalRenewalFees', pool.deductTotalRenewalFees);						// Deduct Total Renewal Fees API

module.exports = router
