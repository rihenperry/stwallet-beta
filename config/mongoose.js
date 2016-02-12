// Packages
var mongoose    = require('mongoose');

// Connectivity To Mongo
mongoose.connect('mongodb://localhost/wallet');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

db.once('open', function(){
	console.log('Connected To Database');	
});