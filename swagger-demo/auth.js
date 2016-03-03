var auth = require('basic-auth');

var admins = {
  'St_wallet_doc': { password: 'st_doc_pa$$w0rd!' },
};


module.exports = function(req, res, next) {

  var user = auth(req);
  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send();
  }
  return next();
};
