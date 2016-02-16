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
app.post('/api/register', device.deviceRegister);					  // Device Register API
app.post('/api/getPvtKey', device.getPvtKey);						  // Get Private Key API


/*============================== User Related API ==================================*/
app.post('/secure/register', user.secureRegister);                     // User Register API
app.post('/secure/setUserDetails', user.setUserDetails);               // Set User Details API
app.post('/secure/currencyPrefrence', user.currencyPrefrence);         // Currency Preference API
app.post('/secure/changePassword', user.changePassword);			   // Change Password API


/*============================== Pool Related API ==================================*/
app.post('/secure/creditPoolAmountKeywords', pool.addTokwdIncome);	    // Add To Keyword Income API
app.post('/secure/deductPoolAmountKeywords', pool.deductFromkwdIncome);	// Deduct From Keyword Income API
app.post('/secure/addTocashbackOutflow', pool.addTocashbackOutlow);		// Add To Cashback OutFlow API
app.post('/secure/deductcashbackOutflow', pool.deductcashbackOutflow);	// Deduct From Cashback OutFlow API
app.post('/secure/addToaffiliateOutflow', pool.addToaffiliateOutflow);  // Add To Affiliate OutFlow API


// Server Connectivity
app.listen('5000', function () {
    console.log('Connected To Server');
});