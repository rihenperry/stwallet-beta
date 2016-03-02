/*global require, module, console */
/*jslint node: true */
"use strict";

// Packages
var mongoose 	= require('mongoose');			// For Mongoose 

// Schema
var userDetails = mongoose.Schema({

    name:                             {type: String},                                       // First Name of User
    email:                            {type: String},                                       // Email of User
    number:                           {type: Number, default:''},		                    // Mobile Number
    time:                             {type: Number}                                        // Time

}, { versionKey: false });

// Model
var user = mongoose.model('notification', userDetails);

module.exports = user;