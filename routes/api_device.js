var express = require('express');
var router = express.Router();

var device = require('../api/device');

router.post('/register', device.deviceRegister);	// Device Register API
router.post('/getPvtKey', device.getPvtKey);      // Get Private Key API

module.exports = router;
