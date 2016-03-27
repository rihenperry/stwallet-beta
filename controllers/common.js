/* redundant code among controllers stays here*/
var mongoose = require('mongoose');
var async = require('async');

var NotifyOption = mongoose.model('NotifyOption');

var processOptions = function(req, updateoptions) {

  var unProcessedBox = {
    rawbuy: JSON.parse(req.body.buy_container) || [],
    rawask: JSON.parse(req.body.ask_container) || [],
    rawbid: JSON.parse(req.body.bid_container) || []
  };

  var options = updateoptions === null ? (
    new NotifyOption({
      buy_opt_container: [],
      ask_opt_container: [],
      bid_opt_container: [],
      buy_ask_bid_perm_code: req.body.buy_ask_bid_perm_code || "000"
    })
  ) : updateoptions;

  Object.keys(unProcessedBox).map(function(key){

    switch(key){
      case 'rawbuy':
        async.each(unProcessedBox[key], function(elem, cb){
          options.buy_opt_container.push(elem);
          cb();
        }, function(err){
          options.save();
        });
        break;
      case 'rawask':
        async.each(unProcessedBox[key], function(elem, cb){
          options.ask_opt_container.push(elem);
          cb();
        }, function(err){
          options.save();
        });
        //processingAsk(unProcessedBox, key, options);
        break;
      case 'rawbid':
        async.each(unProcessedBox[key], function(elem, cb){
          options.bid_opt_container.push(elem);
          cb();
        }, function(err){
          options.save();
        });
        break;
    }
  });
  return options;
};

var resolvePermissions = function(perm_code){
    var permissionTypes = {
        7: function(){
            return "sms-email-push";
        },
        6: function(){
            return "sms-email";
        },
        5: function(){
            return "sms-push";
        },
        4: function(){
            return "sms";
        },
        3: function(){
            return "email-push";
        },
        2: function(){
            return "email";
        },
        1: function(){
            return "push";
        },
        0: function(){
            return "none";
        }
    };

    return (permissionTypes[perm_code] || permissionTypes[0])();
};

module.exports = {
    processOptions: processOptions,
    resolvePermissions: resolvePermissions
}
