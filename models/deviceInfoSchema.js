/*global require, module, console */
/*jslint node: true */
'use strict'

/*Mongoose Packeage*/
var mongoose = require('mongoose')

/*Schema*/
var deviceSchema = mongoose.Schema({
  publicKey: {type: String},
  Device_Type: {type: String},
  Device_Platform: {type: String},
  Device_IMEI: {type: Number},
  Device_ID: {type: String},
  Device_Serial: {type: String},
  OS_Version: {type: String},
  OS_API_Level: {type: Number},
  BRAND: {type: String},
  MANUFACTURER: {type: String},
  Device_Name: {type: String},
  Build_ID: {type: String},
  Model_and_Product: {type: String},
  HARDWARE: {type: String},
  RELEASE: {type: String},
  DISPLAY: {type: String},
  USER: {type: String},
  HOST: {type: String},
  CPU_ABI: {type: String},
  CPU_ABI2: {type: String},
  IP: {type: Number},
  DOMAIN: {type: String},
  privateKey: {type: String},
  creationTime: {type: Number}
}, {versionKey: false})

/*Device Model*/
module.exports = mongoose.model('deviceinfo', deviceSchema)
