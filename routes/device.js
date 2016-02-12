var deviceSchema = require('../models/deviceInfoSchema.js');

module.exports.deviceRegister = function(req, res){

	var deviceInfo = req.body.deviceInfo;
	// var publicKey = req.body.publicKey;
	// var signature = req.body.signature;

	console.log(deviceInfo);
	// console.log(publicKey);
	// console.log(signature);

	var deviceInfoData = new deviceSchema(deviceInfo);

	deviceInfoData.save(function (err) {
	  if (err) {
			return err;
	  }
	  else {
	  	console.log("Post saved");
	  	res.send('Device info save successfully');
	  }
	});
}

module.exports.getPvtKey = function(req, res){

	var pubkey = req.body.pubkey;
	var publicKey =req.body.publicKey;
	var signature = req.body.signature;

	console.log('Device PubKey : '+pubKey);
	console.log('Public Key : '+publicKey);
	console.log('Signature : '+signature);
}