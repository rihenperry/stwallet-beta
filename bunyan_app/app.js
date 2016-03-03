var express = require('express');
var app = express();
var fs 	= require('fs');
// The number of milliseconds in one day
var oneDay = 86400000;

// Use compress middleware to gzip content
app.use(express.compress());

// Serve up content from public directory
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

app.set('view engine', 'ejs');  

app.use(express.bodyParser({ keepExtensions: true, uploadDir: "uploads/json"}));                     

// HTACESS code
var auth = require('./auth');
app.use(auth);



//when file is post
app.post('/', function(req, res){

	var i = req.files.uploadFile.name.lastIndexOf('.');
	var extension = (i < 0) ? '' :  req.files.uploadFile.name.substr(i);

	console.log(req.files.uploadFile.name + ' ' +extension);

	if(req.files.uploadFile.name == '' || extension.toLowerCase() != '.json')
	{
		res.redirect('/');
		return;
	}

	// var obj = fs.readFileSync('D:/git-wallet/bunyan_app/'+req.files.uploadFile.path, 'utf8');
	var obj = fs.readFileSync('/home/sudeep/'+req.files.uploadFile.path, 'utf8');
	var array = obj.replace(/\}\n{/g,'}secureSpacing{');
	
	//array = array.replace(/\{/g,' {');
	array   = array.split("secureSpacing");

	var length = array.length;
	//console.log(array);

	res.render('index', { data: array, length : length })
	return;	
});


// For CSV To JSON File
//app.post('/', function(req, res){
//
//	var i = req.files.uploadFile.name.lastIndexOf('.');
//	var extension = (i < 0) ? '' :  req.files.uploadFile.name.substr(i);
//
//	console.log(req.files.uploadFile.name + ' ' +extension);
//
//	if(req.files.uploadFile.name == '' || extension.toLowerCase() != '.csv')
//	{
//		res.redirect('/');
//		return;
//	}
//
//	var obj = fs.readFileSync('D:/git-wallet/bunyan_app/'+req.files.uploadFile.path, 'utf8');
//	var array = obj.replace(/\}\n{/g,'}secureSpacing{');
//	
//	//array = array.replace(/\{/g,' {');
//	array   = array.split("secureSpacing");
//
//	var length = array.length;
//	//console.log(array);
//
//	res.render('index', { data: array, length : length })
//	return;	
//});



//Default page load
app.get('/', function(req, res){

	// var obj = fs.readFileSync('D:/wallet_logs/wallet_25_feb_2016.json', 'utf8');
	var obj = fs.readFileSync('/home/sudeep/wallet_log.json', 'utf8');
	var array = obj.replace(/\}\n{/g,'}secureSpacing{');
	
	array   = array.split("secureSpacing");

	var length = array.length;

	res.render('index', { data: array, length : length })
	console.log('Log read sucessfully');

})

app.listen(process.env.PORT || 3010);
console.log('Server started at port 3010');


