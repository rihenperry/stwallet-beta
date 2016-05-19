// Packages
var mongoose 	= require('mongoose');			// For Mongoose 

//Schema
var socialNotiPrefSchema = mongoose.Schema({
   
   userid:					{type: String},
   postLike :     			{type: Number, default:2},
   replyLike :     			{type: Number, default:2},
   retweetQuoteLike :     	{type: Number, default:2},
   quoteRetweet :     		{type: Number, default:2},
   reply:					{type: Number, default:2},
   retweet:					{type: Number, default:2},
   follow:					{type: Number, default:2},
   mentionPost:				{type: Number, default:2},
   mentionRetweetQuote:		{type: Number, default:2},
   mentionReply:			{type: Number, default:2}
   
},{versionKey: false});

module.exports = mongoose.model('socialnotiprefpreference', socialNotiPrefSchema);