"use strict";

var notificationschema  = require('./model/notification_model.js');
var app                 = require('express')();
var server              = require('http').Server(app);
var bodyParser          = require('body-parser');
var notification        = require('./api/notification.js');  
var mailer              = require('./api/mail.js');                     // Mail Functionality

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');  

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

<<<<<<< HEAD
app.post('/secure/sendVerificationEmail', notification.sendVerificationEmail);

app.post('/secure/sendforgotpassword', notification.sendforgotpassword);
=======
app.post('/secure/registernotification', notification.registernotification);
app.post('/secure/sendMail', mailer.sendPHPmail);
>>>>>>> 10c387cb23478741161ac6a5f4982f3e184cb610

server.listen(4000, function(){
	console.log('Connected To server at port 4000 with socket');
});
