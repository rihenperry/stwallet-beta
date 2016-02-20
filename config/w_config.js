var bunyan      = require('bunyan');

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


var bunyanOpts = {
    name: 'myapp',
    streams: [
    {
        level: 'debug',
        stream: process.stdout       // log INFO and above to stdout
    },
    {
        level: 'info',
        path: '/home/sudeep/wallet_log.json'  // log ERROR and above to a file
        // path: 'st-wallet-log-bunyan.json'  // log ERROR and above to a file
    }
  ]
};

var log = bunyan.createLogger(bunyanOpts);
log.error('hi');
