/*global require, module, console */
/*jslint node: true */
"use strict";

// Pages
var deviceSchema    = require('../models/deviceInfoSchema.js')  // DeviceInfo Schema
var crypt           = require('./crypt.js');                    // Crypt/Signature Related Functionality



//========================= Page Functions ========================= //
// Response Function
module.exports.sendResponse = function(req, res, status, errCode, errMsg) {

    var d = Date();
    console.log(status +" "+ errCode +" "+ errMsg + " " + d);
    res.status(status).send({
        errCode: errCode, 
        errMsg: errMsg,
        dbDate: d
    });
    
}

// Parameter Validation Function
module.exports.validateParameter = function(parameter, name){
    
    if(parameter === undefined || parameter.length<=0)
    {
        console.log(name+' Is Missing');
        return false;
    }

    return true;
}

var validate = module.exports.validateParameter;

// Email Validation
module.exports.validateEmail = function(email){
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return re.test(email);
}

var validateEmail = module.exports.validateEmail;

/* Master Export Fuctions */

/*============================= Find Server and Signature Validation =============================*/

module.exports.secureAuth = function(query, text, signature, cb){

    deviceSchema.find(query, function(err, result){
        
        if (err)
        {
            console.log('Database Error');
            cb(err);
            return;
        }

        if(result[0] == null || result[0] == undefined || result[0] == "" )
        {
            var retVal = [{
                "message" : "Server is not registered",
                "errCode" : 13,
                "error" : "true"
            }];
            
            console.log('Server Not Found');
            cb(retVal);
            return;
        }
        
        var privateKey = result[0].privateKey;
        
        crypt.validateSignature(text, signature, privateKey, function(isValid){
            
             // Signature Not Matched
			if (!isValid)
			{
				console.log('Invalid Signature');
                var retVal = [{
                    "message" : "Invalid Signature",
                    "errCode" : 14,
                    "error" : "true"
                }];
				cb(retVal);
				return;
			}
            
            var retVal = [{"error" : "false"}];
            
            cb(retVal)
            
        })
        
    })

 };

var secureAuth = module.exports.secureAuth;


/*============================= Validation Parameter function For User Accounting and Search Page API =============================*/

 // For User Accounting API's Only
module.exports.validation  = function(req, cb){
    
    var email       = req.body.email;
    var amount      = req.body.amount;
    var publicKey   = req.body.publicKey;
    var signature   = req.body.signature;
    
    console.log('Email :'+email);
    console.log('Amount : '+amount);
    console.log('Public Key : '+publicKey);
    console.log('Signature : '+signature);
    
    // Validate Public Key
    if(!(validate(publicKey, 'Public Key'))){
        var retVal = [{
            "message" : "Mandatory field not found",
            "errCode" : 1,
            "error" : "true"
        }];
        cb(retVal);
        return;
    }

    // Validate Signature
    if(!(validate(signature, 'Signature'))){
        var retVal = [{
            "message" : "Mandatory field not found",
            "errCode" : 1,
            "error" : "true"
        }];
        cb(retVal);
        return;
    }
    
    // Validate Email
    if(!(validate(email, 'Email'))){
        var retVal = [{
            "message" : "Mandatory field not found",
            "errCode" : 1,
            "error" : "true"
        }];
        cb(retVal);
        return;
    }

    if(!(validateEmail(email))){
        console.log('Incorrect Email Format');
        var retVal = [{
            "message" : "Incorrect email id format",
            "errCode" : 7,
            "error" : "true"
        }];
        cb(retVal);
        return;
    }
    
    // Validate Amount
    if(!(validate(amount, 'amount'))){
        var retVal = [{
            "message" : "Mandatory field not found",
            "errCode" : 1,
            "error" : "true"
        }];
        cb(retVal);
        return;
    }

    // Validate Keyword Income
    if(amount.length<=0 && isNaN(amount)){
        console.log('Amount is Invalid');
        var retVal = [{
            "message" : "Mandatory field not found",
            "errCode" : 1,
            "error" : "true"
        }];
        cb(retVal);
        return;
    }
    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&amount='+amount+'&publicKey='+publicKey;
    
    secureAuth(query, text, signature, function (result){
        if(result[0].error == 'false'){
            result[0].email  = email;
            result[0].amount = amount;
            cb(result);
            return;
        }
        cb(result);
    })
}

