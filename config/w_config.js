var bunyan = require('bunyan'),
  bformat = require('bunyan-format'),
  formatOut = bformat({ color: 'true' }),
  defaults = {},
  logger

var bunyanOpts = {
  name: 'ST-Wallet',
  streams: [
    {
      level: 'debug',
      stream: formatOut, // log INFO and above to stdout
    },
    {
      type: 'rotating-file',
      level: 'info',
      period: '1d',
      path: '../wallet_rev.json', // log ERROR and above to a file
      count: 30
    }
  ]
}

var createLogger = function createLogger () {
  if (logger) {
    return logger
  }

  logger = bunyan.createLogger(bunyanOpts)
  return logger
}

module.exports = createLogger

// var bunyanOpts = {
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
// }
//
// exports.log = bunyan.createLogger(bunyanOpts)

// var bunyan      = require('bunyan')

// var nconf = require('nconf')
//
// function getOptionsFromConfigFile () {
//
//  nconf.env(['USER'])
//       .file('options','./config/config.json')
//  var options = {}
//  
//  var user = nconf.get('USER')
//  if (user) options.user = user
//  
//  options.host = nconf.get('host')
//  options.port = nconf.get('port')
//  return options
// }
