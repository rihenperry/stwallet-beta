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
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	// var signature = req.body.signature;
	var signature = '11916d35d02d3817259d4b8497f4208bd74973946aeafb9acccd26019c45eea39ccae1c24047fbb83791cbf28a723b54211b88480230bc18fc0d09050026094b';
	// var signature = 'f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce';
	
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
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');

		console.log('Credit Keyword Amount : '+retVal[0].amount)
		
		var query = { $inc: {'total_kwd_purchase_income': parseFloat(retVal[0].amount) }};

		// Update Pool Keyword Income
		poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
			// Error In Finding Server
			if (err){
				console.log('Database Error');
				master.sendResponse(req, res, 200, 5, "Database Error");
				return;
			}

			// Successfully Updated
			if(retVals){
				console.log('Credited Keyword Income Amount '+retVal[0].amount+' To Pool Successfully');
				master.sendResponse(req, res, 200, -1, "Success");
			}
			
		});

	});	

}

/*Deduct from Keyword Income*/
module.exports.deductFromkwdIncome = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : deductFromkwdIncome');
	console.log('Deduct From Keyword Income API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

			console.log('Deduct Keyword Amount : '+retVal[0].amount);
			
    		var query = { $inc: {'total_kwd_purchase_income': -parseFloat(retVal[0].amount) }};

			// Update Pool Keyword Income
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					console.log('Deducted Keyword Income Amount '+retVal[0].amount+' From Pool Successfully');
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
		
};
	

/*Add To Cashback Outflow*/
module.exports.addTocashbackOutflow = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addTocashbackOutlow');
	console.log('Add To Cashback Outflow API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

			console.log('Cashback Amount : '+retVal[0].amount);

			var query = { $inc: {'total_cashback_outflow': parseFloat(retVal[0].amount) }};

			// Update Pool Cashback
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					console.log('Added Cashback Amount '+retVal[0].amount+' To Pool Successfully');
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

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

			console.log('Cashback Amount : '+retVal[0].amount);

			var query = { $inc: {'total_cashback_outflow': -parseFloat(retVal[0].amount) }};

			// Update Pool Cashback
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					console.log('Deducted Cashback Amount '+retVal[0].amount+' From Pool Successfully');
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

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}
			console.log('Affiliate Pool Amount : '+retVal[0].amount);
			
			var query = { $inc: {'total_affiliate_outflow': parseFloat(retVal[0].amount)}}

			// Update Pool Affiliate Amount Function
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					console.log('Added Affiliate Amount '+retVal[0].amount+' To Pool Successfully');
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
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}
			console.log('Added Fees Amount : '+retVal[0].amount);
			
			var query = { $inc: {'total_fees_earning': parseFloat(retVal[0].amount)}};
		
			// Update Pool Fees Income Function
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					console.log('Added Fees Amount '+retVal.amount+' To Pool Successfully');
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

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}
			console.log('Deduct Fees Amount : '+retVal[0].amount);
			
			var query = { $inc: {'total_fees_earning': -parseFloat(retVal[0].amount)}};

			// // Update Pool Fees Income Function
			poolSchema.findOneAndUpdate({}, query, function(retVals){
				
				// Successfully Updated
				if(retVals)
				{
					console.log('Deducted Fees Amount '+retVal[0].amount+' From Pool Successfully');
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

/*Deduct Total Keyword Owner Payout*/
module.exports.deductTotalKeywordOwnerPayout = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : deductTotalKeywordOwnerPayout');
	console.log('Deduct Total Keyword Owner Payout API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
		
		console.log('Deduct Total Keyword Owner Payout Amount : '+retVal[0].amount);
			
			var query = {$inc:{"total_kwd_owner_payout": -parseFloat(retVal[0].amount)}};

			// Update Pool Keyword Owner Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					console.log('Deducted Total Keyword Owner Payout Amount '+retVal[0].amount+' From Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					console.log('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			});
			
	});
	
}

/*Add No of Qualified Searches*/
module.exports.addNoOfQualifeidSearches = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addNoOfQualifeidSearches');
	console.log('Add Qualified Searches API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
		
		console.log('Credit Qualified Searches Value : '+retVal[0].amount)
			
			// Update Pool Qualified Searches
			var query = {$inc:{"no_of_qualified_searches": parseFloat(retVal[0].amount)}};

			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVal)
				{
					console.log('Credit Qualified Searches Value '+retVal[0].amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					console.log('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			});
			
	});
		
};

/*Deduct No of Qualified Searches*/
module.exports.deductNoOfQualifeidSearches = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : deductNoOfQualifeidSearches');
	console.log('Deduct Qualified Searches API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
		
		console.log('Deduct Qualified Searches Value : '+retVal[0].amount);
			
			var query = {$inc:{"no_of_unQualified_searches": -parseFloat(retVal[0].amount)}};

			// Update Pool Qualified Searches
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVal)
				{
					console.log('Deducted Qualified Searches Value '+retVal[0].amount+' From Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			});
			
		});
		
};
	
/*Add No of Unqualified*/
module.exports.addNoOfunQualifeidSearches = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addNoOfunQualifeidSearches');
	console.log('Add unQualified Searches API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
		
		console.log('Credit unQualified Searches Value : '+retVal[0].amount)
			
			var query = {$inc:{"no_of_unQualified_searches": parseFloat(retVal[0].amount)}};

			// Update Pool unQualified Searches
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
						
				// Successfully Updated
				if(retVals)
				{
					console.log('Credit unQualified Searches Value '+retVal[0].amount+' To Pool Successfully');
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
		
};

/*Deduct No of UnQualified Searches*/
module.exports.deductNoOfunQualifeidSearches = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : deductNoOfunQualifeidSearches');
	console.log('Deduct unQualified Searches API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
		
		console.log('Deduct unQualified Searches Value : '+amount);
			
			// Update Pool unQualified Searches
			var query = {$inc:{"no_of_unQualified_searches": -parseFloat(retVal[0].amount)}};

			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					console.log('Deducted unQualified Searches Value '+retVal[0].amount+' From Pool Successfully');
					sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					sendResponse(req, res, 200, 5, "Database Error");
				}

			})
			
	});
		
};

/*Add anonymous Searches*/	
module.exports.addAnonymousSearches = function (req, res){
	
	console.log('Page Name: Pool.js')
	console.log('API Name : addAnonymousSearches');
	console.log('Add To Anonymous Income API Hitted');
	
	req.body.amount = "1";

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
		
		console.log('Credit Anonymous Amount : '+retVal[0].amount)
						
			var query = {$inc:{"total_anonymous_searches": parseFloat(retVal[0].amount)}};

			// Update Pool Anonymous Income
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
				
				// Successfully Updated
				if(retVals)
				{
					console.log('Credited Anonymous Income Amount '+retVal[0].amount+' To Pool Successfully');
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
		
}

/*Add App Payout*/
module.exports.addAppPayout = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addAppPayout');
	console.log('Add To App Payout API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
			
		console.log('Credit App Payout Amount : '+retVal[0].amount);
			
			var query = {$inc:{"total_app_payout": parseFloat(retVal[0].amount)}};

			// Update Pool App Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					console.log('Credited App Payout Value '+retVal[0].amount+' To Pool Successfully');
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
	
}

/*Add Search Trade Payout*/
module.exports.addSearchTradePayout = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addAppPayout');
	console.log('Add Total Searchtrade Payout API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
		
		console.log('Credit Searchtrade Payout Amount : '+retVal[0].amount)
			
			var query = {$inc:{"total_searchtrade_payout": parseFloat(retVal[0].amount)}};

			// Update Pool SearchTrade Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					console.log('Credited Searchtrade Payout Amount '+retVal[0].amount+' To Pool Successfully');
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
		
}

/*Deduct Serarches TradePayout*/
module.exports.deductSearchTradePayout = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : deductSearchTradePayout');
	console.log('Deduct Total Searchtrade Payout API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
		
		console.log('Deducted Searchtrade Payout Amount : '+retVal[0].amount)
			
			var query = {$inc:{"total_searchtrade_payout": parseFloat(retVal[0].amount)}};

			// Update Pool SearchTrade Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					console.log('Deducted Searchtrade Payout Amount '+retVal[0].amount+' From Pool Successfully');
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
		
}

/*Add Unsold Keyword Refund*/
module.exports.addUnsoldKwdRefund = function (req, res){
	
	console.log('Page Name: Pool.js');
	console.log('API Name : addUnsoldKwdRefund');
	console.log('Add Unsold Keyword Refund API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			console.log('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		console.log('Parameters are valid');
		
		console.log('Credit Unsold Keyword Refund Amount : '+retVal[0].amount)
			
			var query = {$inc:{"total_unsold_kwd_refund": parseFloat(retVal[0].amount)}};

			// Update Pool SearchTrade Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					console.log('Credited Unsold Keyword Refund Amount '+retVal[0].amount+' To Pool Successfully');
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