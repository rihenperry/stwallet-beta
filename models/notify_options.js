var mongoose = require('mongoose');

var NotifyPerm = mongoose.model('NotifyPerm');

var buyKeywordTradeOptionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  trade_opt: {type: String, required: true}
});

var AskKeywordOptionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  ask_opt: {type: String, required: true}
});

var BidKeywordOptionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  bid_opt: {type: String, required: true}
});

var buyContainerSchema = new mongoose.Schema({
  option: {type: mongoose.Schema.Types.Number, refPath: 'BuyKeywordsOption._id', min:1, max:3},
  permissions: {type: mongoose.Schema.Types.Number, refPath: 'NotifyPerm._id', min:0, max:7}
});

var askContainerSchema = new mongoose.Schema({
  option: {type: mongoose.Schema.Types.Number, refPath: 'AskKeywordsOption._id', min:1, max:3},
  permissions: {type: mongoose.Schema.Types.Number, refPath: 'NotifyPerm._id', min:0, max:7}
});

var bidContainerSchema = new mongoose.Schema({
  option: {type: mongoose.Schema.Types.Number, refPath: 'BidKeywordsOption._id', min:1, max:4},
  permissions: {type: mongoose.Schema.Types.Number, refPath: 'NotifyPerm._id', min:0, max:7}
});

var notifyOptionsSchema = new mongoose.Schema({
    updated_on: {type:Date, default: Date.now},
    buy_opt_container:   [buyContainerSchema],
    ask_opt_container:   [askContainerSchema],
    bid_opt_container:   [bidContainerSchema]
});


mongoose.model('BuyKeywordsOption', buyKeywordTradeOptionsSchema, 'BuyKeywordOptions');
mongoose.model('AskKeywordsOption', AskKeywordOptionsSchema, 'AskKeywordOptions');
mongoose.model('BidKeywordsOption', BidKeywordOptionsSchema, 'BidKeywordOptions');
mongoose.model('NotifyOption', notifyOptionsSchema, 'NotifyOptions');
