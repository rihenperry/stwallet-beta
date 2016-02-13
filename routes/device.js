var deviceSchema = require('../models/deviceInfoSchema.js');

//========================= Page Functions ========================= //
// Response Function
// function sendResponse(req, res, status, errCode, errMsg) {

// 	var d = Date.now();
// 	console.log(status +" "+ errCode +" "+ errMsg + " " + d);
// 	res.status(status).send({
// 		errCode: errCode, 
// 		errMsg: errMsg,
// 		dbDate: d
// 	});
	
// }

// // Parameter Validation	Function
// function validateParameter(parameter, name){
    
// 	if(parameter === undefined || parameter.length<=0)
// 	{
// 		console.log(name+' Is Missing');
// 		return false;
// 	}

// 	return true;
// }

//========================= Export Functions ========================= //

module.exports.deviceRegister = function(req, res){

	console.log('Page Name: Device.js');
	console.log('API Name : deviceRegister');
	console.log("Device Register API Hitted");
  	console.log('Parameters Receiving..');

	var deviceInfo = req.body.deviceInfo;
	// var publicKey = req.body.publicKey;
	// var signature = req.body.signature;
	var publicKey = '56bdd5a84abb25f4066b3fae';

	console.log('Device Info: '+deviceInfo);
	// console.log('Publick Key : '+publicKey);
	// console.log('Signature : '+signature);

	// Validate Public Key
	// if(!(validateParameter(publicKey, 'Public Key')))
	// {
	// 	sendResponse(req, res, 200, 1, "Mandatory field not found");
	// 	return;
	// }

	// // Validate Signature
	// if(!(validateParameter(signature, 'Signature')))
	// {
	// 	sendResponse(req, res, 200, 1, "Mandatory field not found");
	// 	return;
	// }

	var deviceInfoData = new deviceSchema(deviceInfo);

	deviceSchema.find({'_id': publicKey}, function(err, result){

		// Error In Finding Server
		if (err)
		{
			console.log('no such server');
			sendResponse(req, res, 200, 13, 'Server is not registered');
			return;
		}

		console.log(result);
	});



	// deviceInfoData.save(function (err) {
	//   if (err) {
	// 		throw err;
	//   }
	//   else {
	//   	console.log("Device info save successfully");
	//   	res.send('Device info save successfully');
	//   }
	// });

}

// module.exports.getPvtKey = function(req, res){

// 	var pubkey = req.body.pubkey;
// 	var publicKey =req.body.publicKey;
// 	var signature = req.body.signature;

// 	console.log('Device PubKey : '+pubKey);
// 	console.log('Public Key : '+publicKey);
// 	console.log('Signature : '+signature);
// }