"use strict";

var notificationschema = require('./model/notification_model.js');

// Server Connectivity
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');

var notification    = require('./api/notification.js');  
var mailer          = require('./api/mail.js');             // Mail Functionality

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

server.listen(4000, function(){
	console.log('Connected To server at port 4000 with socket');
});

app.set('view engine', 'ejs');  

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/secure/registernotification', notification.registernotification);