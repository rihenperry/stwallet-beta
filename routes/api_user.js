var express = require('express');
var router = express.Router();

var user = require('../api/user');

// Profile Related API
router.post('/secure/register', user.secureRegister);     // User Register API
router.post('/verify', user.verifyAccount);							 // Verify Email API
router.post('/secure/reverify', user.secureResendVerification);     // Resend Verification Link API
router.post('/secure/login', user.secureLogin);						         // Login API
router.post('/userdetails', user.getDetails);							         // Get Details API
router.post('/secure/setUserDetails', user.setUserDetails);         // Set User Details API
router.post('/secure/currencyPrefrence', user.currencyPrefrence);   // Currency Preference API
router.post('/secure/forgotPassword', user.secureForgotPassword);   // Forgot Password API
router.post('/secure/resetpassword', user.resetpassword);				   // Reset New Password API
router.post('/secure/changePassword', user.changePassword);			   // Change Password API
router.post('/secure/setAppId', user.setAppId);                     // Set App Id API
router.post('/secure/getAppId', user.getAppId);                     // Get USer's App Id
router.post('/secure/editProfilePic', user.editProfilePic);				 // Edit Profile Picture API

// Account Related API
router.post('/secure/creditAmount', user.creditUserAmount);			   // Credit User Amount API
router.post('/secure/deductAmount', user.deductUserAmount);         // Deduct User Amount API
router.post('/secure/addPurchases', user.addPurchases);             // Add Purchases To User Account API
router.post('/secure/deductPurchases', user.deductPurchases);			 // Deduct Purchases From User Account API
router.post('/secure/addCashback', user.addCashback);					     // Add Cashback To User Account API
router.post('/secure/deductCashback', user.deductCashback);         // Deduct Cashback From User Account API
router.post('/secure/addAffEarning', user.addAffEarning);        // Add Affiliate Earning To User Account API
router.post('/secure/deductAffEarning', user.deductAffEarning);  // Deduct Affiliate Earning From User Account API
router.post('/secure/addSales', user.addSales);		              // Add Sale To User Account API
router.post('/secure/deductSales', user.deductSales);					  // Deduct Sale From User Account API
router.post('/secure/addTrade', user.addTrade);						      // Add Trade To User Account API
router.post('/secure/deductTrade', user.deductTrade);					  // Deduct Trade From User Account API
router.post('/secure/addTotalKeywordIncome', user.addTotalKeywordIncome);  // Add User Total Keyword Income API
router.post('/secure/deductTotalKeywordIncome', user.deductTotalKeywordIncome);   // Deduct User Total Keyword Income API
router.post('/secure/addBlockedPendingWithdrawals', user.addBlockedPendingWithdrawals);			// Add Bloked Pending Withdrawals To User Account API
router.post('/secure/deductBlockedPendingWithdrawals', user.deductBlockedPendingWithdrawals);		// Deduct Bloked Pending Withdrawals From User Account API
router.post('/secure/addApprovedWithdrawals', user.addApprovedWithdrawals);						// Add Approved Withdrawal To User Account API
router.post('/secure/deductApprovedWithdrawals', user.deductApprovedWithdrawals);					// Deduct Approved Withdrawal From User Account API
router.post('/secure/addRenewalFees', user.addRenewalFees);										// Add RenewaL Fess API
router.post('/secure/deductRenewalFees', user.deductRenewalFees);							// Deduct RenewaL Fess API
router.post('/secure/addTotalAppIncome', user.addTotalAppIncome);            // Add User Total App Income API
router.post('/secure/addSearchAffEarning', user.addSearchAffEarning);	// Add User's Search Affiliate Earning API
router.post('/secure/firstBuy', user.firstBuy);					// FirstBuy API
router.post('/secure/addBlockedForBids', user.addBlockedForBids);		// Add Blocked For Bids API
router.post('/secure/deductBlockedForBids', user.deductBlockedForBids);			// Deduct Blocked Bids API
router.post('/secure/rejectBlockedBids', user.rejectBlockedBids);            // Reject Blocked Bids API (In cases of Accept bid and Buy now)
router.post('/secure/updateNotificationStatus', user.updateNotificationStatus);  // Update User's Notification Status API
router.post('/secure/getNotificationStatus', user.getNotificationStatus);       // Get Notification Status


module.exports = router;
