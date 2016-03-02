var http        = require('http'),
    fs          = require('fs'),
    mongoose    = require('../config/mongoose.js'),
    userSchema  = require('./schema.js');
 
/***************** Original Code *****************/
//var app = http.createServer(function (request, response) {
//    fs.readFile("index.html", 'utf-8', function (error, data) {
//        response.writeHead(200, {'Content-Type': 'text/html'});
//        response.write(data);
//        response.end();
//    });
//}).listen(1000);
// 
//var io = require('socket.io').listen(app);
//
//io.sockets.on('connection', function(socket) {
//    socket.on('message_to_server', function(data) {
//        var clientIp = socket.request.connection.remoteAddress;
//        clientIp = clientIp.replace("::ffff:","");
//        io.sockets.emit("message_to_client",{ ip : clientIp, message : data["message"] });
//    });
//});
/***************** Original Code *****************/

var app = http.createServer(function (request, response) {
    fs.readFile("index.html", 'utf-8', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}).listen(1000);
 
var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        
         var myInfo = new userSchema({
            name : data['name'],
            email : data['email'],
            number : data['number'],
            time : Date.now()
        });
        
        myInfo.save(function(err){

            if(err)
            {
                console.log(err);
                return;
            }
            
            userSchema.find({},function(err, result){               
                var length = result.length;
                for(var i =length, p=0; i>0; i--)
                {
                    io.sockets.emit("message_to_client",{ name : result[p].name, email : result[p].email, number : result[p].number });
                    console.log(result[p]);
                    console.log('***********');
                    p++;
                }
                
            }).sort({time:-1})
                       
        });
        
    });
});