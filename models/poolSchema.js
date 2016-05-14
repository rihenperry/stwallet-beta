// Packages
var mongoose = require('mongoose') // For Mongoose 

// Schema
var poolSchema = mongoose.Schema({
  total_kwd_purchase_income: {type: Number},
  total_fees_earning: {type: Number},
  total_cashback_outflow: {type: Number},
  total_affiliate_outflow: {type: Number},
  no_of_qualified_searches: {type: Number},
  no_of_unQualified_searches: {type: Number},
  total_anonymous_searches: {type: Number},
  total_app_payout: {type: Number},
  total_kwd_owner_payout: {type: Number},
  total_search_payout: {type: Number},
  total_searchtrade_payout: {type: Number},
  total_unsold_kwd_refund: {type: Number},
  total_renewal_fees: {type: Number},
  totalActiveUsers: {type: Number}
})

module.exports = mongoose.model('poolstat', poolSchema)
