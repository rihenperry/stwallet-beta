/*global require, module, console */
/*jslint node: true */
"use strict";

// Framework
var express     = require('express');
var app         = express();

// Packages
var bodyParser  = require('body-parser');

// Pages
var mongoose    = require('./config/mongoose.js');
var user        = require('./api/user.js');
var device      = require('./api/device.js');
var pool        = require('./api/pool');                    // Get Pool API
var W_transaction =  require("./api/transaction");
var search		  =  require("./api/search");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    console.log('==================================');
    console.log(req.url);
    next();
});

// Router
app.get('/', function (req, res) {
    res.send('Hello Revised Wallet');
});

/*============================== Device Related API ==================================*/

app.post('/api/register', device.deviceRegister);					// Device Register API
app.post('/api/getPvtKey', device.getPvtKey);						// Get Private Key API


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
app.post('/secure/addTotalAppIncome', user.addTotalAppIncome);                                  // Add User Total App Income API
app.post('/secure/firstBuy', user.firstBuy);													// FirstBuy API
app.post('/secure/addBlockedForBids', user.addBlockedForBids);									// Add Blocked For Bids API
app.post('/secure/deductBlockedForBids', user.deductBlockedForBids);							// Deduct Blocked Bids API


/*============================== Pool Related API ==================================*/

app.post('/secure/decreaseTotalFeesEarning', pool.decreaseTotalFeesEarning); 					 // Decrease Total Fees Earning API
app.post('/secure/creditPoolAmountKeywords', pool.addTokwdIncome);            					 // Add To Keyword Income API
app.post('/secure/deductPoolAmountKeywords', pool.deductFromkwdIncome);      					 // Deduct From Keyword Income API
app.post('/secure/addTocashbackOutflow', pool.addTocashbackOutflow);         					 // Add To Cashback OutFlow API
app.post('/secure/deductcashbackOutflow', pool.deductcashbackOutflow);       	 				 // Deduct From Cashback OutFlow API
app.post('/secure/addToaffiliateOutflow', pool.addToaffiliateOutflow);       		 			 // Add To Affiliate OutFlow API
app.post('/secure/increaseTotalFeesEarning', pool.increaseTotalFeesEarning);  					 // Increase Total Fees Earning API
app.post('/secure/addTotalKeywordOwnerPayout', pool.addTotalKeywordOwnerPayout);				 // Add Total Keyword Owner Payout API
app.post('/secure/deductTotalKeywordOwnerPayout', pool.deductTotalKeywordOwnerPayout);			 // Deduct Total Keyword Owner Payout API
app.post('/secure/addNoOfQualifeidSearches', pool.addNoOfQualifeidSearches);					 // Add Qualified Searches API
app.post('/secure/deductNoOfQualifeidSearches', pool.deductNoOfQualifeidSearches);				 // Deduct Qualified Searches API
app.post('/secure/addNoOfunQualifeidSearches', pool.addNoOfunQualifeidSearches);				 // Add unQualified Searches API
app.post('/secure/deductNoOfunQualifeidSearches', pool.deductNoOfunQualifeidSearches);			 // Deduct Qualified Searches API
app.post('/secure/addAnonymousSearches', pool.addAnonymousSearches);							 // Add Anonymous Search API
app.post('/secure/addAppPayout', pool.addAppPayout);											 // Add App Payout
app.post('/secure/addSearchTradePayout', pool.addSearchTradePayout);							 // Add Search Trade Payout
app.post('/secure/deductSearchTradePayout',pool.deductSearchTradePayout)						 // Deduct Search Trade Payout
app.post('/secure/addUnsoldKwdRefund', pool.addUnsoldKwdRefund)									 // Add Unsold Keyword Refund
app.post('/secure/getPoolStats', pool.getPoolStats);						  					 // Get All Feilds From Pool Table



/*============================== Transactions Related API ==================================*/

app.post('/secure/insertUserTransaction', W_transaction.insertUserTransaction);	                // Insert User Transaction API


/*============================== Search Related API ==================================*/

app.post('/secure/search/addSearchEarning', search.addSearchEarning);                           // Add Keyword Search Earning For User API
app.post('/secure/search/deductSearchEarning', search.deductSearchEarning);                     // Deduct Keyword Search Earning For User API
app.post('/secure/search/deductQualifiedSearches', search.deductQualifiedSearches);				// Deduct Qualified Searches For User API
app.post('/secure/search/addunQualifiedSearches', search.addunQualifiedSearches);				// Add UnQualified Searches For User API
app.post('/secure/search/updateLastHourValue', search.updateLastHourValue);						// Update Last Hour Timing For User API
app.post('/secure/search/recentSearches', search.recentSearches);                               // Add Recent Searches For User API



// Server Connectivity
app.listen('5000', function () {
    console.log('Connected To Server');
});