var  _ = require('lodash')

var sendJsonResponse = function (res, status, errCode, errMsg) {
  res.contentType('application/json')
  //  res.status(status)
  //  res.json(content)

  res.status(status).send({
    errCode: errCode,
    errMsg: errMsg
  })
}

function randomString (length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1)
}

/*
       req -> express request Object
       cb  -> callback
 */
function validateOptsPerms (req, cb) {
  try {
      var check_buy_c = req.body.buy_container ? JSON.parse(req.body.buy_container) : null
      var buy_perm_code = req.body.buy_perm_code || null

      var check_ask_c = req.body.ask_container ? JSON.parse(req.body.ask_container) : null
      var ask_perm_code = req.body.ask_perm_code || null

      var check_bid_c = req.body.bid_container ? JSON.parse(req.body.bid_container) : null
      var bid_perm_code = req.body.bid_perm_code || null

      var check_kwd_license_c = req.body.kwd_license_container ? JSON.parse(req.body.kwd_license_container): null
      var kwd_license_perm_code = req.body.kwd_license_perm_code || null

      var check_deposit_c = req.body.deposit_container ? JSON.parse(req.body.deposit_container): null
      var deposit_perm_code = req.body.deposit_perm_code || null

      var check_withdrawal_c =  req.body.withdrawal_container ? JSON.parse(req.body.withdrawal_container): null
      var withdrawal_perm_code = req.body.withdrawal_perm_code || null

    
      // if any of the buy/ask/bid perm code are defined but there respective containers aint then raise error
    if ((check_buy_c !== null) && (check_buy_c.length !== 0)) {
        if (check_buy_c.every(function(el) { return [1, 2, 3].indexOf(el) !== -1; } )) {
          var regexStr = new RegExp("^((u|f|g)[1-7]){" + check_buy_c.length + "}$")
          if (!regexStr.test(buy_perm_code)) {
            throw new Error("bad perms")
          }
        } else {
          throw new Error("Invalid Options")
        }
      }

    if ((check_ask_c !== null) && (check_ask_c.length !== 0)) {
        if (check_ask_c.every(function(el) { return [1, 2, 3].indexOf(el) !== -1; } )) {
          var regexStr = new RegExp("^((u|f|g)[1-7]){" + check_ask_c.length + "}$")
          if (!regexStr.test(ask_perm_code)) {
            throw new Error("bad perms")
          }
        } else {
          throw new Error("Invalid Options")
        }
      }

    if ((check_bid_c !== null) && (check_bid_c.length !== 0)) {
        if (check_bid_c.every(function(el) { return [1, 2, 3, 4].indexOf(el) !== -1; } )) {
          var regexStr = new RegExp("^((u|f|g)[1-7]){" + check_bid_c.length + "}$")
          if (!regexStr.test(bid_perm_code)) {
            throw new Error("bad perms")
          }
        } else {
          throw new Error("Invalid Options")
        }
      }

    if ((check_deposit_c !== null) && (check_deposit_c.length !== 0)) {
        if (check_deposit_c.every(function(el) { return [1].indexOf(el) !== -1; } )) {
          var regexStr = new RegExp("^((u|f|g)[1-7]){" + check_deposit_c.length + "}$")
          if (!regexStr.test(deposit_perm_code)) {
            throw new Error("bad perms")
          }
        } else {
          throw new Error("Invalid Options")
        }
      }

    if ((check_withdrawal_c !== null) && (check_withdrawal_c.length !== 0)) {
        if (check_withdrawal_c.every(function(el) { return [1, 2].indexOf(el) !== -1; } )) {
          var regexStr = new RegExp("^((u|f|g)[1-7]){" + check_withdrawal_c.length + "}$")
          if (!regexStr.test(withdrawal_perm_code)) {
            throw new Error("bad perms")
          }
        } else {
          throw new Error("Invalid Options")
        }
      }

    if ((check_kwd_license_c !== null) && (check_kwd_license_c.length !== 0)) {
        if (check_kwd_license_c.every(function(el) { return [1, 2].indexOf(el) !== -1; } )) {
          var regexStr = new RegExp("^((u|f|g)[1-7]){" + check_kwd_license_c.length + "}$")
          if (!regexStr.test(kwd_license_perm_code)) {
            throw new Error("bad perms")
          }
        } else {
          throw new Error("Invalid Options")
        }
      }
      // buy, ask, bid containers length should match permission length. strictly, check for permission length < than
      // its container length
    cb(null)
      // after the above checks validate permission codes
  }catch (err) {
    cb(err.message)
  }
}

function permCodeBatch (container) {
  var permBool = true
  for (var index = 0; index < container.length; index++) {
    if (!inPermCodeFormat(container[index])) {
      permBool = false
      break
    }
  }
  return permBool
}

function inPermCodeFormat (code) {
  return /^[0-7]{3}$/.test(code)
}

function permArrayToObj (perm_k, perm_v, perm_social_v) {
  var obj = {}
  var socialObj = {}

  while(perm_k.length) {
    var k = perm_k.splice(0, 1)
    obj[k] = perm_v.splice(0, 1).toString(10).split('').map(Number)
    socialObj[k] = perm_social_v.splice(0, 1)[0]
  }
  return [obj, socialObj]
}

function separate(str) {
  var arranger = {pref: [], social: []}
  while(str.length) {
    var head = str.splice(0, 1).toString()
    arranger.pref.push(head.match(/\d/g).join(""))
    arranger.social.push(head.match(/[a-zA-Z]/g))
  }
  //return [str.match(/\d/g).join(""), str.match(/[a-zA-Z]/g).join("")]
  return arranger
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return re.test(email);
}

module.exports = {
  sendJsonResponse: sendJsonResponse,
  alphaNumr: randomString,
  inPermCodeFormat: inPermCodeFormat,
  permCodeBatch: permCodeBatch,
  permArrayToObj: permArrayToObj,
  validateEmail: validateEmail,
  validateOptsPerms: validateOptsPerms,
  separate: separate
}
