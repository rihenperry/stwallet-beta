// Packages
var mongoose 	= require('mongoose');					// For Mongoose 

// Schema
var userDetails = mongoose.Schema({	
	name: String,
	email: String,
    mobileNumber: Number
},{ versionKey: false });

// Model
var info = mongoose.model('detail', userDetails);

module.exports = info;