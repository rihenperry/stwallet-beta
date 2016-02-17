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
var pool      	= require("./api/pool");  	// Get Pool API
var W_transaction =  require("./api/transaction");

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
app.post('/secure/register', user.secureRegister);                  // User Register API
app.post('/verify', user.verifyAccount);							// Verify Email API
app.post('/secure/reverify', user.secureResendVerification);        // Resend Verification Link API
app.post('/secure/login', user.secureLogin);						// Login API
app.post('/userdetails', user.getDetails);							// Get Details API
app.post('/secure/setUserDetails', user.setUserDetails);            // Set User Details API
app.post('/secure/currencyPrefrence', user.currencyPrefrence);      // Currency Preference API
app.post('/secure/forgotPassword', user.secureForgotPassword);      // Forgot Password API
app.post('/secure/resetpassword', user.resetpassword);				// Reset New Password API
app.post('/secure/changePassword', user.changePassword);			// Change Password API
app.post('/secure/setAppId', user.setAppId);                        // Set App Id API
app.post('/secure/getAppId', user.getAppId);                        // Get USer's App Id

// Account Related API
app.post('/secure/creditAmount', user.creditUserAmount);			// Credit User Amount API
//app.post('/secure/deductAmount', user.deductUserAmount);			// Deduct User Amount API


/*============================== Pool Related API ==================================*/

app.post('/secure/creditPoolAmountKeywords', pool.addTokwdIncome);	    // Add To Keyword Income API
app.post('/secure/deductPoolAmountKeywords', pool.deductFromkwdIncome);	// Deduct From Keyword Income API
app.post('/secure/addTocashbackOutflow', pool.addTocashbackOutlow);		// Add To Cashback OutFlow API
app.post('/secure/deductcashbackOutflow', pool.deductcashbackOutflow);	// Deduct From Cashback OutFlow API
app.post('/secure/addToaffiliateOutflow', pool.addToaffiliateOutflow);  // Add To Affiliate OutFlow API


/*============================== Transactions Related API ==================================*/

app.post('/secure/insertUserTransaction', W_transaction.insertUserTransaction);							// Insert User Transaction API



// Server Connectivity
app.listen('5000', function () {
    console.log('Connected To Server');
});