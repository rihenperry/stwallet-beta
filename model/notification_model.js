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
  
    first_name:                       {type: String},                                       // First Name of User
    last_name:                        {type: String},                                       // Last Name of Use
    email:                            {type: String},                                       // Email of User
    mobile_number:                    {type: Number, default:0},		                    // Mobile Number
    ref_email:                        {type: String, default:''},		                    // Reference Person Email
    my_referral_id :                  {type: String},				                        // User Refferal Code
    seed:                             {type: String},                                       // Seed
    salt:                             {type: String},								        // Random Generated Value (Salt)
    first_buy_status:                 {type: Number}					                    // First Buy (For First Keyword Purchase)

}, { versionKey: false });

// Model
module.exports = mongoose.model('notification_wallet', notification_wallet);
