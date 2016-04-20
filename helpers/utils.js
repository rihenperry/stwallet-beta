var sendJsonResponse = function(res, status, errCode, errMsg){
  res.contentType('application/json');
  //  res.status(status);
  //  res.json(content);

  res.status(status).send({
    errCode: errCode,
    errMsg: errMsg
  });
};

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

/*
       req -> express request Object
       cb  -> callback
 */
function initOptsPerms(req, cb) {
  var check_buy_c = req.body.buy_container? JSON.parse(req.body.buy_container): null;
  var check_ask_c = req.body.ask_container? JSON.parse(req.body.ask_container): null;
  var check_bid_c = req.body.bid_container? JSON.parse(req.body.bid_container): null;

  var check_perm_c = req.body.buy_ask_bid_perm_container? JSON.parse(req.body.buy_ask_bid_perm_container): null;
  var perm_box = check_perm_c !== null? check_perm_c: ({
      'check_buy_p': req.body.buy_perm_code? JSON.parse(req.body.buy_perm_code):null,
      'check_ask_p': req.body.ask_perm_code? JSON.parse(req.body.ask_perm_code):null,
      'check_bid_p': req.body.bid_perm_code? JSON.parse(req.body.bid_perm_code):null
    })

  var perm_box_c= Array.isArray(perm_box)? perm_box: [perm_box.check_buy_p, perm_box.check_ask_p, perm_box.check_bid_p];

  //if any of the buy/ask/bid perm code are defined but there respective containers aint then raise error

  //buy, ask, bid containers length should match permission length. strictly, check for permission length < than
  //its container length

  //after the above checks validate permission codes

}


function permCodeBatch(container) {
  var permBool = true;
  for (var index=0; index < container.length; index ++) {
    if (!inPermCodeFormat(container[index])) {
      permBool = false;
      break;
    }
  }
  return permBool;
}

function inPermCodeFormat(code) {
    return /^[0-7]{3}$/.test(code);
}

function permArrayToObj(perm_k, perm_v) {
  var obj = {};
  while(perm_k.length) {
    obj[perm_k.splice(0, 1)] = perm_v.splice(0, 1).toString(10).split("").map(Number);
  }
  return obj;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return re.test(email);
}

module.exports= {
  sendJsonResponse : sendJsonResponse,
  alphaNumr : randomString,
  inPermCodeFormat: inPermCodeFormat,
  permCodeBatch: permCodeBatch,
  permArrayToObj: permArrayToObj,
  validateEmail: validateEmail
};
