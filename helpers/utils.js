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

module.exports= {
  sendJsonResponse : sendJsonResponse,
  alphaNumr : randomString,
  inPermCodeFormat: inPermCodeFormat,
  permCodeBatch: permCodeBatch,
  permArrayToObj: permArrayToObj
};

//Usr
  //  .create({
  //    user_id: req.body.user_id,
  //    uname: req.body.name,
  //    notify_options_fk_key: helpers.alphaNumr(8)
  //  }, function(err, newuser) {
  //    if (err) {
  //      helpers.sendJsonResponse(res, 404, err);
  //    } else {
  //      helpers.sendJsonResponse(res, 201, newuser);
  //    }
  //  });
