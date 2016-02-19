/*global require, module, console */
/*jslint node: true */
"use strict";

//Pages
// var poolSchema	  	= require('../models/poolSchema.js');
var deviceSchema 	= require('../models/deviceInfoSchema.js');
var transSchema 	= require('../models/transaction_Schema.js');
var userSchema	 	= require('../models/userSchema.js');
var crypt 			= require("../config/crypt");				 // Crypt Connectivity.
var master          = require('../config/masterfunc.js');        // Master Functions

//========================= Export Functions ========================= //

/*Get All Transactions*/
module.exports.getAllTransactions = function(req, res){

	console.log('Page Name: admin.js.');
	console.log('API Name : getAllTransactions');
	console.log('Get All Transactions API Hitted');
	console.log('Parameters Receiving..');
	
	var email = req.body.email;
	// var publicKey = req.body.publicKey;
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	// var signature = req.body.signature;
	var signature = '5a3f3f02f59d666fbc274347e1776406dd3699ab7def639f3b0ff457802375fc28abe1468f450f8d0c47e6ef984bfd8f3939062559ee3395602e55fb48d42eba';
	// var signature = 'f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce';
	
	var text = 'publicKey='+publicKey;		
	var query = {'publicKey': publicKey};

	console.log('PublicKey  : '+publicKey);
	console.log('Signature  : '+signature);
	
	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	  master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
    
    	var query = {'publicKey': publicKey};

        deviceSchema.find({}, query, function(err, result){

            if(err)
            {
                console.log(err);
                return err;
            }

            if(result==null || result=="") // Email Not Found
            {
                console.log(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            	transSchema.find({}, function(err, results){

					console.log(results);
					// Error In Fetching Data
					if (err)
					{
					  console.log('Error In Fetching Data');
					  console.log(err);
					  return;
					}
					if(results == "" || results == undefined || results.length<=0)
					{
						console.log('No Transactions');
						master.sendResponse(req, res, 200, 9, "No Result");
						return;
					}
					
					console.log('Total '+results.length+' Transactions Found');
					master.sendResponse(req, res, 200, -1, results);

				}).sort({'time':-1}).limit(50);

       	});     

    });
	
}

/*Add Qualified Searches Pending*/
module.exports.addQualifiedSearchesPending = function(req, res){
	
	console.log('Page Name: admin.js');
	console.log('API Name : addQualifiedSearchesPending');
	console.log('Add Qualified Search Pending API Hitted');
	console.log('Parameters Receiving..');

	//validation
	master.validation(req, function(retVal){
		        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }

        var query = {"email": retVal[0].email};

        //find user
        userSchema.find(query, function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            var amount = parseFloat(retVal[0].amount);

            console.log('Add Qualified Search Value : '+amount);
				
				var updateDataQuery = {$inc: {"no_of_qualified_searches_pending": amount, "total_qualified_searches": -amount}};

				userSchema.findOneAndUpdate(query, updateDataQuery, function(err, retVals){

					if (err) {throw err}

					console.log('Qualified Search Value '+amount+' Added For : '+retVal[0].email);

					master.sendResponse(req, res, 200, -1, "Success");
			
				});

		});

	});

}

/*Deduct Unqualified Searches*/
module.exports.deductunQualifiedSearches = function(req, res){
	
	console.log('Page Name: admin.js');
	console.log('API Name : deductunQualifiedSearches');
	console.log('Deduct Unqualified Search API Hitted');
	console.log('Parameters Receiving..');
	
	//validation
	master.validation(req, function(retVal){
		        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }

        var query = {"email": retVal[0].email};

        //find user
        userSchema.find(query, function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            var amount = -parseFloat(retVal[0].amount);

            console.log('Add Qualified Search Value : '+amount);
				
				var updateDataQuery = {$inc: {"no_of_unQualified_searches": amount}};

				userSchema.findOneAndUpdate(query, updateDataQuery, function(err, retVals){

					if (err) {throw err}

					console.log('Qualified Search Value '+amount+' Added For : '+retVal[0].email);

					master.sendResponse(req, res, 200, -1, "Success");
			
				});

  		});

    });
    
};    

/*Reset Total Number Of Qualified Searches*/
module.exports.resetTotalNumberOfQualifiedSearches = function (req, res){
	
	console.log('Page Name: admin.js');
	console.log('API Name : resetTotalNumberOfQualifiedSearches');	
	console.log('Reset Qualified Searches API Hitted');
	console.log('No Parameters Receiving...');
	
	var value = true;
	
	// Get Pool Results Function
	// db.setUserQualifiedSearches(value, function(retVal){
	var query = {$set: {"no_of_qualified_searches_pending": 40, "last_hour_search_time":0, "total_no_of_searches_in_last_hour":0}};
	
	userSchema.update({'active':1}, query, {multi:true}, function(err, retVal){

		if (err) {throw err;}
		// Successfully Updated
		if(retVal)
		{
			console.log('Qualified Searches ReSetted Successfully');
			master.sendResponse(req, res, 200, -1, "Success");
		}
		
		// Error In Updating Pool Fees
		else
		{
			console.log('Failed to Reset Searches');
			master.sendResponse(req, res, 200, 5, "Database Error");
		}
	})
	
}

/*User manage*/
module.exports.userManage = function (req, res){
	
	console.log('Page Name: admin.js');
	console.log('API Name : userManage');	
	console.log('User Manage API Hitted');
	console.log('No Parameters Receiving...');
	
	var email = req.body.email;
	// var publicKey = req.body.publicKey;
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	// var signature = req.body.signature;
	var signature = 'f0c74ba483ad72f57317618c6f7ec5e016d57f2f61e8297a515c2a66b34203b45afd8c1ac8be486f606cfb9c9d6d461f758f2a3ff5a5e735e1d86c5949bce95f';
	// var signature = 'f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce';
	var skip = req.body.skip;
	var order = req.body.order;
	var column = req.body.column;

	var text = 'email='+email+'&publicKey='+publicKey;		

	var query = {'publicKey': publicKey};

	console.log('PublicKey  : '+publicKey);
	console.log('Signature  : '+signature);
	console.log('Email : '+email);
	console.log('Skip : '+skip);
	console.log('Order : '+order);
	console.log('column : '+column);

	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	master.secureAuth(query, text, signature, function (result){

        console.log(result);

        if(email == '' || email == undefined || email == null)
		{
			query = {};
		}	
		
		else
		{
			query = {"email":email};
		}
		
		if(order == '' || order == undefined || order == null)
		{
			order = 1;
		}
	
		order = parseInt(order);

		var sort;
	
		if(column=="email")
		{
			sort = {"email":order};
		}
		
		if(column=="first_name")
		{
			sort = {"first_name":order};
		} 
		
		if(column=="deposit")
		{
			sort = {"deposit":order};
		}
		
		if(column=="active")
		{
			sort = {"active":order};
		}

		console.log(sort);

			var selectQuery = {"email":1, "first_name":1, "last_name":1, "deposit":1, "active":1};

			userSchema.find({}, selectQuery, function(err, results){
				
				if (err)
				{
				   console.log('Error In Getting Active Emails');
				   console.log(err);
				   return;
				}

				// Successfully Fetched
				if(results)
				{
					console.log('User Results Found Successfully');
					master.sendResponse(req, res, 200, -1, results);
				}
				
				// Error In Fetching
				else
				{
					console.log('Failed to Found Users Results');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			}).sort(sort).limit(10);
        
    });

}

/*Get Expence Transactions*/
module.exports.getExpenceTransactions = function(req, res) {

	console.log('Page Name: admin.js');
	console.log('API Name : getExpenceTransactions');
	console.log('Get Expence Transaction Accessed');
	console.log('Parameters Receiving..');

	var vars = req.body;
	var email = req.body.email;
	var from = req.body.from;
	var to = req.body.to;
	var n = req.body.number;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	
	var type = vars.type;
	
	console.log('Email : '+email);
	console.log('From Date : '+from);
	console.log('To Date: '+to);
	console.log('N (Number Of Tansactions) :'+n);
	console.log('Public Key :'+publicKey);
	console.log('Signature :'+signature);
	
	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Checking Transaction Numbers	
	if(n=="" || n==undefined)
	{
		n = 0;
	}

	// Number of Transactions
	else if(isNaN(n))
	{
		console.log('Number is Wrong Number');
		master.sendResponse(req, res, 200, 12, "Wrong Input");
		return;
	}

	// Sorting and Getting Today's Date, Month, Year
	var dateForm = new Date(); 
	var tdate 	 = dateForm.getDate(); 
	tdate 		 = parseInt(tdate);
	var tmonth   = dateForm.getMonth(); 
	tmonth 		 = parseInt(tmonth);
	tmonth++;
	var tyear 	 = dateForm.getFullYear(); 
	tyear 		 = parseInt(tyear);	
	var todaysDate = tdate+'/'+tmonth+'/'+tyear;
	var checkTodaysDate = new Date(''+tmonth+'/'+tdate+'/'+tyear+'');
	checkTodaysDate = checkTodaysDate.getTime();
	
	// Validate From Date
	if(from == "" || from == undefined)
	{
		from = 0;
	}
	else
	{
		var month = from.substring(0, 2); 
		var day   = from.substring(3, 5); 
		var year  = from.substring(6, 10); 
		
		var d = new Date(''+month+'/'+day+'/'+year+' 00:00:00');
		var milisec = d.getTime();
		from = milisec;
	}
	
	// Validate last Limit
	if(to === undefined || to.length<=0 || to == null )
	{
		to = new Date().getTime();
	}
	else
	{
		var month = to.substring(0, 2); 
		var day = to.substring(3, 5); 
		var year = to.substring(6, 10); 
		
		var enteredToDate = day+'/'+month+'/'+year;
		
		if(enteredToDate == todaysDate)
		{
			to = new Date().getTime();
		}
		else
		{
			var d = new Date(''+month+'/'+day+'/'+year+' 23:59:59');
			var milisec = d.getTime();
			to = milisec;
		}	
	}
	
	n = parseInt(n);

	var query = {'publicKey': publicKey};
    
    var text = "email="+email+"&from="+vars.from+"&to="+vars.to+"&number="+n+"&type="+type+"&publicKey="+publicKey;

	// Validate Signature
	master.secureAuth(query, text, signature, function (result){

		if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

			console.log('Milisec Value of From Date :'+from);

			console.log('Milisec Value of To Date :'+to); 
			
			if(type == "" || type == undefined || type == 'All')
			{
				if(email=="" || email==undefined || email==null)
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}},{$or:[{"type":"affiliate_earnings"},{"type":"first_buy_cashback"}]}]}]};
				}
				
				else
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {$or:[{"sender":email},{"receiver":email}]}, {$or:[{"type":"affiliate_earnings"},{"type":"first_buy_cashback"}]}]};
				}

			}
			
			else
			{	
				if(email=="" || email==undefined || email==null)
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {"type":type}]};
				}
				
				else
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {$or:[{"sender":email},{"receiver":email}]}, {"type":type}]};
				}
				
			}

			if(n==0){

				// Get Transaction
				transSchema.find(query, function(err, retTrans){
									
					// No Transaction
					if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
					{	
						console.log('No Transactions');
						master.sendResponse(req, res, 200, -1, 'No Transactions');
						return;
					}
					
					// Transactions Found
					console.log('Transaction Found Successfully');
					master.sendResponse(req, res, 200, -1, retTrans);
					return;
					
				});

			}else{

				transSchema.find(query, function(err, retTrans){
				// Get Transaction
				// db.expenceTransactions(query, n, function(retTrans) {
					
				// No Transaction
				if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
				{	
					console.log('No Transactions');
					master.sendResponse(req, res, 200, -1, 'No Transactions');
					return;
				}
				
				// Transactions Found
				console.log('Transaction Found Successfully');
				master.sendResponse(req, res, 200, -1, retTrans);
				return;
				
				}).limit(n);
			}
    		
	});

}

/*Payment Mode Count*/
module.exports.paymentModeCount = function (req, res){
	
	console.log('Page Name: admin.js');
	console.log('API Name : paymentModeCount');	
	console.log('User Manage API Hitted');
	console.log('No Parameters Receiving...');
	
	var mode = req.body.mode;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;

	console.log('Mode : '+mode);
	
	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	var query = {'publicKey':publicKey};

	var text = "mode="+mode+"&publicKey="+publicKey;

	master.secureAuth(query, text, signature, function (result){

		if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

		var query = {$and:[{"type":"keyword_purchase"},{"payment_mode":mode}]}
	
			// Get Pool Results Function
			transSchema.find(query, function(err, results){
				
				// Successfully Fetched
				if(results)
				{
					console.log('Total '+results.length+' Transactions Found By Payment Mode '+mode);
					master.sendResponse(req, res, 200, -1, results.length);
				}
				
				// Error In Fetching
				else
				{
					console.log('Failed to Found Users Results');
					master.sendResponse(req, res, 200, 5, "Database Error");
				}
			});
		
	});

}

/*Get Active Emails*/
module.exports.getActiveEmails = function(req, res){

	console.log('Page Name: admin.js.');
	console.log('API Name : getActiveEmails');
	console.log('Get All Transactions API Hitted');
	console.log('Parameters Receiving...');
	
	var flag = req.body.flag;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;

	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Flag
	if(!(master.validateParameter(flag, 'flag')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	var query = {'publicKey':publicKey};

	var text = "flag="+flag+"&publicKey="+publicKey;

	master.secureAuth(query, text, signature, function (result){

		if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

    	// For Active Users Only
        if(flag == 1 || flag == '1')
        {
            userSchema.find({active:1},{"email":1, "first_name":1, "last_name":1}, function(err, result){
            
                if(err)
                {
                    console.log(err);
                    master.sendResponce(req, res, 200, 5, "Datbase Error");
                    return;
                }
                
                if(result == null || result == undefined || result == "")
                {
                    console.log('No Active Emails Found');
                    master.sendResponse(req, res, 200, 9, "No Result");
                    return;                
                }
                
                console.log(result.length+' Active Emails Found');
                master.sendResponse(req, res, 200, -1, result);
                return; 
            
            });
        }
        
        // For Other.. Data Only
        if(flag == 2 || flag == '2')
        {
            userSchema.find({},{"email":1, "first_name":1, "last_name":1, "deposit":1, "active":1}, function(err, result){
            
                if(err)
                {
                    console.log(err);
                    master.sendResponce(req, res, 200, 5, "Datbase Error");
                    return;
                }
                
                if(result == null || result == undefined || result == "")
                {
                    console.log('No Data Found');
                    master.sendResponse(req, res, 200, 9, "No Result");
                    return;                
                }
                
                console.log(result.length+' Results Found');
                master.sendResponse(req, res, 200, -1, result);
                return;
                
            });
        }

    });
	
}

/*Get Income Transactions*/
module.exports.getIncomeTransactions = function(req, res) {

	console.log('Page Name: admin.js');
	console.log('API Name : getIncomeTransactions');
	console.log('Get Income Transaction Accessed');
	console.log('Parameters Receiving..');

	var vars = req.body;
	var email = req.body.email;
	var from = req.body.from;
	var to = req.body.to;
	var n = req.body.number;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	var payment_mode = vars.payment_mode;
	
	console.log('Email : '+email);
	console.log('From Date : '+from);
	console.log('To Date: '+to);
	console.log('N (Number Of Tansactions) :'+n);
	console.log('Public Key :'+publicKey);
	console.log('Signature :'+signature);
	console.log('Payment Mode : '+payment_mode);
	
	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	// Checking Transaction Value
	if(n=="" || n==undefined)
	{
		n = 0;
	}

	// Number of Transactions
	else if(isNaN(n))
	{
		console.log('Number is Blank');
		n = 0;
	}

	// Sorting and Getting Today's Date, Month, Year
	var dateForm = new Date(); 
	var tdate = dateForm.getDate(); 
	tdate = parseInt(tdate);
	var tmonth = dateForm.getMonth(); 
	tmonth = parseInt(tmonth);
	tmonth++;
	var tyear = dateForm.getFullYear(); 
	tyear = parseInt(tyear);	
	var todaysDate = tdate+'/'+tmonth+'/'+tyear;
	var checkTodaysDate = new Date(''+tmonth+'/'+tdate+'/'+tyear+'');
	checkTodaysDate = checkTodaysDate.getTime();
	
	// Validate From Date
	if(from == "" || from == undefined)
	{
		from = 0;
	}
	else
	{
		var month = from.substring(0, 2); 
		var day = from.substring(3, 5); 
		var year = from.substring(6, 10); 
		
		var d = new Date(''+month+'/'+day+'/'+year+' 00:00:00');
		var milisec = d.getTime();
		from = milisec;
	}
	
	// Validate last Limit
	if(to === undefined || to.length<=0 || to == null )
	{
		to = new Date().getTime();
	}
	else
	{
		var month = to.substring(0, 2); 
		var day = to.substring(3, 5); 
		var year = to.substring(6, 10); 
		
		var enteredToDate = day+'/'+month+'/'+year;
		
		if(enteredToDate == todaysDate)
		{
			to = new Date().getTime();
		}
		else
		{
			var d = new Date(''+month+'/'+day+'/'+year+' 23:59:59');
			var milisec = d.getTime();
			to = milisec;
		}	
	}
	
	var n = parseInt(n);

	var query = {'publicKey': publicKey};

	var text = "email="+email+"&from="+vars.from+"&to="+vars.to+"&number="+n+"&payment_mode="+payment_mode+"&publicKey="+publicKey;

	//Validate signature
	master.secureAuth(query, text, signature, function (result){

		if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
	
		console.log('Milisec Value of From Date :'+from);

		console.log('Milisec Value of To Date :'+to); 
			
			if(payment_mode == "" || payment_mode == undefined || payment_mode == 'All')
			{
				if(email=="" || email==undefined || email==null)
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]},{"type":"keyword_purchase"}]};
				}
				
				else
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {$or:[{"sender":email},{"receiver":email}]}, {"type":"keyword_purchase"}]};
				}

			}
			//payment mode is not defind
			else
			{	
				if(email=="" || email==undefined || email==null)
				{
					if(payment_mode=="bitcoin")
					{
						query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {"payment_mode":{$ne:"paypal"}}, {"type":"keyword_purchase"}]};
					}

					else
					{	
						query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {"payment_mode":payment_mode}, {"type":"keyword_purchase"}]};
					}
					
				}
				
				else
				{
					if(payment_mode=="bitcoin")
					{
						query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {$or:[{"sender":email},{"receiver":email}]}, {"payment_mode":{$ne:"paypal"}}, {"type":"keyword_purchase"}]};
					}
					else
					{
						query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {$or:[{"sender":email},{"receiver":email}]}, {"payment_mode":payment_mode}, {"type":"keyword_purchase"}]};
					}
					
				}
				
			}
    	
			// Get Transaction
			if (n == 0) {

				transSchema.find(query, function(err, retTrans){
							
					// No Transaction
					if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
					{	
						console.log('No Transactions');
						master.sendResponse(req, res, 200, -1, 'No Transactions');
						return;
					}
					
					// Transactions Found
					console.log('Transaction Found Successfully');
					master.sendResponse(req, res, 200, -1, retTrans);
					return;
				
				});

			}
			else{

				transSchema.find(query, function(err, retTrans){
							
					// No Transaction
					if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
					{	
						console.log('No Transactions');
						master.sendResponse(req, res, 200, -1, 'No Transactions');
						return;
					}
					
					// Transactions Found
					console.log('Transaction Found Successfully');
					master.sendResponse(req, res, 200, -1, retTrans);
					return;
				
				}).limit(n);
			
			}
			
			
		});
		
}

module.exports.userKwdPurchaseTrans = function(req, res) {

	console.log('Page Name: admin.js');
	console.log('API Name : userKwdPurchaseTrans');
	console.log('Get Keyword Purchase Transaction Accessed');
	console.log('Parameters Receiving..');

	var vars = req.body;
	var email = req.body.email;
	var from = req.body.from;
	var to = req.body.to;
	var n = req.body.number;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	var mode = vars.mode;
	
	console.log('Email : '+email);
	console.log('From Date : '+from);
	console.log('To Date: '+to);
	console.log('Number Of Transactions : '+n);
	console.log('Payment Mode : '+mode);
	console.log('Public Key :'+publicKey);
	console.log('Signature :'+signature);
	
	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Checking Transaction Numbers	
	if(n=="" || n==undefined)
	{
		n = 0;
	}

	// Number of Transactions
	else if(isNaN(n))
	{
		console.log('Number is Wrong Number');
		sendResponse(req, res, 200, 12, "Wrong Input");
		return;
	}

	// Sorting and Getting Today's Date, Month, Year
	var dateForm = new Date(); 
	var tdate = dateForm.getDate(); 
	tdate = parseInt(tdate);
	var tmonth = dateForm.getMonth(); 
	tmonth = parseInt(tmonth);
	tmonth++;
	var tyear = dateForm.getFullYear(); 
	tyear = parseInt(tyear);	
	var todaysDate = tdate+'/'+tmonth+'/'+tyear;
	var checkTodaysDate = new Date(''+tmonth+'/'+tdate+'/'+tyear+'');
	checkTodaysDate = checkTodaysDate.getTime();
	
	// Validate From Date
	if(from == "" || from == undefined)
	{
		from = 0;
	}
	else
	{
		var month = from.substring(0, 2); 
		var day = from.substring(3, 5); 
		var year = from.substring(6, 10); 
		
		var d = new Date(''+month+'/'+day+'/'+year+' 00:00:00');
		var milisec = d.getTime();
		from = milisec;
	}
	
	// Validate last Limit
	if(to === undefined || to.length<=0 || to == null )
	{
		to = new Date().getTime();
	}
	else
	{
		var month = to.substring(0, 2); 
		var day = to.substring(3, 5); 
		var year = to.substring(6, 10); 
		
		var enteredToDate = day+'/'+month+'/'+year;
		
		if(enteredToDate == todaysDate)
		{
			to = new Date().getTime();
		}
		else
		{
			var d = new Date(''+month+'/'+day+'/'+year+' 23:59:59');
			var milisec = d.getTime();
			to = milisec;
		}	
	}
	
	
	
	n = parseInt(n);

	var query = {'publicKey': publicKey};
	var text = "email="+email+"&from="+vars.from+"&to="+vars.to+"&mode="+mode+"&publicKey="+publicKey;

	// Find Server
    master.secureAuth(query, text, signature, function (result){

		if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
					
			// Signature Match
			console.log('Milisec Value of From Date :'+from);

			console.log('Milisec Value of To Date :'+to); 
			
			if(mode == "" || mode == undefined || mode == 'All')
			{
				if(email=="" || email==undefined || email==null)
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}},{"type":"keyword_purchase"},{$or:[{"payment_mode":"bitcoin"},{"payment_mode":"paypal"}]}]}]};
				}
				
				else
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {"type":"keyword_purchase"}, {$or:[{"sender":email},{"receiver":email}]}, {$or:[{"payment_mode":"bitcoin"},{"payment_mode":"paypal"}]}]};
				}

			}
			
			else
			{	
				if(email=="" || email==undefined || email==null)
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {"type":"keyword_purchase"}, {"payment_mode":mode}]};
				}
				
				else
				{
					query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {"type":"keyword_purchase"}, {$or:[{"sender":email},{"receiver":email}]}, {"payment_mode":mode}]};
				}
				
			}
    
			// Get Transaction
			if(n==0){

				transSchema.find(query, function(retTrans){
					// No Transaction
					if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
					{	
						console.log('No Transactions');
						master.sendResponse(req, res, 200, -1, 'No Transactions');
						return;
					}
					
					// Transactions Found
					console.log('Transaction Found Successfully');
					master.sendResponse(req, res, 200, -1, retTrans);
					return;
				
				});
			}
			else{

				transSchema.find(query, function(retTrans){				
					// No Transaction
					if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
					{	
						console.log('No Transactions');
						master.sendResponse(req, res, 200, -1, 'No Transactions');
						return;
					}
					
					// Transactions Found
					console.log('Transaction Found Successfully');
					master.sendResponse(req, res, 200, -1, retTrans);
					return;
				
				}).limit(n);
			}
			
			
	});
		
};
