/*global require, module, console */
/*jslint node: true */
"use strict";

var Mailgun     = require('mailgun-js');							// For Emails (Mailgun Module)
var from_who    = 'donotreply@searchtrade.com';						// Sender of Email
var api_key     = 'key-2b8f2419e616db09b1297ba51d7cc770';			// Api Key For Mailgun
var domain      = 'searchtrade.com';								// Domain Name

var mailgun     = new Mailgun({apiKey: api_key, domain: domain});	// Mailgun Object


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
    
    var to      = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;
    
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
            sendResponse(req, res, 200, -1, "Success")
        }    
        
    })
    
}