var express = require('express');
var router = express.Router();

var ctrlUser = require('../controllers/user');
var ctrlNotify = require('../controllers/notify');
var ctrlUserSub = require('../controllers/usersub');

/* api routes */
/* user apis */
router.get('/users', ctrlUser.userList);
//router.get('/users/:id', ctrlUser.getUser);
//router.post('/user', ctrlUser.createUser);
//router.put('/users/:id', ctrlUser.updateUser);
//router.delete('/users/:id', ctrlUser.deleteUser);

/* user notification subscription flag api */
//router.get('/users/:id/subnotify', ctrlNotify.isUserNotifiable);

/* user notification control api */
//router.get('/notifyoptionslist', ctrlNotify.getAllUserSubOptions);
//router.get('/users/:id/notifyoptions', ctrlNotify.getUserSubOptions);
//router.get('/users/:id/notifyoptions/:optionid'. ctrlNotify.getUserSubOpt);
//router.post('/users/:id/notifyoptions', ctrlNotify.createUserSubOptions);
//router.put('/users/:id/notifyoptions/:optionid', ctrlNotify.updateUserSubOptions);

/* following are user notification subscriptions*/
/* purchase/buy keyword api */
//router.get('/users/:id/subbuykwd', ctrlUserSub.getUserSubPurchasedKeywords);
//router.get('/users/:id/subbuykwd/trade', ctrlUserSub.getUserSubPurchasedKeywordsByTrade);
//router.get('/users/:id/subbuykwd/trade/highbid', ctrlUserSub.getUserSubPurchasedKeywordsByTradeonHgBid);
//router.get('/users/:id/subbuykwd/trade/onask', ctrlUserSub.getUserSubPurchasedKeywordsByTradeonAsk);

/* sell keyword api */
//router.get('/users/:id/subsetask', ctrlUserSub.getUserSubSoldKeywords);
//router.get('/users/:id/subeditask', ctrlUserSub.getUserSubSoldKeywords);
//router.get('/users/:id/subdelask', ctrlUserSub.getUserSubSoldKeywords);

/* bid keyword api */
//router.get('/users/:id/subsetbid', ctrlUserSub.getUserSubBidKeywords);
//router.get('/users/:id/subeditbid', ctrlUserSub.getUserSubBidKeywords);
//router.get('/users/:id/subdelbid', ctrlUserSub.getUserSubBidKeywords);

module.exports = router;
