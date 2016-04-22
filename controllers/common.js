/* redundant code among controllers stays here*/
var mongoose = require('mongoose')
var async = require('async')
var util = require('util')

var helpers = require('../helpers/utils')

var NotifyOption = mongoose.model('NotifyOption')

var processOptions = function (req, updateoptions) {
  var unProcessedBox = {
    rawbuy: req.body.buy_container ? JSON.parse(req.body.buy_container) : [1, 2, 3],
    rawask: req.body.ask_container ? JSON.parse(req.body.ask_container) : [1, 2, 3],
    rawbid: req.body.bid_container ? JSON.parse(req.body.bid_container) : [1, 2, 3, 4]
  }
  log.info('unProcessedBox -> %s', util.inspect(unProcessedBox))

  log.info('PermBox-> %s', util.inspect(Object.keys(unProcessedBox)))

  var unProcessedPermBox = mapPermsToOptions(req, unProcessedBox)
  log.info('processed PermBox ->', util.inspect(unProcessedPermBox))

  var options = updateoptions === null ? (
    new NotifyOption({
      buy_opt_container: [],
      ask_opt_container: [],
      bid_opt_container: []
    })
    ) : updateoptions

  Object.keys(unProcessedBox).map(function (key) {
    switch (key) {
      case 'rawbuy':
        var permIterator = 0
        async.each(unProcessedBox[key], function (elem, cb) {
          var obj = {
            option: elem,
            permissions: unProcessedPermBox[key][permIterator]
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
        async.each(unProcessedBox[key], function (elem, cb) {
          var obj = {
            option: elem,
            permissions: unProcessedPermBox[key][permIterator]
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
        async.each(unProcessedBox[key], function (elem, cb) {
          var obj = {
            option: elem,
            permissions: unProcessedPermBox[key][permIterator]
          }
          options.bid_opt_container.push(obj)
          permIterator++
          cb()
        }, function (err) {
          log.info('bid container -> %s', util.inspect(options.bid_opt_container))
          options.save()
        })
        break
    }
  })
  return options
}

var mapPermsToOptions = function (req, unProcessedBox) {
  // unProcessedBox as [] -> The arg should be Option container keys as Array Object
  var all_in_one_perm_container = req.body.buy_ask_bid_perm_container ? JSON.parse(req.body.buy_ask_bid_perm_container) : null
  var unProcessedPermBox = all_in_one_perm_container !== null ? (
    helpers.permArrayToObj(Object.keys(unProcessedBox), all_in_one_perm_container)
    ) : (
    helpers.permArrayToObj(Object.keys(unProcessedBox),
      [req.body.buy_perm_code ? req.body.buy_perm_code : '222',
        req.body.ask_perm_code ? req.body.ask_perm_code : '222',
        req.body.bid_perm_code ? req.body.bid_perm_code : '2222'])
    )

  log.info('mapping Perms To Options -> %s', util.inspect(unProcessedPermBox))
  return unProcessedPermBox
}

module.exports = {
  processOptions: processOptions,
  mapPermsToOptions: mapPermsToOptions
}
