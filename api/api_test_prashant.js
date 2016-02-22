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




/*22-2-16 -- prashant*/
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
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Test successful!  Server responded with: \n', body);
// });


/*http://localhost:5000/secure/currencyPrefrence*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "currency_code":"INR/Indian Rupee",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "157eb04b40f4bc2729227b34a39b97f5244239fc8a4d0f5af85d3957ddd7543e842fb591d8a6b71fa5e7cc9ac2493807d09c0233b89f3ece1e594659761489ac",
// }
// request.post({url: 'http://localhost:5000/secure/currencyPrefrence',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });

/*http://localhost:5000/secure/forgotPassword*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "flag":"1",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "d1201ba0687ddaee079bf35e8aede5a3b41fb1a971114de1a00b58b5588d49549464e3f3989bb8bc57fc686c3dca3b59f9dcec92d78063092f228ada048a5783",
// }
// request.post({url: 'http://localhost:5000/secure/forgotPassword',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/forgotPassword -- token issue check from mail*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "flag":"1",
//   "confirm_password":"123456",
//   "password":"123456",
//   "auth":"123",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "f6f5636edce40960de13d090aabecacfeb34fe9223582b522b334d838c5562d594b4688bc81ba3ab5c6280c6d619cf29fdfbab0ed7e611be78c6caf4fce7cc21",
// }
// request.post({url: 'http://localhost:5000/secure/resetpassword',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/changePassword*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "old_password":"1234561",
//   "new_password":"123456",
//   "confirm_new_password":"123456",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "f032245da616ff889d231654085255d10e299892389ff7175e6aa580314c35f00968f0b6001073a3ba1801a85d48c836f974d63f40a44ec525d1abbef41e5392",
// }
// request.post({url: 'http://localhost:5000/secure/changePassword',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/setAppId*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "appId":"asd",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "dcf914b59d1463e9c3c46a208b937d8d927492e20421e4a9fe652b7eefb03d859ebfcbef21dedb04dd3ac75ec43f6c30873cb52ac6d650cce28f87ca265bc361",
// }
// request.post({url: 'http://localhost:5000/secure/setAppId',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/getAppId*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "f0c74ba483ad72f57317618c6f7ec5e016d57f2f61e8297a515c2a66b34203b45afd8c1ac8be486f606cfb9c9d6d461f758f2a3ff5a5e735e1d86c5949bce95f",
// }
// request.post({url: 'http://localhost:5000/secure/getAppId',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/creditAmount*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
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
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/editProfilePic*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "profile_pic": "",
//   "extension": "jpg",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "f0c74ba483ad72f57317618c6f7ec5e016d57f2f61e8297a515c2a66b34203b45afd8c1ac8be486f606cfb9c9d6d461f758f2a3ff5a5e735e1d86c5949bce95f",
// }
// request.post({url: 'http://localhost:5000/secure/editProfilePic',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/deductAmount*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductAmount',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/addPurchases*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addPurchases',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/deductPurchases*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductPurchases',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/addCashback*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addCashback',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/deductCashback*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductCashback',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/addAffEarning*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addAffEarning',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/deductAffEarning*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductAffEarning',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });

/*http://localhost:5000/secure/addSales*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addSales',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/deductSales*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductSales',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/addTrade*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addTrade',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/deductTrade*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductTrade',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/addTotalKeywordIncome*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addTotalKeywordIncome',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/deductTotalKeywordIncome*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductTotalKeywordIncome',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });




/*http://localhost:5000/secure/addBlockedPendingWithdrawals*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addBlockedPendingWithdrawals',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });

/*http://localhost:5000/secure/deductBlockedPendingWithdrawals*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductBlockedPendingWithdrawals',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/addApprovedWithdrawals*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addApprovedWithdrawals',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/deductApprovedWithdrawals*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductApprovedWithdrawals',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/addTotalAppIncome*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addTotalAppIncome',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/addBlockedForBids*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/addBlockedForBids',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/deductBlockedForBids*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "10",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80",
// }
// request.post({url: 'http://localhost:5000/secure/deductBlockedForBids',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });



/*http://localhost:5000/secure/firstBuy*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount": "1",
//   "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "c768a163445c8584729ff70acdf9654feb65326985ef43314ae86fb344a5dd7b5fb358c724c4ff46c15dfee24022594be16417f68d22332aa5a3d924734e5c75",
// }
// request.post({url: 'http://localhost:5000/secure/firstBuy',
//  body: requestData,
//  json: true,
//  headers: {
//         "content-type": "application/json",
//  },
// },
// function optionalCallback(err, httpResponse, body) {
//   if (err) {
//   return log.error('Test Failed: \n', err);
//   }
//   log.info('Server responded with: \n', body);
// });


/*http://localhost:5000/secure/admin/allTransactions*/
// var requestData = {
//   "email": "swanad@gmail.com",
//   "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "5a3f3f02f59d666fbc274347e1776406dd3699ab7def639f3b0ff457802375fc28abe1468f450f8d0c47e6ef984bfd8f3939062559ee3395602e55fb48d42eba"
// }
// request.post({url: 'http://localhost:5000/secure/admin/allTransactions',
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


/*http://localhost:5000/secure/admin/addQualifiedSearchesPending*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "amount":"10",
//   "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80"
// }
// request.post({url: 'http://localhost:5000/secure/admin/addQualifiedSearchesPending',
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


/*http://localhost:5000/secure/admin/resetQualifiedSearches*/
// var requestData = {
// }
// request.post({url: 'http://localhost:5000/secure/admin/resetQualifiedSearches',
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


/*http://localhost:5000/secure/admin/deductunQualifiedSearches*/
// var requestData = {
//     "email": "prashant.bitstreet@gmail.com",
//     "amount":"10",
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80"

// }
// request.post({url: 'http://localhost:5000/secure/admin/deductunQualifiedSearches',
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


/*http://localhost:5000/secure/admin/getExpenceTransactions*/
// var requestData = {
//   "email": "retestingdemoapp@gmail.com",
//     "to": '',
//     "from": '1/1/2016',
//     "number":"10",
//     "type":"All",
//   "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "9c5fbff14e4d9297c3df20529a5c4fe0deeb700c9f83add0c71941ab50587825f2d5c27373aef8dac0121144797712749d0ab313628b993fe49a8d370cbe7e1c"

// }
// request.post({url: 'http://localhost:5000/secure/admin/getExpenceTransactions',
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


/*http://localhost:5000/secure/admin/getIncomeTransactions*/
// var requestData = {
//   "email": "retestingdemoapp@gmail.com",
//     "to": '',
//     "from": 0,
//     "number":"10",
//     "payment_mode":"bitcoin",
//   "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "98ab53ff9d381240b70ec8bb650f621c5c1cd1c0b32b35aa38bf0c6994b0c2d12790b9066df5c88d88c9993ec345b8400bb685bcbcdb1d43077cd1e93dc6fe08"

// }
// request.post({url: 'http://localhost:5000/secure/admin/getIncomeTransactions',
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



/*http://localhost:5000/secure/admin/getActiveEmails*/
// var requestData = {
//   "flag": "1",

//   "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "2e07786433122f6742a145d89c08714f1f557e7fea01901ee553097e8ec724cd8d5a8b0b9f91231368449d4c7bada2be40615647aadab338d1f6be51b30ad491"

// }
// request.post({url: 'http://localhost:5000/secure/admin/getActiveEmails',
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



/*http://localhost:5000/secure/admin/userManage*/
// var requestData = {
//   "email": "prashant.bitstreet@gmail.com",
//   "order": "1",
//   "column": "1",
//   "skip": "1",
//   "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//   "signature": "2e07786433122f6742a145d89c08714f1f557e7fea01901ee553097e8ec724cd8d5a8b0b9f91231368449d4c7bada2be40615647aadab338d1f6be51b30ad491"

// }
// request.post({url: 'http://localhost:5000/secure/admin/userManage',
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