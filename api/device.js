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
/* Device Register*/
module.exports.deviceRegister = function(req, res){

	console.log('Page Name: Device.js');
	console.log('API Name : deviceRegister');
	console.log("Device Register API Hitted");
  	console.log('Parameters Receiving..');

	var deviceInfo = req.body.deviceInfo;
	// var publicKey = req.body.publicKey;
	// var signature = req.body.signature;
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
	var signature = 'b7e835a2e7ad371e90167c5e9ce2410371d076943c0f716c9b6a91effa5b36bd709b445892a3c009c67caba9790675b484a3311e0e28ea4aab29143bdabddf99';

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

	var query = {'publicKey': publicKey};

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
						
					deviceSchema.find({'publicKey': hashID}, function(err, result){

						console.log('Device Information :'+result);
			
						crypt.createKeyPair(deviceInfo.Device_ID, function(hashKeyVal) {
					  
							if (result[0] == null || typeof result[0] == 'undefined')   
							{
								// For New Device
								deviceInfo.publicKey = hashID;
				  
								deviceInfo.privateKey = hashKeyVal;
								deviceInfo.creationTime = Date.now();
								
								var deviceInfoData = new deviceSchema(deviceInfo);

								// Save Device Info
								deviceInfoData.save(deviceInfo, function(err){
														  
									if (err)
									{
										console.log(err);
										sendResponse(req, res, 200, 5, "Database Error Timeout Detected");
									}  
									else
									{

										console.log('Device Info Successfully Saved..');
										console.log("Public Key : "+hashID+" Private Key : "+hashKeyVal);
										sendResponse(req, res, 200, -1, {"publicKey": hashID, "privateKey": hashKeyVal});
									}
								
								});
				  
							} 
							
							else 
							{
								// For Old Devices
								deviceInfo.publicKey = hashID;
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

	var pubKey = req.body.pubKey; //Device public key
	var publicKey = req.body.publicKey;
	// var signature = req.body.signature;
	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa'; //keyword public key
	// var pubKey = '705d07596a332c903b552cf9b5ced80d6aeb6a7b';
	var signature = 'ff065230713974094506bc718e429ed1a86354e1c15ee0b19db06a84c2961c9f292b43924280cb233142ba730ed5ef7633c3ff0d8a1d8791ff6f9072294cd80d';
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

	var query = {'publicKey': publicKey};		// For Authentication
	
	// Finding Server
	deviceSchema.find(query, function(err, result){
		
		// Error In Finding Server
		if (!result[0])
		{
			console.log('no such server');
			sendResponse(req, res, 200, 13, 'Server is not registered');
			return;
		}
		
		var privateKey = result[0].privateKey;
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
			
			var newQuery = {'publicKey': pubKey};
			
			deviceSchema.find(newQuery, function(err, result){
			console.log(result);
				// Error In Finding Server
				if (!result[0])
				{
					console.log('Device Not Registered');
					sendResponse(req, res, 200, 13, 'Device Not Registered');
					return;
				}
			
				var pvtKey = result[0].privateKey;
				console.log('Private Key : '+pvtKey);
				sendResponse(req, res, 200, -1, pvtKey);
			
			})
			
		})
		
	})

}

var serverCheck = function(query, cb){

	deviceSchema.find(query, function(err, res){

		if (err)
		{
			cb(false);
		}

		cb(res[0]);

	});

}