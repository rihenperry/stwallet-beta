/*Mongoose Packeage*/
var mongoose = require('mongoose');

/*Schema*/
var deviceSchema = mongoose.Schema({
    publicKey : String,
    Device_Type : String,
    Device_Platform : String,
    Device_IMEI : Number,
    Device_ID : String,
    Device_Serial : String,
    OS_Version : String,
    OS_API_Level : Number,
    BRAND : String,
    MANUFACTURER : String,
    Device_Name : String,
    Build_ID : String,
    Model_and_Product : String,
    HARDWARE : String,
    RELEASE : String,
    DISPLAY : String,
    USER : String,
    HOST : String,
    CPU_ABI : String,
    CPU_ABI2 : String,
    IP : Number,
    DOMAIN : String,
    privateKey : String,
    creationTime : Number
},{versionKey: false});

/*Device Model*/
module.exports = mongoose.model('deviceinfo', deviceSchema);