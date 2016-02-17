/*global require, module, console */
/*jslint node: true */
"use strict";

// Pages
var deviceSchema    = require('../models/deviceInfoSchema.js')  // DeviceInfo Schema
var crypt           = require('./crypt.js');                    // Crypt/Signature Related Functionality



//========================= Page Functions ========================= //
// Response Function
module.exports.sendResponse = function(req, res, status, errCode, errMsg) {

    var d = Date.now();
    console.log(status +" "+ errCode +" "+ errMsg + " " + d);
    res.status(status).send({
        errCode: errCode, 
        errMsg: errMsg,
        dbDate: d
    });
    
}

// Parameter Validation Function
module.exports.validateParameter =   function(parameter, name){
    
    if(parameter === undefined || parameter.length<=0)
    {
        console.log(name+' Is Missing');
        return false;
    }

    return true;
}


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