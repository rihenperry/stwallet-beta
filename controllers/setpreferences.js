var socialNotiPrefModel = require('../models/socialNotificationSchema.js');
var userSchema          = require('../models/userSchema.js');           		// User Schema
var master 				= require('../config/masterfunc.js');

module.exports.setSocialDefaultPreference = function(userid, cb){

	// Making Object of myInfo
	var myDefaultPref = new socialNotiPrefModel({
	
		userid:	userid,
	
	});

	myDefaultPref.save(function(err){
		
		if(err)
		{
			log.error(err);
			master.sendResponse(req, res, 200, 5, "Database Error");
			cb(err)
			return;
		}
		
		cb(true);
	})
}

module.exports.setSocialPreference = function(req, res){

	console.log('Check');

	var email 				= req.body.email;
	var postLike      		= req.body.postLike;	
	var replyLike     		= req.body.replyLike;	
	var retweetQuoteLike    = req.body.retweetQuoteLike;	
	var quoteRetweet     	= req.body.quoteRetweet;
	var reply				= req.body.reply;	
	var retweet				= req.body.retweet;
	var follow				= req.body.follow;	
	var mentionPost			= req.body.mentionPost	
	var mentionRetweetQuote	= req.body.mentionRetweetQuote;	
	var mentionReply		= req.body.mentionReply;	
	var publicKey 			= req.body.publicKey;
	var signature 			= req.body.signature;

	// Validate Public Key
	// if(publicKey=="" || publicKey== null || publicKey==undefined)
	// {
		// console.log('Public Key is Missing');
		// master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		// return;
	// }

	// Validate Signature
	// if(signature=="" || signature== null || signature==undefined)
	// {
		// console.log('Signature is Missing');
		// master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		// return;
	// }

	// Validate Email
	// if(email=="" || email== null || email==undefined)
	// {
		// console.log('Email is Missing');
		// master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		// return;
	// }

	// if(!validateEmail(email))
	// {
		// console.log('Incorrect Email Format');
		// master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		// return;
	// }
	
	var query = {publicKey:publicKey};
	var text = 'email='+email+'&publicKey='+publicKey;
	
	master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
	
		userSchema
		.find({email:email})
		.select('_id')
		.lean()
		.exec(function(err, retVal){
		
			if(err)
			{
				console.log(err);
				master.sendResponse(req, res, 200, 5, "Database Error");
				return;
			}
		
			// console.log(retVal);
			
			var data ={
				
				postLike 			:  parseInt(postLike),		
				replyLike 			:  parseInt(replyLike),  			
				retweetQuoteLike 	:  parseInt(retweetQuoteLike),   	
				quoteRetweet 		:  parseInt(quoteRetweet),   		
				reply				:  parseInt(reply),				
				retweet				:  parseInt(retweet),					
				follow				:  parseInt(follow),					
				mentionPost			:  parseInt(mentionPost),				
				mentionRetweetQuote	:  parseInt(mentionRetweetQuote),		
				mentionReply		:  parseInt(mentionReply)
			
			}
			
			socialNotiPrefModel
			.findOneAndUpdate({userid:retVal[0]._id},data)
			.exec(function(err, response){
			
				if(err)
				{
					console.log(err);
					master.sendResponse(req, res, 200, 5, "Database Error");
					return;
				}
			
				console.log('Preferences Successfully Set');
				master.sendResponse(req, res, 200, -1, "Success");
			
			})
		
		})
	
	})
}

module.exports.getSocialPreference = function(req, res){

	var records = ['','Push Notification','Email','Push Notification, Email','SMS','SMS, Push Notification','SMS, Email','SMS, Push Notification, Email'];
	
	var userid = req.params.userid;
	
	socialNotiPrefModel
	.find({userid:userid})
	.lean()
	.exec(function(err, result){
	
		if(err)
		{	
			console.log(err);
			master.sendResponse(req, res, 200, 5, "Database Error");
			return;
		}
		
		if(result=="" || result==null || result==undefined)
		{
			master.sendResponse(req, res, 200, 4, 'No Such User');
			return;
		}
		
		var data = {
		
			postLike 			:  records[parseInt(result[0].postLike)],		
			replyLike 			:  records[parseInt(result[0].replyLike)],  			
			retweetQuoteLike 	:  records[parseInt(result[0].retweetQuoteLike)],   	
			quoteRetweet 		:  records[parseInt(result[0].quoteRetweet)],   		
			reply				:  records[parseInt(result[0].reply)],				
			retweet				:  records[parseInt(result[0].retweet)],					
			follow				:  records[parseInt(result[0].follow)],					
			mentionPost			:  records[parseInt(result[0].mentionPost)],				
			mentionRetweetQuote	:  records[parseInt(result[0].mentionRetweetQuote)],		
			mentionReply		:  records[parseInt(result[0].mentionReply)]
	
		}
			
		master.sendResponse(req, res, 200, -1, data);
			
	})
}