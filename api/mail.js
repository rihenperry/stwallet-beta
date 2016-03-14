/*global require, module, console */
/*jslint node: true */
"use strict";

var notificationschema  = require('../model/notification_model.js');
var notiMessageSchema   = require('../model/notification_message_model.js');
var Mailgun             = require('mailgun-js');							// For Emails (Mailgun Module)
var request             = require('request');                               // Request Module
var from_who            = 'donotreply@searchtrade.com';						// Sender of Email
var api_key             = 'key-2b8f2419e616db09b1297ba51d7cc770';			// Api Key For Mailgun
var domain              = 'searchtrade.com';								// Domain Name

var ip                  = 'http://192.168.1.29:5000';
var mailgun             = new Mailgun({apiKey: api_key, domain: domain});	// Mailgun Object


// Response Function
var sendResponse = function(req, res, status, errCode, errMsg) {

    var d = Date();
    console.log(status +" "+ errCode +" "+ errMsg + " " + d);
    res.status(status).send({
        errCode: errCode, 
        errMsg: errMsg,
        dbDate: d
    });
    
}

// Email Sending Function
module.exports.sendmail = function (mailinfo, res) {

    var mailSent = false;

    mailgun.messages().send(mailinfo, function (err, cb) {

        // Error In Sending Email
        if (err) {
            
            console.log('Mail Not Sent');
            console.log(err);
            return;

        } else {
            
            mailSent = true;
            console.log('Mail Sent Successfully');
        }

        res(mailSent);
            
    });

};


// PHP Mail Functionality in Node
module.exports.sendPHPmail = function (req, res){
    
    var to                  = req.body.to;
    var subject             = req.body.subject;
    var message             = req.body.message;
    
    var first_name          = req.body.first_name;
    var last_name           = req.body.last_name;
    var user_id             = req.body.user_id;
    var notification_body   = req.body.notification_body;
    
    var notification = first_name+" "+last_name+", "+notification_body;
    
    var mailOptions = {
		from: 'Search Trade <donotreply@searchtrade.com>', 	// Sender address
		to: to, 								            // List of Receivers
		subject: subject, 		                            // Subject line
		text: message,									    // Text
		html: message
	};
    
    mailgun.messages().send(mailOptions, function(err, cb){
        
         // Error In Sending Email
        if (err) {
            
            console.log('Mail Not Sent');
            console.log(err);
            sendResponse(req, res, 200, 29, "Email Sending Error");
            return;

        } else {
            
            console.log('Mail Sent Successfully');
            
            getNotificationStatus(to, function(result){
                
                //console.log('Status : '+result.notification_status);
                
                if(result.notification_status)
                {
                    var notification_message = new notiMessageSchema({ 
                        user_id: user_id, 	            // User Id
                        message: notification	        // Text
                    });

                    notification_message.save(function(err){

                        if(err)
                        {
                          console.log(err);
                          return err;
                        }

                        console.log('Saved SuccessFully');
                        sendResponse(req, res, 200, -1, "Success");

                    });
                    
                }
                
                else
                {
                    sendResponse(req, res, 200, -1, "Success");
                }
                
            })
            
        }    
        
    });
    
}

// Getting Notification Status
module.exports.getNotificationStatus = function (email, cb){
    
    var email = {email:email};
    
    request.post({
                                
        url: ip+'/secure/getNotificationStatus',
        body: email,
        json: true,
        headers: {"content-type": "application/json"}

    },function optionalCallback(err, httpResponse, body){

        if (err)
        {
            return console.error('Curl request Failed for register api: \n', err);
        }
        
        cb(body.errMsg);
        
    });

}

var getNotificationStatus = module.exports.getNotificationStatus;