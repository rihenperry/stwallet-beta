/*global require, module, console */
/*jslint node: true */
'use strict'

// Framwork
var express = require('express'),
  helmet = require('helmet'),
  nunjucks = require('nunjucks'),
  path = require('path'),
  favicon = require('favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  nconf = require('nconf'),
  fs = require('fs'),
  request = require('request'),
  jsonfile = require('jsonfile'),
  bodyParser = require('body-parser'),
  debug = require('debug')('Express4'),
  util            = require('util'),
  bformat = require('bunyan-format')

var log = require('./config/w_config')() //bunyan logger to organize logging

require('dotenv').config() //loads project specific process.env settings from .env
require('./models/db') // keep the connection open to db when app boots/reboots

var routesUserApi = require('./routes/api_user'), // User API
  routesDeviceApi = require('./routes/api_device'), // Device API
  routesSearchApi = require('./routes/api_search'), // Search API
  routesPoolApi = require('./routes/api_pool'), // Get Pool API
  routesWtransactionApi = require('./routes/api_transaction'),
  routesAdminApi = require('./routes/api_admin'),
  cron_api = require('./api/cron_api.js') // Get Admin API

var routesNotificationApi = require('./routes/api_notification')
var routesMailApi = require('./routes/api_mail')
var routes = require('./routes/index')
var routesUserPrefApi = require('./routes/api_index')

/* create http server and pass the express appln to it */
var app = require('express')()
var server = require('http').createServer(app)

/* view engine setup */
/* its also possible to setup multiple view engines in express using package
   consolidate.js */
// app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// add all sorts of required middlewares to the stack
// code to useing helmet@wallet app
app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(cookieParser())

// Static Resource in public Folder To Display View
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/bower_components'))

app.use('/', routes) // normal html view request
app.use('/api', routesUserPrefApi); // add prefex 'api' to access the api like http://localhost:port:/api/*

/*============================== Device Related API ==================================*/
app.use('/api', routesDeviceApi)
/*============================== User Related API ==================================*/

app.use('/', routesUserApi)
// Reject Blocked Bids API (In cases of Accept bid and Buy now)

/*============================== Pool Related API ==================================*/
app.use('/secure', routesPoolApi)
/*============================== Transactions Related API ==================================*/
app.use('/secure', routesWtransactionApi)
/*============================== Search Related API ==================================*/
app.use('/secure/search', routesSearchApi)
/*============================== Admin Related API ==================================*/
app.use('/secure/admin', routesAdminApi)
/*=============================== send email API==============*/
app.use('/secure', routesNotificationApi)
app.use('/secure', routesMailApi)

app.post('/secure/cron', cron_api.cron)

/* error handling for 404 routes */
app.use(function (req, res, next) {
  var err = new Error('request not found')
  err.status = 404
  next(err)
})

// error handler middleware returns stacktraces
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error.html', {
      message: err.message,
      error: err
    })
  })
}

// production env error handler
// In prod, dont return stacktrace to the browser
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error.html', {
    message: err.message,
    error: {}
  })
})

app.use(function (req, res, next) {
  log.info('==================================')
  log.info(req.url)
  next()
})

app.set('port', process.env.NODE_SERVER_PORT || 5020)

var notifyServer = app.listen(app.get('port'), process.env.NODE_SERVER_IP || "127.0.0.1", function () {
  log.info('server listening on address ' + notifyServer.address().address + ':' + notifyServer.address().port)
  debug('server listening on port ' + notifyServer.address().port)
})

// Server Connectivity using nginx
// app.listen(5000, function () {
//    log.info('Connected To Server')
// })

// Server Connectivity without nginx
//
// app.listen(80, "128.199.181.75", function () {
//   log.info('Connected To Server')
// })
