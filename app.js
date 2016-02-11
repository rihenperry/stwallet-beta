console.log('RevisedWalllet');

// Framework
var express     = require('express');
var app         = express();

// Packages
var bodyParser  = require('body-parser');

// Pages
var mongoose    = require('./mongoose.js');
var user        = require('./user.js');

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
})
app.post('/register', user.register);
app.post('/delete', user.delete);
app.post('/update', user.update);

// Server Connectivity
app.listen('5000',function(){
    console.log('Connected To Server');
})