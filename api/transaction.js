"use strict";

var userSchema      = require('../models/userSchema.js');       // User Schema
var deviceSchema    = require('../models/deviceInfoSchema.js')  // DeviceInfo Schema
var master          = require('../config/masterfunc.js');       // Master Functions
var crypt           = require('../config/crypt.js');            // Crypt/Signature Related Functionality
var mailer          = require('../config/mail.js');             // Mail Functionality

// Transaction API