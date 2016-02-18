// Packages
var mongoose    = require('mongoose');          // For Mongoose 

//Schema
var trans_Schema = mongoose.Schema({
    
    "time":         {type: Number},
    "sender":       {type: String},
    "receiver":     {type: String},
    "amount":       {type: Number},
    "type":         {type: String},
    "desc":         {type: String},
    "app_id":       {type: String},
    "keyword":      {type: String},
    "payment_mode": {type: String},
    "discount":     {type: Number},
    "commision":    {type: Number},
    "origin_ip":    {type: Number},
    "usd":          {type: String},
    "sgd":          {type: String},
    "status":       {type: String}  
},{versionKey: false});

module.exports = mongoose.model('transaction', trans_Schema)
