"use strict";

// Framwork
var  express     	 = require('express'),      
	 app        	 = express(),
	 notification    = require('./api/notification.js');      

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/secure/sendmail', notification.sendmail);        

// Server Connectivity
app.listen('4000', function () {
    console.log('Connected To Server at port 4000'); 
});