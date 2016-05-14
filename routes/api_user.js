var express = require('express');
var router1 = express.Router();

var mw = require('../config/middleware');

var user = require('../api/user')

router1.use(function(req, res, next) {
  // exempt this api from email middleware check
  log.info(req.path);
  if (((req.path.match(/^\/rejectBlockedBids/)) ||
      (req.path.match(/^\/refCode/)))  !== null) {
    next();
  } else {
    mw.checkEmail(req, res, next);
  }
});


// Profile Related API
router1.post('/register', user.secureRegister);     // User Register API
router1.post('/verify', user.verifyAccount);							 // Verify Email API
router1.post('/reverify', mw.checkFlag, user.secureResendVerification);     // Resend Verification Link API
router1.post('/login', user.secureLogin);						         // Login API
router1.post('/userdetails', user.getDetails);							         // Get Details API
router1.post('/setUserDetails', user.setUserDetails);         // Set User Details API
router1.post('/currencyPrefrence', user.currencyPrefrence);   // Currency Preference API
router1.post('/forgotPassword', user.secureForgotPassword);   // Forgot Password API
router1.post('/resetpassword', user.resetpassword);				   // Reset New Password API
router1.post('/changePassword', user.changePassword);			   // Change Password API
router1.post('/setAppId', user.setAppId);                     // Set App Id API
router1.post('/getAppId', user.getAppId);                     // Get USer's App Id
router1.post('/editProfilePic', user.editProfilePic);				 // Edit Profile Picture API

// Account Related API
router1.post('/creditAmount', user.creditUserAmount);			   // Credit User Amount API
router1.post('/deductAmount', user.deductUserAmount);         // Deduct User Amount API
router1.post('/addPurchases', user.addPurchases);             // Add Purchases To User Account API
router1.post('/deductPurchases', user.deductPurchases);			 // Deduct Purchases From User Account API
router1.post('/addCashback', user.addCashback);					     // Add Cashback To User Account API
router1.post('/deductCashback', user.deductCashback);         // Deduct Cashback From User Account API
router1.post('/addAffEarning', user.addAffEarning);        // Add Affiliate Earning To User Account API
router1.post('/deductAffEarning', user.deductAffEarning);  // Deduct Affiliate Earning From User Account API
router1.post('/addSales', user.addSales);		              // Add Sale To User Account API
router1.post('/deductSales', user.deductSales);					  // Deduct Sale From User Account API
router1.post('/addTrade', user.addTrade);						      // Add Trade To User Account API
router1.post('/deductTrade', user.deductTrade);					  // Deduct Trade From User Account API
router1.post('/addTotalKeywordIncome', user.addTotalKeywordIncome);  // Add User Total Keyword Income API
router1.post('/deductTotalKeywordIncome', user.deductTotalKeywordIncome);   // Deduct User Total Keyword Income API
router1.post('/addBlockedPendingWithdrawals', user.addBlockedPendingWithdrawals);			// Add Bloked Pending Withdrawals To User Account API
router1.post('/deductBlockedPendingWithdrawals', user.deductBlockedPendingWithdrawals);		// Deduct Bloked Pending Withdrawals From User Account API
router1.post('/addApprovedWithdrawals', user.addApprovedWithdrawals);						// Add Approved Withdrawal To User Account API
router1.post('/deductApprovedWithdrawals', user.deductApprovedWithdrawals);					// Deduct Approved Withdrawal From User Account API
router1.post('/addRenewalFees', user.addRenewalFees);										// Add RenewaL Fess API
router1.post('/deductRenewalFees', user.deductRenewalFees);							// Deduct RenewaL Fess API
router1.post('/addTotalAppIncome', user.addTotalAppIncome);            // Add User Total App Income API
router1.post('/addSearchAffEarning', user.addSearchAffEarning);	// Add User's Search Affiliate Earning API
router1.post('/firstBuy', user.firstBuy);					// FirstBuy API
router1.post('/addBlockedForBids', user.addBlockedForBids);		// Add Blocked For Bids API
router1.post('/deductBlockedForBids', user.deductBlockedForBids);			// Deduct Blocked Bids API
router1.post('/rejectBlockedBids', user.rejectBlockedBids);            // Reject Blocked Bids API (In cases of Accept bid and Buy now)
//router.post('/secure/updateNotificationStatus', user.updateNotificationStatus);  // Update User's Notification Status API
//router.post('/secure/getNotificationStatus', user.getNotificationStatus);       // Get Notification Status
router1.post('/setFavouriteAppIds', user.setFavouriteAppIds); // Set User's Favourite App Id
router1.post('/refCode', user.refCode)

module.exports = router1;
