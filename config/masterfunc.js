/*global require, module, console */
/*jslint node: true */
"use strict";

// Pages
var deviceSchema    = require('../models/deviceInfoSchema.js'),  // DeviceInfo Schema
    crypt           = require('./crypt.js'),                     // Crypt/Signature Related Functionality
    logger          = require('./w_config.js'),
    log             = logger();


//========================= Page Functions ========================= //
// Response Function
module.exports.sendResponse = function(req, res, status, errCode, errMsg) {

    var d = Date();
    log.info(status +" "+ errCode +" "+ errMsg + " " + d);
    // log.info(status +" "+ errCode +" "+ d);
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
        log.error(name+' Is Missing');
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
            log.error('Database Error');
            log.error(err);
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
            
            log.error('Server Not Found');
            cb(retVal);
            return;
        }
        
        var privateKey = result[0].privateKey;
        
        crypt.validateSignature(text, signature, privateKey, function(isValid){
            
             // Signature Not Matched
			if (!isValid)
			{
				log.error('Invalid Signature');
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
    
    log.info('Email :'+email);
    log.info('Amount : '+amount);
    log.info('Public Key : '+publicKey);
    log.info('Signature : '+signature);
    
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
        log.error('Incorrect Email Format');
        var retVal = [{
            "message" : "Incorrect email id format",
            "errCode" : 7,
            "error" : "true"
        }];
        cb(retVal);
        return;
    }
    
    // Validate Amount
    if(!(validate(amount, 'Amount')) || isNaN(amount)){
        if(isNaN(amount)){
            log.error('Amount is Invalid');
        }
        var retVal = [{
            "message" : "Mandatory field not found",
            "errCode" : 1,
            "error" : "true"
        }];
        cb(retVal);
        return;
    }

    var query = {publicKey:publicKey};
    //var text  = 'email='+encodeURIComponent(email)+'&amount='+encodeURIComponent(amount)+'&publicKey='+encodeURIComponent(publicKey);
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

module.exports.notificationsend = function(req, res){

    request.post({
        url: 'http://192.168.1.31:4000/secure/registernotification',
        body:   requestData_register,
        json: true,
        headers: {
            "content-type": "application/json",
        }
    },
    function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('Curl request Failed for register api: \n', err);
        }
            
    });
    
}

