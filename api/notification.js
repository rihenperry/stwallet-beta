var notificationschema = require('../model/notification_model.js');
var mailer          = require('./mail.js');             // Mail Functionality
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
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

  // io.sockets.emit('mail-emit', { message: 'hello' });
    io.on('connection', function (socket) {
      o.sockets.emit('mail-emit', {hello:'world'} 

        );
    console.log('connection on');

          notificationschema.find({},function(err, result){  

            io.sockets.emit('mail-emit', result);
            console.log('from notification - mail emit function');
            // var length = result.length;
            // for(var i =length, p=0; i>0; i--)
            // {
            //     socket.emit("news",{ result : result[p] });
            //     console.log(result[p].first_name+' '+result[p].last_name);
            //     console.log('***********');
            //     p++;
            // }
            
          });

    });


  console.log('from sendmail - mail emit function');

  sendResponse(req, res, 200, -1, "mail sent");

  //mailer.sendmail(mailOptions);
}
