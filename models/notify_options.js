var mongoose = require('mongoose');

var buyKeywordTradeOptionsSchema = new mongoose.Schema({
  trade_opt_id: {type: Number, required: true},
  trade_opt: {type: String, required: true}
});

var AskKeywordOptionsSchema = new mongoose.Schema({
  ask_opt_id: {type: Number, required: true},
  ask_opt: {type: String, required: true}
});

var BidKeywordOptionsSchema = new mongoose.Schema({
  bid_opt_id: {type: Number, required: true},
  bid_opt: {type: String, required: true}
});

var notifyOptionsSchema = new mongoose.Schema({
  updated_on: {type:Date, default: Date.now},
  buy_opt_container: [{type: mongoose.Schema.Types.Number, ref: 'BuyKeywordsOption', unique: true, min:1, max:2}],
  ask_opt_container: [{type: mongoose.Schema.Types.Number, ref: 'AskKeywordsOption', min:1, max:3}],
  bid_opt_container: [{type: mongoose.Schema.Types.Number, ref: 'BuyKeywordsOption', min:1, max:3}]
});


mongoose.model('BuyKeywordsOption', buyKeywordTradeOptionsSchema, 'BuyKeywordOptions');
mongoose.model('AskKeywordsOption', AskKeywordOptionsSchema, 'AskKeywordOptions');
mongoose.model('BidKeywordsOption', BidKeywordOptionsSchema, 'BidKeywordOptions');
mongoose.model('NotifyOption', notifyOptionsSchema, 'NotifyOptions');
