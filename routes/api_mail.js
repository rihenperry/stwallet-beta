var express = require('express')
var router = express.Router()

var mailer = require('../api/mail') // Mail Functionality

router.post('/sendMail', mailer.sendPHPmail)
router.post('/getNotificationStatus', mailer.getNotificationStatus)

module.exports = router
