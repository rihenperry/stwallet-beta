// Framework
var express     = require('express');
var app         = express();

// Packages
var bodyParser  = require('body-parser');

// Pages
var mongoose    = require('./config/mongoose.js');
var user        = require('./routes/user.js');
var device        = require('./routes/device.js');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    console.log('==================================');
    console.log(req.url);
    next();
});

// Router
app.get('/', function(req,res){
    res.send('Hello Revised Wallet');
});


// app.post('/register', user.register);
app.post('/delete', user.delete);
app.post('/update', user.update);
app.post('/api/getPvtKey', device.getPvtKey);

/*============================== User Related API ==================================*/
app.post('/secure/register', user.secureRegister);

app.post('/register', device.deviceRegister);
	
// Server Connectivity
app.listen('5000',function(){
    console.log('Connected To Server');

})