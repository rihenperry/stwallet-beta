/*global require, module, console */
/*jslint node: true */
'use strict'

// Pages
// var poolSchema	  	= require('../models/poolSchema.js')
var deviceSchema = require('../models/deviceInfoSchema.js'), // Device Schema
  transSchema = require('../models/transaction_Schema.js'), // Transaction Schema
  userSchema = require('../models/userSchema.js'), // User Schema
  crypt = require('../config/crypt'), // Crypt Connectivity.
  master = require('../config/masterfunc.js'), // Master Functions
  logger = require('../config/w_config.js'),
  log = logger()

// ========================= Export Functions ========================= //

/*Add Qualified Searches Pending*/
module.exports.addQualifiedSearchesPending = function (req, res) {
  log.info('Page Name: admin.js')
  log.info('API Name : addQualifiedSearchesPending')
  log.info('Add Qualified Search Pending API Hitted')
  log.info('Parameters Receiving..')

  // Validation
  master.validation(req, function (retVal) {
    if (retVal[0].error == true || retVal[0].error == 'true') {
      master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message)
      return
    }

    var query = {'email': retVal[0].email}

    // Find User
    userSchema.find(query, function (err, result) {
      if (err) {
        log.error(err)
        return err
      }

      if (result == null || result == '') // Email Not Found
      {
        log.info(retVal[0].email + ' Not Registered')
        master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.')
        return
      }

      var amount = parseFloat(retVal[0].amount)

      log.info('Add Qualified Search Value : ' + amount)

      var updateDataQuery = {$inc: {'no_of_qualified_searches_pending': amount, 'total_qualified_searches': -amount}}

      userSchema.findOneAndUpdate(query, updateDataQuery, function (err, retVals) {
        if (err) {throw err}

        log.info('Qualified Search Value ' + amount + ' Added For : ' + retVal[0].email)

        master.sendResponse(req, res, 200, -1, 'Success')
      })
    })
  })
}

/* Deduct Unqualified Searches */
module.exports.deductunQualifiedSearches = function (req, res) {
  log.info('Page Name: admin.js')
  log.info('API Name : deductunQualifiedSearches')
  log.info('Deduct Unqualified Search API Hitted')
  log.info('Parameters Receiving..')

  // validation
  master.validation(req, function (retVal) {
    if (retVal[0].error == true || retVal[0].error == 'true') {
      master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message)
      return
    }

    var query = {'email': retVal[0].email}

    // find user
    userSchema.find(query, function (err, result) {
      if (err) {
        log.error(err)
        return err
      }

      if (result == null || result == '') // Email Not Found
      {
        log.info(retVal[0].email + ' Not Registered')
        master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.')
        return
      }

      var amount = -parseFloat(retVal[0].amount)

      log.info('Add Qualified Search Value : ' + amount)

      var updateDataQuery = {$inc: {'no_of_unQualified_searches': amount}}

      userSchema.findOneAndUpdate(query, updateDataQuery, function (err, retVals) {
        if (err) {throw err}

        log.info('Qualified Search Value ' + amount + ' Added For : ' + retVal[0].email)

        master.sendResponse(req, res, 200, -1, 'Success')
      })
    })
  })
}

/* Reset Total Number Of Qualified Searches */
module.exports.resetTotalNumberOfQualifiedSearches = function (req, res) {
  log.info('Page Name: admin.js')
  log.info('API Name : resetTotalNumberOfQualifiedSearches')
  log.info('Reset Qualified Searches API Hitted')
  log.info('No Parameters Receiving...')

  var value = true

  // Get Pool Results Function
  var query = {$set: {'no_of_qualified_searches_pending': 40, 'last_hour_search_time': 0, 'total_no_of_searches_in_last_hour': 0}}

  userSchema.update({'active': 1}, query, {multi: true}).exec(function (err, retVal) {
    if (err) {throw err;}

    // Successfully Updated
    if (retVal) {
      log.info('Qualified Searches ReSetted Successfully')
      master.sendResponse(req, res, 200, -1, 'Success')
    }

    // Error In Updating Pool Fees
    else {
      log.info('Failed to Reset Searches')
      master.sendResponse(req, res, 200, 5, 'Database Error')
    }
  })
}

/* User Manage */
module.exports.userManage = function (req, res) {
  log.info('Page Name: admin.js')
  log.info('API Name : userManage')
  log.info('User Manage API Hitted')
  log.info('No Parameters Receiving...')

  var email = req.body.email
  var first_name = req.body.first_name
  var last_name = req.body.last_name
  var skip = req.body.skip
  var order = req.body.order
  var column = req.body.column
  var flag = req.body.flag
  var publicKey = req.body.publicKey
  var signature = req.body.signature

  log.info('PublicKey  : ' + publicKey)
  log.info('Signature  : ' + signature)
  log.info('Email : ' + email)
  log.info('First Name : ' + first_name)
  log.info('Last Name : ' + last_name)
  log.info('Skip : ' + skip)
  log.info('Order : ' + order)
  log.info('Column : ' + column)
  log.info('Flag : ' + flag)

  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  var query = {'publicKey': publicKey}
  // var text = 'email='+encodeURIComponent(email)+'&publicKey='+encodeURIComponent(publicKey)
  var text = 'email=' + email + '&first_name=' + first_name + '&last_name=' + last_name + '&publicKey=' + publicKey

  // Validate Signature
  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    if (email == '' || email == undefined || email == null) {
      if (first_name == '' || first_name == undefined || first_name == null) {
        if (last_name == '' || last_name == undefined || last_name == null) {
          query = {}
        } else {
          var ucfirst_last_name = last_name.charAt(0).toUpperCase() + last_name.substr(1).toLowerCase()
          query = {$or: [{'last_name': { $regex: last_name.toLowerCase() }}, {'last_name': { $regex: ucfirst_last_name }}]}
        }
      } else {
        var ucfirst_first_name = first_name.charAt(0).toUpperCase() + first_name.substr(1).toLowerCase()

        if (last_name == '' || last_name == undefined || last_name == null) {
          query = {$or: [{'first_name': { $regex: first_name.toLowerCase() }}, {'first_name': { $regex: ucfirst_first_name }}]}
        } else {
          var ucfirst_last_name = last_name.charAt(0).toUpperCase() + last_name.substr(1).toLowerCase()
          query = {$or: [{'last_name': {$regex: last_name.toLowerCase()}}, {'last_name': { $regex: ucfirst_last_name}}, {'first_name': { $regex: first_name.toLowerCase() }}, {'first_name': { $regex: ucfirst_first_name}}]}
        }
      }
    } else {
      email = email.toLowerCase()

      if (first_name == '' || first_name == undefined || first_name == null) {
        if (last_name == '' || last_name == undefined || last_name == null) {
          query = {'email': { $regex: email }}
        } else {
          var ucfirst_last_name = last_name.charAt(0).toUpperCase() + last_name.substr(1).toLowerCase()
          query = {$or: [{'last_name': { $regex: last_name.toLowerCase() }}, {'last_name': { $regex: ucfirst_last_name }}, {'email': { $regex: email }}]}
        }
      } else {
        var ucfirst_first_name = first_name.charAt(0).toUpperCase() + first_name.substr(1).toLowerCase()

        if (last_name == '' || last_name == undefined || last_name == null) {
          query = {$or: [{'email': { $regex: email }}, {'first_name': { $regex: first_name.toLowerCase() }}, {'first_name': { $regex: ucfirst_first_name }}]}
        } else {
          var ucfirst_last_name = last_name.charAt(0).toUpperCase() + last_name.substr(1).toLowerCase()
          query = {$or: [{'last_name': {$regex: last_name.toLowerCase()}}, {'last_name': { $regex: ucfirst_last_name}}, {'first_name': { $regex: first_name.toLowerCase() }}, {'first_name': { $regex: ucfirst_first_name}}, {'email': { $regex: email }}]}
        }
      }
    }

    if (order == '' || order == undefined || order == null) {
      order = 1
    }

    order = parseInt(order)
    skip = parseInt(skip)

    var sort

    if (column == 'email') {
      sort = {'email': order}
    }

    if (column == 'first_name') {
      sort = {'first_name': order}
    }

    if (column == 'deposit') {
      sort = {'deposit': order}
    }

    if (column == 'active') {
      sort = {'active': order}
    }

    var selectQuery = {'email': 1, 'first_name': 1, 'last_name': 1, 'deposit': 1, 'active': 1}

    userSchema.count(query).lean().exec(function (err, result) {
      if (err) {
        log.error(err)
        master.sendResponse(req, res, 200, 5, 'Database Error')
        return
      }

      // Successfully Fetched
      if (result == '' || result == undefined || result == 0) {
        log.info('No Results Found')
        master.sendResponse(req, res, 200, -1, 'No Results')
        return
      }

      if (flag == '1' || flag == 1) {
        log.info(result + ' Results Found')
        master.sendResponse(req, res, 200, -1, result)
        return
      } else {
        userSchema.find(query).select(selectQuery).sort(sort).skip(skip).limit(10).lean().exec(function (err, results) {
          if (err) {
            log.error(err)
            master.sendResponse(req, res, 200, 5, 'Database Error')
            return
          }

          // Successfully Fetched
          if (results == '' || results == undefined || results.length == 0) {
            log.info('No Results Found')
            master.sendResponse(req, res, 200, -1, 'No Results')
            return
          }

          log.info('Transactions Found Successfully')
          master.sendResponse(req, res, 200, -1, {result: results,count: result})
        })
      }
    })
  })
}

/* Get Expence Transactions */
module.exports.getExpenceTransactions = function(req, res) {

	log.info('Page Name: admin.js');
	log.info('API Name : getExpenceTransactions');
	log.info('Get Expence Transaction Accessed');
	log.info('Parameters Receiving..');

	var vars = req.body;
	var email = req.body.email;
	var from = req.body.from;
	var to = req.body.to;
	var n = req.body.number;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	var type = vars.type;
	
	log.info('Email : '+email);
	log.info('From Date : '+from);
	log.info('To Date: '+to);
	log.info('N (Number Of Tansactions) :'+n);
	log.info('Type :'+type);
	log.info('Public Key :'+publicKey);
	log.info('Signature :'+signature);
	
	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Checking Transaction Numbers	
	if(n=="" || n==undefined)
	{
		n = 0;
	}

	// Number of Transactions
	else if(isNaN(n))
	{
		log.info('Number is Wrong Number');
		master.sendResponse(req, res, 200, 12, "Wrong Input");
		return;
	}

	// Sorting and Getting Today's Date, Month, Year
	var dateForm = new Date(); 
	var tdate 	 = dateForm.getDate(); 
	tdate 		 = parseInt(tdate);
	var tmonth   = dateForm.getMonth(); 
	tmonth 		 = parseInt(tmonth);
	tmonth++;
	var tyear 	 = dateForm.getFullYear(); 
	tyear 		 = parseInt(tyear);	
	var todaysDate = tdate+'/'+tmonth+'/'+tyear;
	var checkTodaysDate = new Date(''+tmonth+'/'+tdate+'/'+tyear+'');
	checkTodaysDate = checkTodaysDate.getTime();
	
	// Validate From Date
	if(from == "" || from == undefined)
	{
		from = 0;
	}
	else
	{
		var month = from.substring(0, 2); 
		var day   = from.substring(3, 5); 
		var year  = from.substring(6, 10); 
		
		var d = new Date(''+month+'/'+day+'/'+year+' 00:00:00');
		var milisec = d.getTime();
		from = milisec;
	}
	
	// Validate last Limit
	if(to === undefined || to.length<=0 || to == null )
	{
		to = new Date().getTime();
	}
	else
	{
		var month = to.substring(0, 2); 
		var day = to.substring(3, 5); 
		var year = to.substring(6, 10); 
		
		var enteredToDate = day+'/'+month+'/'+year;
		
		if(enteredToDate == todaysDate)
		{
			to = new Date().getTime();
		}
		else
		{
			var d = new Date(''+month+'/'+day+'/'+year+' 23:59:59');
			var milisec = d.getTime();
			to = milisec;
		}	
	}
	
	n = parseInt(n);

	var query = {'publicKey': publicKey};
    
    //var text = "email="+encodeURIComponent(email)+"&from="+encodeURIComponent(vars.from)+"&to="+encodeURIComponent(vars.to)+"&number="+encodeURIComponent(n)+"&type="+encodeURIComponent(type)+"&publicKey="+encodeURIComponent(publicKey);
    var text = "email="+email+"&from="+vars.from+"&to="+vars.to+"&number="+n+"&type="+type+"&publicKey="+publicKey;

	// Validate Signature
	master.secureAuth(query, text, signature, function (result){

		if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

		log.info('Milisec Value of From Date :'+from);
		log.info('Milisec Value of To Date :'+to); 
		
		if(type == "" || type == undefined || type == 'All')
		{
			var subQuery = {$or:[{"type":"affiliate_earnings"},{"type":"first_buy_cashback"},{"type":"search_referral_earnings"},{"type":"search_earnings"},{"type":"App Earning"},{"type":"keyword_ownership_earning"}]}
		
			if(email=="" || email==undefined || email==null)
			{
				query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}},subQuery]}]};
			}
			
			else
			{
				query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {$or:[{"sender":email},{"receiver":email}]}, subQuery]};
			}

		}
		
		else
		{	
			if(email=="" || email==undefined || email==null)
			{
				query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {"type":type}]};
			}
			
			else
			{
				query = {$and:[{$and:[{"time":{$gte:from}},{"time":{$lte:to}}]}, {$or:[{"sender":email},{"receiver":email}]}, {"type":type}]};
			}
			
		}

		if(n==0)
		{
			// Get Transaction
			transSchema.find(query).lean().exec(function(err, retTrans){
								
				if (err)
				{
					log.error(err);
					master.sendResponse(req, res, 200, 5, "Database Error");
					return;
				}
								
				// No Transaction
				if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
				{	
					log.info('No Transactions');
					master.sendResponse(req, res, 200, -1, 'No Transactions');
					return;
				}
				
				// Transactions Found
				log.info('Transaction Found Successfully');
				master.sendResponse(req, res, 200, -1, retTrans);
				return;
				
			});

		}
		else
		{
			// Get Transaction
			transSchema.find(query).limit(n).lean().exec(function(err, retTrans){
			
				if (err)
				{
					log.error(err);
					master.sendResponse(req, res, 200, 5, "Database Error");
					return;
				}
				
				// No Transaction
				if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0)
				{	
					log.info('No Transactions');
					master.sendResponse(req, res, 200, -1, 'No Transactions');
					return;
				}
				
				// Transactions Found
				log.info('Transaction Found Successfully');
				master.sendResponse(req, res, 200, -1, retTrans);
				return;
			
			})
		}
    		
	});

}

/* Get Active Emails */
module.exports.getActiveEmails = function (req, res) {
  log.info('Page Name: admin.js.')
  log.info('API Name : getActiveEmails')
  log.info('Get All Transactions API Hitted')
  log.info('Parameters Receiving...')

  var flag = req.body.flag
  var publicKey = req.body.publicKey
  var signature = req.body.signature

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Flag
  if (!(master.validateParameter(flag, 'flag'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  var query = {'publicKey': publicKey}

  // var text = "flag="+encodeURIComponent(flag)+"&publicKey="+encodeURIComponent(publicKey)
  var text = 'flag=' + flag + '&publicKey=' + publicKey

  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    // For Active Users Only
    if (flag == 1 || flag == '1') {
      userSchema.find({active: 1}).select({'email': 1, 'first_name': 1, 'last_name': 1}).lean().exec(function (err, result) {
        if (err) {
          log.error(err)
          master.sendResponce(req, res, 200, 5, 'Datbase Error')
          return
        }

        if (result == null || result == undefined || result == '') {
          log.info('No Active Emails Found')
          master.sendResponse(req, res, 200, 9, 'No Result')
          return
        }

        log.info(result.length + ' Active Emails Found')
        master.sendResponse(req, res, 200, -1, result)
        return
      })
    }

    // For Other.. Data Only
    if (flag == 2 || flag == '2') {
      userSchema.find({}).select({'email': 1, 'first_name': 1, 'last_name': 1, 'deposit': 1, 'active': 1}).lean().exec(function (err, result) {
        if (err) {
          log.error(err)
          master.sendResponce(req, res, 200, 5, 'Datbase Error')
          return
        }

        if (result == '' || result == undefined || result.length <= 0) {
          log.info('No Active Emails Found')
          sendResponse(req, res, 200, 9, 'No Result')
          return
        }

        log.info(result.length + ' Results Found')
        master.sendResponse(req, res, 200, -1, result)
        return
      })
    }

    // For Other.. Data Only
    if (flag == 4 || flag == '4') {
      var email = req.body.email
      var query = {'email': { $regex: email }}

      userSchema.count(query).exec(function (err, result) {
        if (err) {
          log.error(err)
          master.sendResponce(req, res, 200, 5, 'Datbase Error')
          return
        }

        if (result == '' || result == undefined || result <= 0) {
          log.info('No Emails Found')
          master.sendResponse(req, res, 200, 9, 'No Result')
          return
        }

        log.info(result + ' Results Found')
        master.sendResponse(req, res, 200, -1, result)
      })
    }

    // Active Users Count
    if (flag == 5 || flag == '5' || flag == 3 || flag == '3') {
      var query

      if (flag == 3 || flag == '3') {
        query = {}
      }

      if (flag == 5 || flag == '5') {
        query = {active: 1}
      }

      userSchema.count(query).exec(function (err, result) {
        if (err) {
          log.error(err)
          master.sendResponce(req, res, 200, 5, 'Datbase Error')
          return
        }

        if (result == '' || result == undefined || result <= 0) {
          log.info('No Emails Found')
          master.sendResponse(req, res, 200, 9, 'No Result')
          return
        }

        log.info(result + ' Results Found')
        master.sendResponse(req, res, 200, -1, result)
      })
    }
  })
}

/* Get Income Transactions */
module.exports.getIncomeTransactions = function (req, res) {
  log.info('Page Name: admin.js')
  log.info('API Name : getIncomeTransactions')
  log.info('Get Income Transaction Accessed')
  log.info('Parameters Receiving..')

  var vars = req.body
  var email = req.body.email
  var from = req.body.from
  var to = req.body.to
  var n = req.body.number
  var publicKey = req.body.publicKey
  var signature = req.body.signature
  var payment_mode = vars.payment_mode

  log.info('Email : ' + email)
  log.info('From Date : ' + from)
  log.info('To Date: ' + to)
  log.info('N (Number Of Tansactions) :' + n)
  log.info('Public Key :' + publicKey)
  log.info('Signature :' + signature)
  log.info('Payment Mode : ' + payment_mode)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Checking Transaction Value
  if (n == '' || n == undefined) {
    n = 0
  }

  // Number of Transactions
  else if (isNaN(n)) {
    log.info('Number is Blank')
    n = 0
  }

  // Sorting and Getting Today's Date, Month, Year
  var dateForm = new Date()
  var tdate = dateForm.getDate()
  tdate = parseInt(tdate)
  var tmonth = dateForm.getMonth()
  tmonth = parseInt(tmonth)
  tmonth++
  var tyear = dateForm.getFullYear()
  tyear = parseInt(tyear)
  var todaysDate = tdate + '/' + tmonth + '/' + tyear
  var checkTodaysDate = new Date('' + tmonth + '/' + tdate + '/' + tyear + '')
  checkTodaysDate = checkTodaysDate.getTime()

  // Validate From Date
  if (from == '' || from == undefined) {
    from = 0
  } else {
    var month = from.substring(0, 2)
    var day = from.substring(3, 5)
    var year = from.substring(6, 10)

    var d = new Date('' + month + '/' + day + '/' + year + ' 00:00:00')
    var milisec = d.getTime()
    from = milisec
  }

  // Validate last Limit
  if (to === undefined || to.length <= 0 || to == null) {
    to = new Date().getTime()
  } else {
    var month = to.substring(0, 2)
    var day = to.substring(3, 5)
    var year = to.substring(6, 10)

    var enteredToDate = day + '/' + month + '/' + year

    if (enteredToDate == todaysDate) {
      to = new Date().getTime()
    } else {
      var d = new Date('' + month + '/' + day + '/' + year + ' 23:59:59')
      var milisec = d.getTime()
      to = milisec
    }
  }

  var n = parseInt(n)

  var query = {'publicKey': publicKey}

  // var text = "email="+encodeURIComponent(email)+"&from="+encodeURIComponent(vars.from)+"&to="+encodeURIComponent(vars.to)+"&number="+encodeURIComponent(n)+"&payment_mode="+encodeURIComponent(payment_mode)+"&publicKey="+encodeURIComponent(publicKey)
  var text = 'email=' + email + '&from=' + vars.from + '&to=' + vars.to + '&number=' + n + '&payment_mode=' + payment_mode + '&publicKey=' + publicKey

  // Validate signature
  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    log.info('Milisec Value of From Date :' + from)
    log.info('Milisec Value of To Date :' + to)

    if (payment_mode == '' || payment_mode == undefined || payment_mode == 'All') {
      if (email == '' || email == undefined || email == null) {
        query = {$and: [{$and: [{'time': {$gte: from}}, {'time': {$lte: to}}]}, {'type': 'keyword_purchase'}]}
      } else {
        query = {$and: [{$and: [{'time': {$gte: from}}, {'time': {$lte: to}}]}, {$or: [{'sender': email}, {'receiver': email}]}, {'type': 'keyword_purchase'}]}
      }
    }

    // Payment Mode is not defind
    else {
      if (email == '' || email == undefined || email == null) {
        if (payment_mode == 'bitcoin') {
          query = {$and: [{$and: [{'time': {$gte: from}}, {'time': {$lte: to}}]}, {'payment_mode': {$ne: 'paypal'}}, {'type': 'keyword_purchase'}]}
        } else {
          query = {$and: [{$and: [{'time': {$gte: from}}, {'time': {$lte: to}}]}, {'payment_mode': payment_mode}, {'type': 'keyword_purchase'}]}
        }
      } else {
        if (payment_mode == 'bitcoin') {
          query = {$and: [{$and: [{'time': {$gte: from}}, {'time': {$lte: to}}]}, {$or: [{'sender': email}, {'receiver': email}]}, {'payment_mode': {$ne: 'paypal'}}, {'type': 'keyword_purchase'}]}
        } else {
          query = {$and: [{$and: [{'time': {$gte: from}}, {'time': {$lte: to}}]}, {$or: [{'sender': email}, {'receiver': email}]}, {'payment_mode': payment_mode}, {'type': 'keyword_purchase'}]}
        }
      }
    }

    // Get Transaction
    if (n == 0) {
      transSchema.find(query).lean().exec(function (err, retTrans) {
        if (err) {
          log.error(err)
          master.sendResponse(req, res, 200, 5, 'Database Error')
          return
        }

        // No Transaction
        if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0) {
          log.info('No Transactions')
          master.sendResponse(req, res, 200, -1, 'No Transactions')
          return
        }

        // Transactions Found
        log.info('Transaction Found Successfully')
        master.sendResponse(req, res, 200, -1, retTrans)
        return
      })
    } else {
      transSchema.find(query).limit(n).lean().exec(function (err, retTrans) {
        if (err) {
          log.error(err)
          master.sendResponse(req, res, 200, 5, 'Database Error')
          return
        }

        // No Transaction
        if (retTrans === 'undefined' || retTrans == null || retTrans.length <= 0) {
          log.info('No Transactions')
          master.sendResponse(req, res, 200, -1, 'No Transactions')
          return
        }

        // Transactions Found
        log.info('Transaction Found Successfully')
        master.sendResponse(req, res, 200, -1, retTrans)
        return
      })
    }
  })
}

/* Payment Mode Count */
module.exports.paymentModeCount = function (req, res) {
  log.info('Page Name: admin.js')
  log.info('API Name : paymentModeCount')
  log.info('Payment Mode Count Accessed')
  log.info('Parameters Receiving..')

  var publicKey = req.body.publicKey
  var signature = req.body.signature
  var mode = req.body.mode

  log.info('Payment Mode : ' + mode)
  log.info('Public Key :' + publicKey)
  log.info('Signature :' + signature)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  var query = {'publicKey': publicKey}
  // var text = "mode="+encodeURIComponent(mode)+"&publicKey="+encodeURIComponent(publicKey)
  var text = 'mode=' + mode + '&publicKey=' + publicKey

  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    var query = {$and: [{'type': 'keyword_purchase'}, {'payment_mode': mode}]}

    transSchema.count(query).exec(function (err, retTrans) {
      if (err) {
        log.error(err)
        master.sendResponse(req, res, 200, 5, 'Database Error')
        return
      }

      if (retTrans == null || retTrans == undefined || retTrans == 0) {
        log.info('No Transactions')
        master.sendResponse(req, res, 200, 5, 0)
        return
      }

      log.info(retTrans + ' Transactions Found')
      master.sendResponse(req, res, 200, 5, retTrans)
    })
  })
}

/* Set User Balance */
module.exports.setUserBalance = function (req, res) {
  log.info('Page Name: admin.js.')
  log.info('API Name : setUserBalance')
  log.info('Set User Balance API Hitted')
  log.info('Parameters Receiving...')

  var email = req.body.email
  var deposit = req.body.deposit
  var pending_withdrawal = req.body.pending_withdrawal
  var approved_withdrawal = req.body.approved_withdrawal
  var publicKey = req.body.publicKey
  var signature = req.body.signature

  log.info('Email : ' + email)
  log.info('Deposit : ' + deposit)
  log.info('Pending Withdrawals : ' + pending_withdrawal)
  log.info('Approved Withdrawal : ' + approved_withdrawal)
  log.info('Public Key : ' + publicKey)
  log.info('Signature : ' + signature)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Email
  if (!(master.validateParameter(email, 'Email'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  if (!(master.validateEmail(email))) {
    log.info('Incorrect Email Format')
    master.sendResponse(req, res, 200, 7, 'Incorrect email id format')
    return
  }

  // Validate Deposit
  if (!(master.validateParameter(deposit, 'Deposit Amount'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Pending Withdrawal
  if (!(master.validateParameter(pending_withdrawal, 'Pending Withdrawal Amount'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Approved Withdrawal
  if (!(master.validateParameter(approved_withdrawal, 'Approved Withdrawal Amount'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  var query = {'publicKey': publicKey}
  // var text = "email="+encodeURIComponent(email)+"&pending_withdrawal="+encodeURIComponent(pending_withdrawal)+"&approved_withdrawal="+encodeURIComponent(approved_withdrawal)+"&deposit="+encodeURIComponent(deposit)+"&publicKey="+encodeURIComponent(publicKey)
  var text = 'email=' + email + '&pending_withdrawal=' + pending_withdrawal + '&approved_withdrawal=' + approved_withdrawal + '&deposit=' + deposit + '&publicKey=' + publicKey

  deposit = parseFloat(deposit)
  pending_withdrawal = parseFloat(pending_withdrawal)
  approved_withdrawal = parseFloat(approved_withdrawal)

  // Find Server
  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    query = {'email': email}

    var updatedFeilds = {
      deposit: deposit,
      blocked_for_pending_withdrawals: pending_withdrawal,
      approved_withdrawals: approved_withdrawal

    }

    // Find User From Its Email From User Table
    userSchema.findOneAndUpdate(query, updatedFeilds).lean().exec(function (err, result) {
      if (err) {
        log.error(err)
        master.sendResponse(req, res, 200, 5, 'Database Error')
        return
      }

      // Unable To Get User With This Emnail (No Such Email Is Registered)
      if (typeof result === 'undefined' || result == null || result.length <= 0) {
        log.info(email + ' Is Not Registered')
        master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address')
        return
      }

      // Balance Updated Successfully
      log.info('User Balance Successfully Upadted')
      master.sendResponse(req, res, 200, -1, 'Success')
    })
  })
}

/* Get Email Type transaction */
module.exports.getEmailTypeTransactions = function(req, res){

	log.info('Page Name: admin.js.');
	log.info('API Name : getEmailTypeTransactions');
	log.info('Email Type Transaction API Hitted');
	log.info('Parameters Receiving...');

	var email = req.body.email;
	var type = req.body.type;
	var skip = req.body.skip;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	
	log.info('Email : '+email);
	log.info('Type : '+type);
    log.info('Skip :'+skip);
	log.info('Public Key : '+publicKey);
	log.info('Signature : '+signature);
	
	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(master.validateEmail(email))) 
	{
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }

	// Validate Signature
	if(!(master.validateParameter(type, 'Type')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	var query = {'publicKey': publicKey};
	//var text = "email="+encodeURIComponent(email)+"&type="+encodeURIComponent(type)+"&skip="+encodeURIComponent(skip)+"&publicKey="+encodeURIComponent(publicKey);
    var text = "email="+email+"&type="+type+"&skip="+skip+"&publicKey="+publicKey;
	
	master.secureAuth(query, text, signature, function (result){
		
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

        if(type == "All")
        {
            var query = {$or:[{"sender":email},{"receiver":email}]}
        }
        else
        {
            var query = {$and:[{$or:[{"sender":email},{"receiver":email}]},{"type":type}]}
        }
			
        skip = parseInt(skip);
			
        transSchema.find(query).sort({"time":1}).skip(skip).limit(10).lean().exec(function(err, retVal){
		
			if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
			
            if(retVal == "" || retVal == undefined || retVal.length <= 0)
            {
                log.info('No Transactions');
                master.sendResponse(req, res, 200, 9, "No Result");
                return;
            }				

            else
            {
                log.info(retVal.length+' Transactions Found');
                master.sendResponse(req, res, 200, -1, retVal);
            }
				
        });
			
    })
		
}

/* Update User Status */
module.exports.updateUserStatus = function (req, res) {
  log.info('Page Name: admin.js.')
  log.info('API Name : blockUser')
  log.info('Set User Balance API Hitted')
  log.info('Parameters Receiving...')

  var email = req.body.email
  var status = req.body.status
  var publicKey = req.body.publicKey
  var signature = req.body.signature

  log.info('Email : ' + email)
  log.info('Status : ' + status)
  log.info('Public Key : ' + publicKey)
  log.info('Signature : ' + signature)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Email
  if (!(master.validateParameter(email, 'Email'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  if (!(master.validateEmail(email))) {
    log.info('Incorrect Email Format')
    master.sendResponse(req, res, 200, 7, 'Incorrect email id format')
    return
  }

  var query = {'publicKey': publicKey}
  // var text = "email="+encodeURIComponent(email)+"&status="+encodeURIComponent(status)+"&publicKey="+encodeURIComponent(publicKey)
  var text = 'email=' + email + '&status=' + status + '&publicKey=' + publicKey

  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    status = parseInt(status)
    var userStatus = {active: status}

    // Find User From Its Email From User Table
    userSchema.findOneAndUpdate({email: email}, userStatus).lean().exec(function (err, result) {
      if (err) {
        log.error(err)
        master.sendResponse(req, res, 200, 5, 'Database Error')
        return
      }

      // Unable To Get User With This Emnail (No Such Email Is Registered)
      if (typeof result === 'undefined' || result == null || result.length <= 0) {
        log.info(email + ' Is Not Registered')
        master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address')
        return
      }

      // Status Updated Successfully
      log.info('User Status Successfully Upadted')
      master.sendResponse(req, res, 200, -1, 'Success')
    })
  })
}

/* Latest Deposit */
module.exports.latestDeposit = function (req, res) {
  log.info('Page Name: admin.js.')
  log.info('API Name : latestDeposit')
  log.info('latest Deposit API Hitted')
  log.info('Parameters Receiving...')

  var publicKey = req.body.publicKey
  var signature = req.body.signature

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  var query = {'publicKey': publicKey}
  // var text = "publicKey="+encodeURIComponent(publicKey)
  var text = 'publicKey=' + publicKey

  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    transSchema.find({type: 'fund'}).sort({'time': -1}).limit(1000).lean().exec(function (err, retVal) {
      if (err) {
        log.error(err)
        master.sendResponse(req, res, 200, 5, 'Database Error')
        return
      }

      if (retVal == '' || retVal == undefined || retVal.length <= 0) {
        log.info('No Transactions')
        master.sendResponse(req, res, 200, 9, 'No Result')
        return
      } else {
        log.info(retVal.length + ' Transactions Found')
        master.sendResponse(req, res, 200, -1, retVal)
      }
    })
  })
}

/* Total Count By Type and Payment Mode */
module.exports.totalCount = function (req, res) {
  log.info('Page Name: admin.js.')
  log.info('API Name : totalCount')
  log.info('Total Count API Hitted')
  log.info('Parameters Receiving...')

  var publicKey = req.body.publicKey
  var signature = req.body.signature

  log.info('Public Key : ' + publicKey)
  log.info('Signature : ' + signature)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  var query = {'publicKey': publicKey}

  // var text = "publicKey="+encodeURIComponent(publicKey)
  var text = 'publicKey=' + publicKey

  // Validate signature
  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    transSchema.aggregate([{ $match: {'type': 'fund'}}, {$group: { _id: null, result: {$sum: '$amount'}}}], function (err, fundResult) {
      if (err) {
        log.error(err)
        master.sendResponse(req, res, 200, 5, 'Database Error')
        return
      }

      transSchema.aggregate([{ $match: {'type': 'keyword_purchase', 'payment_mode': 'coinbase'}}, {$group: { _id: null, result: {$sum: '$amount'}}}], function (err, conibaseResult) {
        if (err) {
          log.error(err)
          master.sendResponse(req, res, 200, 5, 'Database Error')
          return
        }

        transSchema.aggregate([{ $match: {'type': 'keyword_purchase', 'payment_mode': 'paypal'}}, {$group: { _id: null, result: {$sum: '$amount'}}}], function (err, paypalResult) {
          if (err) {
            log.error(err)
            master.sendResponse(req, res, 200, 5, 'Database Error')
            return
          }

          transSchema.aggregate([{ $match: {'type': 'keyword_purchase', 'payment_mode': 'bitcoin'}}, {$group: { _id: null, result: {$sum: '$amount'}}}], function (err, walletResult) {
            if (err) {
              log.error(err)
              master.sendResponse(req, res, 200, 5, 'Database Error')
              return
            }

            transSchema.aggregate([{ $match: {'type': 'credit_from_admin'}}, {$group: { _id: null, result: {$sum: '$amount'}}}], function (err, creditAdminResult) {
              if (err) {
                log.error(err)
                master.sendResponse(req, res, 200, 5, 'Database Error')
                return
              }

              transSchema.aggregate([{ $match: {'type': 'debit_from_admin'}}, {$group: { _id: null, result: {$sum: '$amount'}}}], function (err, debitAdminResult) {
                if (err) {
                  log.error(err)
                  master.sendResponse(req, res, 200, 5, 'Database Error')
                  return
                }

                var deposit, coinbase, paypal, wallet, credit_from_admin, debit_from_admin

                if (fundResult.length == 0) {
                  deposit = 0
                } else {
                  deposit = fundResult[0].result
                }

                if (conibaseResult.length == 0) {
                  coinbase = 0
                } else {
                  coinbase = conibaseResult[0].result
                }

                if (paypalResult.length == 0) {
                  paypal = 0
                } else {
                  paypal = paypalResult[0].result
                }

                if (walletResult.length == 0) {
                  wallet = 0
                } else {
                  wallet = walletResult[0].result
                }

                if (creditAdminResult.length == 0) {
                  credit_from_admin = 0
                } else {
                  credit_from_admin = creditAdminResult[0].result
                }

                if (debitAdminResult.length == 0) {
                  debit_from_admin = 0
                } else {
                  debit_from_admin = debitAdminResult[0].result
                }

                var jsonResult = {
                  deposit: deposit,
                  coinbase: coinbase,
                  paypal: paypal,
                  wallet: wallet,
                  credit_from_admin: credit_from_admin,
                  debit_from_admin: debit_from_admin
                }

                log.info('Successfully Got Result')
                master.sendResponse(req, res, 200, -1, jsonResult)
              })
            })
          })
        })
      })
    })
  })
}

/* Calculate User Balance */
module.exports.userBalanceCalc = function (req, res) {
  log.info('Page Name: admin.js.')
  log.info('API Name : UserBalanceCalc')
  log.info('Calculate User Balance API Hitted')
  log.info('Parameters Receiving...')

  var email = req.body.email
  var publicKey = req.body.publicKey
  var signature = req.body.signature

  log.info('Email : ' + email)
  log.info('Public Key : ' + publicKey)
  log.info('Signature : ' + signature)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Email
  if (!(master.validateParameter(email, 'Email'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  if (!(master.validateEmail(email))) {
    log.info('Incorrect Email Format')
    master.sendResponse(req, res, 200, 7, 'Incorrect email id format')
    return
  }

  var query = {'publicKey': publicKey}

  // var text = "email="+email+"&publicKey="+encodeURIComponent(publicKey)
  var text = 'email=' + email + '&publicKey=' + publicKey

  // Validate signature
  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    query = {'email': email}

    // Find User From Its Email From User Table
    userSchema.find(query).select({deposit: 1,sales: 1,cashback: 1,affiliate_earning: 1,total_kwd_income: 1,search_earning: 1,search_affiliate_earnings: 1,total_app_income: 1,blocked_for_pending_withdrawals: 1,blocked_for_bids: 1,approved_withdrawals: 1,trade_fees: 1,purchases: 1}).lean().exec(function (err, result) {
      if (err) {
        log.error(err)
        master.sendResponse(req, res, 200, 5, 'Database Error')
        return
      }

      // Unable To Get User With This Emnail (No Such Email Is Registered)
      if (typeof result === 'undefined' || result == null || result.length <= 0) {
        log.info(email + ' Is Not Registered')
        master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address')
        return
      }

      var deposit = result[0].deposit
      var sales = result[0].sales
      var cashback = result[0].cashback
      var affiliate_earning = result[0].affiliate_earning
      var total_kwd_income = result[0].total_kwd_income
      var search_earning = result[0].search_earning
      var search_affiliate_earnings = result[0].search_affiliate_earnings
      var total_app_income = result[0].total_app_income
      var blocked_for_pending_withdrawals = result[0].blocked_for_pending_withdrawals
      var blocked_for_bids = result[0].blocked_for_bids
      var approved_withdrawals = result[0].approved_withdrawals
      var trade_fees = result[0].trade_fees
      var purchases = result[0].purchases

      var calculation = deposit + + +sales + + +cashback + + +affiliate_earning + + +total_kwd_income + + +search_earning + + +search_affiliate_earnings + + +total_app_income - blocked_for_pending_withdrawals - blocked_for_bids - approved_withdrawals - trade_fees - purchases

      // var calculation1 = deposit + sales + cashback + affiliate_earning + total_kwd_income + search_earning + search_affiliate_earnings + total_app_income // Add
      // var calculation2 =blocked_for_pending_withdrawals + blocked_for_bids + approved_withdrawals + trade_fees + purchases // Subtract

      log.info('Calculation : ' + calculation)
      master.sendResponse(req, res, 200, -1, calculation)
    })
  })
}

/* Calculate User Balance */
module.exports.allUsersBalance = function (req, res) {
  log.info('Page Name: admin.js.')
  log.info('API Name : allUsersBalance')
  log.info('Calculate All Users Balance API Hitted')
  log.info('Parameters Receiving...')

  var publicKey = req.body.publicKey
  var signature = req.body.signature

  log.info('Public Key : ' + publicKey)
  log.info('Signature : ' + signature)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 200, 1, 'Mandatory field not found')
    return
  }

  var query = {'publicKey': publicKey}

  // var text = "email="+email+"&publicKey="+encodeURIComponent(publicKey)
  var text = 'publicKey=' + publicKey

  // Validate signature
  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 200, result[0].errCode, result[0].message)
      return
    }

    userSchema.aggregate([{$match: {active: 1}},
      {$group: { _id: null,
          deposit: {$sum: '$deposit'},
          sales: {$sum: '$sales'},
          cashback: {$sum: '$cashback'},
          affiliate_earning: {$sum: '$affiliate_earning'},
          total_kwd_income: {$sum: '$total_kwd_income'},
          search_earning: {$sum: '$search_earning'},
          search_affiliate_earnings: {$sum: '$search_affiliate_earnings'},
          total_app_income: {$sum: '$total_app_income'},
          blocked_for_pending_withdrawals: {$sum: '$blocked_for_pending_withdrawals'},
          blocked_for_bids: {$sum: '$blocked_for_bids'},
          approved_withdrawals: {$sum: '$approved_withdrawals'},
          trade_fees: {$sum: '$trade_fees'},
      purchases: {$sum: '$purchases'}}}])
      .exec(function (err, result) {
        if (err) {
          log.error(err)
          master.sendResponce(req, res, 200, 5, 'Datbase Error')
          return
        }

        var deposit = result[0].deposit
        var sales = result[0].sales
        var cashback = result[0].cashback
        var affiliate_earning = result[0].affiliate_earning
        var total_kwd_income = result[0].total_kwd_income
        var search_earning = result[0].search_earning
        var search_affiliate_earnings = result[0].search_affiliate_earnings
        var total_app_income = result[0].total_app_income
        var blocked_for_pending_withdrawals = result[0].blocked_for_pending_withdrawals
        var blocked_for_bids = result[0].blocked_for_bids
        var approved_withdrawals = result[0].approved_withdrawals
        var trade_fees = result[0].trade_fees
        var purchases = result[0].purchases

        var calculation = deposit + + +sales + + +cashback + + +affiliate_earning + + +total_kwd_income + + +search_earning + + +search_affiliate_earnings + + +total_app_income - blocked_for_pending_withdrawals - blocked_for_bids - approved_withdrawals - trade_fees - purchases

        // var calculation1 = deposit + sales + cashback + affiliate_earning + total_kwd_income + search_earning + search_affiliate_earnings + total_app_income // Add
        // var calculation2 =blocked_for_pending_withdrawals + blocked_for_bids + approved_withdrawals + trade_fees + purchases // Subtract

        log.info('Calculation : ' + calculation)
        master.sendResponse(req, res, 200, -1, calculation)
      })
  })
}
