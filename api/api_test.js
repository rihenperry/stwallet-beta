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




// appjs backup Dk   200216


var file = '/home/sudeep/json_test.json'
console.log(file);
// var jsondata_wallet =  jsonfile.readFile(file, function(err, obj) {
//   // console.dir(obj[0].test2)
//   console.dir(obj);
// })

var jsondata_wallet =  jsonfile.readFileSync(file)
console.dir(jsonfile.readFileSync(file))

// console.log(jsondata_wallet[0].email);
// console.log(jsondata_wallet[0].email);
// console.log(jsondata_wallet[0].email);
// console.log(jsondata_wallet[0].email);
// console.log(jsondata_wallet);
// console.log(jsondata_wallet);
// console.log(jsondata_wallet);
// final_body = JSON.stringify(jsondata_wallet)

// for(var con =0; con < 10; con++){

request.post({url: 'http://localhost:5000/secure/creditAmount',
 body: jsondata_wallet,
 // body: jsondata_wallet[0].test1,
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




/*22-2-16*/
/*http://localhost:5000/secure/creditAmount*/
// var requestData = {
//   "email": "swanad@gmail.com",
//   "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "f0ca9c89be805c8c84e3fc619156fbcaefa305c77748cbf8e014df2810f596748772e9f5e3928401acc44541d17e276d58547a2badef10ad9ea50a058ab2b969",
//   "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/creditAmount',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//     return console.error('Test Failed: \n', err);
//   }
//   console.log('Test successful!  Server responded with: \n', body);
// });


/*http://localhost:5000/secure/register*/
// var requestData = {
//   "first_name": "prashant",
//   "last_name" :"tapase",
//   "email": "prashant.bitstreet2@gmail.com",
//   "password": "123456",
//   "confirm_new_password": "123456",
//   "country": "india",
//   "flag": "1",
//   "mobile_number": "123456789",
//   "referral": "",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "11c8e32254d14cdbbb1bdefbb58dbcdc20a5438b008dbf6a07eb5f6246c694dd44e7a3d1d3d032a73c783dc755808fd1c49945c7494cf772e067ced9815888d7",
// }
// request.post({url: 'http://localhost:5000/secure/register',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//     return console.error('Test Failed: \n', err);
//   }
//   console.log('Test successful!  Server responded with: \n', body);
// });


/*http://localhost:5000/secure/login*/
// var requestData = {
//   "password": "123456",
//   "email": "prashant.bitstreet@gmail.com",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "f705db58bf82f21f59ce8011633e9523da66d38fa513865dfa74fa0efe5f7b3b68f1155f074c291623b9a5ebaac4ff52846ceb58408017fb239f2020a278e1bb",
// }
// request.post({url: 'http://localhost:5000/secure/login',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//     return console.error('Test Failed: \n', err);
//   }
//   console.log('Test successful!  Server responded with: \n', body);
// });


/*http://localhost:5000/userdetails*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "f0c74ba483ad72f57317618c6f7ec5e016d57f2f61e8297a515c2a66b34203b45afd8c1ac8be486f606cfb9c9d6d461f758f2a3ff5a5e735e1d86c5949bce95f",
// }
// request.post({url: 'http://localhost:5000/userdetails',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//     return console.error('Test Failed: \n', err);
//   }
//   console.log('Test successful!  Server responded with: \n', body);
// });


/*http://localhost:5000/secure/setUserDetails*/
var requestData = {
  "email": "prashant.bitstreet@gmail.com",
  "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
  "signature": "f0c74ba483ad72f57317618c6f7ec5e016d57f2f61e8297a515c2a66b34203b45afd8c1ac8be486f606cfb9c9d6d461f758f2a3ff5a5e735e1d86c5949bce95f",
}
request.post({url: 'http://localhost:5000/userdetails',
 body: requestData,
 json: true,
 headers: {
        "content-type": "application/json",
 },
},
function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('Test Failed: \n', err);
  }
  console.log('Test successful!  Server responded with: \n', body);
});