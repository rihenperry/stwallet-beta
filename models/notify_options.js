var mongoose = require('mongoose');

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

var notifyOptionsSchema = new mongoose.Schema({
  updated_on: {type:Date, default: Date.now},
  buy_opt_container: [{type: mongoose.Schema.Types.Number, ref: 'BuyKeywordsOption', min:true, max:true}],
  ask_opt_container: [{type: mongoose.Schema.Types.Number, ref: 'AskKeywordsOption', min:true, max:true}],
  bid_opt_container: [{type: mongoose.Schema.Types.Number, ref: 'BuyKeywordsOption', min:true, max:true}]
});


mongoose.model('BuyKeywordsOption', buyKeywordTradeOptionsSchema, 'BuyKeywordOptions');
mongoose.model('AskKeywordsOption', AskKeywordOptionsSchema, 'AskKeywordOptions');
mongoose.model('BidKeywordsOption', BidKeywordOptionsSchema, 'BidKeywordOptions');
mongoose.model('NotifyOption', notifyOptionsSchema, 'NotifyOptions');
