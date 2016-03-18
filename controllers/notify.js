/* notification options for user model */
var mongoose = require('mongoose');
var async = require('async');

var Usr = mongoose.model('User');
var Notify = mongoose.model('NotifyOption');
var BuyOption = mongoose.model('BuyKeywordsOption');
var AskOption = mongoose.model('AskKeywordsOption');
var BidOption = mongoose.model('BidKeywordsOption');

var helpers = require('../helpers/utils');

var getAllSubOptions = function(req, res) {
  var notifylist = {};
  if (req.params) {
    BuyOption
             .find()
             .exec(function(err, container){
               if (err) {
                 helpers.sendJsonResponse(res, 404, err);
               }
               notifylist.buycontainer = container;
              });
    AskOption
             .find()
             .exec(function(err, container){
               notifylist.askcontainer = container;
             });
    BidOption
             .find()
             .exec(function(err, container){
               notifylist.bidcontainer = container;
             });
    helpers.sendJsonResponse(res, 200, notifylist);
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
};

var createUserSubOptions = function(req, res){

};

module.exports = {
  getAllSubOptions: getAllSubOptions,
  getUserSubOptions: getUserSubOptions,
  createUserSubOptions: createUserSubOptions
};
