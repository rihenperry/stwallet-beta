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
						sendResponse(req, res, 200, 9, "No Result");
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
	
	var text = 'email='+email+'&publicKey='+publicKey;		

	var query = {'publicKey': publicKey};

	console.log('PublicKey  : '+publicKey);
	console.log('Signature  : '+signature);
	
	// Validate Public Key
	if(!(master.validateParameter(email, 'Email Id')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	master.secureAuth(query, text, signature, function (result){

        console.log(result);
        
    });

	// var skip = req.body.skip;
	// var order = req.body.order;
	// var email = req.body.email;
	// var column = req.body.column;
 // 	var query;
	
	// skip = parseInt(skip);
	
	// if(email == '' || email == undefined || email == null)
	// {
	// 	query = {};
	// }	
	
	// else
	// {
	// 	query = {"email":email};
	// }
	
	// if(order == '' || order == undefined || order == null)
	// {
	// 	order = 1;
	// }
	
	// order = parseInt(order);
	
	// console.log('Email : '+email);
	// console.log('Skip : '+skip);
	// console.log('Order : '+order);
	// console.log('column : '+column);
	
	// var sort;
	
	// if(column=="email")
	// {
	// 	sort = {"email":order};
	// }
	
	// if(column=="first_name")
	// {
	// 	sort = {"first_name":order};
	// } 
	
	// if(column=="deposit")
	// {
	// 	sort = {"deposit":order};
	// }
	
	// if(column=="active")
	// {
	// 	sort = {"active":order};
	// }
	
	// // Get Pool Results Function
	// db.getUserManage(query, skip, sort, function(results){
		
	// 	// Successfully Fetched
	// 	if(results)
	// 	{
	// 		console.log('User Results Found Successfully');
	// 		sendResponse(req, res, 200, -1, results);
	// 	}
		
	// 	// Error In Fetching
	// 	else
	// 	{
	// 		console.log('Failed to Found Users Results');
	// 		sendResponse(req, res, 200, 5, "Database Error");
	// 	}
	// })
	
}
