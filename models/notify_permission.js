var mongoose = require('mongoose');

var notify_permissions = new mongoose.Schema({
    _id: {type: Number, required: true},
    perm: {type: String, required: true}
});

module.exports = mongoose.model('NotifyPerm', notify_permissions, 'NotifyPerms');
