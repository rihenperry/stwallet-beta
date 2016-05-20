var express = require('express')
var router = express.Router()

var mw = require('../config/middleware');
var device = require('../api/device');

router.use(function(req, res, next) {
  if (req.body.token && ((req.body.token === true) || (req.body.token === 'true'))) {
    next()
  } else {
    mw.checkPubSignKey(req, res, next)
  }
})

router.post('/register', device.deviceRegister);	// Device Register API
router.post('/getPvtKey', device.getPvtKey);      // Get Private Key API

module.exports = router
