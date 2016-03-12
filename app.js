"use strict";

/* node library imports */
var express             = require('express');
var nunjucks            = require('nunjucks');
var path                = require('path');
var favicon             = require('favicon');
var logger              = require('morgan');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var debug               = require('debug')('Express4');

/* project module imports here */
require('./models/db'); // keep the connection open to db when app boots/reboots
var notification        = require('./api/notification.js');
var mailer              = require('./api/mail.js');                     // Mail Functionality
var routes              = require('./routes/index')
var routesApi           = require('./routes/api_index');

/* create http server and pass the express appln to it */
var app                 = require('express')();
var server              = require('http').createServer(app);


/* view engine setup */
/* its also possible to setup multiple view engines in express using package
   consolidate.js */
//app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

//add all sorts of required middlewares to the stack
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true, encoded: true}));
app.use(bodyParser.json());
app.use(cookieParser());

/* show static directories to the express */
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'))

app.use('/', routes);       // normal html view request
app.use('/api', routesApi); // add prefex 'api' to access the api like http://localhost:port:/api/*

/* error handling for 404 routes */
app.use(function(req, res, next) {
  var err = new Error('request not found');
  err.status = 404;
  next(err);
});

// error handler middleware returns stacktraces
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

//production env error handler
//In prod, dont return stacktrace to the browser
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});

//app.get('/', function (req, res) {
//  res.sendFile(__dirname + '/index.html');
//});

app.post('/secure/sendVerificationEmail', notification.sendVerificationEmail);
app.post('/secure/sendforgotpassword', notification.sendforgotpassword);
app.post('/secure/changePassEmail', notification.changePassEmail);
app.post('/secure/resettedConfirmation', notification.resettedConfirmation);
app.post('/secure/sendMail', mailer.sendPHPmail);

app.set('port', process.env.PORT || 4000);

var notifyServer = app.listen(app.get('port'), function(){
  console.log('server listening on port ' + notifyServer.address().port);
  debug('server listening on port ' + notifyServer.address().port);
});
