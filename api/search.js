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
                return err;
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
                return err;
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
        
        // Find and Update User's Qualified Searches
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{no_of_qualified_searches_pending:amount}},function(err, result){

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

            else
            {
                console.log('Qualified Searches '+amount+' Successfully Deducted From '+retVal[0].email);
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
  
}