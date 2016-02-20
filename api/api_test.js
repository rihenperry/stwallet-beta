// for referance https://www.npmjs.com/package/request#custom-http-headers
// https://www.npmjs.com/package/request

var request = require('request')


request({
  uri: "http://localhost:5000/secure/getPoolStats",
  method: "POST",
  json: {
    fieldType: {
      valueType: { primitive: "STRING" },
      //scope: "versioned",
      // namespaces: { "my.demo": "n" }
    }
  }
});





// creditAmount api with data

var requestData = {
  "email": "swanad@gmail.com",
  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
  "signature": "f0ca9c89be805c8c84e3fc619156fbcaefa305c77748cbf8e014df2810f596748772e9f5e3928401acc44541d17e276d58547a2badef10ad9ea50a058ab2b969",
  "amount": "10"
}
request.post({url: 'http://localhost:5000/secure/creditAmount',
 body: requestData,
 json: true,
 headers: {
        "content-type": "application/json",
 },
},
function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('Test Failed:', err);
  }
  console.log('Test successful!  Server responded with:', body);
});





// getPoolStats api without data
request.post({url: 'http://localhost:5000/secure/getPoolStats', json:true},
 function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('Test Failed:', err);
  }
  console.log('Test successful!  Server responded with:', body);
});




// request({
//     // url: url,
//     url: 'http://localhost:5000/secure/creditAmount',
//     method: "POST",
//     json: true,
//     headers: {
//         "content-type": "application/json",
//     },
//     body:(requestData)
// },
// function (error, response,body) {
//     if (error) {
//       return console.error(' http://localhost:5000/secure/creditAmount FAIL, error');
//     }
//     console.log('successful!  Server responded with:' , body);
// })






// 200216


var file = '/home/sudeep/json_test.json'
console.log(file);
// var jsondata_wallet =  jsonfile.readFile(file, function(err, obj) {
//   // console.dir(obj[0].test2)
//   console.dir(obj);
// })

var jsondata_wallet =  jsonfile.readFileSync(file)
console.dir(jsonfile.readFileSync(file))



// console.log(jsondata_wallet);
// console.log(jsondata_wallet);
// console.log(jsondata_wallet);
// console.log(jsondata_wallet);
// for(var con =1; con < 3; con++){

  request.post({url: 'http://localhost:5000/secure/creditAmount',

 body: jsondata_wallet,
 json: true,
 headers: {
        "content-type": "application/json",
 },
},
function optionalCallback(err, httpResponse, body) {  
  if (err) {
    return console.error('Test Failed:', err);
  }
  console.log('Server responded with:', body);
});

// }


