var express = require('express')
var router = express.Router()

var ctrlHome = require('../controllers/homepage.js')

/* view-based routes */
/* wires urls to the data models*/
router.get('/', ctrlHome.homePage)

module.exports = router
