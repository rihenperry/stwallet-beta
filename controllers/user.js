/* user related controllers send request to user models and sends response to original requestor */
var helpers = require('../helpers/utils');

var userList = function(req, res) {
  helpers.sendJsonResponse(res, 200, {"status": "success"});
};

module.exports = {
  userList: userList
};
