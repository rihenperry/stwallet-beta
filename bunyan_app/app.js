var express = require('express');
var app = express();

// The number of milliseconds in one day
var oneDay = 86400000;

// Use compress middleware to gzip content
app.use(express.compress());

// Serve up content from public directory
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

app.set('view engine', 'ejs');  

app.get('/', function(req, res){

	var fs 	= require('fs');
	var obj = fs.readFileSync('D:/wallet_logs/wallet_25_feb_2016.json', 'utf8');
	var array = obj.replace(/\}\n{/g,'}secureSpacing{');
	
	//array = array.replace(/\{/g,' {');
	array   = array.split("secureSpacing");

	var length = array.length;
	console.log(array);

	//var data = JSON.parse(array);

	//res.send(array);

	// var htmltable = '<table>'+
	// 					'<thead>'+
	// 						'<td>Number</td>'+
	// 						'<td>Name</td>'+
	// 						'<td>HostName</td>'+
	// 						'<td>PID</td>'+
	// 						'<td>Level</td>'+
	// 						'<td>Error</td>'+
	// 						'<td>Message</td>'+
	// 					'</thead>'+
	// 					'<tbody>';
	// 	var p = 1;
	// 	for(var i=0; i<length; i++ )
	// 	{
	// 		// console.log(array[i]);
	// 		var data = JSON.parse(array[i]);

	// 		htmltable += '<tr>'+
	// 						'<td>'+p+'</td>'+
	// 						'<td>'+data.name+'</td>'+
	// 						'<td>'+data.hostname+'</td>'+
	// 						'<td>'+data.pid+'</td>'+
	// 						'<td>'+data.level+'</td>'+
	// 						'<td>'+data.err+'</td>'+
	// 						'<td>'+data.msg+'</td>'+
	// 					 '</tr>';

	// 		p++;
	// 	}
					
	//		htmltable	+=	'</tbody></table>';

	// res.send(htmltable);
	res.render('index', { data: array, length : length })

})

// app.get('/', function(req, res) {  
//   res.render('index', { title: 'The index page!' })
// });

app.listen(process.env.PORT || 3010);
console.log('Server started at port 3010');


