var deviceSchema = require('../models/deviceInfoSchema.js');
var crypt = require("../config/crypt");			// Crypt Connectivity.
var master          = require('../config/masterfunc.js');       // Master Functions
    logger              = require('../config/w_config.js'),
    log                 = logger();

//========================= Export Functions ========================= //
/* Device Register*/
module.exports.deviceRegister = function(req, res){

	log.info('Page Name: Device.js');
	log.info('API Name : deviceRegister');
	log.info("Device Register API Hitted");
  	log.info('Parameters Receiving..');

	var deviceInfo = req.body.deviceInfo;
    var publicKey = req.body.publicKey;
    var signature = req.body.signature;
//	var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa';
//	var signature = 'b7e835a2e7ad371e90167c5e9ce2410371d076943c0f716c9b6a91effa5b36bd709b445892a3c009c67caba9790675b484a3311e0e28ea4aab29143bdabddf99';

	// console.log(deviceInfo);
	log.info('Public Key : '+publicKey);
	log.info('Signature : '+signature);

	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(master.validateParameter(deviceInfo, 'deviceInfo')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	// Checking Device ID in Device Info
	if ('Device_ID' in deviceInfo && deviceInfo.Device_ID.length > 0) 
	{
		log.info('Device ID Found');
		key = deviceInfo.Device_ID;

		if (!('Device_Type' in deviceInfo))
		{
			deviceInfo.Device_Type = "Mobile";
		}
	} 
	
	// Checking IP In Device Info
	else if ('IP' in deviceInfo && deviceInfo.IP != null) 
	{
		if (deviceInfo.IP.length > 0) {

			log.info('IP found '+deviceInfo.IP);	
			key = deviceInfo.IP;

			if (!('Device_Type' in deviceInfo))
			{
				deviceInfo.Device_Type = "Server";
			}
		}
		
	} 
	
	else 
	{
		log.info('Device IP and Device Id Both Are Missing');
		master.sendResponse(req, res, 200, 1, "Mandatory Input Not Found");
		return;
	}

	var query = {'publicKey': publicKey};

	deviceSchema.find(query, function(err, result){

		// Error In Finding Server
		if (err)
		{
			log.info('no such server');
			master.sendResponse(req, res, 200, 13, 'Server is not registered');
			return;
		}

		// Successfully Find Server
		log.info('Result: ');
		log.info(result);

		var privateKey = result[0].privateKey;
		var txt = 'deviceInfo='+deviceInfo+'&publicKey='+publicKey;
		//console.log(txt);

			crypt.validateSignature(txt, signature, privateKey, function(isValid){

				// Signature Not Match
				if (!isValid)
				{
					log.info('Invalid Signature');
					master.sendResponse(req, res, 200, 14, 'Invalid Signature');
					return;
				}	
				
				if ('Device_Type' in deviceInfo)
				{
					type = deviceInfo.Device_Type;
					log.info('Device Is '+type);
				}
				
				else if ('Device_ID' in deviceInfo) 
				{
					type = deviceInfo.Device_Type;
					log.info('Device is '+type);
				}
				
				else if ('IP' in deviceInfo) 
				{
					type = deviceInfo.Device_Type;
					log.info('Device is '+type);
				}

				var hashID = crypt.hashIt(key);
				
				log.info('id: '+hashID);
						
					deviceSchema.find({'publicKey': hashID}, function(err, result){

						log.info('Device Information :'+result);
			
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
										master.sendResponse(req, res, 200, 5, "Database Error Timeout Detected");
									}  
									else
									{

										log.info('Device Info Successfully Saved..');
										log.info("Public Key : "+hashID+" Private Key : "+hashKeyVal);
										master.sendResponse(req, res, 200, -1, {"publicKey": hashID, "privateKey": hashKeyVal});
									}
								
								});
				  
							} 
							
							else 
							{
								// For Old Devices
								deviceInfo.publicKey = hashID;
								deviceInfo.privateKey = hashKeyVal;
								deviceInfo.creationTime = Date.now();
						
								log.info('Existing Server');
								log.info("Public Key : "+hashID+" Private Key : "+hashKeyVal)
								master.sendResponse(req, res, 200, -1, {"publicKey": hashID, "privateKey": hashKeyVal});
					  
							}
						
						})


					});

			});

	});

}

module.exports.getPvtKey = function(req, res){

	var pubKey = req.body.pubKey; //Device public key
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	//var publicKey = '8b428ac0a0ae1be15a6e75d69fbc15a9129909ed261a1aeb4d1e087592659daa'; //keyword public key
	// var pubKey = '705d07596a332c903b552cf9b5ced80d6aeb6a7b';
	//var signature = 'e78d2967f9c4490306d8b40ca6bb1c3af849e9d3741b1067b5a58225295b3728f4fa75842b83fde1dceccf00f9e9182850c881e0903dc1e7a57c856a461c4bfe';
	log.info('Device PubKey : '+pubKey);
	log.info('Public Key : '+publicKey);
	log.info('Signature : '+signature);
	
	// Validate Publickey For PrivateKey Access
	if(!(master.validateParameter(pubKey, 'DevicePubKey')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	// Validate Public Key
	if(!(master.validateParameter(publicKey, 'Public Key')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	// Validate Signature
	if(!(master.validateParameter(signature, 'Signature')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	var query = {'publicKey': publicKey};		// For Authentication
	
	// Finding Server
	deviceSchema.find(query, function(err, result){
		
		// Error In Finding Server
		if (!result[0])
		{
			log.info('no such server');
			master.sendResponse(req, res, 200, 13, 'Server is not registered');
			return;
		}
		
		var privateKey = result[0].privateKey;
		var txt = 'pubKey='+pubKey+'&publicKey='+publicKey;
		
		// Checking Signature (Signature Match)
		crypt.validateSignature(txt, signature, privateKey, function(isValid){
			
			// Signature Not Match
			if (!isValid)
			{
				log.info('Invalid Signature');
				master.sendResponse(req, res, 200, 14, 'Invalid Signature');
				return;
			}
			
			var newQuery = {'publicKey': pubKey};
			
			deviceSchema.find(newQuery, function(err, result){
			log.info(result);
				// Error In Finding Server
				if (!result[0])
				{
					log.info('Device Not Registered');
					master.sendResponse(req, res, 200, 13, 'Device Not Registered');
					return;
				}
			
				var pvtKey = result[0].privateKey;
				log.info('Private Key : '+pvtKey);
				master.sendResponse(req, res, 200, -1, pvtKey);
			
			})
			
		})
		
	})

}
