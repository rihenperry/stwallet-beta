/*global require, module, console */
/*jslint node: true */
"use strict";

var Mailgun     = require('mailgun-js');							// For Emails (Mailgun Module)
var from_who    = 'donotreply@searchtrade.com';						// Sender of Email
var api_key     = 'key-2b8f2419e616db09b1297ba51d7cc770';			// Api Key For Mailgun
var domain      = 'searchtrade.com';								// Domain Name

var mailgun     = new Mailgun({apiKey: api_key, domain: domain});	// Mailgun Object


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