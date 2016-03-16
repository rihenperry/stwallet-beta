/*global require, module, console */
/*jslint node: true */
"use strict";

//Pages
// var poolSchema	  	= require('../models/poolSchema.js');
var deviceSchema 	= require('../models/deviceInfoSchema.js');
var transSchema 	= require('../models/transaction_Schema.js');
var userSchema	 	= require('../models/userSchema.js');
var crypt 			= require("../config/crypt");				 // Crypt Connectivity.
var master          = require('../config/masterfunc.js'),        // Master Functions

    logger          = require('../config/w_config.js'),
    log             = logger();

//========================= Export Functions ========================= //

/*Add Qualified Searches Pending*/
module.exports.addQualifiedSearchesPending = function(req, res){
	
	log.info('Page Name: admin.js');
	log.info('API Name : addQualifiedSearchesPending');
	log.info('Add Qualified Search Pending API Hitted');
	log.info('Parameters Receiving..');

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
                log.error(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            var amount = parseFloat(retVal[0].amount);

            log.info('Add Qualified Search Value : '+amount);
				
            var updateDataQuery = {$inc: {"no_of_qualified_searches_pending": amount, "total_qualified_searches": -amount}};

            userSchema.findOneAndUpdate(query, updateDataQuery, function(err, retVals){

                if (err) {throw err}

                log.info('Qualified Search Value '+amount+' Added For : '+retVal[0].email);

                master.sendResponse(req, res, 200, -1, "Success");

            });

		});

	});

}

/* Deduct Unqualified Searches */
module.exports.deductunQualifiedSearches = function(req, res){
	
	log.info('Page Name: admin.js');
	log.info('API Name : deductunQualifiedSearches');
	log.info('Deduct Unqualified Search API Hitted');
	log.info('Parameters Receiving..');
	
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
                log.error(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            var amount = -parseFloat(retVal[0].amount);

            log.info('Add Qualified Search Value : '+amount);
				
            var updateDataQuery = {$inc: {"no_of_unQualified_searches": amount}};

            userSchema.findOneAndUpdate(query, updateDataQuery, function(err, retVals){

                if (err) {throw err}

                log.info('Qualified Search Value '+amount+' Added For : '+retVal[0].email);

                master.sendResponse(req, res, 200, -1, "Success");

            });

  		});

    });
    
};    

/* Reset Total Number Of Qualified Searches */
module.exports.resetTotalNumberOfQualifiedSearches = function (req, res){
	
	log.info('Page Name: admin.js');
	log.info('API Name : resetTotalNumberOfQualifiedSearches');	
	log.info('Reset Qualified Searches API Hitted');
	log.info('No Parameters Receiving...');
	
	var value = true;
	
	// Get Pool Results Function
	var query = {$set: {"no_of_qualified_searches_pending": 40, "last_hour_search_time":0, "total_no_of_searches_in_last_hour":0}};
	
	userSchema.update({'active':1}, query, {multi:true}, function(err, retVal){

		if (err) {throw err;}
		// Successfully Updated
		if(retVal)
		{
			log.info('Qualified Searches ReSetted Successfully');
			master.sendResponse(req, res, 200, -1, "Success");
		}
		
		// Error In Updating Pool Fees
		else
		{
			log.info('Failed to Reset Searches');
			master.sendResponse(req, res, 200, 5, "Database Error");
		}
	})
	
}

/* User Manage */
module.exports.userManage = function (req, res){
	
	log.info('Page Name: admin.js');
	log.info('API Name : userManage');	
	log.info('User Manage API Hitted');
	log.info('No Parameters Receiving...');
	
	var email      = req.body.email;	
	var skip       = req.body.skip;
	var order      = req.body.order;
	var column     = req.body.column;
    var publicKey  = req.body.publicKey;
    var signature  = req.body.signature;

	log.info('PublicKey  : '+publicKey);
	log.info('Signature  : '+signature);
	log.info('Email : '+email);
	log.info('Skip : '+skip);
	log.info('Order : '+order);
	log.info('column : '+column);

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
		
	var query = {'publicKey': publicKey};
    //var text = 'email='+encodeURIComponent(email)+'&publicKey='+encodeURIComponent(publicKey);
    var text = 'email='+email+'&publicKey='+publicKey;
    
	// Validate Signature
	master.secureAuth(query, text, signature, function (result){

        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

        if(email == '' || email == undefined || email == null)
		{
			query = {};
		}	
		
		else
		{
			//query = {"email":email};
            query = {"email":{ $regex: email }};
		}
		
		if(order == '' || order == undefined || order == null)
		{
			order = 1;
		}
	
		order = parseInt(order);
        skip  = parseInt(skip);

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

        var selectQuery = {"email":1, "first_name":1, "last_name":1, "deposit":1, "active":1};

        userSchema.find(query, selectQuery, function(err, results){
				
            if (err)
            {
                console.log(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            // Successfully Fetched
            if(results=="" || results==undefined || results.length==0)
            {
                log.info('No Results Found');
                master.sendResponse(req, res, 200, -1, "No Results");
                return;
            }
            
            log.info('Transactions Found Successfully');
            master.sendResponse(req, res, 200, -1, results);

        }).sort(sort).skip(skip).limit(10);
        
    });

}

/* Get Expence Transactions */
module.exports.getExpenceTransactions = function(req, res) {

	log.info('Page Name: admin.js');
	log.info('API Name : getExpenceTransactions');
	log.info('Get Expence Transaction Accessed');
	log.info('Parameters Receiving..');

	var vars = req.body;
	var email = req.body.email;
	var from = req.body.from;
	var to = req.body.to;
	var n = req.body.number;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	var type = vars.type;
	
	log.info('Email : '+email);
	log.info('From Date : '+from);
	log.info('To Date: '+to);
	log.info('N (Number Of Tansactions) :'+n);
	log.info('Public Key :'+publicKey);
	log.info('Signature :'+signature);
	
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
		log.info('Number is Wrong Number');
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
    
    //var text = "email="+encodeURIComponent(email)+"&from="+encodeURIComponent(vars.from)+"&to="+encodeURIComponent(vars.to)+"&number="+encodeURIComponent(n)+"&type="+encodeURIComponent(type)+"&publicKey="+encodeURIComponent(publicKey);
    
    var text = "email="+email+"&from="+vars.from+"&to="+vars.to+"&number="+n+"&type="+type+"&publicKey="+publicKey;

	// Validate Signature
	master.secureAuth(query, text, signature, function (result){

		if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

			log.info('Milisec Value of From Date :'+from);

			log.info('Milisec Value of To Date :'+to); 
			
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
						log.info('No Transactions');
						master.sendResponse(req, res, 200, -1, 'No Transactions');
						return;
					}
					
					// Transactions Found
					log.info('Transaction Found Successfully');
					master.sendResponse(req, res, 200, -1, retTrans);
					return;
					
				});

			}else{
				// Get Transaction
				transSchema.find(query, function(err, retTrans){
				
					// No Transaction
					if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
					{	
						log.info('No Transactions');
						master.sendResponse(req, res, 200, -1, 'No Transactions');
						return;
					}
					
					// Transactions Found
					log.info('Transaction Found Successfully');
					master.sendResponse(req, res, 200, -1, retTrans);
					return;
				
				}).limit(n);
			}
    		
	});

}

/* Get Active Emails */
module.exports.getActiveEmails = function(req, res){

	log.info('Page Name: admin.js.');
	log.info('API Name : getActiveEmails');
	log.info('Get All Transactions API Hitted');
	log.info('Parameters Receiving...');
	
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

	//var text = "flag="+encodeURIComponent(flag)+"&publicKey="+encodeURIComponent(publicKey);
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
                    log.error(err);
                    master.sendResponce(req, res, 200, 5, "Datbase Error");
                    return;
                }
                
                if(result == null || result == undefined || result == "")
                {
                    log.info('No Active Emails Found');
                    master.sendResponse(req, res, 200, 9, "No Result");
                    return;                
                }
                
                log.info(result.length+' Active Emails Found');
                master.sendResponse(req, res, 200, -1, result);
                return; 
            
            });
        }
        
        // For Other.. Data Only
        if(flag == 2 || flag == '2' || flag=='3' || flag==3)
        {
            userSchema.find({},{"email":1, "first_name":1, "last_name":1, "deposit":1, "active":1}, function(err, result){
            
                if(err)
                {
                    log.error(err);
                    master.sendResponce(req, res, 200, 5, "Datbase Error");
                    return;
                }
                
                if(flag == 3 || flag == '3')
                {
                    if(result == null || result == undefined || result == "")
                    {
                        log.info('No User Found');
                        master.sendResponse(req, res, 200, 9, 0);
                        return;                
                    }
                    
                    console.log('Total '+result.length+' Users Found');
			        master.sendResponse(req, res, 200, -1, result.length);
                }
                
                else
                {
                    if(result == "" || result == undefined || result.length<=0)
                    {
                        console.log('No Active Emails Found');
                        sendResponse(req, res, 200, 9, "No Result");
                        return;
                    }
			
                    log.info(result.length+' Results Found');
                    master.sendResponse(req, res, 200, -1, result);
                    return;
                }
                
            });
        }

    });
	
}

/* Get Income Transactions */
module.exports.getIncomeTransactions = function(req, res) {

	log.info('Page Name: admin.js');
	log.info('API Name : getIncomeTransactions');
	log.info('Get Income Transaction Accessed');
	log.info('Parameters Receiving..');

	var vars = req.body;
	var email = req.body.email;
	var from = req.body.from;
	var to = req.body.to;
	var n = req.body.number;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	var payment_mode = vars.payment_mode;
	
	log.info('Email : '+email);
	log.info('From Date : '+from);
	log.info('To Date: '+to);
	log.info('N (Number Of Tansactions) :'+n);
	log.info('Public Key :'+publicKey);
	log.info('Signature :'+signature);
	log.info('Payment Mode : '+payment_mode);
	
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
		log.info('Number is Blank');
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

	//var text = "email="+encodeURIComponent(email)+"&from="+encodeURIComponent(vars.from)+"&to="+encodeURIComponent(vars.to)+"&number="+encodeURIComponent(n)+"&payment_mode="+encodeURIComponent(payment_mode)+"&publicKey="+encodeURIComponent(publicKey);
    
    var text = "email="+email+"&from="+vars.from+"&to="+vars.to+"&number="+n+"&payment_mode="+payment_mode+"&publicKey="+publicKey;

	//Validate signature
	master.secureAuth(query, text, signature, function (result){

		if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
	
		log.info('Milisec Value of From Date :'+from);

		log.info('Milisec Value of To Date :'+to); 
			
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
						log.info('No Transactions');
						master.sendResponse(req, res, 200, -1, 'No Transactions');
						return;
					}
					
					// Transactions Found
					log.info('Transaction Found Successfully');
					master.sendResponse(req, res, 200, -1, retTrans);
					return;
				
				});

			}
			else{

				transSchema.find(query, function(err, retTrans){
							
					// No Transaction
					if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
					{	
						log.info('No Transactions');
						master.sendResponse(req, res, 200, -1, 'No Transactions');
						return;
					}
					
					// Transactions Found
					log.info('Transaction Found Successfully');
					master.sendResponse(req, res, 200, -1, retTrans);
					return;
				
				}).limit(n);
			
			}
			
			
		});
		
}

/* Payment Mode Count */
module.exports.paymentModeCount = function(req, res) {
    
    log.info('Page Name: admin.js');
	log.info('API Name : paymentModeCount');
	log.info('Payment Mode Count Accessed');
	log.info('Parameters Receiving..');

	var publicKey  = req.body.publicKey;
	var signature  = req.body.signature;
	var mode       = req.body.mode;
	
	log.info('Payment Mode : '+mode);
	log.info('Public Key :'+publicKey);
	log.info('Signature :'+signature);
    
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
    
    var query = {'publicKey': publicKey};
	//var text = "mode="+encodeURIComponent(mode)+"&publicKey="+encodeURIComponent(publicKey);
    var text = "mode="+mode+"&publicKey="+publicKey;
    
    master.secureAuth(query, text, signature, function (result){

        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
    
        var query = {$and:[{"type":"keyword_purchase"},{"payment_mode":mode}]}
        
        transSchema.find(query, function(err, retTrans){
            
            if(err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
            
            if(retTrans==null || retTrans==undefined || retTrans=="")
            {
                log.info('No Transactions');
                master.sendResponse(req, res, 200, 5, 0);
                return;
            }
            
            log.info(retTrans.length+' Transactions Found');
            master.sendResponse(req, res, 200, 5, retTrans.length);
            
        })
        
    })
    
}

/* Set User Balance */
module.exports.setUserBalance = function(req, res){

	console.log('Page Name: admin.js.');
	console.log('API Name : setUserBalance');
	console.log('Set User Balance API Hitted');
	console.log('Parameters Receiving...');
	
	var email = req.body.email;
	var deposit = req.body.deposit;
	var pending_withdrawal = req.body.pending_withdrawal;
	var approved_withdrawal = req.body.approved_withdrawal;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	
	console.log('Email : '+email);
	console.log('Deposit : '+deposit);
	console.log('Pending Withdrawals : '+pending_withdrawal);
	console.log('Approved Withdrawal : '+approved_withdrawal);
	console.log('Public Key : '+publicKey);
	console.log('Signature : '+signature);
	
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(master.validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
	
	// Validate Deposit
	if(!(master.validateParameter(deposit, 'Deposit Amount')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	// Validate Pending Withdrawal
	if(!(master.validateParameter(pending_withdrawal, 'Pending Withdrawal Amount')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	// Validate Approved Withdrawal
	if(!(master.validateParameter(approved_withdrawal, 'Approved Withdrawal Amount')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	var query = {'publicKey': publicKey};
	//var text = "email="+encodeURIComponent(email)+"&pending_withdrawal="+encodeURIComponent(pending_withdrawal)+"&approved_withdrawal="+encodeURIComponent(approved_withdrawal)+"&deposit="+encodeURIComponent(deposit)+"&publicKey="+encodeURIComponent(publicKey);
	var text = "email="+email+"&pending_withdrawal="+pending_withdrawal+"&approved_withdrawal="+approved_withdrawal+"&deposit="+deposit+"&publicKey="+publicKey;
    
	deposit = parseFloat(deposit);
	pending_withdrawal = parseFloat(pending_withdrawal);
	approved_withdrawal = parseFloat(approved_withdrawal);

	// Find Server
	master.secureAuth(query, text, signature, function (result){
		
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
    
  		query = {"email": email};
		
		var updatedFeilds = {
				
				deposit : deposit,
				blocked_for_pending_withdrawals : pending_withdrawal,
				approved_withdrawals : approved_withdrawal
			
			};

		// Find User From Its Email From User Table
		userSchema.findOneAndUpdate(query, updatedFeilds, function(err, result){
				
			//Unable To Get User With This Emnail (No Such Email Is Registered)
			if (typeof result === 'undefined' || result == null || result.length <= 0)
			{
				console.log(email+' Is Not Registered');
				master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address');
				return;
			}

 			// Balance Updated Successfully
			console.log('User Balance Successfully Upadted');
			master.sendResponse(req, res, 200, -1, "Success");
		
		})
	
	})

}

/* Get Email Type transaction */
module.exports.getEmailTypeTransactions = function(req, res){

	console.log('Page Name: admin.js.');
	console.log('API Name : getEmailTypeTransactions');
	console.log('Email Type Transaction API Hitted');
	console.log('Parameters Receiving...');

	var email = req.body.email;
	var type = req.body.type;
	var skip = req.body.skip;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	
	log.info('Email : '+email);
	log.info('Type : '+type);
    log.info('Skip :'+skip);
	log.info('Public Key : '+publicKey);
	log.info('Signature : '+signature);
	
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(master.validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }

	// Validate Signature
	if(!(master.validateParameter(type, 'Type')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	var query = {'publicKey': publicKey};
	//var text = "email="+encodeURIComponent(email)+"&type="+encodeURIComponent(type)+"&skip="+encodeURIComponent(skip)+"&publicKey="+encodeURIComponent(publicKey);
    var text = "email="+email+"&type="+type+"&skip="+skip+"&publicKey="+publicKey;
	
	master.secureAuth(query, text, signature, function (result){
		
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

        if(type == "All")
        {
            var query = {$or:[{"sender":email},{"receiver":email}]}
        }
        else
        {
            var query = {$and:[{$or:[{"sender":email},{"receiver":email}]},{"type":type}]}
        }
			
        skip = parseInt(skip);
			
        transSchema.find(query, function(err, retVal){
			
            if(retVal == "" || retVal == undefined || retVal.length <= 0)
            {
                console.log('No Transactions');
                master.sendResponse(req, res, 200, 9, "No Result");
                return;
            }				

            else
            {
                console.log(retVal.length+' Transactions Found');
                master.sendResponse(req, res, 200, -1, retVal);
            }
				
        }).sort({"time":-1}).skip(skip).limit(10);
			
    })
		
}

/* Update User Status */
module.exports.updateUserStatus = function(req, res){
    
    log.info('Page Name: admin.js.');
	log.info('API Name : blockUser');
	log.info('Set User Balance API Hitted');
	log.info('Parameters Receiving...');
	
	var email      = req.body.email;
    var status     = req.body.status;
	var publicKey  = req.body.publicKey;
	var signature  = req.body.signature;
    
    log.info('Email : '+email);
    log.info('Status : '+status);
	log.info('Public Key : '+publicKey);
	log.info('Signature : '+signature);
    
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(master.validateEmail(email))) 
	{
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {'publicKey': publicKey};
	//var text = "email="+encodeURIComponent(email)+"&status="+encodeURIComponent(status)+"&publicKey="+encodeURIComponent(publicKey);
    var text = "email="+email+"&status="+status+"&publicKey="+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
		
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
        
        status = parseInt(status);
        var userStatus = {active : status}
        
        // Find User From Its Email From User Table
		userSchema.findOneAndUpdate({email:email}, userStatus, function(err, result){
				
			//Unable To Get User With This Emnail (No Such Email Is Registered)
			if (typeof result === 'undefined' || result == null || result.length <= 0)
			{
				console.log(email+' Is Not Registered');
				master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address');
				return;
			}

 			// Status Updated Successfully
			console.log('User Status Successfully Upadted');
			master.sendResponse(req, res, 200, -1, "Success");
		
		})
    
    })
    
}