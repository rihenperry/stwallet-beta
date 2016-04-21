//Opening and closing connections to databases can take a little bit of time,
//especially if your database is on a separate server or service.
//The best practice is to open the connection when your application starts up,
//and to leave it open until your application restarts or shuts down.

//This module only does the work of managing mongoDB connection

var mongoose = require('mongoose');

//Format -> mongodb://username:password@localhost:27027/database
var dbURI =  'mongodb://localhost/' + process.env.MONGO_DEV;
var peacefulShutdown;

if(process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGO_PROD;
}

mongoose.connect(dbURI);

var db_server  = process.env.DB_ENV || 'primary';

//connected events
mongoose.connection.on('connected', function(){
  log.info('Mongoose default connection open to ' + dbURI);
  log.info("Connected to " + db_server + " DB!");
});

mongoose.connection.on('disconnected', function(){
  log.warn('Mongoose connection disconnected -> ' + dbURI);
});

mongoose.connection.on('error', function(err){
  log.error(err);
});

//just capture OS level processes
// to monitor and handle safe closing of mongodb connection
peacefulShutdown = function(msg, callback) {
  mongoose.connection.close(function(){
    log.fatal('Mongoose disconnected through ' + msg);
    callback();
  });
};

//when nodemon reboots the app, capture the SIGUSR2 signal
process.once('SIGUSR2', function(){
  peacefulShutdown('nodemon restart', function(){
    process.kill(process.pid, 'SIGUSR2');
  });
});

//when local app terminates. This will rarely be fired
process.on('SIGINT', function(){
 peacefulShutdown('ST-wallet api termination', function(){
   process.exit(0);
  });
});

//PaaS appln shutdown. same for aws/digitalocean
process.on('SIGTERM', function(){
  peacefulShutdown('DigitalOcean app shutdown', function(){
    process.exit(0);
  });
});

require('./notify_permission');
require('./notify_options');
require('./user');
