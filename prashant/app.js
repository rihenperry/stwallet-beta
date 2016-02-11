var express = require('express');
var app = express();

var mongoose = require('mongoose');
var port = process.env.port || 3000;

var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

var testModel = require('./models/test-model.js');

app.get('/user', function(){

	testModel.find({}, function(err, users){
		if (err) {
			throw err;
		};
	});

	res.send('Users list <br>'+users);

});

app.post('/adduser', function(req, res){

	var data = new testModel ({
		firstname : req.body.firstname,
		lastname : req.body.lastname
	});

	console.log(data);
	data.save(function(err){
		if (err) {
			throw err;
		};
		console.log('Data saved Successfully');
		console.log('------------------------------------------------------------');
	});
	
	res.send('Data Saved');
});

app.post('/updateuser', function(req, res){

	var	firstname = req.body.firstname;
	var	lastname = req.body.lastname;

	testModel.findOneAndUpdate({firstname: firstname},{lastname: lastname}, function(err, user){
		if (err) {
			throw err;
		};
		console.log(user);
	});

	res.send('Data Updated');
});

app.post('/delete', function(req, res){

	var firstname = req.body.firstname;

	testModel.findOneAndRemove({firstname: firstname}, function(){
		if (err) {
			throw err;
		};
		
	}

	});

});

app.listen(port, function(){
	console.log('------------------------------------------------------------');
	console.log('Server Started');
});