// Pages
var schema      = require('../models/userSchema.js');
var crypt       = require('../config/crypt.js');

//========================= Page Functions ========================= //
// Response Function
function sendResponse(req, res, status, errCode, errMsg){
    
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

// Email Validation
function validateEmail(email)
{
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return re.test(email);	
}

//========================= Export Functions ========================= //

/* Register User */
module.exports.secureRegister = function(req, res){
   
    console.log('Page Name : user.js');
	console.log('API Name : secureRegister');
	console.log('Secure Register API Hitted');
	console.log('Parameters Receiving..');
    
    var first_name         = req.body.first_name;
	var last_name          = req.body.last_name;
	var email              = req.body.email;
	var password           = req.body.password;
	var confirm_password   = req.body.confirm_new_password;
	var country            = req.body.country;
	var flag               = req.body.flag;
	var mobile_number      = req.body.mobile_number;
    var referral           = req.body.referral;
    //var publicKey          = req.body.publicKey;
    //var signature          = req.body.signature;
    
    var creationTime= Date.now();
	var accountID, privateKey, referred_person_email, stat, myRefCode, refcode;
	var txt = ""; 
    var salt = "";
    
    console.log('First Name :'+first_name);
	console.log('Last Name :'+last_name);
	console.log('Email : '+email);
	console.log('Password : '+password);
    console.log('Country :'+country);
    console.log('Flag : '+flag);
    console.log('Mobile Number : '+mobile_number);
    console.log('Refferal : '+referral);
    //console.log('Public Key : '+publicKey);
    //console.log('Signature : '+signature);
    
    var seed= crypt.hashIt(""+Math.random() * creationTime);
    
    // Validate Public Key
	//if(!(validateParameter(publicKey, 'Public Key')))
	//{
	//	sendResponse(req, res, 200, 1, "Mandatory field not found");
	//	return;
	//}

	// Validate Signature
	//if(!(validateParameter(signature, 'Signature')))
	//{
	//	sendResponse(req, res, 200, 1, "Mandatory field not found");
	//	return;
	//}
	
	// Validate Email
	if(!(validateParameter(email, 'Email')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Validate Password And Repeat Password
	if(password == "" || password == null || confirm_password == "" || confirm_password == null)
	{
		console.log('Any of Password Field is Missing');
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	else if(password == confirm_password)
	{
		if(password.length<6)
		{
			console.log('Your Password Is Less Than Six Characters');
			sendResponse(req, res, 200, 20, "Your password should be of minimum six characters");
			return;   
		}
		
		else
		{
			// Use in Final Match
			var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
			for(var i = 12; i > 0; --i) 
			{
				salt += chars[Math.round(Math.random() * (chars.length - 1))];
			}
			
			console.log('Salt :'+salt);
			password = crypt.hashIt(salt+password);
		}
	}
	else
	{
		console.log('Passwords Are Not Matching');
		sendResponse(req, res, 200, 6, "Incorrect Email/password");
		return;
	}
	
	// Validate Country
	if(country == "Select Country")
	{
		console.log('Country Not Selected');
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    // Find Existance of User
    schema.find({email:email},function(err, result){
        
        if(err)
        {
            console.log(err);
            return err;
        }
        
        if(result.length>0) // Already Exists
        {
            console.log(email+" Already exists");
            sendResponse(req, res, 200, 2, "Email already in use");
            return;
        }
        
        else // Fresh User
        {
            accountID = crypt.hashIt(email);
            var referred_person_code = referral;
            
            schema.find({my_referral_id:referred_person_code},function(err, result){
                
                if(err)
                {
                    console.log(err);
                    return err;
                }
                
                // If No Referred Email Found
                if(result.length<=0)
                {
                    // Blank Referral
                    if(referred_person_code=="" || referred_person_code==null || referred_person_code==undefined)
                    {
                        referred_person_email = "";
                        stat = 0;
                    }
                    
                    else // Wrong Refferal
                    {
                        console.log('Wrong Affiliate Ref Code Entered');
                        sendResponse(req, res, 200, 18, "Wrong Affiliate Reference");
                        return;
                    }
                }
                
                // If Referral Is Provided
                else
                {
                    referred_person_email = result[0].email;
                    stat = 1;
                }
                
                // Checking length of fname (If first Name is of less than 4 letters)
                if(first_name.length<4)				
                {
                    var charlist = 'abcdefghijklmnopqrstuvwxyz';	// Character String Value need to generate Random Characters
                    var diff = 4-first_name.length;	
                    var randchar = "";
                    for (var i=0; i<diff; i++)
                    {
                        randchar = randchar+charlist.charAt(Math.floor(Math.random() * charlist.length));	// Random Character function
                    }

                    refcode=first_name+randchar+last_name.substr(0, 1);	// Referral Code Generated Here.... for firstname having less than 4 characters 	
                }
                
                // If length is Greter Or equal to 4
                else 
                {
                    refcode=first_name.substr(0,4)+last_name.substr(0, 1);	// Referral Code Generated Here.... for firstname having greater than or equal to 4 characters 
                }
                
                refcode = refcode.toLowerCase();	// Convert Referral Code to LOWER CASE
                
                schema.find({my_referral_id:{$regex:refcode}},function(err, result){
                        
                    if(err)
                    {
                        console.log(err);
                        return err;
                    }
                    
                    if(result.length>0) // no of Results with Same Refcode
                    {
                        refcode = refcode+result.length;
                    }
                    
                    else // Fresh Refcode
                    {
                        refcode=refcode;
                    }
                    
                    // Making Object of myInfo
                    var myInfo = new schema({
                        _id: accountID,
                        first_name : first_name,
                        last_name : last_name,
                        email : email,
                        password : password,
                        mobile_number : mobile_number,
                        ref_email : referred_person_email,
                        my_referral_id : refcode,
                        seed : seed,
                        creationTime : creationTime,
                        salt : salt,
                        first_buy_status: stat
                    });
                    
                    myInfo.save(function(err){
                        if(err)
                        {
                            console.log(err);
                            return err;
                        }
                        
                        console.log('Saved SuccessFully');
                        sendResponse(req, res, 200, -1, "Success");
                    });
                    
                })
                
            })
        }
        
    })

}


/* Set User Details */
module.exports.setUserDetails = function(req, res){
    
    console.log('Page Name : user.js');
	console.log('API Name : setUserDetails');
	console.log('Set User Details API Hitted');
	console.log('Parameters Receiving..');
    
    var email           = req.body.email;
	var first_name      = req.body.first_name;
	var last_name       = req.body.last_name;
	var gender          = req.body.gender;
	var address1        = req.body.address1;
	var address2        = req.body.address2;
	var country         = req.body.country;
	var state           = req.body.state;
	var zip             = req.body.zip;
	var city            = req.body.city;
	var mobile_number   = req.body.mobile_number;
    //var publicKey          = req.body.publicKey;
    //var signature          = req.body.signature;
    
    console.log('Email : '+email);
    console.log('First Name : '+first_name);
    console.log('Last Name : '+last_name);
    console.log('Gender : '+gender);
    console.log('Address1 : '+address1);
    console.log('Address2 : '+address2);
    console.log('Country : '+country);
    console.log('State : '+state);
    console.log('Zip : '+zip);
    console.log('City : '+city);
    console.log('Mobile Number : '+mobile_number);
    //console.log('Public Key : '+publicKey);
    //console.log('Signature : '+signature);
    
    // Validate Public Key
	//if(!(validateParameter(publicKey, 'Public Key')))
	//{
	//	sendResponse(req, res, 200, 1, "Mandatory field not found");
	//	return;
	//}

	// Validate Signature
	//if(!(validateParameter(signature, 'Signature')))
	//{
	//	sendResponse(req, res, 200, 1, "Mandatory field not found");
	//	return;
	//}
	
	// Validate Email
	if(!(validateParameter(email, 'Email')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Valiadte Mobile Number
	if(mobile_number!="" && isNaN(mobile_number))
	{
		console.log('Invalid Mobile');
		sendResponse(req, res, 200, 8, "Incorrect Mobile");
		return;
	}
    
    var creationTime= Date.now();
    
    // Updated Info JSON
    var updatedInfo ={
        
        first_name: first_name,   					// First Name
        last_name: last_name,       			   	// Last Name
        mobile_number: mobile_number,				// Mobile Number
        lastLogin: creationTime,                   	// Last login time
        lastUpdated: creationTime,                  // Last update time
        address1: address1,							// Address1 of User
        address2: address2,							// Address2 of User
        gender: gender,								// Gender
        country: country,							// Country
        state: state,								// State
        zip: zip,									// Zip
        city: city									// City
        
    }
    
    // Find and Update User
    schema.findOneAndUpdate({email:email},updatedInfo,function(err, result){
        
        if(err)
        {
            console.log(err);
            return err;
        }
        
        if(result==null || result=="") // Email Not Found
        {
            console.log(email+" Not Registered");
            sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
            return;
        }
        
        else
        {
            console.log('Details Successfully Updated');
            sendResponse(req, res, 200, -1, 'Success');
        }
        
    })
    
}
