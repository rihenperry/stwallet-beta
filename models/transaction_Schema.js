// Packages
var mongoose    = require('mongoose');          // For Mongoose 

//Schema
var trans_Schema = mongoose.Schema({
    
    "time":         {type: Number, default:0},
    "sender":       {type: String, default:''},
    "receiver":     {type: String, default:''},
    "amount":       {type: Number, default:0},
    "type":         {type: String, default:''},
    "desc":         {type: String, default:''},
    "app_id":       {type: String, default:''},
    "keyword":      {type: String, default:''},
    "payment_mode": {type: String, default:''},
    "discount":     {type: Number, default:0},
    "commision":    {type: Number, default:0},
    "origin_ip":    {type: String, default:''},
    "usd":          {type: Number, default:0},
    "sgd":          {type: Number, default:0},
    "status":       {type: String}
    
},{versionKey: false});

module.exports = mongoose.model('transaction', trans_Schema)
