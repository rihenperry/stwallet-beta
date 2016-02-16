// Packages
var mongoose    = require('mongoose');          // For Mongoose 

//Schema
var trans_Schema = mongoose.Schema({
    "time": {type: Number},
    "sender": {type: String} ,
    "receiver": {type: String} ,
    "amount": {type: Number} ,
    "type": {type: Number} ,
    "desc": {type: Number} ,
    "app_id": {type: Number} ,
    "keyword": {type: Number} ,
    "payment_mode": {type: Number} ,
    "discount": {type: Number} ,
    "commision": {type: Number} ,
    "origin_ip": {type: Number} ,
    "usd": {type: Number} ,
    "sgd": {type: Number} ,
    "status": {type: String} 
});

module.exports = mongoose.model('transaction', trans_Schema)