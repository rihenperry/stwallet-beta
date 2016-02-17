/*global require, module, console */
/*jslint node: true */
"use strict";

//Pages
var poolSchema	  	= require('../models/poolSchema.js');
var deviceSchema 	= require('../models/deviceInfoSchema.js');

var crypt 			= require("../config/crypt");			// Crypt Connectivity.
var master          = require('../config/masterfunc.js');       // Master Functions

// //========================= Page Functions ========================= //

var poolvalidate = function(req, cb){

	console.log('Parameters Receiving..');
	
	var amount = req.body.amount;
	// var publicKey = req.body.publicKey;
	var publicKey = '';
	// var signature = req.body.signature;
	var signature = '11916d35d02d3817259d4b8497f4208bd74973946aeafb9acccd26019c45eea39ccae1c24047fbb83791cbf28a723b54211b88480230bc18fc0d09050026094b';
	var text = 'amount='+amount+'&publicKey='+publicKey;	
	var reqParam = [amount, publicKey, signature];
	var query = {'publicKey': publicKey};

	console.log('Amount	   : '+amount);
	console.log('PublicKey  : '+publicKey);
	console.log('Signature  : '+signature);

	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		var retVal = [{
            "message" : "Mandatory field not found",
            "errCode" : 1,
            "error" : "true"
        }];
		cb(retVal);
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		var retVal = [{
            "message" : "Mandatory field not found",
            "errCode" : 1,
            "error" : "true"
        }];
		cb(retVal);
		return;
	}

	// Amount Validation
	if(amount=="" || isNaN(amount))
	{
		console.log('Invalid Amount');
		var retVal = [{
            "message" : "Incorrect Amount",
            "errCode" : 8,
            "error" : "true"
        }];
		cb(retVal);
		return;
	}

	master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true'){

			cb(result);
        }

        else{
            result[0].amount = amount;
            cb(result);
            return;
        }

    });

}

//========================= Export Functions ========================= //
/*Add to Keyword Income*/
module.exports.addTokwdIncome = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addTokwdIncome');
	console.log('Add To Keyword Income API Hitted');
	
	


	if(!poolvalidate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}


	// Find Server
	master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
					master.sendResponse(req, res, 200, 5, "Database Error");
					return;
				}

				// Successfully Updated
				if(retVal)
				{
					console.log('Credited Keyword Income Amount '+amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
			})
			
	});
			
}

/*Deduct from Keyword Income*/
module.exports.deductFromkwdIncome = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : deductFromkwdIncome');
	console.log('Deduct From Keyword Income API Hitted');

	

	if(!poolvalidate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	console.log('Parameters are not valid');
	

	// Find Server
	deviceSchema.find(query, function(err, retVal){
	
		// Error In Finding Server
		if (!retVal[0])
		{
			console.log('No Such Server');
			master.sendResponse(req, res, 200, 13, 'Server is not registered');
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
				master.sendResponse(req, res, 200, 14, 'Invalid Signature');
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
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					console.log('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
		});
		
	});
	
}

/*Add To Cashback Outflow*/
module.exports.addTocashbackOutflow = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addTocashbackOutlow');
	console.log('Add To Cashback Outflow API Hitted');
	
	

	
	if(!poolvalidate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	console.log('Parameters are not valid');
	
	
	// Find Server
	master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Cashback
				else
				{
					console.log('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			});
			
		
	});

}

/*Deduct From Cashback Outflow*/
module.exports.deductcashbackOutflow = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : deductcashbackOutflow');
	console.log('Deduct From Cashback Outflow API Hitted');
	
	
	
	if(!poolvalidate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	console.log('Parameters are not valid');

	// Find Server
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Cashback
				else
				{
					console.log('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
	});
		
}

/*Add to Affiliate Outflow*/
module.exports.addToaffiliateOutflow = function (req, res){

	console.log('Page Name: Pool.js');
	console.log('API Name : addToaffiliateOutflow');
	console.log('Add To Affiliate Outflow API Hitted');
	
	


	
	
	if(!poolvalidate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	console.log('Parameters are valid');

	// Find Server
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Affiliate Amount
				else
				{
					console.log('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			
			});
			
	});

}

/*Increase Total Fees Earning*/
module.exports.increaseTotalFeesEarning = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : increaseTotalFeesEarning');
	console.log('Increase Total Fees Earning API Hitted');
	
	


	
	if(!poolvalidate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	
	// Find Server
	master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
			console.log('Added Fees Amount : '+amount);
			
			var query = { $inc: {'total_fees_earning': parseFloat(amount)}};

			// Update Pool Fees Income Function
			poolSchema.findOneAndUpdate({}, query, function(retVal){
			
				// Successfully Updated
				if(!retVal)
				{
					console.log('Added Fees Amount '+amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Fees
				else
				{
					console.log('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
	});
		
}

/*Decrese Total Fees Earning*/
module.exports.decreaseTotalFeesEarning = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : decreaseTotalFeesEarning');
	console.log('Decrease Total Fees Earning API Hitted');

	


	if(!poolvalidate(reqParam, res))
	{

		console.log('Parameters are  not valid');
		return;
	}
	
	
	// Find Server
	master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
	
			console.log('Deduct Fees Amount : '+amount);
			
			var query = { $inc: {'total_fees_earning': -parseFloat(amount)}};

			// // Update Pool Fees Income Function
			poolSchema.findOneAndUpdate({}, query, function(retVal){
				
				// Successfully Updated
				if(retVal)
				{
					console.log('Deducted Fees Amount '+amount+' From Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Fees
				else
				{
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
	});		
	
}

/*Get Pool Stats*/
module.exports.getPoolStats = function (req, res){
	
	console.log('Get Pool Status API Hitted');
	
	var value = true;
	
	// Get Pool Results Function
	poolSchema.find({}, function(err, retVal){
		
		// Successfully Updated
		if(retVal[0])
		{
			console.log('Pool Status:');
			console.log(retVal);
			master.sendResponse(req, res, 200, -1, retVal[0]);
		}
		
		// Error In Updating Pool Fees
		else
		{
			master.sendResponse(req, res, 200, 5, "Database Error");
		}
	})
	
}

/*Add to Total Keyword Owner Payout*/
module.exports.addTotalKeywordOwnerPayout = function (req, res){

	console.log('Page Name: Pool.js');
	console.log('API Name : addTotalKeywordOwnerPayout');
	console.log('Add Total Keyword Owner Payout API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');

		console.log('Credit Keyword Owner Payout Amount : '+retVal.amount);

			// Update Pool Fees Income Function
			poolSchema.findOneAndUpdate({}, {$inc:{"total_kwd_owner_payout":retVal.amount}}, function(err, retVals){
					
				// Successfully Updated
				if(err){
					console.log(err);
					return(err);
				}

				if(retVals){
					console.log('Credited Keyword Owner Payout Amount '+retVal.amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else{
					console.log('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			});

	});

}