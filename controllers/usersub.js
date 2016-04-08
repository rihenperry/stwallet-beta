/* users subscribed to buy, ask, bid keywords controller code */
var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');
var util = require('util');

var Usr = mongoose.model('user');

var helpers = require('../helpers/utils');
var common = require('./common');
var master = require('../config/masterfunc');

var getUserSubRejectBidKeywords = function(req, res) {

  var publicKey = req.query.publicKey || req.body.publicKey;
  var signature = req.query.signature || req.body.signature;

  log.info('Public Key : '+publicKey);
  log.info('Signature : '+signature);

  //validate public key
  if(!(master.validateParameter(publicKey, 'Public Key'))) {
		master.sendResponse(req, res, 404, 1, "Mandatory field not found");
		return;
	}

	//validate signature
	if(!(master.validateParameter(signature, 'Signature'))) {
		master.sendResponse(req, res, 404, 1, "Mandatory field not found");
		return;
	}

  if(!(req.query && req.query.user_email_container && Array.isArray(JSON.parse(req.query.user_email_container)))) {
    helpers.sendJsonResponse(res, 404, 1, "params missing");
    return;
  }

  var query = {publicKey: publicKey};
  var text = 'user_email_container='+req.query.user_email_container;

  master.secureAuth(query, text, signature, function (result){

    if(result[0].error == true || result[0].error == 'true'){
      master.sendResponse(req, res, 404, result[0].errCode, result[0].message);
      return;
    }

    var rejectBidUsers = [];
    var user_email_container = JSON.parse(req.query.user_email_container);

    async.each(user_email_container, function(user_email, cb) {
      var obj= {};

      Usr
        .findOne({'email': user_email})
        .populate({
          path: 'notify_options_fk_key',
          select: 'bid_opt_container.option bid_opt_container.permissions',
          model: 'NotifyOption',
          populate: {path: 'bid_opt_container.permissions', model: 'NotifyPerm'}
        })
        .select({_id:1, email:1, mobile_number:1, notify_options_fk_key:1})
        .lean()
        .exec(function(err, user){
          if (!user) {
            log.info({err: err});
            obj.email = user_email;
            obj.user_error = "user does not exist for this email";
            rejectBidUsers.push(obj);
            cb();
          } else if (err) {
            log.info({err: err});
            obj.email = user_email;
            obj.error = err;
            rejectBidUsers.push(obj);
            cb();
          }

          var bid_opt_container = user.notify_options_fk_key.bid_opt_container;
          var loadRejectBid = _.find(bid_opt_container, {option: 4});

          obj.id = user._id;
          obj.email = user.email;
          obj.mobile_number = user.mobile_number;

          if (!loadRejectBid) {
            obj.reject_bid_perms = "none";
            rejectBidUsers.push(obj);
            cb();
          } else {
            obj.reject_bid_perms = loadRejectBid.permissions.perm_code;
            rejectBidUsers.push(obj);
            cb();
          }
        });
    }, function(err){
      if (err) {
        log.info({err: err});
        helpers.sendJsonResponse(res, 404, 1, err);
        return;
      } else {
        log.info("rejectbid bulk processed-> %s", util.inspect(rejectBidUsers));
        helpers.sendJsonResponse(res, 200, -1, rejectBidUsers);
      }
    }); //endof async func
  }); //endof master.secureAuth func
};

module.exports = {
  getUserSubRejectBidKeywords: getUserSubRejectBidKeywords
}
