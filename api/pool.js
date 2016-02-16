/*global require, module, console */
/*jslint node: true */
"use strict";

//Pages
var poolSchema	  	= require('../models/poolSchema.js');
var deviceSchema 	= require('../models/deviceInfoSchema.js');

var crypt 			= require("../config/crypt");			// Crypt Connectivity.
var master          = require('../config/masterfunc.js');       // Master Functions

//========================= Page Functions ========================= //
// Response Function
function sendResponse(req, res, status, errCode, errMsg) {

	var d = Date();
	console.log(status +" "+ errCode +" "+ errMsg + " " + d);
	res.status(status).send({
		errCode: errCode, 
		errMsg: errMsg,
		dbDate: d
	});
	
}

// Parameter Validation	Function
function validateParameter(parameter, name){
    
	if(parameter === undefined || parameter.length<=0)
	{
		console.log(name+' Is Missing');
		return false;
	}

	return true;

}

var validate = function(req, res){

	console.log('Parameters Receiving..');
	
	console.log('Amount: '+req[0]);
	console.log('PublicKey: '+req[1]);
	console.log('Signature: '+req[2]);

	// Validate Public Key
	if(!(validateParameter(req[1], 'Public Key')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(validateParameter(req[2], 'Signature')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Amount Validation
	if(req[0]=="" || isNaN(req[0]))
	{
		console.log('Invalid Amount');
		sendResponse(req, res, 200, 8, "Incorrect Amount");
		return false;
	}
	
	return true;

}

//========================= Export Functions ========================= //
/*Add to Keyword Income*/
module.exports.addTokwdIncome = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addTokwdIncome');
	console.log('Add To Keyword Income API Hitted');
	console.log('Parameters Receiving..');
	
	var amount = req.body.amount;
	// var publicKey = req.body.publicKey;
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	// var signature = req.body.signature;
	var signature = '11916d35d02d3817259d4b8497f4208bd74973946aeafb9acccd26019c45eea39ccae1c24047fbb83791cbf28a723b54211b88480230bc18fc0d09050026094b';
	var text = 'amount='+amount+'&publicKey='+publicKey;

	var reqParam = [amount, publicKey, signature];

	if(!validate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}

	var query = {'publicKey': publicKey};

	// Find Server
	master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
	
			console.log('Credit Keyword Amount : '+amount)
			
    		var query = { $inc: {'total_kwd_purchase_income': parseFloat(amount) }};

			// Update Pool Keyword Income
			poolSchema.findOneAndUpdate({}, query, function(err, retVal){
				
				// Error In Finding Server
				if (err)
				{
					console.log('Database Error');
					sendResponse(req, res, 200, 5, "Database Error");
					return;
				}

				// Successfully Updated
				if(retVal)
				{
					console.log('Credited Keyword Income Amount '+amount+' To Pool Successfully');
					sendResponse(req, res, 200, -1, "Success");
				}
				
			})
			
	});
			
}

/*Deduct from Keyword Income*/
module.exports.deductFromkwdIncome = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : deductFromkwdIncome');
	console.log('Deduct From Keyword Income API Hitted');
	console.log('Parameters Receiving..');

	var amount = req.body.amount;
	// var publicKey = req.body.publicKey;
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	// var signature = req.body.signature;
	var signature = '11916d35d02d3817259d4b8497f4208bd74973946aeafb9acccd26019c45eea39ccae1c24047fbb83791cbf28a723b54211b88480230bc18fc0d09050026094b';
	var txt = 'amount='+amount+'&publicKey='+publicKey;

	var reqParam = [amount, publicKey, signature];

	if(!validate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	console.log('Parameters are not valid');
	
	var query = {'publicKey': publicKey};

	// Find Server
	deviceSchema.find(query, function(err, retVal){
	
		// Error In Finding Server
		if (!retVal[0])
		{
			console.log('No Such Server');
			sendResponse(req, res, 200, 13, 'Server is not registered');
			return;
		}
		
		// Server Successfully Found
		var privateKey = retVal[0].privateKey;
		var txt = 'amount='+amount+'&publicKey='+publicKey;
		
		// Signature Match
		crypt.validateSignature(txt, signature, privateKey, function(isValid){
		
			// Signature Not Matched
			if (!isValid)
			{
				console.log('Invalid Signature');
				sendResponse(req, res, 200, 14, 'Invalid Signature');
				return;
			}
			
			console.log('Deduct Keyword Amount : '+amount);
			
    		var query = { $inc: {'total_kwd_purchase_income': -parseFloat(amount) }};

			// Update Pool Keyword Income
			poolSchema.findOneAndUpdate({}, query, function(err, retVal){
			
				// Successfully Updated
				if(retVal)
				{
					console.log('Deducted Keyword Income Amount '+amount+' From Pool Successfully');
					sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					console.log('Database Error');
					sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
		});
		
	});
	
}

/*Add To Cashback Outflow*/
module.exports.addTocashbackOutlow = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addTocashbackOutlow');
	console.log('Add To Cashback Outflow API Hitted');
	console.log('Parameters Receiving..');
	
	var amount = req.body.amount;
	// var publicKey = req.body.publicKey;
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	// var signature = req.body.signature;
	var signature = '11916d35d02d3817259d4b8497f4208bd74973946aeafb9acccd26019c45eea39ccae1c24047fbb83791cbf28a723b54211b88480230bc18fc0d09050026094b';
	var text = 'amount='+amount+'&publicKey='+publicKey;

	var reqParam = [amount, publicKey, signature];
	
	if(!validate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	console.log('Parameters are not valid');
	
	var query = {'publicKey': publicKey};
	
	// Find Server
	master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
	
			console.log('Cashback Amount : '+amount);
			var query = { $inc: {'total_cashback_outflow': parseFloat(amount) }};

			// Update Pool Cashback
			poolSchema.findOneAndUpdate({}, query, function(err, retVal){
			
				// Successfully Updated
				if(retVal)
				{
					console.log('Added Cashback Amount '+amount+' To Pool Successfully');
					sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Cashback
				else
				{
					console.log('Database Error');
					sendResponse(req, res, 200, 5, "Database Error");
				}
			});
			
		
	});

}

/*Deduct From Cashback Outflow*/
module.exports.deductcashbackOutflow = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : deductcashbackOutflow');
	console.log('Deduct From Cashback Outflow API Hitted');
	console.log('Parameters Receiving..');
	
	var amount = req.body.amount;
	// var publicKey = req.body.publicKey;
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	// var signature = req.body.signature;
	var signature = '11916d35d02d3817259d4b8497f4208bd74973946aeafb9acccd26019c45eea39ccae1c24047fbb83791cbf28a723b54211b88480230bc18fc0d09050026094b';
	var text = 'amount='+amount+'&publicKey='+publicKey;
	var reqParam = [amount, publicKey, signature];
	
	if(!validate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	console.log('Parameters are not valid');

	var query = {'publicKey': publicKey};
	// Find Server
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
	
			console.log('Cashback Amount : '+amount);

			var query = { $inc: {'total_cashback_outflow': -parseFloat(amount) }};

			// Update Pool Cashback
			poolSchema.findOneAndUpdate({}, query, function(err, retVal){
			
				// Successfully Updated
				if(retVal)
				{
					console.log('Deducted Cashback Amount '+amount+' From Pool Successfully');
					sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Cashback
				else
				{
					console.log('Database Error');
					sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
	});
		
}

/*Add to Affiliate Outflow*/
module.exports.addToaffiliateOutflow = function (req, res){

	console.log('Page Name: Pool.js');
	console.log('API Name : addToaffiliateOutflow');
	console.log('Add To Affiliate Outflow API Hitted');
	
	
	var amount = req.body.amount;
	// var publicKey = req.body.publicKey;
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	// var signature = req.body.signature;
	var signature = '11916d35d02d3817259d4b8497f4208bd74973946aeafb9acccd26019c45eea39ccae1c24047fbb83791cbf28a723b54211b88480230bc18fc0d09050026094b';
	var text = 'amount='+amount+'&publicKey='+publicKey;

	var reqParam = [amount, publicKey, signature];

	var text = 'amount='+amount+'&publicKey='+publicKey;
	
	if(!validate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	console.log('Parameters are valid');

	var query = {'publicKey': publicKey};
	// Find Server
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
	
			console.log('Affiliate Pool Amount : '+amount);
			
			var query = { $inc: {'total_affiliate_outflow': parseFloat(amount)}}

			// Update Pool Affiliate Amount Function
			poolSchema.findOneAndUpdate({}, query, function(err, retVal){

				// Successfully Updated
				if(retVal)
				{
					console.log('Added Affiliate Amount '+amount+' To Pool Successfully');
					sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Affiliate Amount
				else
				{
					console.log('Database Error');
					sendResponse(req, res, 200, 5, "Database Error");
				}
			
			});
			
	});

}

