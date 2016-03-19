/* user related controllers send request to user models and sends response to original requestor */
var mongoose = require('mongoose');
var async = require('async');

var Usr = mongoose.model('User');
var NotifyOption = mongoose.model('NotifyOption');
var BuyOption = mongoose.model('BuyKeywordsOption');
var AskOption = mongoose.model('AskKeywordsOption');
var BidOption = mongoose.model('BidKeywordsOption');

var helpers = require('../helpers/utils');
var common = require('./common');

var userList = function(req, res) {
  if(req.params){
    Usr
       .find()
       .select('-notify_options_fk_key')
       .exec(function(err, userlist){
         if(!userlist){
           helpers.sendJsonResponse(res, 404, {
             "message": "no users exists"
           });
           return;
         } else if (err){
           helpers.sendJsonResponse(res, 404, err);
           return;
         }
         helpers.sendJsonResponse(res, 200, userlist);
       });
  } else {
    helpers.sendJsonResponse(res, 404, {
      "message": "abnormal request"
    });
  }
};

var getUser = function(req, res) {
  if(req.params && req.params.id) {
    Usr
      .findById(req.params.id)
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
        helpers.sendJsonResponse(res, 200, user);
      });
  } else {
    helpers.sendJsonResponse(res, 404, {
      "message": "No id in request"
    });
  }
};

var createUser = function(req, res) {
  //.update({ $set : { buy_opt_container: [] }});
  if(req.body.buy_container || req.body.ask_container || req.body.bid_container) {
    options = common.processOptions(req);

    options.save(function(err) {
      if (err) {
        helpers.sendJsonResponse(res, 404, err);
        return;
      }

      var newuser = new Usr({
        user_id: req.body.user_id,
        uname: req.body.name,
        notify_options_fk_key: options._id
      });
    });
  } else {
    var newuser = new Usr({
      user_id: req.body.user_id,
      uname: req.body.name
    });
  }

  newuser.save(function(err, newuser) {
      if (err) {
        helpers.sendJsonResponse(res, 404, err);
        return;
      }
      helpers.sendJsonResponse(res, 201, newuser);
    });
};

var updateUser = function(req, res) {
  if (!req.params.id) {
    return;
  }
  Usr
    .findById(req.params.id)
    .exec(
      function(err, updateuser) {
        if (!updateuser) {
          helpers.sendJsonResponse(res, 404, {
            "message": "id to update on, not found"
          });
          return;
        } else if (err) {
          helpers.sendJsonResponse(res, 404, err);
          return;
        }
        updateuser.uname = req.body.name;
        updateuser.save(function(err, updateuser) {
          if (err) {
            helpers.sendJsonResponse(res, 404, err);
          } else {
            helpers.sendJsonResponse(res, 200, updateuser);
          }
        });
      }
   );
};

var deleteUser = function(req, res) {
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
          NotifyOption
                     .findByIdAndRemove(deleteuser.notify_options_fk_key._id)
                     .exec(
                       function(err, deloptions) {
                         if (err) {
                           helpers.sendJsonResponse(res, 404, err);
                           return;
                         }
                       }
                     );
        }
      );

    Usr
      .findByIdAndRemove(objId)
      .exec(
        function(err, deleteuser) {
          if (err) {
            helpers.sendJsonResponse(res, 404, err);
            return;
          }
          helpers.sendJsonResponse(res, 204, null);
        }
      );
  } else {
    helpers.sendJsonResponse(res, 404, {
      "message": "object id not found"
    });
    return;
  }
};

module.exports = {
  userList: userList,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};
