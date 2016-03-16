/* notification options for user model */
var mongoose = require('mongoose');

var Usr = mongoose.model('User');
var Notify = mongoose.model('NotifyOption');
var BuyOption = mongoose.model('BuyKeywordsOption');
var AskOption = mongoose.model('AskKeywordsOption');
var BidOption = mongoose.model('BidKeywordsOption');

var helpers = require('../helpers/utils');
var notifylist = {};

var getAllSubOptions = function(req, res) {

  if (req.params) {
    BuyOption
             .find()
             .select('-_id')
             .exec(function(err, container){
               if (err) {
                 helpers.sendJsonResponse(res, 404, err);
               }
               notifylist.buycontainer = container;
              });
    AskOption
             .find()
             .select('-_id')
             .exec(function(err, container){
               notifylist.askcontainer = container;
             });
    BidOption
             .find()
             .select('-_id')
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
        helpers.sendJsonResponse(res, 200, user.notify_options_fk_key);
      });
  } else {
    helpers.sendJsonResponse(res, 404, {
      "message": "No id in request"
    });
  }
};

module.exports = {
  getAllSubOptions: getAllSubOptions,
  getUserSubOptions: getUserSubOptions
};
