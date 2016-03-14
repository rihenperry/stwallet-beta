var mongoose        = require('mongoose');           // For Mongoose

// Schema
var notification_message = mongoose.Schema({
    
    user_id:     {type: String},                     // Id
    message:     {type: String}                      // Notification Messages
    
}, { versionKey: false });

// Model
module.exports = mongoose.model('notification_message', notification_message);