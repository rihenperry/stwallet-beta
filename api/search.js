/*global require, module, console */
/*jslint node: true */
"use strict";

// Pages
var userSchema      = require('../models/userSchema.js');       // User Schema
var poolSchema	  	= require('../models/poolSchema.js');       // Pool Schema
var master          = require('../config/masterfunc.js');       // Master Functions

/* Export Fuctions */

/*============================= Add Search Earning =============================*/

module.exports.addSearchEarning = function(req, res){
    
	console.log('Page Name : search.js');
	console.log('API Name : addSearchEarning')
	console.log('Add Search Earning API Hitted');
	console.log('Parameter Receiving..')
    
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
                console.log(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                console.log('Search Earning Amount '+amount+' Successfully Added To '+retVal[0].email);
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
  
}

/*============================= Deduct Search Earning =============================*/

module.exports.deductSearchEarning = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductSearchEarning');
	console.log('Deduct Search Earning API Hitted');
	console.log('Parameter Receiving..');
    
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
                console.log(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                console.log('Search Earning Amount '+amount+' Successfully Deducted From '+retVal[0].email);
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
  
}

/*============================= Deduct Qualified Searches =============================*/

module.exports.deductQualifiedSearches = function(req, res){
    
	console.log('Page Name : search.js');
	console.log('API Name : deductQualifiedSearches')
	console.log('Deduct Qualified Searches API Hitted');
	console.log('Parameter Receiving..')
    
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
                console.log(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                console.log('Qualified Searches '+amount+' Successfully Deducted From '+retVal[0].email);
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
  
}

/*============================= Add UnQualified Searches =============================*/

module.exports.addunQualifiedSearches = function(req, res){
    
	console.log('Page Name : search.js');
	console.log('API Name : addunQualifiedSearches')
	console.log('Add UnQualified Searches API Hitted');
	console.log('Parameter Receiving..')
    
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
                console.log(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                console.log('UnQualified Searches '+amount+' Successfully Added To '+retVal[0].email);
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
  
}

/*============================= Update Last Hour Value =============================*/

module.exports.updateLastHourValue = function(req, res){
	
	console.log('Page Name: search.js');
	console.log('API Name : updateLastHourValue');	
	console.log('Update Last Hour API Hitted');
	console.log('Parameters Receiving -:');
    
	var email       = req.body.email;
    var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;
	var date        = new Date();
	var time        = date.getTime();
    
    console.log('Email : '+email);
	console.log('Time : '+time);
	console.log('Public Key: '+publicKey);
	console.log('Signature: '+signature);
    
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
    
    var query = {publicKey:publicKey};
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
                console.log(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
            
            if(result == null || result == undefined || result == "")
            {
                console.log(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            console.log('Updated Last Hour Search Time '+time+' To : '+email );
            master.sendResponse(req, res, 200, -1, "Success");
            return;
            
        })
        
    })
    
}

/*============================= Recent Search =============================*/

module.exports.recentSearches = function(req, res){

	console.log('Page Name: search.js');
	console.log('API Name : recentSearches');
	console.log('Recent Searches API Hitted');
	console.log('Parameters Receiving -:');
    
  	var email       = req.body.email;
    var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;
    var searches    = req.body.searches;
    
    console.log('Email: '+email);
	console.log('Searches (Last Search Record): '+searches);
	console.log('Public Key: '+publicKey);
	console.log('Signature: '+signature);

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
    
    var query = {publicKey:publicKey};
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
                console.log(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
            
            if(result == null || result == undefined || result == "")
            {
                console.log(email+" Not Registered");
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
                console.log('Recent Searches Data Received From User Field');
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
                    console.log(err);
                    master.sendResponse(req, res, 200, 5, "Database Error");
                    return;
                }

                if(result == null || result == undefined || result == "")
                {
                    console.log(email+" Not Registered");
                    master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                    return;
                }
                
                console.log('Updated Recent Searches Field of '+email+' Successfully');
                master.sendResponse(req, res, 200, -1, "Success");
                return;
                
            })
            
        })
        
    })
    
}