//var bunyan      = require('bunyan');

var nconf = require('nconf');

function getOptionsFromConfigFile () {

  nconf.env(['USER'])
       .file('options','./config/config.json');
  var options = {}
  
  var user = nconf.get('USER')
  if (user) options.user = user
  
  options.host = nconf.get('host')
  options.port = nconf.get('port')
  return options
}


module.exports = {DEFAULTS:getOptionsFromConfigFile ()}
//
//
//var bunyanOpts = {
//    name: 'myapp',
//    streams: [
//    {
//        level: 'debug',
//        stream: process.stdout       // log INFO and above to stdout
//    },
//    {
//        level: 'info',
//        path: 'D:/wallet.json'  // log ERROR and above to a file
//        // path: 'st-wallet-log-bunyan.json'  // log ERROR and above to a file
//    }
//  ]
//};
//
//exports.log = bunyan.createLogger(bunyanOpts);


// Bunyan Code Start

var bunyan = require('bunyan'),
    // bformat = require('bunyan-format'),  
    // formatOut = bformat({ outputMode: 'json', jsonIndent: 2}),
  //mixIn = require('mout/object/mixIn'),

  // add some default options here...
  defaults = {},

  // singleton
  logger,

 bunyanOpts = {
    name: 'myapp',
    streams: [
    {
        level: 'debug',
        stream: process.stdout       // log INFO and above to stdout
        // stream: formatOut ,       // log INFO and above to stdout
    },
    {
        type: 'rotating-file',
        level: 'info',
        period: '1d',
//         path: '/home/sudeep/wallet_log.json',  // log ERROR and above to a file
           path: 'D:/wallet.json',  // log ERROR and above to a file
         count : 1 ,
         //path: '/home/sudeep/wallet_log.json'  // log ERROR and above to a file
         // path: 'D:/wallet.json'  // log ERROR and above to a file
    }
  ]
},   
    
    
  createLogger = function createLogger(options) {
    var opts;

    if (logger) {
      return logger;
    }

   logger = bunyan.createLogger(bunyanOpts);

    return logger;
  };

module.exports = createLogger;
