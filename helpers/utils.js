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

function inPermCodeFormat(code) {
    return /^[0-7]{3}$/.test(code);
}

module.exports= {
  sendJsonResponse : sendJsonResponse,
  alphaNumr : randomString,
  inPermCodeFormat: inPermCodeFormat
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
