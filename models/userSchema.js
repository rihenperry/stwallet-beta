/*global require, module, console */
/*jslint node: true */
"use strict";

// Packages
var mongoose 	= require('mongoose');			// For Mongoose 

// Schema
var userDetails = mongoose.Schema({
	
    _id: String,                                                    // Key used for matching in the DB
    first_name: String,                                             // First Name of User
    last_name: String,                                              // Last Name of User
    email: String,                                                  // Email of User
    password: String,                    	                        // Salted Hash Password
    mobile_number: {type:Number, default:''},		                // Mobile Number
    ref_email: {type:String, default:''},		                    // Reference Person Email
    my_referral_id : String,				                        // User Refferal Code
    seed: String,								                    // Seed
    creationTime: Number,                                           // Time account was created
    salt:String,								                    // Random Generated Value (Salt)
    lastLogin: {type:Number, default:0},                            // Last login time
    lastUpdated: {type:Number, default:0},             	            // Last update time
    active: {type:Number, default:0},                    			// When an account is created, best practices dictate we set it inactive and make the user verify the account
    address1: {type:String, default:''},							// Address1 of User
    address2: {type:String, default:''},							// Address2 of User
    profile_pic:{type:String, default:'Default_profile_image.PNG'}, // User Profile Pic
    noOfLogins: {type:Number, default:0},							// Login Count
    first_buy_status: Number,					                    // First Buy (For First Keyword Purchase)
    blocked_for_bids: {type:Number, default:0},					    // Bids That Blocked For Purchasing Keyword
    deposit: {type:Number, default:0},							    // Balance of User
    sales: {type:Number, default:0},								// Sales Amount
    cashback: {type:Number, default:0},							    // Cashback Amount
    affiliate_earning : {type:Number, default:0},					// Affiliate Earning Amount
    approved_withdrawals : {type:Number, default:0},                // Approved Withdrawals Amount
    blocked_for_pending_withdrawals: {type:Number, default:0},	    // Blocked For Pending Approval Amount
    trade_fees: {type:Number, default:0},							// Trading Amount
    purchases: {type:Number, default:0},							// Purchase Amount
    search_earning: {type:Number, default:0},                       // search earning
    recent_searches: {type:String, default:''},                     // Recent Searches Array
    no_of_qualified_searches_pending: {type:Number, default:40},    // Total Available Paid Searches in Day
    no_of_unQualified_searches: {type:Number, default:0},           // No of Unpaid Searches
    favourite_search_app: {type:String, default:''},                // Favourite Search App
    default_search_appId: {type:String, default:''},                // Default Search App Id
    total_no_of_searches_in_last_hour: {type:Number, default:0},    // Total Searches in Last Hour
    last_hour_search_time: {type:Number, default:0},                // Last Hour Time
    total_kwd_income: {type:Number, default:0},                     // Total Keyword Income
    total_app_income: {type:Number, default:0},                     // Total App Income
    total_qualified_searches: {type:Number, default:0},             // No of Paid Searches
    gender: {type:String, default:''},								// Gender
    country: {type:String, default:''},						        // Country
    state: {type:String, default:''},								// State
    zip: {type:String, default:''},								    // Zipcode
    city: {type:String, default:''},								// City
    currencyPreference: {type:String, default:'USD/US Dollar'}      // Currency Prefference,

}, { versionKey: false });

// Model
var user = mongoose.model('user', userDetails);

module.exports = user;