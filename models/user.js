var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  uname: {type: String, required: true},
  notify_options_fk_key: {type: String, required: true},
  createdOn: {type: Date, "default": Date.now}
});

mongoose.model('User', userSchema, 'Users');
