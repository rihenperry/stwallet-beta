"use strict";

var userSchema      = require('../models/userSchema.js');       // User Schema
var deviceSchema    = require('../models/deviceInfoSchema.js')  // DeviceInfo Schema
var master          = require('../config/masterfunc.js');       // Master Functions
var crypt           = require('../config/crypt.js');            // Crypt/Signature Related Functionality
var mailer          = require('../config/mail.js');             // Mail Functionality



// Transaction API


module.exports.insertUserTransaction = function(req, res){

	console.log('Page Name: transactions.js');
	console.log('API Name : insertUserTransaction');	
	console.log('Insert Transaction API Hitted');
	console.log('Parameters Receiving -:');

	var vars = req.body;
	var sender = vars.sender;
	var receiver = vars.receiver;
	var amount = vars.amount;
	var type = vars.type;
	var desc = vars.desc;
	var keyword = vars.keyword;
	var payment_mode = vars.payment_mode;
	var discount = vars.discount;
	var appId = vars.app_id;
	var commision = vars.commision;
	var origin_ip = vars.origin_ip;
	var usd = vars.usd;
	var sgd = vars.sgd;
	var publicKey = vars.publicKey;
	var signature = vars.signature;

	console.log('Sender (Email) : '+sender);
	console.log('Receiver (Email) : '+receiver);
	console.log('Amount : '+amount);
	console.log('Type : '+type);
	console.log('Description : '+desc);
	console.log('Keyword : '+keyword);
	console.log('Payment Mode : '+payment_mode);
	console.log('Discount : '+discount);
	console.log('App Id : '+appId);
	console.log('Commission : '+commision);
	console.log('Origin Ip : '+origin_ip);
	console.log('USD : '+usd);
	console.log('SGD : '+sgd);
	console.log('Public Key :'+publicKey);
	console.log('Signature :'+signature);

};