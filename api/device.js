var deviceSchema = require('../models/deviceInfoSchema.js');
var crypt = require("../config/crypt");			// Crypt Connectivity.

//========================= Page Functions ========================= //
// Response Function
function sendResponse(req, res, status, errCode, errMsg) {

	var d = Date.now();
	console.log(status +" "+ errCode +" "+ errMsg + " " + d);
	res.status(status).send({
		errCode: errCode, 
		errMsg: errMsg,
		dbDate: d
	});
	
}

// Parameter Validation	Function
function validateParameter(parameter, name){
    
	if(parameter === undefined || parameter.length<=0)
	{
		console.log(name+' Is Missing');
		return false;
	}

	return true;
}

//========================= Export Functions ========================= //

module.exports.deviceRegister = function(req, res){

	console.log('Page Name: Device.js');
	console.log('API Name : deviceRegister');
	console.log("Device Register API Hitted");
  	console.log('Parameters Receiving..');

	var deviceInfo = req.body.deviceInfo;
	// var publicKey = req.body.publicKey;
	// var signature = req.body.signature;
	var publicKey = 'd03c98795d924e0af468cdfb83a89cb08b5a7888b97101afbb8b8e37a897d12c';
	var signature = '70e5bdd0e946b51249fb580de0c23382485e6db0e9d6616c1d0148a4107cd8d15b50dc8da8cc98984d567b70ed1a05e62f11f5f3fce37a6cdccef47ca9dde7f1';

	// console.log(deviceInfo);
	console.log('Public Key : '+publicKey);
	console.log('Signature : '+signature);

	// Validate Public Key
	if(!(validateParameter(publicKey, 'Public Key')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(validateParameter(signature, 'Signature')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// var ObjectId = require('mongoose').Types.ObjectId; 
	var query = {'_id': '56bf035a9c25ed401a471a14'}

	deviceSchema.find(query, function(err, result){

		// Error In Finding Server
		if (err)
		{
			console.log('no such server');
			sendResponse(req, res, 200, 13, 'Server is not registered');
			return;
		}

		// Successfully Find Server
		console.log('Result: ');
		console.log(result);

		var privateKey = result[0].privateKey;
		var txt = 'deviceInfo='+deviceInfo+'&publicKey='+publicKey;
		//console.log(txt);

			crypt.validateSignature(txt, signature, privateKey, function(isValid){

				// Signature Not Match
				if (!isValid)
				{
					console.log('Invalid Signature');
					sendResponse(req, res, 200, 14, 'Invalid Signature');
					return;
				}	

				// Checking Device ID in Device Info
				if ('Device_ID' in deviceInfo && deviceInfo.Device_ID.length > 0) 
				{
					console.log('Device ID Found');
					key = deviceInfo.Device_ID;

					if (!('Device_Type' in deviceInfo))
					{
						deviceInfo.Device_Type = "Mobile";
					}
				} 
				
				// Checking IP In Device Info
				else if ('IP' in deviceInfo && deviceInfo.IP.length > 0) 
				{
					console.log('IP found '+deviceInfo.IP);	
					key = deviceInfo.IP;

					if (!('Device_Type' in deviceInfo))
					{
						deviceInfo.Device_Type = "Server";
					}
				} 
				
				else 
				{
					console.log('Device IP and Device Id Both Are Missing');
					sendResponse(req, res, 200, 1, "Mandatory Input Not Found");
					return;
				}
				
				if ('Device_Type' in deviceInfo)
				{
					type = deviceInfo.Device_Type;
					console.log('Device Is '+type);
				}
				
				else if ('Device_ID' in deviceInfo) 
				{
					type = deviceInfo.Device_Type;
					console.log('Device is '+type);
				}
				
				else if ('IP' in deviceInfo) 
				{
					type = deviceInfo.Device_Type;
					console.log('Device is '+type);
				}

				var hashID = crypt.hashIt(key);
				
				console.log('id: '+hashID);
					deviceSchema.find({'_id': hashID}, function(err, result){

						console.log('Device Information :'+retVal1);
			
						crypt.createKeyPair(deviceInfo.Device_ID, function(hashKeyVal) {
					  
							if (retVal1[0] == null || typeof retVal1[0] == 'undefined')   
							{
								// For New Device
								deviceInfo._id = hashID;
				  
								deviceInfo.privateKey = hashKeyVal;
								deviceInfo.creationTime = Date.now();
								
								var deviceInfoData = new deviceSchema(deviceInfo);

								// Save Device Info
								deviceInfoData.save(deviceInfo, function(err){
								
									console.log('Device Info Successfully Saved..');
						  
									if (err)
									{
										console.log(err);
										sendResponse(req, res, 200, 5, "Database Error Timeout Detected");
									}  
									else
									{
										console.log("Public Key : "+hashID+" Private Key : "+hashKeyVal);
										sendResponse(req, res, 200, -1, {"publicKey": hashID, "privateKey": hashKeyVal});
									}
								
								});
				  
							} 
							
							else 
							{
								// For Old Devices
								deviceInfo._id = hashID;
								deviceInfo.privateKey = hashKeyVal;
								deviceInfo.creationTime = Date.now();
						
								console.log('Existing Server');
								console.log("Public Key : "+hashID+" Private Key : "+hashKeyVal)
								sendResponse(req, res, 200, -1, {"publicKey": hashID, "privateKey": hashKeyVal});
					  
							}
						
						})

					});

			});

	});

}

module.exports.getPvtKey = function(req, res){

	var pubKey = req.body.pubKey;
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	
	console.log('Device PubKey : '+pubKey);
	console.log('Public Key : '+publicKey);
	console.log('Signature : '+signature);
	
	// Validate Publickey For PrivateKey Access
	if(!(validateParameter(pubKey, 'DevicePubKey')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	// Validate Public Key
	if(!(validateParameter(publicKey, 'Public Key')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(validateParameter(signature, 'Signature')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	var query = {'_id': publicKey};		// For Authentication
	
	// Finding Server
	deviceSchema.find(query, function(err, result){
		
		// Error In Finding Server
		if (!retVal[0])
		{
			console.log('no such server');
			sendResponse(req, res, 200, 13, 'Server is not registered');
			return;
		}
		
		var privateKey = retVal[0].privateKey;
		var txt = 'pubKey='+pubKey+'&publicKey='+publicKey;
		
		// Checking Signature (Signature Match)
		crypt.validateSignature(txt, signature, privateKey, function(isValid){
			
			// Signature Not Match
			if (!isValid)
			{
				console.log('Invalid Signature');
				sendResponse(req, res, 200, 14, 'Invalid Signature');
				return;
			}
			
			var newQuery = {'_id': pubKey};
			
			deviceSchema.find(newQuery, function(err, result){
			
				// Error In Finding Server
				if (!retVals[0])
				{
					console.log('Device Not Registered');
					sendResponse(req, res, 200, 13, 'Device Not Registered');
					return;
				}
			
				var pvtKey = retVals[0].privateKey;
				console.log('Private Key : '+pvtKey);
				sendResponse(req, res, 200, -1, pvtKey);
			
			})
			
		})
		
	})

}