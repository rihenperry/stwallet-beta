"use strict";

var notificationschema = require('./model/notification_model.js');

// Server Connectivity
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');

var notification    = require('./api/notification.js');  
var mailer          = require('./api/mail.js');             // Mail Functionality

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

server.listen(4000, function(){
	console.log('Connected To server at port 4000 with socket');
});

app.set('view engine', 'ejs');  

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', function (socket) {

// 	console.log('connection on');

//         notificationschema.find({},function(err, result){  

//           io.sockets.emit('mail-emit', result);
//           console.log('from app - mail emit function');
//           // var length = result.length;
//           // for(var i =length, p=0; i>0; i--)
//           // {
//           //     socket.emit("news",{ result : result[p] });
//           //     console.log(result[p].first_name+' '+result[p].last_name);
//           //     console.log('***********');
//           //     p++;
//           // }
          
//       	});

//   });

// app.post('/secure/sendmail', function(req, res){

//  var mailOptions= {
//     from: 'Search Trade <donotreply@scoinz.com>',   // Sender address
//     to: 'prashanttapase@movingtrumpet.com',                // List of Receivers
//     subject: "Search Trade : Notification Test",    // Subject line
//     text: 'test',                     // Text
//     html: 'test'
//   };

//   var notificationInfo = new notificationschema(req.body);
  
//   notificationInfo.save(function(err){
//       if(err)
//       {
//           console.log(err);
//           return err;
//       }
//       console.log('Saved SuccessFully');
//   });

// });


//   console.log('from sendmail - mail emit function');

//   sendResponse(req, res, 200, -1, "mail sent");

//   //mailer.sendmail(mailOptions);

// }); 


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

var connections = {}
 
io.on('connection', function(socket) {
	console.log('server connected with socket');
 socket.on('username', function(username) {
 	 console.log(username);
  	 connections[username] = socket;
 });
});


app.post('/secure/sendmail', function (req, res) {
// console.log(connections);
	// console.log(req.body.first_name);
 var target = connections[req.body.first_name]
 console.log(target);// ------------------------------------------------------ work from here


 console.log('api target '+req.body.first_name);
 if (target) {
 	console.log('if loop');
  connections[req.body.first_name].emit('show data', req.body.first_name);
  res.sendStatus(200);
 }
 else
  res.sendStatus(404);
});


