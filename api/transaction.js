"use strict";

var userSchema          = require('../models/userSchema.js'),           // User Schema
    deviceSchema        = require('../models/deviceInfoSchema.js'),     // DeviceInfo Schema
    transactionSchema   = require('../models/transaction_Schema.js'),   // Transaction Schema
    crypt               = require('../config/crypt.js'),                // Crypt/Signature Related Functionality
    master              = require('../config/masterfunc.js'),           // Master Functions
    logger              = require('../config/w_config.js'),
    log                 = logger();

// Transaction API

/*================================= Insert User Transaction ==================================*/

module.exports.insertUserTransaction = function(req, res){

	log.info('Page Name: transaction.js');
	log.info('API Name : insertUserTransaction');	
	log.info('Insert Transaction API Hitted');
	log.info('Parameters Receiving -:');

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

	log.info('Sender (Email) : '+sender);
	log.info('Receiver (Email) : '+receiver);
	log.info('Amount : '+amount);
	log.info('Type : '+type);
	log.info('Description : '+desc);
	log.info('Keyword : '+keyword);
	log.info('Payment Mode : '+payment_mode);
	log.info('Discount : '+discount);
	log.info('App Id : '+appId);
	log.info('Commission : '+commision);
	log.info('Origin Ip : '+origin_ip);
	log.info('USD : '+usd);
	log.info('SGD : '+sgd);
	log.info('Public Key :'+publicKey);
	log.info('Signature :'+signature);

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
    //var text  = 'sender='+encodeURIComponent(sender)+'&receiver='+encodeURIComponent(receiver)+'&amount='+encodeURIComponent(amount)+'&type='+encodeURIComponent(type)+'&desc='+encodeURIComponent(desc)+'&keyword='+encodeURIComponent(keyword)+'&payment_mode='+encodeURIComponent(payment_mode)+'&discount='+encodeURIComponent(discount)+'&commision='+encodeURIComponent(commision)+'&origin_ip='+encodeURIComponent(origin_ip)+'&usd='+encodeURIComponent(usd)+'&sgd='+encodeURIComponent(sgd)+'&publicKey='+encodeURIComponent(publicKey);
    
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
                log.error(err);
                return err;
            }

            log.info('Transaction Inserted SuccessFully');
            master.sendResponse(req, res, 200, -1, newTransaction._id);
            
        })
    
        
    })

};

/*================================= Get Users Total Number of Transactions ==================================*/

module.exports.getUsersTotalTransactions = function(req, res) {

	log.info('Page Name: transaction.js');
	log.info('API Name : getUsersTotalTransactions');	
	log.info('Get Users Transactions Count API Hitted');	
	log.info('Parameters Receiving -:');
    
    var email       = req.body.email;
	var type 		= req.body.type;
	var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;
    
    log.info('Email : '+email);
    log.info('Type : '+type);
	log.info('Public Key :'+publicKey);
	log.info('Signature :'+signature);
    
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
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    //var text  = "email="+encodeURIComponent(email)+"&publicKey="+encodeURIComponent(publicKey);
    var text  = "email="+email+'&type='+type+"&publicKey="+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
        
        userSchema.find({email:email},function(err, retVal){
            
            if(err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
            
            if(retVal==null || retVal=="" || retVal == undefined) // Email Not Found
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            if(type=='All')
            {
                var query = {$or:[{"sender":email},{"receiver":email}]};
            }
            
            else
            {
                var query = {$and:[{$or:[{"sender":email},{"receiver":email}]},{"type":type}]};
            }
            
            transactionSchema.find(query, function(err, retValue){
                
                if(err)
                {
                    log.error(err);
                    master.sendResponse(req, res, 200, 5, "Database Error");
                    return;
                }
                
                if(retValue == undefined || retValue.length == 0 || retValue == "" || retValue == null)
                {
                    log.info('No Transactions of This User')
                    master.sendResponse(req, res, 200, -1, 0);
                    return;
                }
                
                log.info(retValue.length+' Transactions For '+email);
                master.sendResponse(req, res, 200, -1, retValue.length);
            })
            
        })
        
    })
    
}

/*================================= Get Users Transactions ==================================*/

module.exports.getTransactions = function(req, res) {
    
    log.info('Page Name: transactions.js');
	log.info('API Name : getTransactions');	
	log.info('Get Transaction Accessed');	
	log.info('Parameters Receiving -:');
    
	var email      = req.body.email;
	var from       = req.body.from;
	var to         = req.body.to;
	var n          = req.body.number;
	var publicKey  = req.body.publicKey;
	var signature  = req.body.signature;
	var type       = req.body.type;
    var order      = 1;
    
    log.info('Email : '+email);
	log.info('From Date : '+from);
	log.info('To Date : '+to);
	log.info('Number of Transactions : '+n);
	log.info('Type : '+type);
	log.info('Public Key :'+publicKey);
	log.info('Signature :'+signature);
    
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
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Validate Number
	if(!(master.validateParameter(n, 'Number')))
	{
        master.sendResponse(req, res, 200, 1, "Mandatory field not found");
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
    
    log.info('From Time : '+from);
	log.info('To Time : '+to);
    
    // Number of Transactions
	if(isNaN(n))
	{
		log.info('Number is Blank');
		console.log(req.body);
		n = 50;
	}
	
	n = parseInt(n);
    
    var query = {publicKey:publicKey};
    //var text  = "email="+encodeURIComponent(email)+"&from="+encodeURIComponent(req.body.from)+"&to="+encodeURIComponent(req.body.to)+"&number="+encodeURIComponent(n)+"&type="+encodeURIComponent(type)+"&publicKey="+encodeURIComponent(publicKey);
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
            
            if(retVal == undefined || retVal.length == 0 || retVal == "" || retVal == null)
            {
                log.info('No Transactions of This User')
                master.sendResponse(req, res, 200, -1, 'No transactions of this user');
                return;
            }
            
            log.info('Transactions from '+ from +' to ' + to + ': ');
            master.sendResponse(req, res, 200, -1, retVal);
            
        }).sort({time:order}).limit(n);
        
    })
    
}