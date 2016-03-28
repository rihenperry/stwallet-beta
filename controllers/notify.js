/* notification options for user model */
var mongoose = require('mongoose');
var async = require('async');

var Usr = mongoose.model('user');
var NotifyOption = mongoose.model('NotifyOption');
var BuyOption = mongoose.model('BuyKeywordsOption');
var AskOption = mongoose.model('AskKeywordsOption');
var BidOption = mongoose.model('BidKeywordsOption');

var helpers = require('../helpers/utils');
var common = require('./common');
var master = require('../config/masterfunc.js'); 

var getAllSubOptions = function(req, res) {
  var notifylist = {};
  if (req.params) {
    async.parallel({
      buy: function(cb){
        BuyOption
             .find()
             .exec(function(err, container){
               if (err) {
                 helpers.sendJsonResponse(res, 404, err);
               }
               cb(null, container);
             });
      },
      ask: function(cb){
        AskOption
             .find()
             .exec(function(err, container){
               if (err) {
                 helpers.sendJsonResponse(res, 404, err);
               }
               cb(null, container);
             });
      },
      bid: function(cb){
        BidOption
             .find()
             .exec(function(err, container){
               if (err) {
                 helpers.sendJsonResponse(res, 404, err);
               }
               cb(null, container);
             });
      }
    }, function(err, results) {
      //console.log(results);
      helpers.sendJsonResponse(res, 200, results);
    });
  } else {
    helpers.sendJsonResponse(res, 404, {
      "message": "abnormal request"
    });
  }
};

var getUserSubOptions = function(req, res) {
  var notifyconfigs = [
    {path: 'notify_options_fk_key.buy_opt_container', model: 'BuyKeywordsOption'},
    {path: 'notify_options_fk_key.ask_opt_container', model: 'AskKeywordsOption'},
    {path: 'notify_options_fk_key.bid_opt_container', model: 'BidKeywordsOption'}
  ];
    
    var id =  req.params.id;
    var publicKey = req.query.publicKey;
    var signature = req.query.signature;
    
    log.info('Id : '+id);
    log.info('Public Key : '+publicKey);
    log.info('Signature : '+signature);
    
    // Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var query = {publicKey:publicKey};
    //var text  = 'id='+encodeURIComponent(id)+'&publicKey='+encodeURIComponent(publicKey);
    
    var text  = 'id='+id+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
        
        // Write Your Code Here
        if(req.params && req.params.id) {
        Usr
          .findById(req.params.id)
          .populate('notify_options_fk_key')
          .exec(function(err, user){
            if (!user) {
              helpers.sendJsonResponse(res, 404, {
                "message": "id not found"
              });
              return;
            } else if (err) {
              helpers.sendJsonResponse(res, 404, err);
              return;
            }

            Usr
                     .populate(user, notifyconfigs, function(err, result){
                       if (err) return helpers.sendJsonResponse(res, 404, err);
                       helpers.sendJsonResponse(res, 200, result);
                     });
          });
      } else {
        helpers.sendJsonResponse(res, 404, {
          "message": "No id in request"
        });
      }
        
        
    })

};




var createUserSubOptions = function(req, res){
    
    
    var id =  req.params.id;
    var publicKey = req.body.publicKey || req.query.publicKey;
    var signature = req.body.signature || req.query.signature;
    var buy_container = req.body.buy_container;
    var ask_container = req.body.ask_container;
    var bid_container = req.body.bid_container;
    
    log.info('Id : '+id);
    log.info('Public Key : '+publicKey);
    log.info('Signature : '+signature);
    log.info('Buy Options : '+buy_container);
    log.info('Ask Options : '+ask_container);
    log.info('Bid Options : '+bid_container);
    
    // Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var query = {publicKey:publicKey};
    //var text  = 'id='+encodeURIComponent(id)+'&buy_container='+encodeURIComponent(buy_container)+'&ask_container='+encodeURIComponent(ask_container)+'&bid_container='+encodeURIComponent(bid_container)+'&publicKey='+encodeURIComponent(publicKey);
    
    var text  = 'id='+id+'&buy_container='+buy_container+'&ask_container='+ask_container+'&bid_container='+bid_container+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }    
    
      if(req.params && req.params.id){
        Usr
          .findById(req.params.id)
          .exec(function(err, updateuser){
            if (!updateuser) {
              helpers.sendJsonResponse(res, 404, {
                "message": "id does not exist"
              });
              return;
            } else if (err) {
              helpers.sendJsonResponse(res, 404, err);
              return;
            }

            /* just accept the notify options params*/
            var updateoptions = null;
            var options = common.processOptions(req, updateoptions);

            options.save(function(err) {
              if (err) {
                helpers.sendJsonResponse(res, 404, err);
                return;
              }

              /* update the notify options foreign key in users table */
              updateuser.notify_options_fk_key = options._id;

              updateuser.save(function(err, newuser) {
                if (err) {
                  helpers.sendJsonResponse(res, 404, err);
                  return;
                }
                helpers.sendJsonResponse(res, 201, newuser);
              });
            });
          });
      } else {
        helpers.sendJsonResponse(res, 404, {
          "message": "No id in request"
        });
      }
        
    });
};



var updateUserSubOptions = function(req, res) {
    
    
    var id =  req.params.id;
    var optionid = req.params.optionid;
    var publicKey = req.body.publicKey || req.query.publicKey;
    var signature = req.body.signature || req.query.signature;
    var buy_container = req.body.buy_container;
    var ask_container = req.body.ask_container;
    var bid_container = req.body.bid_container;
    
    log.info('Id : '+id);
    log.info('Option Id : '+optionid);
    log.info('Public Key : '+publicKey);
    log.info('Signature : '+signature);
    log.info('Buy Options : '+buy_container);
    log.info('Ask Options : '+ask_container);
    log.info('Bid Options : '+bid_container);
    
    // Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var query = {publicKey:publicKey};
    //var text  = 'id='+encodeURIComponent(id)+'&optionid='+encodeURIComponent(optionid)+'&buy_container='+encodeURIComponent(buy_container)+'&ask_container='+encodeURIComponent(ask_container)+'&bid_container='+encodeURIComponent(bid_container)+'&publicKey='+encodeURIComponent(publicKey);
    
    var text  = 'id='+id+'&optionid='+optionid+'&buy_container='+buy_container+'&ask_container='+ask_container+'&bid_container='+bid_container+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }    
    
    
      if ((!req.params.id) || (!req.params.optionid) || (!req.params)) {
        helpers.sendJsonResponse(res, 404, {
          "message": "No args in request"
        });
        return;
      }

      Usr
        .findById(req.params.id)
        .exec(function(err, user){
          try {
            if ((user.notify_options_fk_key.toString() !== req.params.optionid)) {
              helpers.sendJsonResponse(res, 404, {
                "message": "user optionID not found"
              });
              return;
            } else if (err) {
              helpers.sendJsonResponse(res, 404, err);
              return;
            }
          } catch(err) {
            helpers.sendJsonResponse(res, 404, {
              "message": "users option ID does not exist"
            });
            return;
          }

          NotifyOption
                     .findById(req.params.optionid)
                     .exec(function(err, updateNotifyObj) {
                       if (err) {
                         helpers.sendJsonResponse(res, 404, err);
                       }

                       updateNotifyObj.buy_opt_container = [];
                       updateNotifyObj.ask_opt_container = [];
                       updateNotifyObj.bid_opt_container = [];
                       updateNotifyObj.updated_on = Date.now();

                       var options = common.processOptions(req, updateNotifyObj);
                       options.save(function(err, updated) {
                         if (err) {
                           helpers.sendJsonResponse(res, 404, err);
                         } else {
                           helpers.sendJsonResponse(res, 200, updated);
                         }
                       });
                     });
        });
        
    });
};

var deleteUserSubOptions = function(req, res) {
    
    
    var id =  req.params.id;
    var publicKey = req.query.publicKey;
    var signature = req.query.signature;
    
    log.info('Id : '+id);
    log.info('Public Key : '+publicKey);
    log.info('Signature : '+signature);
    
    // Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var query = {publicKey:publicKey};
    //var text  = 'id='+encodeURIComponent(id)+'&publicKey='+encodeURIComponent(publicKey);
    
    var text  = 'id='+id+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
    
          var objId = req.params.id;
          if (objId) {
            Usr
              .findById(req.params.id)
              .populate('notify_options_fk_key')
              .exec(
                function(err, deleteuser) {
                  if (err) {
                    helpers.sendJsonResponse(res, 404, err);
                    return;
                  }

                  if (true) {
                    console.log("object has notify option object");
                    NotifyOption
                               .findByIdAndRemove(deleteuser.notify_options_fk_key)
                               .exec(
                                 function(err, deloptions) {
                                   if (err) {
                                     helpers.sendJsonResponse(res, 404, err);
                                     return;
                                   }
                                 }
                               );
                  } else {
                    helpers.sendJsonResponse(res, 404, {
                      "message": "user has no option id."
                    });
                  }

                  deleteuser.notify_options_fk_key = null;
                  deleteuser.save(function(err, result){
                    helpers.sendJsonResponse(res, 204, null);
                  });
                }
              );

            //Usr
            //  .findByIdAndRemove(objId)
            //  .exec(
            //    function(err, deleteuser) {
            //      if (err) {
            //        helpers.sendJsonResponse(res, 404, err);
            //        return;
            //      }
            //      helpers.sendJsonResponse(res, 204, null);
            //    }
            //  );
          } else {
            helpers.sendJsonResponse(res, 404, {
              "message": "object id not found"
            });
            return;
          }
        
    })
};

module.exports = {
  getAllSubOptions: getAllSubOptions,
  getUserSubOptions: getUserSubOptions,
  createUserSubOptions: createUserSubOptions,
  updateUserSubOptions: updateUserSubOptions,
  deleteUserSubOptions: deleteUserSubOptions
};
