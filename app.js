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
app.post('/api/register', device.deviceRegister);
<<<<<<< HEAD
// app.post('/api/getPvtKey', device.getPvtKey);
=======
//app.post('/api/getPvtKey', device.getPvtKey);
>>>>>>> ff6c272aeaa6cd4cf692109a8beb8b9df138d196

/*============================== User Related API ==================================*/
app.post('/secure/register', user.secureRegister);                  // User Register API
app.post('/secure/setUserDetails', user.setUserDetails);            // Set User Details API
app.post('/secure/currencyPrefrence', user.currencyPrefrence);      // Currency Preference API
app.post('/secure/changePassword', user.changePassword);			// Change Password API

// Server Connectivity
app.listen('5000', function () {
    console.log('Connected To Server');
});