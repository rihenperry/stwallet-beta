"use strict";

var userSchema          = require('../models/userSchema.js');           // User Schema
var deviceSchema        = require('../models/deviceInfoSchema.js');     // DeviceInfo Schema
var transactionSchema   = require('../models/transaction_Schema.js');   // Transaction Schema
var crypt               = require('../config/crypt.js');                // Crypt/Signature Related Functionality
var master              = require('../config/masterfunc.js');           // Master Functions

// Transaction API

/*================================= Insert User Transaction ==================================*/

module.exports.insertUserTransaction = function(req, res){

	console.log('Page Name: transaction.js');
	console.log('API Name : insertUserTransaction');	
	console.log('Insert Transaction API Hitted');
	console.log('Parameters Receiving -:');

	var sender         = req.body.sender;
	var receiver       = req.body.receiver;
	var amount         = req.body.amount;
	var type           = req.body.type;
	var desc           = req.body.desc;
	var keyword        = req.body.keyword;
	var payment_mode   = req.body.payment_mode;
	var discount       = req.body.discount;
	var appId          = req.body.app_id;
	var commision      = req.body.commision;
	var origin_ip      = req.body.origin_ip;
	var usd            = req.body.usd;
	var sgd            = req.body.sgd;
	var publicKey      = req.body.publicKey;
	var signature      = req.body.signature;

	console.log('Sender (Email) : '+sender);
	console.log('Receiver (Email) : '+receiver);
	console.log('Amount : '+amount);
	console.log('Type : '+type);
	console.log('Description : '+desc);
	console.log('Keyword : '+keyword);
	console.log('Payment Mode : '+payment_mode);
	console.log('Discount : '+discount);
	console.log('App Id : '+appId);
	console.log('Commission : '+commision);
	console.log('Origin Ip : '+origin_ip);
	console.log('USD : '+usd);
	console.log('SGD : '+sgd);
	console.log('Public Key :'+publicKey);
	console.log('Signature :'+signature);

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
	
    var query = {publicKey:publicKey};
    var text  = 'sender='+sender+'&receiver='+receiver+'&amount='+amount+'&type='+type+'&desc='+desc+'&keyword='+keyword+'&payment_mode='+payment_mode+'&discount='+discount+'&commision='+commision+'&origin_ip='+origin_ip+'&usd='+usd+'&sgd='+sgd+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
        
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
        
        var time = Date.now();
        
        // Making Object of myInfo
        var newTransaction = new transactionSchema({
            
				time: time,									// Transaction Time
				sender: sender,								// Sender Email
				receiver: receiver,							// Receiver Email
				amount: amount,								// Amount of Transaction
				type: type,									// Type of Transaction
				desc: desc,									// Description
				app_id: appId,								// App Id
				keyword: keyword,							// Keyword
				payment_mode: payment_mode,					// Payment Mode
				discount : discount,						// Discount
				commision : commision,						// Commission
				origin_ip : origin_ip,						// Browser/Internet Ip 
				usd : parseFloat(usd),						// USA Doller
				sgd : parseFloat(sgd),						// Singapore Dollar
				status: 'Success'			                // Status
        });
        
        newTransaction.save(function(err){
            
            if(err)
            {
                console.log(err);
                return err;
            }

            console.log('Transaction Inserted SuccessFully');
            master.sendResponse(req, res, 200, -1, newTransaction._id);
            
        })
    
        
    })

};

/*================================= Get Users Total Number of Transactions ==================================*/

module.exports.getUsersTotalTransactions = function(req, res) {

	console.log('Page Name: transaction.js');
	console.log('API Name : getUsersTotalTransactions');	
	console.log('Get Users Transactions Count API Hitted');	
	console.log('Parameters Receiving -:');
    
    var email       = req.body.email;
	var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;
    
    console.log('Email : '+email);
	console.log('Public Key :'+publicKey);
	console.log('Signature :'+signature);
    
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
	if (!(master.validateParameter(email, 'Email')))
    {
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if (!(master.validateEmail(email)))
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
        
        userSchema.find({email:email},function(err, retVal){
            
            if(err)
            {
                console.log(err);
                return;
            }
            
            if(retVal==null || retVal=="" || retVal == undefined) // Email Not Found
            {
                console.log(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            var query = {$or:[{"sender":email},{"receiver":email}]};
            
            transactionSchema.find(query, function(err, retValue){
                
                if(err)
                {
                    console.log(err);
                    return;
                }
                
                if(retValue == undefined || retValue.length == 0 || retValue == "" || retValue == null)
                {
                    console.log('No Transactions of This User')
                    master.sendResponse(req, res, 200, -1, 'No transactions of this user');
                    return;
                }
                
                console.log(retValue.length+' Transactions For '+email);
                master.sendResponse(req, res, 200, -1, retValue.length);
            })
            
        })
        
    })
    
}

/*================================= Get Users Transactions ==================================*/

module.exports.getTransactions = function(req, res) {
    
    console.log('Page Name: transactions.js');
	console.log('API Name : getTransactions');	
	console.log('Get Transaction Accessed');	
	console.log('Parameters Receiving -:');
    
	var email      = req.body.email;
	var from       = req.body.from;
	var to         = req.body.to;
	var n          = req.body.number;
	var publicKey  = req.body.publicKey;
	var signature  = req.body.signature;
	var type       = req.body.type;
    var order      = 1;
    
    console.log('Email : '+email);
	console.log('From Date : '+from);
	console.log('To Date : '+to);
	console.log('Number of Transactions : '+n);
	console.log('Type : '+type);
	console.log('Public Key :'+publicKey);
	console.log('Signature :'+signature);
    
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
	if (!(master.validateParameter(email, 'Email')))
    {
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if (!(master.validateEmail(email)))
    {
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Validate From Date
	if(from == "" || from == undefined)
	{
		from = 0;
		order = -1;
	}
	
	// Validate last Limit
	if(to === undefined || to.length<=0 || to == null )
	{
		to = Date.now();
	}
    
    to   = parseInt(to);
	from = parseInt(from);
    
    console.log('From Time : '+from);
	console.log('To Time : '+to);
    
    // Number of Transactions
	if(isNaN(n))
	{
		console.log('Number is Blank');
		console.log(req.body);
		n = 50;
	}
	
	n = parseInt(n);
    
    var query = {publicKey:publicKey};
    var text  = "email="+email+"&from="+req.body.from+"&to="+req.body.to+"&number="+n+"&type="+type+"&publicKey="+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
        
        if(type == "" || type == undefined || type == 'All')
        {
            query = {$and:[{$and:[{"time":{$gt:from}},{"time":{$lt:to}}]}, {$or:[{"sender":email},{"receiver":email}]}]};
        }
        
        else
        {	
            query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {$or:[{"sender":email},{"receiver":email}]},{"type":type}]};
        }
        
        transactionSchema.find(query,function(err, retVal){
            
            if(err)
            {
                console.log(err);
                return;
            }
            
            if(retVal == undefined || retVal.length == 0 || retVal == "" || retVal == null)
            {
                console.log('No Transactions of This User')
                master.sendResponse(req, res, 200, -1, 'No transactions of this user');
                return;
            }
            
            console.log('Transactions from '+ from +' to ' + to + ': ');
            master.sendResponse(req, res, 200, -1, retVal);
            
        }).sort({time:order}).limit(n);
        
    })
    
}