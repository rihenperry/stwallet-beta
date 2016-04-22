/* notification options for user model */
var mongoose = require('mongoose')
var async = require('async')

var Usr = mongoose.model('user')
var NotifyOption = mongoose.model('NotifyOption')
var BuyOption = mongoose.model('BuyKeywordsOption')
var AskOption = mongoose.model('AskKeywordsOption')
var BidOption = mongoose.model('BidKeywordsOption')
var NotifyPerm = mongoose.model('NotifyPerm')

var helpers = require('../helpers/utils')
var common = require('./common')
var master = require('../config/masterfunc.js')

var getAllSubOptions = function (req, res) {
  var notifylist = {}
  if (req.params) {
    async.parallel({
      buy: function (cb) {
        BuyOption
          .find()
          .exec(function (err, container) {
            if (err) {
              log.info({err: err})
              helpers.sendJsonResponse(res, 404, 5, err)
            }
            cb(null, container)
          })
      },
      ask: function (cb) {
        AskOption
          .find()
          .exec(function (err, container) {
            if (err) {
              log.info({err: err})
              helpers.sendJsonResponse(res, 404, 5, err)
            }
            cb(null, container)
          })
      },
      bid: function (cb) {
        BidOption
          .find()
          .exec(function (err, container) {
            if (err) {
              log.info({err: err})
              helpers.sendJsonResponse(res, 404, 5, err)
            }
            cb(null, container)
          })
      },
      perms: function (cb) {
        NotifyPerm
          .find()
          .where('_id').in([1, 2, 4])
          .sort('-_id')
          .exec(function (err, container) {
            if (err) {
              log.info({err: err})
              helpers.sendJsonResponse(res, 404, err)
            }
            cb(null, container)
          })
      }
    }, function (err, results) {
      // console.log(results)
      log.info('notify list -> %s', results)
      helpers.sendJsonResponse(res, 200, -1, results)
    })
  } else {
    helpers.sendJsonResponse(res, 404, 1, 'Mandatory field not found')
  }
}

var getUserSubOptions = function (req, res) {
  var notifyconfigs = [
    {path: 'notify_options_fk_key.buy_opt_container.option', model: 'BuyKeywordsOption'},
    {path: 'notify_options_fk_key.buy_opt_container.permissions', model: 'NotifyPerm'},
    {path: 'notify_options_fk_key.ask_opt_container.option', model: 'AskKeywordsOption'},
    {path: 'notify_options_fk_key.ask_opt_container.permissions', model: 'NotifyPerm'},
    {path: 'notify_options_fk_key.bid_opt_container.option', model: 'BidKeywordsOption'},
    {path: 'notify_options_fk_key.bid_opt_container.permissions', model: 'NotifyPerm'}
  ]

  var id = req.params.id
  var publicKey = req.query.publicKey
  var signature = req.query.signature

  log.info('Id : ' + id)
  log.info('Public Key : ' + publicKey)
  log.info('Signature : ' + signature)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 404, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 404, 1, 'Mandatory field not found')
    return
  }

  var query = {publicKey: publicKey}
  // var text  = 'id='+encodeURIComponent(id)+'&publicKey='+encodeURIComponent(publicKey)

  var text = 'id=' + id + '&publicKey=' + publicKey

  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 404, result[0].errCode, result[0].message)
      return
    }

    // Write Your Code Here
    if (req.params && req.params.id) {
      Usr
        .findById(req.params.id)
        .populate('notify_options_fk_key')
        .select({_id: 1,email: 1,notify_options_fk_key: 1})
        .exec(function (err, user) {
          if (!user) {
            log.info({err: user})
            helpers.sendJsonResponse(res, 404, 4, 'There is no user registered with that email address.')
            return
          } else if (err) {
            log.info({err: err})
            helpers.sendJsonResponse(res, 404, 5, err)
            return
          }

          Usr
            .populate(user, notifyconfigs, function (err, result) {
              if (err) {
                log.error(err)
                helpers.sendJsonResponse(res, 404, 5, err)
                return
              }
              helpers.sendJsonResponse(res, 200, -1, result)
              log.info('User notify options -> %s', result)
            })
        })
    } else {
      helpers.sendJsonResponse(res, 404, 1, 'Mandatory field not found')
    }
  })
}

var createUserSubOptions = function (req, res) {
  var id = req.params.id
  var publicKey = req.body.publicKey || req.query.publicKey
  var signature = req.body.signature || req.query.signature
  var buy_container = req.body.buy_container
  var ask_container = req.body.ask_container
  var bid_container = req.body.bid_container
  var buy_perm_code = req.body.buy_perm_code
  var ask_perm_code = req.body.ask_perm_code
  var bid_perm_code = req.body.bid_perm_code

  log.info('Id : ' + id)
  log.info('Public Key : ' + publicKey)
  log.info('Signature : ' + signature)

  log.info('Buy Options : ' + buy_container)
  log.info('Ask Options : ' + ask_container)
  log.info('Bid Options : ' + bid_container)

  log.info('Buy perm : ' + buy_perm_code)
  log.info('Ask perm : ' + ask_perm_code)
  log.info('Bid perm : ' + bid_perm_code)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 404, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 404, 1, 'Mandatory field not found')
    return
  }

  var query = {publicKey: publicKey}
  // var text  = 'id='+encodeURIComponent(id)+'&buy_container='+encodeURIComponent(buy_container)+'&ask_container='+encodeURIComponent(ask_container)+'&bid_container='+encodeURIComponent(bid_container)+'&publicKey='+encodeURIComponent(publicKey)

  var text = 'id=' + id + '&buy_container=' + buy_container + '&ask_container=' + ask_container + '&bid_container=' + bid_container + '&buy_perm_code=' + buy_perm_code + '&ask_perm_code=' + ask_perm_code + '&bid_perm_code=' + bid_perm_code + '&publicKey=' + publicKey

  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 404, result[0].errCode, result[0].message)
      return
    }

    if (req.params && req.params.id) {
      Usr
        .findById(req.params.id)
        .exec(function (err, updateuser) {
          if (!updateuser) {
            log.info('no user registered %s'.updateuser)
            helpers.sendJsonResponse(res, 404, 4, 'There is no user registered with that email address.')
            return
          } else if (err) {
            log.error(err)
            helpers.sendJsonResponse(res, 200, 5, err)
            return
          }
          // else if (!helpers.inPermCodeFormat(req.body.buy_perm_code.toString())) {
          //  helpers.sendJsonResponse(res, 404, {
          //    "message": "unexpected permission code"
          //  })
          //  return
          // }

          if (updateuser.notify_options_fk_key) {
            log.info('user already exits', updateuser.notify_options_fk_key)
            helpers.sendJsonResponse(res, 404, 51, 'User Preferences Already Exist')
            return
          }

          /* just accept the notify options params*/
          var updateoptions = null
          var options = common.processOptions(req, updateoptions)

          options.save(function (err) {
            if (err) {
              log.error(err)
              helpers.sendJsonResponse(res, 404, 5, err)
              return
            }

            /* update the notify options foreign key in users table */
            updateuser.notify_options_fk_key = options._id

            updateuser.save(function (err, newuser) {
              if (err) {
                log.error(err)
                helpers.sendJsonResponse(res, 404, 5, err)
                return
              }
              helpers.sendJsonResponse(res, 201, -1, 'Success')
            })
          })
        })
    } else {
      helpers.sendJsonResponse(res, 404, 1, 'Mandatory field not found')
    }
  })
}

/* called for every new and existing user account*/
/* args: req     -> Object, express req param
         next    -> Function, callback provided to return response
 * returns: func(err, result)
 */
var createUserDefaultNotifyObj = function (req, next) {
  /* initialize options for new user */
  var updateOptions = null
  var options = common.processOptions(req, updateOptions)

  options.save(function (err) {
    if (err) {
      log.info({err: err})
      next(err)
      return
    }
    next(null, options._id)
  }) // end of options
}

var updateUserSubOptions = function (req, res) {
  var id = req.params.id
  var optionid = req.params.optionid
  var publicKey = req.body.publicKey || req.query.publicKey
  var signature = req.body.signature || req.query.signature
  var buy_container = req.body.buy_container
  var ask_container = req.body.ask_container
  var bid_container = req.body.bid_container

  var buy_perm_code = req.body.buy_perm_code
  var ask_perm_code = req.body.ask_perm_code
  var bid_perm_code = req.body.bid_perm_code

  log.info('Public Key : ' + publicKey)
  log.info('Signature : ' + signature)
  log.info('user id: ' + id)
  log.info('option id: ' + optionid)

  log.info('Buy Options : ' + buy_container)
  log.info('Ask Options : ' + ask_container)
  log.info('Bid Options : ' + bid_container)

  log.info('Buy perm : ' + buy_perm_code)
  log.info('Ask perm : ' + ask_perm_code)
  log.info('Bid perm : ' + bid_perm_code)
  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 404, 1, 'Mandatory field not found')
    return
  }

  if ((!req.params.id) || (!req.params.optionid) || (!req.params)) {
    helpers.sendJsonResponse(res, 404, {
      'message': 'No args in request'
    })
    return
  }
  // else if (!helpers.inPermCodeFormat(req.body.buy_ask_bid_perm_code.toString())) {
  //	helpers.sendJsonResponse(res, 404, {
  //  	"message": "unexpected permission code"
  //	})
  //  return
  // }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 404, 1, 'Mandatory field not found')
    return
  }

  var query = {publicKey: publicKey}
  // var text  = 'id='+encodeURIComponent(id)+'&optionid='+encodeURIComponent(optionid)+'&buy_container='+encodeURIComponent(buy_container)+'&ask_container='+encodeURIComponent(ask_container)+'&bid_container='+encodeURIComponent(bid_container)+'&publicKey='+encodeURIComponent(publicKey)

  var text = 'id=' + id + '&optionid=' + optionid + '&buy_container=' + buy_container + '&ask_container=' + ask_container + '&bid_container=' + bid_container + '&buy_perm_code=' + buy_perm_code + '&ask_perm_code=' + ask_perm_code + '&bid_perm_code=' + bid_perm_code + '&publicKey=' + publicKey
  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 404, result[0].errCode, result[0].message)
      return
    }

    if ((!req.params.id) || (!req.params.optionid) || (!req.params)) {
      helpers.sendJsonResponse(res, 404, 1, 'Mandatory field not found')
      return
    }
    // else if (!helpers.inPermCodeFormat(req.body.buy_ask_bid_perm_code.toString())) {
    //  helpers.sendJsonResponse(res, 404, {
    //    "message": "unexpected permission code"
    //  })
    //  return
    // }

    Usr
      .findById(req.params.id)
      .exec(function (err, user) {
        try {
          if ( (user.notify_options_fk_key.toString() !== req.params.optionid)) {
            log.warn({optionid: 'optionid mismatched'}, 'option ID doesnt not exist for this user ID')
            helpers.sendJsonResponse(res, 404, 4, 'option ID doesn not exist for this user ID')
            return
          } else if (err) {
            log.error(err)
            helpers.sendJsonResponse(res, 404, 5, err)
            return
          }
        } catch(err) {
          log.error(err)
          helpers.sendJsonResponse(res, 404, 61, 'Option id not found')
          return
        }

        NotifyOption
          .findById(req.params.optionid)
          .exec(function (err, updateNotifyObj) {
            if (err) {
              log.error(err)
              helpers.sendJsonResponse(res, 404, 5, err)
            }

            updateNotifyObj.buy_opt_container = []
            updateNotifyObj.ask_opt_container = []
            updateNotifyObj.bid_opt_container = []
            updateNotifyObj.updated_on = Date.now()

            var options = common.processOptions(req, updateNotifyObj)
            options.save(function (err, updated) {
              if (err) {
                log.error(err)
                helpers.sendJsonResponse(res, 404, 5, err)
              } else {
                helpers.sendJsonResponse(res, 200, -1, 'Success')
              }
            })
          }) // end of NotifyOption
      }) // end of Usr
  }) // end of secure Auth
}

var deleteUserSubOptions = function (req, res) {
  var id = req.params.id
  var publicKey = req.query.publicKey || req.body.publicKey
  var signature = req.query.signature || req.body.signature

  log.info('Id : ' + id)
  log.info('Public Key : ' + publicKey)
  log.info('Signature : ' + signature)

  // Validate Public Key
  if (!(master.validateParameter(publicKey, 'Public Key'))) {
    master.sendResponse(req, res, 404, 1, 'Mandatory field not found')
    return
  }

  // Validate Signature
  if (!(master.validateParameter(signature, 'Signature'))) {
    master.sendResponse(req, res, 404, 1, 'Mandatory field not found')
    return
  }

  var query = {publicKey: publicKey}
  // var text  = 'id='+encodeURIComponent(id)+'&publicKey='+encodeURIComponent(publicKey)

  var text = 'id=' + id + '&publicKey=' + publicKey

  master.secureAuth(query, text, signature, function (result) {
    if (result[0].error == true || result[0].error == 'true') {
      master.sendResponse(req, res, 404, result[0].errCode, result[0].message)
      return
    }

    var objId = req.params.id
    if (objId) {
      Usr
        .findById(req.params.id)
        .populate('notify_options_fk_key')
        .exec(function (err, deleteuser) {
          if (err) {
            log.error(err)
            helpers.sendJsonResponse(res, 404, 5, err)
            return
          }

          // console.log(deleteuser)
          //  return

          if (deleteuser.notify_options_fk_key !== null) {
            // console.log("object has notify option object")
            NotifyOption
              .findByIdAndRemove(deleteuser.notify_options_fk_key)
              .exec(function (err, deloptions) {
                if (err) {
                  log.error(err)
                  helpers.sendJsonResponse(res, 404, 5, err)
                  return
                }

                deleteuser.notify_options_fk_key = null
                deleteuser.save(function (err, result) {
                  if (err) {
                    log.error(err)
                    helpers.sendJsonResponse(res, 404, 5, err)
                    return
                  }

                  log.info('option object deleted for userid -> %s', deleteuser._id)
                  helpers.sendJsonResponse(res, 200, -1, 'Success')
                  return
                })
              })
          } else {
            helpers.sendJsonResponse(res, 404, 4, 'user option ID does not exist')
            return
          }
        })
    } else {
      helpers.sendJsonResponse(res, 404, 1, 'Mandatory field not found')
      return
    }
  })
}

module.exports = {
  getAllSubOptions: getAllSubOptions,
  getUserSubOptions: getUserSubOptions,
  createUserSubOptions: createUserSubOptions,
  updateUserSubOptions: updateUserSubOptions,
  deleteUserSubOptions: deleteUserSubOptions,
  createUserDefaultNotifyObj: createUserDefaultNotifyObj
}
