// Packages
var mongoose 	= require('mongoose');			// For Mongoose 

//Schema
var poolSchema = mongoose.Schema({
    total_kwd_purchase_income : Number,
    total_fees_earning : Number,
    total_cashback_outflow : Number,
    total_affiliate_outflow : Number,
    no_of_qualified_searches : Number,
    no_of_unQualified_searches : Number,
    total_anonymous_searches : Number,
    total_app_payout : Number,
    total_kwd_owner_payout : Number,
    total_search_payout : Number,
    total_searchtrade_payout : Number,
    total_unsold_kwd_refund : Number,
    totalActiveUsers : Number
});

module.exports = mongoose.model('poolstats', poolSchema);