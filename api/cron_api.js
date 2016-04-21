// var numRequests = 6,
//     cur = 1
// function cropapifunc() {
//     if (cur > numRequests) return
// 	request.post({url: 'http://localhost:5000/secure/cron', json:true},
// 	 function optionalCallback(err, httpResponse, body) {
// 	  if (err) {
// 	    return console.error('Test Failed:', err)
// 	  }
// 	  log.info('Test successful!  Server responded with:', body)
//       log.info('cron function executed')
// 	},cur)
//     cur++
//     setTimeout(cropapifunc, 2000)
// }

var request = require('request')

module.exports.cron = function (req, res) {
  log.info('Cron api hitted')

  /*http://localhost:5000/secure/register*/
  var requestData_register = {
    'first_name': 'prashant',
    'last_name': 'tapase',
    'email': 'prashant.bitstreet2@gmail.com',
    'password': '123456',
    'confirm_new_password': '123456',
    'country': 'india',
    'flag': '1',
    'mobile_number': '123456789',
    'referral': '',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '11c8e32254d14cdbbb1bdefbb58dbcdc20a5438b008dbf6a07eb5f6246c694dd44e7a3d1d3d032a73c783dc755808fd1c49945c7494cf772e067ced9815888d7',
  }
  request.post({url: 'http://localhost:5000/secure/register',
    body: requestData_register,
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

  /*http://localhost:5000/secure/login*/
  var requestData_login = {
    'password': '123456',
    'email': 'prashant.bitstreet@gmail.com',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f705db58bf82f21f59ce8011633e9523da66d38fa513865dfa74fa0efe5f7b3b68f1155f074c291623b9a5ebaac4ff52846ceb58408017fb239f2020a278e1bb',
  }
  request.post({url: 'http://localhost:5000/secure/login',
    body: requestData_login,
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

  /*http://localhost:5000/secure/setUserDetails*/
  var requestData_setUserDetails = {
    'email': 'prashant.bitstreet@gmail.com',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f0c74ba483ad72f57317618c6f7ec5e016d57f2f61e8297a515c2a66b34203b45afd8c1ac8be486f606cfb9c9d6d461f758f2a3ff5a5e735e1d86c5949bce95f',
  }
  request.post({url: 'http://localhost:5000/secure/setUserDetails',
    body: requestData_setUserDetails,
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

  /*http://localhost:5000/secure/UserDetails*/
  var requestData_userdetails = {
    'email': 'prashant.bitstreet@gmail.com',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f0c74ba483ad72f57317618c6f7ec5e016d57f2f61e8297a515c2a66b34203b45afd8c1ac8be486f606cfb9c9d6d461f758f2a3ff5a5e735e1d86c5949bce95f',
  }
  request.post({url: 'http://localhost:5000/userdetails',
    body: requestData_userdetails,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Test successful!  Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/currencyPrefrence*/
  var requestData_currencyPrefrence = {
    'email': 'prashant.bitstreet@gmail.com',
    'currency_code': 'INR/Indian Rupee',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '157eb04b40f4bc2729227b34a39b97f5244239fc8a4d0f5af85d3957ddd7543e842fb591d8a6b71fa5e7cc9ac2493807d09c0233b89f3ece1e594659761489ac',
  }
  request.post({url: 'http://localhost:5000/secure/currencyPrefrence',
    body: requestData_currencyPrefrence,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/forgotPassword*/
  var requestData_forgotPassword = {
    'email': 'prashant.bitstreet@gmail.com',
    'flag': '1',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'd1201ba0687ddaee079bf35e8aede5a3b41fb1a971114de1a00b58b5588d49549464e3f3989bb8bc57fc686c3dca3b59f9dcec92d78063092f228ada048a5783',
  }
  request.post({url: 'http://localhost:5000/secure/forgotPassword',
    body: requestData_forgotPassword,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/forgotPassword -- token issue check from mail*/
  var requestData_resetpassword = {
    'email': 'prashant.bitstreet@gmail.com',
    'flag': '1',
    'confirm_password': '123456',
    'password': '123456',
    'auth': '123',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f6f5636edce40960de13d090aabecacfeb34fe9223582b522b334d838c5562d594b4688bc81ba3ab5c6280c6d619cf29fdfbab0ed7e611be78c6caf4fce7cc21',
  }
  request.post({url: 'http://localhost:5000/secure/resetpassword',
    body: requestData_resetpassword,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/changePassword*/
  var requestData_changePassword = {
    'email': 'prashant.bitstreet@gmail.com',
    'old_password': '1234561',
    'new_password': '123456',
    'confirm_new_password': '123456',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f032245da616ff889d231654085255d10e299892389ff7175e6aa580314c35f00968f0b6001073a3ba1801a85d48c836f974d63f40a44ec525d1abbef41e5392',
  }
  request.post({url: 'http://localhost:5000/secure/changePassword',
    body: requestData_changePassword,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/setAppId*/
  var requestData_setAppId = {
    'email': 'prashant.bitstreet@gmail.com',
    'appId': 'asd',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'dcf914b59d1463e9c3c46a208b937d8d927492e20421e4a9fe652b7eefb03d859ebfcbef21dedb04dd3ac75ec43f6c30873cb52ac6d650cce28f87ca265bc361',
  }
  request.post({url: 'http://localhost:5000/secure/setAppId',
    body: requestData_setAppId,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/getAppId*/
  var requestData_getAppId = {
    'email': 'prashant.bitstreet@gmail.com',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f0c74ba483ad72f57317618c6f7ec5e016d57f2f61e8297a515c2a66b34203b45afd8c1ac8be486f606cfb9c9d6d461f758f2a3ff5a5e735e1d86c5949bce95f',
  }
  request.post({url: 'http://localhost:5000/secure/getAppId',
    body: requestData_getAppId,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/creditAmount*/
  var requestData_creditAmount = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/creditAmount',
    body: requestData_creditAmount,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/editProfilePic*/
  var requestData_editProfilePic = {
    'email': 'prashant.bitstreet@gmail.com',
    'profile_pic': '',
    'extension': 'jpg',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f0c74ba483ad72f57317618c6f7ec5e016d57f2f61e8297a515c2a66b34203b45afd8c1ac8be486f606cfb9c9d6d461f758f2a3ff5a5e735e1d86c5949bce95f',
  }
  request.post({url: 'http://localhost:5000/secure/editProfilePic',
    body: requestData_editProfilePic,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductAmount*/
  var requestData_deductAmount = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductAmount',
    body: requestData_deductAmount,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addPurchases*/
  var requestData_addPurchases = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addPurchases',
    body: requestData_addPurchases,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductPurchases*/
  var requestData_deductPurchases = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductPurchases',
    body: requestData_deductPurchases,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addCashback*/
  var requestData_addCashback = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addCashback',
    body: requestData_addCashback,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductCashback*/
  var requestData_deductCashback = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductCashback',
    body: requestData_deductCashback,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addAffEarning*/
  var requestData_addAffEarning = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addAffEarning',
    body: requestData_addAffEarning,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductAffEarning*/
  var requestData_deductAffEarning = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductAffEarning',
    body: requestData_deductAffEarning,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addSales*/
  var requestData_addSales = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addSales',
    body: requestData_addSales,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductSales*/
  var requestData_deductSales = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductSales',
    body: requestData_deductSales,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addTrade*/
  var requestData_addTrade = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addTrade',
    body: requestData_addTrade,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductTrade*/
  var requestData_deductTrade = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductTrade',
    body: requestData_deductTrade,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addTotalKeywordIncome*/
  var requestData_addTotalKeywordIncome = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addTotalKeywordIncome',
    body: requestData_addTotalKeywordIncome,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductTotalKeywordIncome*/
  var requestData_deductTotalKeywordIncome = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductTotalKeywordIncome',
    body: requestData_deductTotalKeywordIncome,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addBlockedPendingWithdrawals*/
  var requestData_addBlockedPendingWithdrawals = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addBlockedPendingWithdrawals',
    body: requestData_addBlockedPendingWithdrawals,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductBlockedPendingWithdrawals*/
  var requestData_deductBlockedPendingWithdrawals = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductBlockedPendingWithdrawals',
    body: requestData_deductBlockedPendingWithdrawals,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addApprovedWithdrawals*/
  var requestData_addApprovedWithdrawals = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addApprovedWithdrawals',
    body: requestData_addApprovedWithdrawals,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductApprovedWithdrawals*/
  var requestData_deductApprovedWithdrawals = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductApprovedWithdrawals',
    body: requestData_deductApprovedWithdrawals,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addTotalAppIncome*/
  var requestData_addTotalAppIncome = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addTotalAppIncome',
    body: requestData_addTotalAppIncome,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/addBlockedForBids*/
  var requestData_addBlockedForBids = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/addBlockedForBids',
    body: requestData_addBlockedForBids,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/deductBlockedForBids*/
  var requestData_deductBlockedForBids = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80',
  }
  request.post({url: 'http://localhost:5000/secure/deductBlockedForBids',
    body: requestData_deductBlockedForBids,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/firstBuy*/
  var requestData_firstBuy = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '1',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'c768a163445c8584729ff70acdf9654feb65326985ef43314ae86fb344a5dd7b5fb358c724c4ff46c15dfee24022594be16417f68d22332aa5a3d924734e5c75',
  }
  request.post({url: 'http://localhost:5000/secure/firstBuy',
    body: requestData_firstBuy,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return log.error('Test Failed: \n', err)
      }
      log.info('Server responded with: \n', body)
    })

  /*http://localhost:5000/secure/admin/allTransactions*/
  var requestData_allTransactions = {
    'email': 'swanad@gmail.com',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '5a3f3f02f59d666fbc274347e1776406dd3699ab7def639f3b0ff457802375fc28abe1468f450f8d0c47e6ef984bfd8f3939062559ee3395602e55fb48d42eba'
  }
  request.post({url: 'http://localhost:5000/secure/admin/allTransactions',
    body: requestData_allTransactions,
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

  /*http://localhost:5000/secure/admin/addQualifiedSearchesPending*/
  var requestData_addQualifiedSearchesPending = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80'
  }
  request.post({url: 'http://localhost:5000/secure/admin/addQualifiedSearchesPending',
    body: requestData_addQualifiedSearchesPending,
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

  /*http://localhost:5000/secure/admin/resetQualifiedSearches*/
  var requestData_resetQualifiedSearches = {
  }
  request.post({url: 'http://localhost:5000/secure/admin/resetQualifiedSearches',
    body: requestData_resetQualifiedSearches,
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

  /*http://localhost:5000/secure/admin/deductunQualifiedSearches*/
  var requestData_deductunQualifiedSearches = {
    'email': 'prashant.bitstreet@gmail.com',
    'amount': '10',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'ff57a22737092dc340403e95ba84dab3583f109c5ce6488234b088adf9dbb7b57ad2bf1433396b8b06d52c2bf6c3d9a0c88729e93ef6784e204dcc0915519e80'

  }
  request.post({url: 'http://localhost:5000/secure/admin/deductunQualifiedSearches',
    body: requestData_deductunQualifiedSearches,
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

  /*http://localhost:5000/secure/admin/getExpenceTransactions*/
  var requestData_getExpenceTransactions = {
    'email': 'retestingdemoapp@gmail.com',
    'to': '',
    'from': '1/1/2016',
    'number': '10',
    'type': 'All',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '9c5fbff14e4d9297c3df20529a5c4fe0deeb700c9f83add0c71941ab50587825f2d5c27373aef8dac0121144797712749d0ab313628b993fe49a8d370cbe7e1c'

  }
  request.post({url: 'http://localhost:5000/secure/admin/getExpenceTransactions',
    body: requestData_getExpenceTransactions,
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

  /*http://localhost:5000/secure/admin/getIncomeTransactions*/
  var requestData_getIncomeTransactions = {
    'email': 'retestingdemoapp@gmail.com',
    'to': '',
    'from': 0,
    'number': '10',
    'payment_mode': 'bitcoin',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '98ab53ff9d381240b70ec8bb650f621c5c1cd1c0b32b35aa38bf0c6994b0c2d12790b9066df5c88d88c9993ec345b8400bb685bcbcdb1d43077cd1e93dc6fe08'

  }
  request.post({url: 'http://localhost:5000/secure/admin/getIncomeTransactions',
    body: requestData_getIncomeTransactions,
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

  /*http://localhost:5000/secure/admin/getActiveEmails*/
  var requestData_getActiveEmails = {
    'flag': '1',

    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '2e07786433122f6742a145d89c08714f1f557e7fea01901ee553097e8ec724cd8d5a8b0b9f91231368449d4c7bada2be40615647aadab338d1f6be51b30ad491'

  }
  request.post({url: 'http://localhost:5000/secure/admin/getActiveEmails',
    body: requestData_getActiveEmails,
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

  /*http://localhost:5000/secure/admin/userManage*/
  var requestData_userManage = {
    'email': 'prashant.bitstreet@gmail.com',
    'order': '1',
    'column': '1',
    'skip': '1',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '2e07786433122f6742a145d89c08714f1f557e7fea01901ee553097e8ec724cd8d5a8b0b9f91231368449d4c7bada2be40615647aadab338d1f6be51b30ad491'

  }
  request.post({url: 'http://localhost:5000/secure/admin/userManage',
    body: requestData_userManage,
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

  /*http://localhost:5000/secure/admin/userKwdPurchaseTrans*/
  var requestData_userKwdPurchaseTrans = {
    'email': 'retestingdemoapp@gmail.com',
    'from': '1/1/2016',
    'to': '',
    'number': 10,
    'mode': 'All',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '5ec5b9b30bd0b8b339cfa8cdb00ca8b5588bf12755bf94dde529e146882c83d8dc0dc5bb064462a74f1f231452c529fa416a946ddf4261793ecb1791f51cdd66'
  }
  request.post({url: 'http://localhost:5000/secure/admin/userKwdPurchaseTrans',
    body: requestData_userKwdPurchaseTrans,
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

  // ========================Admin===========================//

  var requestData_paymentModeCount = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '38c700ea5a694f8f479b7ea7c24b05bcf4ce1d22a8265d6b9a482254d458fb5b24f85a5c49c1166c09d4098eedbde109cba5ad47305ca5ac2157c19d13091fe1',
    'mode': 'bitcoin'
  }
  request.post({url: 'http://localhost:5000/secure/admin/paymentModeCount',
    body: requestData_paymentModeCount,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_recentSearches = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '448e895822a2262727376cca9979b4ba90ccfdc8308e5e4e0616d20b4720f56079458db50dbb3313138a6d7a820c75ff265aa8030943faeb75035324a8c000a0',
    'email': 'swanand@gmail.com',
    'searches': '"trans_id":"POOL_1456150879567_973","trans_time":"2016:02:22 08:21:19","sender":"POOL","reciever":"searchUser@searchtrade.com","type":"search_earning","keyword":"hangover","desc":"","payMode":"","discount":"","commission":"","origin_ip":"203.122.55.114","amount":"0.00000100","payout":"0.00000400","usd":435.41,"sgd":611.027834,"app_id":4'
  }
  request.post({url: 'http://localhost:5000/secure/search/recentSearches',
    body: requestData_recentSearches,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_recentSearches = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'fba862d8f35f50c5cabf5fb6c7deb0f3dd1c2f0d30afa76b695e0fb4b9b0f51fedd4b674e52fcf771456ef750e9f875bdeae546670a139f572d423c611998903',
    'email': 'swanand@gmail.com'
  }
  request.post({url: 'http://localhost:5000/secure/search/updateLastHourValue',
    body: requestData_recentSearches,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addunQualifiedSearches = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'a061802be82efbbff4045d08c85d5e49b33f89bcd97241766119e62a2b6d3f0a9c5c725d6788c4bca351dd0b7bac7190352dae603c1152aded270bd595d8665e',
    'amount': 10,
    'email': 'swanand@gmail.com'
  }
  request.post({url: 'http://localhost:5000/secure/search/addunQualifiedSearches',
    body: requestData_addunQualifiedSearches,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_deductQualifiedSearches = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'a061802be82efbbff4045d08c85d5e49b33f89bcd97241766119e62a2b6d3f0a9c5c725d6788c4bca351dd0b7bac7190352dae603c1152aded270bd595d8665e',
    'amount': 10,
    'email': 'swanand@gmail.com'
  }
  request.post({url: 'http://localhost:5000/secure/search/deductQualifiedSearches',
    body: requestData_deductQualifiedSearches,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_deductSearchEarning = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'a061802be82efbbff4045d08c85d5e49b33f89bcd97241766119e62a2b6d3f0a9c5c725d6788c4bca351dd0b7bac7190352dae603c1152aded270bd595d8665e',
    'amount': 10,
    'email': 'swanand@gmail.com'
  }
  request.post({url: 'http://localhost:5000/secure/search/deductSearchEarning',
    body: requestData_deductSearchEarning,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addSearchEarning = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'a061802be82efbbff4045d08c85d5e49b33f89bcd97241766119e62a2b6d3f0a9c5c725d6788c4bca351dd0b7bac7190352dae603c1152aded270bd595d8665e',
    'amount': 10,
    'email': 'swanand@gmail.com'
  }
  request.post({url: 'http://localhost:5000/secure/search/addSearchEarning',
    body: requestData_addSearchEarning,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  // ========================DeviceInfo===========================//

  var requestData_register = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'b7e835a2e7ad371e90167c5e9ce2410371d076943c0f716c9b6a91effa5b36bd709b445892a3c009c67caba9790675b484a3311e0e28ea4aab29143bdabddf99',
    'deviceInfo': {'Device_Type': 'mobile',
      'Device_Platform': 'android',
      'Device_ID': 'a1f21119ef57bc59',
      'Device_IMEI': 911380451441087,
      'Device_Serial': 'V00776140945015',
      'OS_Version': '3.10.57-g9e1c396(2289998)',
      'OS_API_Level': 23,
      'BRAND': 'google',
      'MANUFACTURER': 'Micromax',
      'Device_Name': 'AQ4501_sprout',
      'Build_ID': 'MRA58N',
      'Model_and_Product': 'Micromax AQ4501 (AQ4501)',
      'HARDWARE': 'sprout',
      'RELEASE': '6.0',
      'DISPLAY': 'MRA58N',
      'USER': 'android-build',
      'HOST': 'wpds15.hot.corp.google.com',
      'CPU_ABI': 'armeabi-v7a',
      'CPU_ABI2': 'armeabi',
      'IP': null,
    'DOMAIN': ''}


  }
  request.post({url: 'http://localhost:5000/api/register',
    body: requestData_register,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_getPvtKey = {
    'pubKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'e78d2967f9c4490306d8b40ca6bb1c3af849e9d3741b1067b5a58225295b3728f4fa75842b83fde1dceccf00f9e9182850c881e0903dc1e7a57c856a461c4bfe',

  }
  request.post({url: 'http://localhost:5000/api/getPvtKey',
    body: requestData_getPvtKey,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  // ========================Transaction===========================//

  var requestData_transactions = {
    'email': 'swanand@gmail.com',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '339f69af8c50dbd926b0db2840c3024a838079e1efb8899b8c4300402ae5c441ec7df4d15e9cb011f0cea87ad2546407ea9dcfb4c5b2c778b97710329ed4e211',
    'from': 0,
    'to': '',
    'type': '',
    'number': 10

  }
  request.post({url: 'http://localhost:5000/secure/transactions',
    body: requestData_transactions,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_getUsersTotalTransactions = {
    'email': 'swanand@gmail.com',
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'fba862d8f35f50c5cabf5fb6c7deb0f3dd1c2f0d30afa76b695e0fb4b9b0f51fedd4b674e52fcf771456ef750e9f875bdeae546670a139f572d423c611998903',

  }
  request.post({url: 'http://localhost:5000/secure/getUsersTotalTransactions',
    body: requestData_getUsersTotalTransactions,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_insertUserTransaction = {
    'sender': 'swanand@gmail.com',
    'receiver': 'prashant@gmail.com',
    'amount': 10,
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '8bfe6762eb0aeea4bc390734e9102f0b2766c5a4bd2de90a10933ae10713b7d2c47208989d512a0e58b455c8270748c89a5e2c7c0923587e0be06486555618b0',
    'type': 'trade',
    'desc': 'Test',
    'keyword': 'search',
    'payment_mode': 'bitcoin',
    'discount': '1',
    'app_id': '8',
    'commision': '0.01',
    'origin_ip': '',
    'usd': 12,
    'sgd': 21
  }
  request.post({url: 'http://localhost:5000/secure/insertUserTransaction',
    body: requestData_insertUserTransaction,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  // ========================Pool===========================//

  request.post({url: 'http://localhost:5000/secure/getPoolStats', json: true},
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      console.log('Test successful!  Server responded with:', body)
    })

  var requestData_addUnsoldKwdRefund = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce',
    'amount': '1'
  }
  request.post({url: 'http://localhost:5000/secure/addUnsoldKwdRefund',
    body: requestData_addUnsoldKwdRefund,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_deductSearchTradePayout = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce',
    'amount': '1'
  }
  request.post({url: 'http://localhost:5000/secure/deductSearchTradePayout',
    body: requestData_deductSearchTradePayout,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addSearchTradePayout = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce',
    'amount': '1'
  }
  request.post({url: 'http://localhost:5000/secure/addSearchTradePayout',
    body: requestData_addSearchTradePayout,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addAppPayout = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce',
    'amount': '1'
  }
  request.post({url: 'http://localhost:5000/secure/addAppPayout',
    body: requestData_addAppPayout,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addAnonymousSearches = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': 'f217f11ab5df130c54ee1869eb806a174bf6f1fb3c569db7333c737e9cf6645cf69d28eb05dc9ef61d329e51dbe566b1b692c12336924c73cb3aa66adb4e4dce',
    'amount': '1'
  }
  request.post({url: 'http://localhost:5000/secure/addAnonymousSearches',
    body: requestData_addAnonymousSearches,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_deductNoOfunQualifeidSearches = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/deductNoOfunQualifeidSearches',
    body: requestData_deductNoOfunQualifeidSearches,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addNoOfunQualifeidSearches = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/addNoOfunQualifeidSearches',
    body: requestData_addNoOfunQualifeidSearches,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_deductNoOfQualifeidSearches = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/deductNoOfQualifeidSearches',
    body: requestData_deductNoOfQualifeidSearches,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addNoOfQualifeidSearches = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/addNoOfQualifeidSearches',
    body: requestData_addNoOfQualifeidSearches,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_deductTotalKeywordOwnerPayout = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/deductTotalKeywordOwnerPayout',
    body: requestData_deductTotalKeywordOwnerPayout,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addTotalKeywordOwnerPayoutv = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/addTotalKeywordOwnerPayout',
    body: requestData_addTotalKeywordOwnerPayoutv,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_creditPoolAmountKeywords = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/creditPoolAmountKeywords',
    body: requestData_creditPoolAmountKeywords,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_deductPoolAmountKeywords = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/deductPoolAmountKeywords',
    body: requestData_deductPoolAmountKeywords,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addTocashbackOutflow = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/addTocashbackOutflow',
    body: requestData_addTocashbackOutflow,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_deductcashbackOutflow = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/deductcashbackOutflow',
    body: requestData_deductcashbackOutflow,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_decreaseTotalFeesEarning = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/decreaseTotalFeesEarning',
    body: requestData_decreaseTotalFeesEarning,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_increaseTotalFeesEarning = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/increaseTotalFeesEarning',
    body: requestData_increaseTotalFeesEarning,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })

  var requestData_addToaffiliateOutflow = {
    'publicKey': '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa',
    'signature': '50d2ea041cb5c37575ff91d749c6b8b77098ac98656a5f5a276fb83809f7f1fd5c7789aa66babad101f5db68c2dce9e5f1df2525b3913d1c1272066478712b5e',
    'amount': '10'
  }
  request.post({url: 'http://localhost:5000/secure/addToaffiliateOutflow',
    body: requestData_addToaffiliateOutflow,
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('Test Failed:', err)
      }
      log.info('Test successful!  Server responded with:', body)
    })
}
