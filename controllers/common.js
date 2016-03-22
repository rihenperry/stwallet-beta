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
      bid_opt_container: []
    })
  ) : updateoptions;

  //if (updateoptions === null) {
  //  var options = new NotifyOption({
  //    buy_opt_container: [],
  //    ask_opt_container: [],
  //    bid_opt_container: []
  //  });
  //} else {
  //  updateoptions.buy_opt_container = [];
  //  updateoptions.ask_opt_container = [];
  //  updateoptions.bid_opt_container = [];
  //  var options = updateoptions;
  //}

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

module.exports = {
  processOptions: processOptions
}
