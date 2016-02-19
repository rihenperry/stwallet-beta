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