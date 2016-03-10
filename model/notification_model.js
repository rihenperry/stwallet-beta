// Packages
var mongoose        = require('mongoose');      // For Mongoose 

// Build the connection string 
var dbURI = 'mongodb://localhost/notification'; 

// Create the database connection 
mongoose.connect(dbURI); 

var db_server  = process.env.DB_ENV || 'primary';

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
  console.log("Connected to " + db_server + " DB!");
}); 

// Schema
var notification_wallet = mongoose.Schema({
    
    user_id:                          {type: String},  
    first_name:                       {type: String},                                       // First Name of User
    last_name:                        {type: String},                                        // Last Name of Use
    notification_body: 				  {type: String}
    
}, { versionKey: false });

// Model
module.exports = mongoose.model('notification_wallet', notification_wallet);
