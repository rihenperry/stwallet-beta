var master = require('./masterfunc');
var helpers = require('../helpers/utils');

var checkPubSignKey = function(req, res, next) {
  var pubKey = req.query.publicKey || req.body.publicKey;
  log.info('public key middleware check '+ pubKey);

  var signature = req.query.signature || req.body.signature;
  log.info('signature middleware check '+ signature);

  if(!master.validateParameter(pubKey, 'Public Key')) {
    log.warn('public key error '+ pubKey);
    master.sendResponse(req, res, 403, 1, "Mandatory field not found");
    return;
  } else if (!master.validateParameter(signature, 'Signature')) {
    log.warn('signature absent '+ signature);
    master.sendResponse(req, res, 403, 1, "Mandatory field not found");
    return;
  } else {
    next();
  }
}

var checkFlag = function(req, res, next) {
  var flag = req.query.flag || req.body.flag;
  log.info('flag middleware check '+ flag);

  if(!(master.validateParameter(flag, 'flag'))) {
    log.warn('flag absent '+ flag);
		master.sendResponse(req, res, 403, 1, "Mandatory field not found");
		return;
	} else {
    next();
  }
}

var checkEmail = function(req, res, next) {
  var email = req.body.email;
  log.info('email middleware check '+ email);

  if (!(master.validateParameter(email, 'Email'))) {
    log.warn('mail absent '+ email);
		master.sendResponse(req, res, 403, 1, "Mandatory field not found");
		return;
	} else if (!(helpers.validateEmail(email))) {
    log.warn('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
  } else {
    next();
  }
}

module.exports = {
  checkPubSignKey: checkPubSignKey,
  checkFlag: checkFlag,
  checkEmail: checkEmail
};
