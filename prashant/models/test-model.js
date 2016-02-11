var mongoose = require('mongoose');

var database = mongoose.connect("mongodb://localhost/STwallet");
var schema = mongoose.Schema;

var testschema = new schema({
	firstname : String,
	lastname : String,
	age : Number,
	dateofbirth : Date
},{versionKey : false});

module.exports = mongoose.model('Users', testschema);