/*global require, module, console */
/*jslint node: true */
"use strict";

//Pages
var poolSchema	  	= require('../models/poolSchema.js');
var deviceSchema 	= require('../models/deviceInfoSchema.js');

var crypt 			= require("../config/crypt");			// Crypt Connectivity.
var master          = require('../config/masterfunc.js'),       // Master Functions

    logger          = require('../config/w_config.js'),
    log             = logger();

// //========================= Page Functions ========================= //

var poolvalidate = function(req, cb){

	log.info('Parameters Receiving..');
	
	var amount = req.body.amount;
	var publicKey = req.body.publicKey;
	//var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	var signature = req.body.signature;
	//var signature = '11916d35d02d3817259d4b8497f4208bd74973946aeafb9acccd26019c45eea39ccae1c24047fbb83791cbf28a723b54211b88480230bc18fc0d09050026094b';
	// var signature = 'f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce';
	
	var text = 'amount='+amount+'&publicKey='+publicKey;	
	var reqParam = [amount, publicKey, signature];
	var query = {'publicKey': publicKey};

	log.info('Amount	   : '+amount);
	log.info('PublicKey  : '+publicKey);
	log.info('Signature  : '+signature);

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
		log.info('Invalid Amount');
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
	
	log.info('Page Name: Pool.js');
	log.info('API Name : addTokwdIncome');
	log.info('Add To Keyword Income API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');

		log.info('Credit Keyword Amount : '+retVal[0].amount)
		
		var query = { $inc: {'total_kwd_purchase_income': parseFloat(retVal[0].amount) }};

		// Update Pool Keyword Income
		poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
			// Error In Finding Server
			if (err){
				log.info('Database Error');
				master.sendResponse(req, res, 200, 5, "Database Error");
				return;
			}

			// Successfully Updated
			if(retVals){
			    log.info('Credited Keyword Income Amount '+retVal[0].amount+' To Pool Successfully');
			    master.sendResponse(req, res, 200, -1, "Success");
			   }
			
		});

	});	

}

/*Deduct from Keyword Income*/
module.exports.deductFromkwdIncome = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : deductFromkwdIncome');
	log.info('Deduct From Keyword Income API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

			log.info('Deduct Keyword Amount : '+retVal[0].amount);
			
    		var query = { $inc: {'total_kwd_purchase_income': -parseFloat(retVal[0].amount) }};

			// Update Pool Keyword Income
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					log.info('Deducted Keyword Income Amount '+retVal[0].amount+' From Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
	});
		
};
	

/*Add To Cashback Outflow*/
module.exports.addTocashbackOutflow = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : addTocashbackOutlow');
	log.info('Add To Cashback Outflow API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

			log.info('Cashback Amount : '+retVal[0].amount);

			var query = { $inc: {'total_cashback_outflow': parseFloat(retVal[0].amount) }};

			// Update Pool Cashback
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					log.info('Added Cashback Amount '+retVal[0].amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Cashback
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			});
			
		
	});

}

/*Deduct From Cashback Outflow*/
module.exports.deductcashbackOutflow = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : deductcashbackOutflow');
	log.info('Deduct From Cashback Outflow API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

			log.info('Cashback Amount : '+retVal[0].amount);

			var query = { $inc: {'total_cashback_outflow': -parseFloat(retVal[0].amount) }};

			// Update Pool Cashback
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					log.info('Deducted Cashback Amount '+retVal[0].amount+' From Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Cashback
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
	});
		
}

/*Add to Affiliate Outflow*/
module.exports.addToaffiliateOutflow = function (req, res){

	log.info('Page Name: Pool.js');
	log.info('API Name : addToaffiliateOutflow');
	log.info('Add To Affiliate Outflow API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}
			log.info('Affiliate Pool Amount : '+retVal[0].amount);
			
			var query = { $inc: {'total_affiliate_outflow': parseFloat(retVal[0].amount)}}

			// Update Pool Affiliate Amount Function
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					log.info('Added Affiliate Amount '+retVal[0].amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Affiliate Amount
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			
			});
			
	});

}

/*Increase Total Fees Earning*/
module.exports.increaseTotalFeesEarning = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : increaseTotalFeesEarning');
	log.info('Increase Total Fees Earning API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}
			log.info('Added Fees Amount : '+retVal[0].amount);
			
			var query = { $inc: {'total_fees_earning': parseFloat(retVal[0].amount)}};
		
			// Update Pool Fees Income Function
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					log.info('Added Fees Amount '+retVal.amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Pool Fees
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			})
			
	});
		
}

/*Decrese Total Fees Earning*/
module.exports.decreaseTotalFeesEarning = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : decreaseTotalFeesEarning');
	log.info('Decrease Total Fees Earning API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true){
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}
			log.info('Deduct Fees Amount : '+retVal[0].amount);
			
			var query = { $inc: {'total_fees_earning': -parseFloat(retVal[0].amount)}};

			// // Update Pool Fees Income Function
			poolSchema.findOneAndUpdate({}, query, function(retVals){
				
				// Successfully Updated
				if(retVals)
				{
					log.info('Deducted Fees Amount '+retVal[0].amount+' From Pool Successfully');
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

	log.info('Page Name: Pool.js');
	log.info('API Name : addTotalKeywordOwnerPayout');
	log.info('Add Total Keyword Owner Payout API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');

		log.info('Credit Keyword Owner Payout Amount : '+retVal.amount);

			// Update Pool Fees Income Function
			poolSchema.findOneAndUpdate({}, {$inc:{"total_kwd_owner_payout":retVal.amount}}, function(err, retVals){
					
				// Successfully Updated
				if(err){
					log.error(err);
					return(err);
				}

				if(retVals){
					log.info('Credited Keyword Owner Payout Amount '+retVal.amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			});

	});

}

/*Deduct Total Keyword Owner Payout*/
module.exports.deductTotalKeywordOwnerPayout = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : deductTotalKeywordOwnerPayout');
	log.info('Deduct Total Keyword Owner Payout API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
		
		log.info('Deduct Total Keyword Owner Payout Amount : '+retVal[0].amount);
			
			var query = {$inc:{"total_kwd_owner_payout": -parseFloat(retVal[0].amount)}};

			// Update Pool Keyword Owner Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
			
				// Successfully Updated
				if(retVals)
				{
					log.info('Deducted Total Keyword Owner Payout Amount '+retVal[0].amount+' From Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			});
			
	});
	
}

/*Add No of Qualified Searches*/
module.exports.addNoOfQualifeidSearches = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : addNoOfQualifeidSearches');
	log.info('Add Qualified Searches API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
		
		log.info('Credit Qualified Searches Value : '+retVal[0].amount)
			
			// Update Pool Qualified Searches
			var query = {$inc:{"no_of_qualified_searches": parseFloat(retVal[0].amount)}};

			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVal)
				{
					log.info('Credit Qualified Searches Value '+retVal[0].amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			});
			
	});
		
};

/*Deduct No of Qualified Searches*/
module.exports.deductNoOfQualifeidSearches = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : deductNoOfQualifeidSearches');
	log.info('Deduct Qualified Searches API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
		
		log.info('Deduct Qualified Searches Value : '+retVal[0].amount);
			
			var query = {$inc:{"no_of_unQualified_searches": -parseFloat(retVal[0].amount)}};

			// Update Pool Qualified Searches
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVal)
				{
					log.info('Deducted Qualified Searches Value '+retVal[0].amount+' From Pool Successfully');
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
	
	log.info('Page Name: Pool.js');
	log.info('API Name : addNoOfunQualifeidSearches');
	log.info('Add unQualified Searches API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
		
		log.info('Credit unQualified Searches Value : '+retVal[0].amount)
			
			var query = {$inc:{"no_of_unQualified_searches": parseFloat(retVal[0].amount)}};

			// Update Pool unQualified Searches
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
						
				// Successfully Updated
				if(retVals)
				{
					log.info('Credit unQualified Searches Value '+retVal[0].amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			})
			
	});
		
};

/*Deduct No of UnQualified Searches*/
module.exports.deductNoOfunQualifeidSearches = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : deductNoOfunQualifeidSearches');
	log.info('Deduct unQualified Searches API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
		
		log.info('Deduct unQualified Searches Value : '+retVal[0].amount);
			
			// Update Pool unQualified Searches
			var query = {$inc:{"no_of_unQualified_searches": -parseFloat(retVal[0].amount)}};

			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					log.info('Deducted unQualified Searches Value '+retVal[0].amount+' From Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			})
			
	});
		
};

/*Add anonymous Searches*/	
module.exports.addAnonymousSearches = function (req, res){
	
	log.info('Page Name: Pool.js')
	log.info('API Name : addAnonymousSearches');
	log.info('Add To Anonymous Income API Hitted');
	
	req.body.amount = "1";

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
		
		log.info('Credit Anonymous Amount : '+retVal[0].amount)
						
			var query = {$inc:{"total_anonymous_searches": parseFloat(retVal[0].amount)}};

			// Update Pool Anonymous Income
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){
				
				// Successfully Updated
				if(retVals)
				{
					log.info('Credited Anonymous Income Amount '+retVal[0].amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}


			})
			
	});
		
}

/*Add App Payout*/
module.exports.addAppPayout = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : addAppPayout');
	log.info('Add To App Payout API Hitted');
	
	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
			
		log.info('Credit App Payout Amount : '+retVal[0].amount);
			
			var query = {$inc:{"total_app_payout": parseFloat(retVal[0].amount)}};

			// Update Pool App Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					log.info('Credited App Payout Value '+retVal[0].amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
	});
	
}

/*Add Search Trade Payout*/
module.exports.addSearchTradePayout = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : addAppPayout');
	log.info('Add Total Searchtrade Payout API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
		
		log.info('Credit Searchtrade Payout Amount : '+retVal[0].amount)
			
			var query = {$inc:{"total_searchtrade_payout": parseFloat(retVal[0].amount)}};

			// Update Pool SearchTrade Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					log.info('Credited Searchtrade Payout Amount '+retVal[0].amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			})
			
	});
		
}

/*Deduct Serarches TradePayout*/
module.exports.deductSearchTradePayout = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : deductSearchTradePayout');
	log.info('Deduct Total Searchtrade Payout API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
		
		log.info('Deducted Searchtrade Payout Amount : '+retVal[0].amount)
			
			var query = {$inc:{"total_searchtrade_payout": -parseFloat(retVal[0].amount)}};

			// Update Pool SearchTrade Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					log.info('Deducted Searchtrade Payout Amount '+retVal[0].amount+' From Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			})
			
	});
		
}

/*Add Unsold Keyword Refund*/
module.exports.addUnsoldKwdRefund = function (req, res){
	
	log.info('Page Name: Pool.js');
	log.info('API Name : addUnsoldKwdRefund');
	log.info('Add Unsold Keyword Refund API Hitted');

	poolvalidate(req, function(retVal){

		if (retVal[0].error == 'true' || retVal[0].error == true) {
			log.info('Parameters are not valid');
			master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
			return;
		}

		log.info('Parameters are valid');
		
		log.info('Credit Unsold Keyword Refund Amount : '+retVal[0].amount)
			
			var query = {$inc:{"total_unsold_kwd_refund": parseFloat(retVal[0].amount)}};

			// Update Pool SearchTrade Payout
			poolSchema.findOneAndUpdate({}, query, function(err, retVals){

				// Successfully Updated
				if(retVals)
				{
					log.info('Credited Unsold Keyword Refund Amount '+retVal[0].amount+' To Pool Successfully');
					master.sendResponse(req, res, 200, -1, "Success");
				}
				
				// Error In Updating Database
				else
				{
					log.info('Database Error');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}

			})
			
	});
		
}


/*Get Pool Stats*/
module.exports.getPoolStats = function (req, res){
	
	log.info('Get Pool Status API Hitted');
	
	var value = true;
	
	// Get Pool Results Function
	poolSchema.find({}, function(err, retVal){
		
		// Successfully Updated
		if(retVal[0])
		{
			log.info('Pool Status:');
			log.info(retVal);
			master.sendResponse(req, res, 200, -1, retVal[0]);
		}
		
		// Error In Updating Pool Fees
		else
		{
			master.sendResponse(req, res, 200, 5, "Database Error");
		}
	})
	
}