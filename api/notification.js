
// Packages
var mongoose  = require('mongoose');      // For Mongoose 
var mailer          = require('./mail.js');             // Mail Functionality

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
    last_name:                        {type: String}                                      // Last Name of Use


}, { versionKey: false });


// Response Function
 var sendResponse = function(req, res, status, errCode, errMsg) {

    var d = Date();
    console.log(status +" "+ errCode +" "+ errMsg + " " + d);
    res.status(status).send({
        errCode: errCode, 
        errMsg: errMsg,
        dbDate: d
    });
    
}

// Model
var notificationschema = mongoose.model('notification_wallet', notification_wallet);

module.exports.sendmail = function(req, res){

  var mailOptions= {
    from: 'Search Trade <donotreply@scoinz.com>',   // Sender address
    to: 'prashanttapase@movingtrumpet.com',                // List of Receivers
    subject: "Search Trade : Notification Test",    // Subject line
    text: 'test',                     // Text
    html: 'test'
  };

  var notificationInfo = new notificationschema(req.body);
  
  notificationInfo.save(function(err){
      if(err)
      {
          console.log(err);
          return err;
      }
      console.log('Saved SuccessFully');
  });
 
  sendResponse(req, res, 200, -1, "mail sent");
  mailer.sendmail(mailOptions);
}
