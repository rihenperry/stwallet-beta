var mongoose = require('mongoose')

var NotifyPerm = mongoose.model('NotifyPerm')

var buyKeywordTradeOptionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  trade_opt: {type: String, required: true}
})

var AskKeywordOptionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  ask_opt: {type: String, required: true}
})

var BidKeywordOptionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  bid_opt: {type: String, required: true}
})

var kwdLicenseOptionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  kwd_license_opt: {type: String, required: true}
})

var depositOptionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  deposit_opt: {type: String, required: true}
})

var withdrawalOptionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  withdrawal_opt: {type: String, required: true}
})

var buyContainerSchema = new mongoose.Schema({
  option: {type: mongoose.Schema.Types.Number, refPath: 'BuyKeywordsOption._id', min: 1, max: 3},
  permissions: {type: mongoose.Schema.Types.Number, refPath: 'NotifyPerm._id', min: 0, max: 7},
  social_permissions: {type: mongoose.Schema.Types.String, default: 'u', enum: ['u', 'f', 'g']}
})

var askContainerSchema = new mongoose.Schema({
  option: {type: mongoose.Schema.Types.Number, refPath: 'AskKeywordsOption._id', min: 1, max: 3},
  permissions: {type: mongoose.Schema.Types.Number, refPath: 'NotifyPerm._id', min: 0, max: 7},
  social_permissions: {type: mongoose.Schema.Types.String, default: 'u', enum: ['u', 'f', 'g']}
})

var bidContainerSchema = new mongoose.Schema({
  option: {type: mongoose.Schema.Types.Number, refPath: 'BidKeywordsOption._id', min: 1, max: 4},
  permissions: {type: mongoose.Schema.Types.Number, refPath: 'NotifyPerm._id', min: 0, max: 7},
  social_permissions: {type: mongoose.Schema.Types.String, default: 'u', enum: ['u', 'f', 'g']}
})

var kwdLicenseContainerSchema = new mongoose.Schema({
  option: {type: mongoose.Schema.Types.Number, refPath: 'KwdLicenseOption._id', min:1, max: 2},
  permissions: {type: mongoose.Schema.Types.Number, refPath: 'NotifyPerm._id', min: 0, max: 7},
  social_permissions: {type: mongoose.Schema.Types.String, default: 'u', enum: ['u', 'f', 'g']}
})

var depositContainerSchema = new mongoose.Schema({
  option: {type: mongoose.Schema.Types.Number, refPath: 'DepositOption._id', min:1, max: 1},
  permissions: {type: mongoose.Schema.Types.Number, refPath: 'NotifyPerm._id', min: 0, max: 7},
  social_permissions: {type: mongoose.Schema.Types.String, default: 'u', enum: ['u', 'f', 'g']}
})

var withdrawalContainerSchema = new mongoose.Schema({
  option: {type: mongoose.Schema.Types.Number, refPath: 'WithdrwalOption._id', min:1, max: 2},
  permissions: {type: mongoose.Schema.Types.Number, refPath: 'NotifyPerm._id', min: 0, max: 7},
  social_permissions: {type: mongoose.Schema.Types.String, default: 'u', enum: ['u', 'f', 'g']}
})

var notifyOptionsSchema = new mongoose.Schema({
  updated_on: {type: Date, default: Date.now},
  buy_opt_container: [buyContainerSchema],
  ask_opt_container: [askContainerSchema],
  bid_opt_container: [bidContainerSchema],
  kwd_license_opt_container: [kwdLicenseContainerSchema],
  deposit_opt_container: [depositContainerSchema],
  withdrawal_opt_container: [withdrawalContainerSchema]
})

mongoose.model('BuyKeywordsOption', buyKeywordTradeOptionsSchema, 'BuyKeywordOptions')
mongoose.model('AskKeywordsOption', AskKeywordOptionsSchema, 'AskKeywordOptions')
mongoose.model('BidKeywordsOption', BidKeywordOptionsSchema, 'BidKeywordOptions')
mongoose.model('KwdLicenseOption', kwdLicenseOptionsSchema, 'KwdLicenseOptions')
mongoose.model('DepositOption', depositOptionsSchema, 'DepositOptions')
mongoose.model('WithdrawalOption', withdrawalOptionsSchema, 'WithdrawalOptions')
mongoose.model('NotifyOption', notifyOptionsSchema, 'NotifyOptions')
