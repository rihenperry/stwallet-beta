var mongoose = require('mongoose')

var notifyPermissionsSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  perm_code: {type: String, required: true}
})

module.exports = mongoose.model('NotifyPerm', notifyPermissionsSchema, 'NotifyPerms')
