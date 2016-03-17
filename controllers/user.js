/* user related controllers send request to user models and sends response to original requestor */
var mongoose = require('mongoose');
var async = require('async');

var Usr = mongoose.model('User');
var NotifyOption = mongoose.model('NotifyOption');
var BuyOption = mongoose.model('BuyKeywordsOption');
var AskOption = mongoose.model('AskKeywordsOption');
var BidOption = mongoose.model('BidKeywordsOption');

var helpers = require('../helpers/utils');

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
        helpers.sendJsonResponse(res, 200, user);
      });
  } else {
    helpers.sendJsonResponse(res, 404, {
      "message": "No id in request"
    });
  }
};

var processingBuy = function(unProcessedBox, key, options) {
  unProcessedBox[key].forEach(function(element){
    console.log("count =>" + element);
    BuyOption
            .find({trade_opt_id: element})
            .exec(function(err, result){
              if(err) {
                helpers.sendJsonResponse(res, 404 ,err);
              }
              options.buy_opt_container.push(result[0].trade_opt_id);
              console.log("container state =>" + options.buy_opt_container);
            });
    console.log("linked data");
  });
};

var createUser = function(req, res) {
  var unProcessedBox = {
    rawbuy: JSON.parse(req.body.buy_container),
    rawask: JSON.parse(req.body.ask_container),
    rawbid: JSON.parse(req.body.bid_container)
  };

  var options = new NotifyOption({});
  //.update({ $set : { buy_opt_container: [] }});
  try {

  Object.keys(unProcessedBox).map(function(key){

    switch(key){
      case 'rawbuy':
        options.buy_opt_container = [];
        async.series([
                function(cb){
                  processingBuy(unProcessedBox, key, options);
                  cb();
                }], function(err,result) {
              });
        break;
      case 'rawask':
        unProcessedBox[key].forEach(function(element){
        //  AskOption
        //          .find({ask_opt_id: element})
        //          .execOne(function(err, result){
        //            options.update({ $addToSet : { ask_opt_container: result.ask_opt_id}});
        //          });
        });
        break;
      case 'rawbid':
        unProcessedBox[key].forEach(function(element){
        //  BidOption
        //          .find({bid_opt_id: element})
        //          .exec(function(err, result){
        //            options.update({ $addToSet : { bid_opt_container: result.bid_opt_id}});
        //          });
        });
        break;
    }
  });
  } catch (err) {
      helpers.sendJsonResponse(res, 404, err);
    }
    finally {
      options.save();
      console.log("data saved");
    }
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

    newuser.save(function(err, newuser) {
      if (err) {
        helpers.sendJsonResponse(res, 404, err);
        return;
      }
      helpers.sendJsonResponse(res, 201, newuser);
    });
  });

  //Usr
  //  .create({
  //    user_id: req.body.user_id,
  //    uname: req.body.name,
  //    notify_options_fk_key: helpers.alphaNumr(8)
  //  }, function(err, newuser) {
  //    if (err) {
  //      helpers.sendJsonResponse(res, 404, err);
  //    } else {
  //      helpers.sendJsonResponse(res, 201, newuser);
  //    }
  //  });
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
  }
};

module.exports = {
  userList: userList,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};
