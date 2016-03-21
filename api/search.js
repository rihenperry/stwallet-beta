/*global require, module, console */
/*jslint node: true */
"use strict";

var logger          = require('../config/w_config.js'),
    log             = logger(),

// Pages
    userSchema      = require('../models/userSchema.js'),       // User Schema
    poolSchema	  	= require('../models/poolSchema.js'),       // Pool Schema
    master          = require('../config/masterfunc.js');       // Master Functions

/* Export Fuctions */

/*============================= Add Search Earning =============================*/

module.exports.addSearchEarning = function(req, res){
    
	log.info('Page Name : search.js');
	log.info('API Name : addSearchEarning')
	log.info('Add Search Earning API Hitted');
	log.info('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);

        // Find and Update User's Search Earning
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{search_earning:amount}},function(err, result){

            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
				if(retVal[0].email!="searchUser@searchtrade.com")
				{
					poolSchema.findOneAndUpdate({},{$inc:{total_search_payout:amount}},function(err, result){
					
						if (err)
						{
							log.error(err);
							master.sendResponse(req, res, 200, 5, "Database Error");
							return;
						}
					
					})
				}
			
                log.info('Search Earning Amount '+amount+' Successfully Added To '+retVal[0].email);
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
  
}

/*============================= Deduct Search Earning =============================*/

module.exports.deductSearchEarning = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductSearchEarning');
	log.info('Deduct Search Earning API Hitted');
	log.info('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Search Earning
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{search_earning:amount}},function(err, result){

            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                log.info('Search Earning Amount '+amount+' Successfully Deducted From '+retVal[0].email);
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
  
}

/*============================= Deduct Qualified Searches =============================*/

module.exports.deductQualifiedSearches = function(req, res){
    
	log.info('Page Name : search.js');
	log.info('API Name : deductQualifiedSearches')
	log.info('Deduct Qualified Searches API Hitted');
	log.info('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        var query = {$inc:{no_of_qualified_searches_pending:-amount, total_qualified_searches:amount, total_no_of_searches_in_last_hour:amount}};
        
        // Find and Update User's Qualified Searches
        userSchema.findOneAndUpdate({email:retVal[0].email},query,function(err, result){

            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                log.info('Qualified Searches '+amount+' Successfully Deducted From '+retVal[0].email);
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
  
}

/*============================= Add UnQualified Searches =============================*/

module.exports.addunQualifiedSearches = function(req, res){
    
	log.info('Page Name : search.js');
	log.info('API Name : addunQualifiedSearches')
	log.info('Add UnQualified Searches API Hitted');
	log.info('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's UnQualified Searches
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{no_of_unQualified_searches:amount}},function(err, result){

            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                log.info('UnQualified Searches '+amount+' Successfully Added To '+retVal[0].email);
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
  
}

/*============================= Update Last Hour Value =============================*/

module.exports.updateLastHourValue = function(req, res){
	
	log.info('Page Name: search.js');
	log.info('API Name : updateLastHourValue');	
	log.info('Update Last Hour API Hitted');
	log.info('Parameters Receiving -:');
    
	var email       = req.body.email;
    var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;
	var date        = new Date();
	var time        = date.getTime();
    
    log.info('Email : '+email);
	log.info('Time : '+time);
	log.info('Public Key: '+publicKey);
	log.info('Signature: '+signature);
    
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
    
    var query = {publicKey:publicKey};
    //var text  = "email="+encodeURIComponent(email)+"&publicKey="+encodeURIComponent(publicKey);
    var text  = "email="+email+"&publicKey="+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
        
        var query = {$set:{last_hour_search_time:time, total_no_of_searches_in_last_hour:0}}
        
        // Find and Update User's Last Hour Search Time
        userSchema.findOneAndUpdate({email:email},query,function(err, result){
            
            if(err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
            
            if(result == null || result == undefined || result == "")
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            log.info('Updated Last Hour Search Time '+time+' To : '+email );
            master.sendResponse(req, res, 200, -1, "Success");
            return;
            
        })
        
    })
    
}

/*============================= Recent Search =============================*/

module.exports.recentSearches = function(req, res){

	log.info('Page Name: search.js');
	log.info('API Name : recentSearches');
	log.info('Recent Searches API Hitted');
	log.info('Parameters Receiving -:');
    
  	var email       = req.body.email;
    var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;
    var searches    = req.body.searches;
    
    log.info('Email: '+email);
	log.info('Searches (Last Search Record): '+searches);
	log.info('Public Key: '+publicKey);
	log.info('Signature: '+signature);

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
    
    var query = {publicKey:publicKey};
    //var text  = "email="+encodeURIComponent(email)+"&searches="+encodeURIComponent(searches)+"&publicKey="+encodeURIComponent(publicKey);
    var text  = "email="+email+"&searches="+searches+"&publicKey="+publicKey;
    
    // Authentication
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
      
        // Get Data From User
        userSchema.find({email:email},function(err, result){
            
            if(err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
            
            if(result == null || result == undefined || result == "")
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            var finalResults = '';
				
            // Storing in JSON Format
            searches = JSON.parse(searches);
            
            var data = result[0].recent_searches;
            
            if(data == "" || data == undefined || data == null)
            {
                finalResults = [searches];
            }
            else	
            {
                log.info('Recent Searches Data Received From User Field');
                data.unshift(searches);
                
                if(data.length>500)
                {
                    data.splice(500, 1);
                }
                
                finalResults = data;
            }	
            
            // Find and Update User's Recent Searches
            userSchema.findOneAndUpdate({email:email},{$set:{recent_searches:finalResults}},function(err, result){
            
                if(err)
                {
                    log.error(err);
                    master.sendResponse(req, res, 200, 5, "Database Error");
                    return;
                }

                if(result == null || result == undefined || result == "")
                {
                    log.info(email+" Not Registered");
                    master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                    return;
                }
                
                log.info('Updated Recent Searches Field of '+email+' Successfully');
                master.sendResponse(req, res, 200, -1, "Success");
                return;
                
            })
            
        })
        
    })
    
}

/*============================= Email Existance API =============================*/

module.exports.checkExistanceEmail = function(req, res){

    log.info('Page Name: search.js');
	log.info('API Name : checkExistanceEmail');	
	log.info('Check Email Existance API Hitted');
	log.info('Parameters Receiving -:');
    
  	var email       = req.body.email;
    var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;
    
    log.info('Email: '+email);
	log.info('Public Key: '+publicKey);
	log.info('Signature: '+signature);

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
    
    var query = {publicKey:publicKey};
    //var text  = "email="+encodeURIComponent(email)+"&publicKey="+encodeURIComponent(publicKey);
    var text  = "email="+email+"&publicKey="+publicKey;
    
    // Authentication
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
      
		email = email.toLowerCase();
	  
        // Get Data From User
        userSchema.find({email:email},function(err, result){
            
            if(err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
            
            if(result == null || result == undefined || result == "")
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            if(result[0].active == "0" || result[0].active == 0)
            {
                log.info('Register But Not Active');
                master.sendResponse(req, res, 200, 3, 'Account is not active.');
                return;
            }

            if(result[0].active == "2" || result[0].active == 2)
            {
                log.info('Account is Blocked');
                master.sendResponse(req, res, 200, 47, "Account is Blocked");
                return;
            }
            
            master.sendResponse(req, res, 200, -1, "Success");
            
        })
        
    })
    
}