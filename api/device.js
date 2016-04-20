var deviceSchema        = require('../models/deviceInfoSchema.js');
var master              = require('../config/masterfunc.js');       // Master Functions
var crypt               = require("../config/crypt");			    // Crypt Connectivity.
var master              = require('../config/masterfunc.js');       // Master Functions
    logger              = require('../config/w_config.js'),
    log                 = logger();

//========================= Export Functions ========================= //
/* Device Register*/
module.exports.deviceRegister = function(req, res){

	log.info('Page Name: Device.js');
	log.info('API Name : deviceRegister');
	log.info("Device Register API Hitted");
  	log.info('Parameters Receiving..');

	var deviceInfo     = req.body.deviceInfo;
    var publicKey      = req.body.publicKey;
    var signature      = req.body.signature;

	log.info('Device Info : '+deviceInfo);

	if(!(master.validateParameter(deviceInfo, 'deviceInfo')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	var query = {'publicKey': publicKey};
    //var text = 'deviceInfo='+encodeURIComponent(deviceInfo)+'&publicKey='+encodeURIComponent(publicKey);
    var text = 'deviceInfo='+deviceInfo+'&publicKey='+publicKey;

    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

        deviceInfo=JSON.parse(deviceInfo)
        
        
        // Checking Device ID in Device Info
        if (deviceInfo.Device_ID != "" || deviceInfo.Device_ID != null) 
        {
            log.info('Device ID Found');
            //console.log(deviceInfo.Device_ID);
            key = deviceInfo.Device_ID;

            if (!(deviceInfo.Device_Type == "" || deviceInfo.Device_Type == null))
            {
                deviceInfo.Device_Type = "Mobile";
            }
        } 

        // Checking IP In Device Info
        else if (deviceInfo.IP != "" || deviceInfo.IP != null) 
        {
            if (deviceInfo.IP.length > 0) {

                log.info('IP found '+deviceInfo.IP);	
                key = deviceInfo.IP;

                if (!(deviceInfo.Device_Type == "" || deviceInfo.Device_Type == null))
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
        
        
        if (deviceInfo.Device_Type)
        {
            type = deviceInfo.Device_Type;
            log.info('Device Is '+type);
        }

        else if (deviceInfo.Device_ID) 
        {
            type = deviceInfo.Device_Type;
            log.info('Device is '+type);
        }

        else if (deviceInfo.IP)
        {
            type = deviceInfo.Device_Type;
            log.info('Device is '+type);
        }

        var hashID = crypt.hashIt(key);

        log.info('id: '+hashID);

        deviceSchema.find({'publicKey':hashID},function(err, result){

            console.log(result);
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
                    deviceInfoData.save(deviceInfo, function(err, result){

                        if (err)
                        {
                            console.log(err);
                            master.sendResponse(req, res, 200, 5, "Database Error Timeout Detected");
                            return;
                        }  
                        
                        if(result)
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

        })

    })

}

module.exports.getPvtKey = function(req, res){

	var pubKey     = req.body.pubKey; //Device public key
	var publicKey  = req.body.publicKey;
	var signature  = req.body.signature;
	
	log.info('Device PubKey : '+pubKey);
	
	// Validate Publickey For PrivateKey Access
	if(!(master.validateParameter(pubKey, 'DevicePubKey')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	var query = {'publicKey': publicKey};		    // For Authentication
    //var text  = 'pubKey='+encodeURIComponent(pubKey)+'&publicKey='+encodeURIComponent(publicKey);
    var text  = 'pubKey='+pubKey+'&publicKey='+publicKey;
	
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
			
        var newQuery = {'publicKey': pubKey};
			
        deviceSchema.find(newQuery, function(err, result){
			
            if(err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, 'Database Error');
                return;
            }
            
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

}
