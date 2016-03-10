/*global require, module, console */
/*jslint node: true */
"use strict";

// Framwork
var  express     	 = require('express'),      
	 app        	 = express(),
	 nconf 	    	 = require('nconf'),
	 fs         	 = require('fs'),
	 request 		 = require('request'),
     jsonfile        = require('jsonfile'),
     //util            = require('util'),
     // bformat = require('bunyan-format')  ,
// Packages
     bodyParser  	 = require('body-parser'),
     nconf 			 = require('nconf'),
     logger          = require('./config/w_config.js'),
     log             = logger(),

// Pages
	 mongoose        = require('./config/mongoose.js'),          // Moongoose
	 user            = require('./api/user.js'),                 // User API
	 device          = require('./api/device.js'),               // Device API
	 search          = require('./api/search.js'),               // Search API
	 pool            = require('./api/pool'),                    // Get Pool API
	 W_transaction   = require("./api/transaction.js"),          // Transaction API
     admin     	     = require("./api/admin"),  	             // Get Admin API
     cron_api    	 = require("./api/cron_api.js");    	     // Get Admin API

// code to set ENV for node app
var loadconfig = require('./config/w_config.js')

var defaultOptions = loadconfig.DEFAULTS
log.info("Configuration read from the JSON file using nconf is :")
log.info(defaultOptions)

// Middleware
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

// Static Resource in public Folder To Display View
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    log.info('==================================');
    log.info(req.url);
    next();
});

// Router
app.get('/', function (req, res) {
    res.send('Hello Revised Wallet');
});


/*============================== Device Related API ==================================*/

app.post('/api/register', device.deviceRegister);					                           // Device Register API
app.post('/api/getPvtKey', device.getPvtKey);						                           // Get Private Key API

/*============================== User Related API ==================================*/

// Profile Related API
app.post('/secure/register', user.secureRegister);                                              // User Register API
app.post('/verify', user.verifyAccount);							                            // Verify Email API
app.post('/secure/reverify', user.secureResendVerification);                                    // Resend Verification Link API
app.post('/secure/login', user.secureLogin);						                            // Login API
app.post('/userdetails', user.getDetails);							                            // Get Details API
app.post('/secure/setUserDetails', user.setUserDetails);                                        // Set User Details API
app.post('/secure/currencyPrefrence', user.currencyPrefrence);                                  // Currency Preference API
app.post('/secure/forgotPassword', user.secureForgotPassword);                                  // Forgot Password API
app.post('/secure/resetpassword', user.resetpassword);				                            // Reset New Password API
app.post('/secure/changePassword', user.changePassword);			                            // Change Password API
app.post('/secure/setAppId', user.setAppId);                                                    // Set App Id API
app.post('/secure/getAppId', user.getAppId);                                                    // Get USer's App Id
app.post('/secure/editProfilePic', user.editProfilePic);										// Edit Profile Picture API

// Account Related API
app.post('/secure/creditAmount', user.creditUserAmount);			                            // Credit User Amount API
app.post('/secure/deductAmount', user.deductUserAmount);                                        // Deduct User Amount API
app.post('/secure/addPurchases', user.addPurchases);                                            // Add Purchases To User Account API
app.post('/secure/deductPurchases', user.deductPurchases);			                            // Deduct Purchases From User Account API
app.post('/secure/addCashback', user.addCashback);					                            // Add Cashback To User Account API
app.post('/secure/deductCashback', user.deductCashback);                                        // Deduct Cashback From User Account API
app.post('/secure/addAffEarning', user.addAffEarning);                                          // Add Affiliate Earning To User Account API
app.post('/secure/deductAffEarning', user.deductAffEarning);                                    // Deduct Affiliate Earning From User Account API
app.post('/secure/addSales', user.addSales);						                            // Add Sale To User Account API
app.post('/secure/deductSales', user.deductSales);					                            // Deduct Sale From User Account API
app.post('/secure/addTrade', user.addTrade);						                            // Add Trade To User Account API
app.post('/secure/deductTrade', user.deductTrade);					                            // Deduct Trade From User Account API
app.post('/secure/addTotalKeywordIncome', user.addTotalKeywordIncome);                          // Add User Total Keyword Income API
app.post('/secure/deductTotalKeywordIncome', user.deductTotalKeywordIncome);                    // Deduct User Total Keyword Income API
app.post('/secure/addBlockedPendingWithdrawals', user.addBlockedPendingWithdrawals);			// Add Bloked Pending Withdrawals To User Account API
app.post('/secure/deductBlockedPendingWithdrawals', user.deductBlockedPendingWithdrawals);		// Deduct Bloked Pending Withdrawals From User Account API
app.post('/secure/addApprovedWithdrawals', user.addApprovedWithdrawals);						// Add Approved Withdrawal To User Account API
app.post('/secure/deductApprovedWithdrawals', user.deductApprovedWithdrawals);					// Deduct Approved Withdrawal From User Account API
app.post('/secure/addRenewalFees', user.addRenewalFees);										// Add RenewaL Fess API
app.post('/secure/deductRenewalFees', user.deductRenewalFees);									// Deduct RenewaL Fess API
app.post('/secure/addTotalAppIncome', user.addTotalAppIncome);                                  // Add User Total App Income API
app.post('/secure/addSearchAffEarning', user.addSearchAffEarning);								// Add User's Search Affiliate Earning API
app.post('/secure/firstBuy', user.firstBuy);													// FirstBuy API
app.post('/secure/addBlockedForBids', user.addBlockedForBids);									// Add Blocked For Bids API
app.post('/secure/deductBlockedForBids', user.deductBlockedForBids);							// Deduct Blocked Bids API
app.post('/secure/rejectBlockedBids', user.rejectBlockedBids);                                  // Reject Blocked Bids API (In cases of Accept bid and Buy now)
app.post('/secure/updateNotificationStatus', user.updateNotificationStatus)                     // Update User's Notification Status API

/*============================== Pool Related API ==================================*/

app.post('/secure/creditPoolAmountKeywords', pool.addTokwdIncome);                              // Add To Keyword Income API
app.post('/secure/deductPoolAmountKeywords', pool.deductFromkwdIncome);                         // Deduct From Keyword Income API
app.post('/secure/addTocashbackOutflow', pool.addTocashbackOutflow);                            // Add To Cashback OutFlow API
app.post('/secure/deductcashbackOutflow', pool.deductcashbackOutflow);                          // Deduct From Cashback OutFlow API
app.post('/secure/addToaffiliateOutflow', pool.addToaffiliateOutflow);                          // Add To Affiliate OutFlow API
app.post('/secure/increaseTotalFeesEarning', pool.increaseTotalFeesEarning);                    // Increase Total Fees Earning API
app.post('/secure/decreaseTotalFeesEarning', pool.decreaseTotalFeesEarning);                    // Decrease Total Fees Earning API
app.post('/secure/addTotalKeywordOwnerPayout', pool.addTotalKeywordOwnerPayout);                // Add Total Keyword Owner Payout API
app.post('/secure/deductTotalKeywordOwnerPayout', pool.deductTotalKeywordOwnerPayout);          // Deduct Total Keyword Owner Payout API
app.post('/secure/addNoOfQualifeidSearches', pool.addNoOfQualifeidSearches);                    // Add Qualified Searches API
app.post('/secure/deductNoOfQualifeidSearches', pool.deductNoOfQualifeidSearches);              // Deduct Qualified Searches API
app.post('/secure/addNoOfunQualifeidSearches', pool.addNoOfunQualifeidSearches);                // Add unQualified Searches API
app.post('/secure/deductNoOfunQualifeidSearches', pool.deductNoOfunQualifeidSearches);          // Deduct Qualified Searches API
app.post('/secure/addAnonymousSearches', pool.addAnonymousSearches);                            // Add Anonymous Search API
app.post('/secure/addAppPayout', pool.addAppPayout);                                            // Add App Payout
app.post('/secure/addSearchTradePayout', pool.addSearchTradePayout);                            // Add Search Trade Payout
app.post('/secure/deductSearchTradePayout', pool.deductSearchTradePayout);                      // Deduct Search Trade Payout
app.post('/secure/addUnsoldKwdRefund', pool.addUnsoldKwdRefund);                                // Add Unsold Keyword Refund
app.post('/secure/getPoolStats', pool.getPoolStats);                                            // Get All Feilds From Pool Table
app.post('/secure/addTotalRenewalFees', pool.addTotalRenewalFees);								// Add Total Renewal Fees API
app.post('/secure/deductTotalRenewalFees', pool.deductTotalRenewalFees);						// Deduct Total Renewal Fees API

/*============================== Transactions Related API ==================================*/

app.post('/secure/insertUserTransaction', W_transaction.insertUserTransaction);	                // Insert User Transaction API
app.post('/secure/getUsersTotalTransactions', W_transaction.getUsersTotalTransactions);         // Get Total Count Transactions of User API
app.post('/secure/transactions', W_transaction.getTransactions);								// Get Transactions API		

/*============================== Search Related API ==================================*/

app.post('/secure/search/addSearchEarning', search.addSearchEarning);                           // Add Keyword Search Earning For User API
app.post('/secure/search/deductSearchEarning', search.deductSearchEarning);                     // Deduct Keyword Search Earning For User API
app.post('/secure/search/deductQualifiedSearches', search.deductQualifiedSearches);				// Deduct Qualified Searches For User API
app.post('/secure/search/addunQualifiedSearches', search.addunQualifiedSearches);				// Add UnQualified Searches For User API
app.post('/secure/search/updateLastHourValue', search.updateLastHourValue);						// Update Last Hour Timing For User API
app.post('/secure/search/recentSearches', search.recentSearches);                               // Add Recent Searches For User API
app.post('/secure/search/checkExistanceEmail', search.checkExistanceEmail);						// Check Email Existance API

/*============================== Admin Related API ==================================*/

app.post('/secure/admin/addQualifiedSearchesPending', admin.addQualifiedSearchesPending);       // Get Increase User Number of Searches (Admin)
app.post('/secure/admin/resetQualifiedSearches', admin.resetTotalNumberOfQualifiedSearches);    // Reset Qualified Searches Of All Users (Admin)
app.post('/secure/admin/deductunQualifiedSearches', admin.deductunQualifiedSearches);			// Deduct UnQualified Searches For User API (Admin)
app.post('/secure/admin/getExpenceTransactions', admin.getExpenceTransactions);					// Get Expence Transactions For Admin API
app.post('/secure/admin/getIncomeTransactions', admin.getIncomeTransactions);					// Get Income Transactions For Admin API
app.post('/secure/admin/getActiveEmails', admin.getActiveEmails);								// Get Active Users Email
app.post('/secure/admin/userManage', admin.userManage);											// Get Specific User Details
app.post('/secure/admin/paymentModeCount', admin.paymentModeCount);								// Get User Transaction Count On Payment Mode
app.post('/secure/admin/setUserBalance', admin.setUserBalance);                                 // Set User Balance API
app.post('/secure/admin/getEmailTypeTransactions', admin.getEmailTypeTransactions);             // Email And Type Transactions
app.post('/secure/admin/updateUserStatus', admin.updateUserStatus);							    // Update User Status API

app.post('/secure/cron', cron_api.cron);


// Server Connectivity
app.listen('5000', function () {
    log.info('Connected To Server'); 
});
