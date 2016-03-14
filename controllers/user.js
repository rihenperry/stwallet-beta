/* user related controllers send request to user models and sends response to original requestor */
var mongoose = require('mongoose');
var Usr = mongoose.model('User');

var helpers = require('../helpers/utils');

var userList = function(req, res) {
  if(req.params){
    Usr
       .find()
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
  Usr
    .create({
      user_id: req.body.user_id,
      uname: req.body.name,
      notify_options_fk_key: helpers.alphaNumr(8)
    }, function(err, newuser) {
      if (err) {
        helpers.sendJsonResponse(res, 404, err);
      } else {
        helpers.sendJsonResponse(res, 201, newuser);
      }
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
  }
};

module.exports = {
  userList: userList,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};
