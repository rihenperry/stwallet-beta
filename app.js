"use strict";

// Framwork
var  express     	 = require('express'),      
	 app        	 = express(),
	 notification    = require('./api/notification.js'),              


app.post('/secure/sendmaildemo', notification.sendmaildemo);        

// Server Connectivity
app.listen('4000', function () {
    log.info('Connected To Server at port 4000'); 
});