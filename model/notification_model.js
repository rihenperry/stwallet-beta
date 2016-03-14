var mongoose        = require('mongoose');           // For Mongoose

// Schema
var notification_wallet = mongoose.Schema({
    
    user_id:                          {type: String},          // Id
    first_name:                       {type: String},          // First Name of User
    last_name:                        {type: String},          // Last Name of Use
    notification_body: 				  {type: String}           // Notification Body
    
}, { versionKey: false });

// Model
module.exports = mongoose.model('notification_wallet', notification_wallet);