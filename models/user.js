var mongoose = require('mongoose');

var NotifyOption = mongoose.model('NotifyOption');

var userSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  uname: {type: String, required: true},
  notify_options_fk_key: {type: mongoose.Schema.Types.ObjectId, ref: 'NotifyOption'},
  createdOn: {type: Date, "default": Date.now}
});

module.exports = mongoose.model('User', userSchema, 'Users');
