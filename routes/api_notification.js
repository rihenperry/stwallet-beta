var express = require('express')
var router = express.Router()

var notification = require('../api/notification')

router.post('/sendVerificationEmail', notification.sendVerificationEmail)
router.post('/sendforgotpassword', notification.sendforgotpassword)
router.post('/changePassEmail', notification.changePassEmail)
router.post('/resettedConfirmation', notification.resettedConfirmation)

module.exports = router
