/* redundant code among controllers stays here*/
var mongoose = require('mongoose')
var async = require('async')
var util = require('util')

var helpers = require('../helpers/utils')

var NotifyOption = mongoose.model('NotifyOption')

var processOptions = function (req, updateoptions) {
  var unProcessedBox = {
    rawbuy: req.body.buy_container ? JSON.parse(req.body.buy_container) : null,
    rawask: req.body.ask_container ? JSON.parse(req.body.ask_container) : null,
    rawbid: req.body.bid_container ? JSON.parse(req.body.bid_container) : null,
    rawkwdlicense: req.body.kwd_license_container ? JSON.parse(req.body.kwd_license_container): null,
    rawdeposit: req.body.deposit_container ? JSON.parse(req.body.deposit_container): null,
    rawwithdrawal: req.body.withdrawal_container ? JSON.parse(req.body.withdrawal_container): null
  }
  log.info('unProcessedBox -> %s', util.inspect(unProcessedBox))

  log.info('PermBox-> %s', util.inspect(Object.keys(unProcessedBox)))

  var unProcessedPermBox = mapPermsToOptions(req, unProcessedBox)
  log.info('processed PermBox ->', util.inspect(unProcessedPermBox))

  var options = updateoptions === null ? (
    new NotifyOption({
      buy_opt_container: [],
      ask_opt_container: [],
      bid_opt_container: [],
      kwd_license_opt_container: [],
      deposit_opt_container: [],
      withdrawal_opt_container: []
    })
    ) : updateoptions

  Object.keys(unProcessedBox).map(function (key) {
    switch (key) {
      case 'rawbuy':
        var permIterator = 0
        var inputType = updateoptions === null? [1,2,3]: unProcessedBox[key]
        var processBox = inputType === null? []: inputType
        options.buy_opt_container = processBox.length? []: options.buy_opt_container
        options.buy_opt_container = ((inputType !== null) && (inputType.length === 0))? []: options.buy_opt_container
        async.each(processBox, function (elem, cb) {
          var obj = {
            option: elem,
            permissions: unProcessedPermBox[0][key][permIterator],
            social_permissions: unProcessedPermBox[1][key][permIterator]
          }
          options.buy_opt_container.push(obj)
          permIterator++
          cb()
        }, function (err) {
          log.info('buy container -> %s', util.inspect(options.buy_opt_container))
          options.save()
        })
        break
      case 'rawask':
        var permIterator = 0
        var inputType = updateoptions === null? [1,2,3]: unProcessedBox[key]
        var processBox = inputType === null? []: inputType
        options.ask_opt_container = processBox.length? []: options.ask_opt_container
        options.ask_opt_container = ((inputType !== null) && (inputType.length === 0))? []: options.ask_opt_container
        async.each(processBox, function (elem, cb) {
          var obj = {
            option: elem,
            permissions: unProcessedPermBox[0][key][permIterator],
            social_permissions: unProcessedPermBox[1][key][permIterator]
          }
          options.ask_opt_container.push(obj)
          permIterator++
          cb()
        }, function (err) {
          log.info('ask container -> %s', util.inspect(options.ask_opt_container))
          options.save()
        })
        // processingAsk(unProcessedBox, key, options)
        break
      case 'rawbid':
        var permIterator = 0
        var inputType = updateoptions === null? [1,2,3,4]: unProcessedBox[key]
        var processBox = inputType === null? []: inputType
        options.bid_opt_container = processBox.length? []: options.bid_opt_container
        options.bid_opt_container = ((inputType !== null) && (inputType.length === 0))? []: options.bid_opt_container
        async.each(processBox, function (elem, cb) {
          var obj = {
            option: elem,
            permissions: unProcessedPermBox[0][key][permIterator],
            social_permissions: unProcessedPermBox[1][key][permIterator]
          }
          options.bid_opt_container.push(obj)
          permIterator++
          cb()
        }, function (err) {
          log.info('bid container -> %s', util.inspect(options.bid_opt_container))
          options.save()
        })
        break
      case 'rawkwdlicense':
        var permIterator = 0
        var inputType = updateoptions === null? [1,2]: unProcessedBox[key]
        var processBox = inputType === null? []: inputType
        options.kwd_license_opt_container = processBox.length? []: options.kwd_license_opt_container
        options.kwd_license_opt_container = ((inputType !== null) && (inputType.length === 0))?
                                            []: options.kwd_license_opt_container
        async.each(processBox, function(elem, cb) {
          var obj = {
            option: elem,
            permissions: unProcessedPermBox[0][key][permIterator],
            social_permissions: unProcessedPermBox[1][key][permIterator]
          }
          options.kwd_license_opt_container.push(obj)
          permIterator++
          cb()
        }, function (err) {
          log.info('kwd license container -> %s', util.inspect(options.kwd_license_opt_container))
          options.save()
        })
        break
      case 'rawdeposit':
        var permIterator = 0
        var inputType = updateoptions === null? [1]: unProcessedBox[key]
        var processBox = inputType === null? []: inputType
        options.deposit_opt_container = processBox.length? []: options.deposit_opt_container
        options.deposit_opt_container = ((inputType !== null) && (inputType.length === 0))?
                                            []: options.deposit_opt_container
        async.each(processBox, function(elem, cb) {
          var obj = {
            option: elem,
            permissions: unProcessedPermBox[0][key][permIterator],
            social_permissions: unProcessedPermBox[1][key][permIterator]
          }
          options.deposit_opt_container.push(obj)
          permIterator++
          cb()
        }, function (err) {
          log.info('deposit container -> %s', util.inspect(options.deposit_opt_container))
          options.save()
        })
        break
      case 'rawwithdrawal':
        var permIterator = 0
        var inputType = updateoptions === null? [1,2]: unProcessedBox[key]
        var processBox = inputType === null? []: inputType
        options.withdrawal_opt_container = processBox.length? []: options.withdrawal_opt_container
        options.withdrawal_opt_container = ((inputType !== null) && (inputType.length === 0))?
                                           []: options.withdrawal_opt_container
        async.each(processBox, function(elem, cb) {
          var obj = {
            option: elem,
            permissions: unProcessedPermBox[0][key][permIterator],
            social_permissions: unProcessedPermBox[1][key][permIterator]
          }
          options.withdrawal_opt_container.push(obj)
          permIterator++
          cb()
        }, function (err) {
          log.info('withdrawal container -> %s', util.inspect(options.withdrawal_opt_container))
          options.save()
        })
        break
    }
  })
  return options
}

var mapPermsToOptions = function (req, unProcessedBox) {
  // unProcessedBox as [] -> The arg should be Option container keys as Array Object
  var extractPerms = processPerms(req)
  var unProcessedPermBox = helpers.permArrayToObj(Object.keys(unProcessedBox), extractPerms.pref, extractPerms.social)

  log.info('mapping Perms To Options -> %s', util.inspect(unProcessedPermBox))
  return unProcessedPermBox
}

var processPerms = function(req) {
  var perms = [
    req.body.buy_perm_code ? req.body.buy_perm_code : 'u2u2u2',
    req.body.ask_perm_code ? req.body.ask_perm_code : 'u2u2u2',
    req.body.bid_perm_code ? req.body.bid_perm_code : 'u2u2u2u2',
    req.body.kwd_license_perm_code? req.body.kwd_license_perm_code : 'u2u2',
    req.body.deposit_perm_code? req.body.deposit_perm_code : 'u2',
    req.body.withdrawal_perm_code? req.body.withdrawal_perm_code : 'u2u2'
  ]

  return helpers.separate(perms)
}

module.exports = {
  processOptions: processOptions,
  mapPermsToOptions: mapPermsToOptions
}
