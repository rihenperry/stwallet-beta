var file = 'D:/test.json'
var jsondata_wallet = jsonfile.readFileSync(file)
console.dir(jsonfile.readFileSync(file))

// var requestData_register = [{
//	  "first_name": "Swanand",
//	  "last_name" :"Pingle",
//	  "email": "swanand.searchtrade@gmail.com",
//	  "password": "123456",
//	  "confirm_new_password": "123456",
//	  "country": "india",
//	  "flag": "1",
//	  "mobile_number": "123456789",
//	  "referral": "",
//	  "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//	  "signature": "e06a531ca3f187661d4ed84bfd6c624cb0d1fb075640eea7393af939dcefa7df6c46fc00fcbba9c9773e0ff523c15e4508821c5293aa06b4604c00fac5a365a4",
//	},
//    {
//	  "first_name": "prashant",
//	  "last_name" :"tapase",
//	  "email": "prashant.bitstreet2@gmail.com",
//	  "password": "123456",
//	  "confirm_new_password": "123456",
//	  "country": "india",
//	  "flag": "1",
//	  "mobile_number": "123456789",
//	  "referral": "",
//	  "publicKey": "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//	  "signature": "11c8e32254d14cdbbb1bdefbb58dbcdc20a5438b008dbf6a07eb5f6246c694dd44e7a3d1d3d032a73c783dc755808fd1c49945c7494cf772e067ced9815888d7",
//	}]

var length = jsondata_wallet.length

for (var i = 0; i < length; i++) {
  request.post({url: 'http://localhost:5000/secure/register',
    body: jsondata_wallet[i],
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed: \n', err)
      }
      console.log('Test successful!  Server responded with: \n', body)
    })
}

// ========================Admin===========================//

// var requestData = {
// 
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "38c700ea5a694f8f479b7ea7c24b05bcf4ce1d22a8265d6b9a482254d458fb5b24f85a5c49c1166c09d4098eedbde109cba5ad47305ca5ac2157c19d13091fe1",
//    "mode": "bitcoin"
// }
// request.post({url: 'http://localhost:5000/secure/admin/paymentModeCount',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// ========================Search===========================//

// var requestData = {
// 
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "448e895822a2262727376cca9979b4ba90ccfdc8308e5e4e0616d20b4720f56079458db50dbb3313138a6d7a820c75ff265aa8030943faeb75035324a8c000a0",
//    "email" : "swanand@gmail.com",
//    "searches" : '"trans_id":"POOL_1456150879567_973","trans_time":"2016:02:22 08:21:19","sender":"POOL","reciever":"searchUser@searchtrade.com","type":"search_earning","keyword":"hangover","desc":"","payMode":"","discount":"","commission":"","origin_ip":"203.122.55.114","amount":"0.00000100","payout":"0.00000400","usd":435.41,"sgd":611.027834,"app_id":4'
// }
// request.post({url: 'http://localhost:5000/secure/search/recentSearches',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "fba862d8f35f50c5cabf5fb6c7deb0f3dd1c2f0d30afa76b695e0fb4b9b0f51fedd4b674e52fcf771456ef750e9f875bdeae546670a139f572d423c611998903",
//    "email" : "swanand@gmail.com"
// }
// request.post({url: 'http://localhost:5000/secure/search/updateLastHourValue',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "a061802be82efbbff4045d08c85d5e49b33f89bcd97241766119e62a2b6d3f0a9c5c725d6788c4bca351dd0b7bac7190352dae603c1152aded270bd595d8665e",
//    "amount": 10,
//    "email" : "swanand@gmail.com"
// }
// request.post({url: 'http://localhost:5000/secure/search/addunQualifiedSearches',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "a061802be82efbbff4045d08c85d5e49b33f89bcd97241766119e62a2b6d3f0a9c5c725d6788c4bca351dd0b7bac7190352dae603c1152aded270bd595d8665e",
//    "amount": 10,
//    "email" : "swanand@gmail.com"
// }
// request.post({url: 'http://localhost:5000/secure/search/deductQualifiedSearches',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "a061802be82efbbff4045d08c85d5e49b33f89bcd97241766119e62a2b6d3f0a9c5c725d6788c4bca351dd0b7bac7190352dae603c1152aded270bd595d8665e",
//    "amount": 10,
//    "email" : "swanand@gmail.com"
// }
// request.post({url: 'http://localhost:5000/secure/search/deductSearchEarning',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "a061802be82efbbff4045d08c85d5e49b33f89bcd97241766119e62a2b6d3f0a9c5c725d6788c4bca351dd0b7bac7190352dae603c1152aded270bd595d8665e",
//    "amount": 10,
//    "email" : "swanand@gmail.com"
// }
// request.post({url: 'http://localhost:5000/secure/search/addSearchEarning',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// ========================DeviceInfo===========================//

// var requestData = {
//
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "b7e835a2e7ad371e90167c5e9ce2410371d076943c0f716c9b6a91effa5b36bd709b445892a3c009c67caba9790675b484a3311e0e28ea4aab29143bdabddf99",
//    "deviceInfo" :   {"Device_Type": "mobile",
//  "Device_Platform": "android",
//  "Device_ID": "a1f21119ef57bc59",
//  "Device_IMEI": 911380451441087,
//  "Device_Serial": "V00776140945015",
//  "OS_Version": "3.10.57-g9e1c396(2289998)",
//  "OS_API_Level": 23,
//  "BRAND": "google",
//  "MANUFACTURER": "Micromax",
//  "Device_Name": "AQ4501_sprout",
//  "Build_ID": "MRA58N",
//  "Model_and_Product": "Micromax AQ4501 (AQ4501)",
//  "HARDWARE": "sprout",
//  "RELEASE": "6.0",
//  "DISPLAY": "MRA58N",
//  "USER": "android-build",
//  "HOST": "wpds15.hot.corp.google.com",
//  "CPU_ABI": "armeabi-v7a",
//  "CPU_ABI2": "armeabi",
//  "IP": null,
//  "DOMAIN": ""}
//    
//    
// }
// request.post({url: 'http://localhost:5000/api/register',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
//
//    "pubKey" : "8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "e78d2967f9c4490306d8b40ca6bb1c3af849e9d3741b1067b5a58225295b3728f4fa75842b83fde1dceccf00f9e9182850c881e0903dc1e7a57c856a461c4bfe",
//    
// }
// request.post({url: 'http://localhost:5000/api/getPvtKey',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// ========================Transaction===========================//

// var requestData = {
//
//    "email" : "swanand@gmail.com",
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "339f69af8c50dbd926b0db2840c3024a838079e1efb8899b8c4300402ae5c441ec7df4d15e9cb011f0cea87ad2546407ea9dcfb4c5b2c778b97710329ed4e211",
//    "from" : 0,
//    "to" : "",
//    "type" : "",
//    "number" : 10
//    
// }
// request.post({url: 'http://localhost:5000/secure/transactions',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
//
//    "email" : "swanand@gmail.com",
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "fba862d8f35f50c5cabf5fb6c7deb0f3dd1c2f0d30afa76b695e0fb4b9b0f51fedd4b674e52fcf771456ef750e9f875bdeae546670a139f572d423c611998903",
//    
// }
// request.post({url: 'http://localhost:5000/secure/getUsersTotalTransactions',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
//
//    "sender":"swanand@gmail.com",
//    "receiver" : "prashant@gmail.com",
//    "amount": 10,
//    "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//    "signature": "8bfe6762eb0aeea4bc390734e9102f0b2766c5a4bd2de90a10933ae10713b7d2c47208989d512a0e58b455c8270748c89a5e2c7c0923587e0be06486555618b0",
//    "type" : "trade",
//    "desc" : "Test",
//    "keyword" : "search",
//    "payment_mode" : "bitcoin",
//    "discount" : "1",
//    "app_id" : "8",
//    "commision" : "0.01",
//    "origin_ip" : "",
//    "usd" : 12,
//    "sgd" : 21  
// }
// request.post({url: 'http://localhost:5000/secure/insertUserTransaction',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// ========================Pool===========================//

// request.post({url: 'http://localhost:5000/secure/getPoolStats', json:true},
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  console.log('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce",
//  "amount": "1"
// }
// request.post({url: 'http://localhost:5000/secure/addUnsoldKwdRefund',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce",
//  "amount": "1"
// }
// request.post({url: 'http://localhost:5000/secure/deductSearchTradePayout',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce",
//  "amount": "1"
// }
// request.post({url: 'http://localhost:5000/secure/addSearchTradePayout',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce",
//  "amount": "1"
// }
// request.post({url: 'http://localhost:5000/secure/addAppPayout',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce",
//  "amount": "1"
// }
// request.post({url: 'http://localhost:5000/secure/addAnonymousSearches',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/deductNoOfunQualifeidSearches',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/addNoOfunQualifeidSearches',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/deductNoOfQualifeidSearches',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/addNoOfQualifeidSearches',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/deductTotalKeywordOwnerPayout',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/addTotalKeywordOwnerPayout',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/creditPoolAmountKeywords',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/deductPoolAmountKeywords',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/addTocashbackOutflow',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/deductcashbackOutflow',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/decreaseTotalFeesEarning',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/increaseTotalFeesEarning',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })

// var requestData = {
// 
//  "publicKey" :"8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa",
//  "signature": "50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e",
//  "amount": "10"
// }
// request.post({url: 'http://localhost:5000/secure/addToaffiliateOutflow',
// body: requestData,
// json: true,
// headers: {
//        "content-type": "application/json",
// },
// },
// function optionalCallback(err, httpResponse, body) {
//  if (err) {
//    return console.error('Test Failed:', err)
//  }
//  log.info('Test successful!  Server responded with:', body)
// })
