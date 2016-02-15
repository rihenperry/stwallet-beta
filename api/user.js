/*global require, module, console */
/*jslint node: true */
"use strict";

// Pages
var userSchema      = require('../models/userSchema.js');       // User Schema
var deviceSchema    = require('../models/deviceInfoSchema.js')  // DeviceInfo Schema
var crypt           = require('../config/crypt.js');            // Crypt/Signature Related Functionality
var mailer          = require('../config/mail.js');             // Mail Functionality


//========================= Page Functions ========================= //

// Response Function
function sendResponse(req, res, status, errCode, errMsg) {
    
    var d = Date.now();
    console.log(status + " " + errCode + " " + errMsg + " " + d);
    res.status(status).send({
		errCode: errCode,
		errMsg: errMsg,
		dbDate: d
    });
}

// Parameter Validation	Function
function validateParameter(parameter, name) {
    
	if (parameter === undefined || parameter.length <= 0) {
		console.log(name + ' Is Missing');
		return false;
	}

	return true;
}

// Email Validation
function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return re.test(email);
}

// Verification Email Function on Signup(Register)
function sendVerificationEmail(accountInfo, flag){
	
	var vhash = encodeURIComponent(crypt.generate(accountInfo._id));

	if(flag == '2') // Wallet 
	{
		var url= protocol+"://scoinz.com/presaleWallet/wallet/verifyUser.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&errcode=15";
	}
	else // Web
	{
		var url= protocol+"://searchtrade.com/keywords/views/verifyUser.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email);
	}
	
	var text= '<div style="border:solid thin black; padding: 10px;"><div style="background: #25a2dc; color: #fff; padding: 5px"><img src="http://searchtrade.com/images/searchtrade_white.png" width="200px"></div><br><br><div style="background: #fff; color: #000; padding: 5px;"><div style="width:75%; margin: auto"><p>Hello '+accountInfo.first_name+' '+accountInfo.last_name+',</p><br><p>Your SearchTrade account has been created.</p><p>Please click <a href="'+url+'">Here</a> to verify your email address or copy/paste the link below into your browser.</p><p>'+url+'</p></div></div></div></div>';

	// Setup E-mail Data With Unicode Symbols
	var mailOptions= {
		from: 'Search Trade <donotreply@searchtrade.com>', 	// Sender address
		to: accountInfo.email, 								// List of Receivers
		subject: "Search Trade: Email Verification", 		// Subject line
		text: text,											// Text
		html: text
	};

	if(flag != '3')
	{
		mailer.sendmail(mailOptions);
	}
  
}

// Send Reset Password Link to User Email Address
function sendRestEmail(accountInfo, flag){
  
	var vhash = encodeURIComponent(crypt.generate(accountInfo._id));
  
	if(flag == '1') // For Web
	{
		var url= protocol+"://searchtrade.com/forgetpwd.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email);
	}
  
	if(flag == '2')	// For Wallet
	{
		var url= protocol+"://scoinz.com/presaleWallet/wallet/resetpass.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email);
	}
  
	var text= '<div style="border: solid thin black; padding: 10px;"><div style="background: #25a2dc; color: #fff; padding: 5px"><img src="http://searchtrade.com/images/searchtrade_white.png" width="200px"></div><br><br><div style="background: #fff; color: #000; padding: 5px;"><div style="width:75%; margin: auto"><p>Hi '+accountInfo.first_name+' '+accountInfo.last_name+',</p><br><p>You have requested to Change your SearchTrade account password.</p><p>Please click <a href="'+url+'">Here</a> to reset your password.</p><p>OR</p><p>Copy Link Address below in your web browser</p><p>'+url+'</p><br><p>Regards the from SearchTrade team</p><br><p>Product of Searchtrade.com Pte Ltd, Singapore</p></div></div></div>';

	// Setup E-mail data with unicode symbols
	var mailOptions= {
		from: 'Search Trade <donotreply@searchtrade.com>', 	// Sender address
		to: accountInfo.email, 								// List of Receivers
		subject: "Search Trade : Reset your password", 		// Subject line
		text: text,											// Text
		html: text
	};
	
	mailer.sendmail(mailOptions);
}


/* Export Fuctions */

/*============================= Register User =============================*/

module.exports.secureRegister = function (req, res) {
   
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
    //var  publicKey          = req.body.publicKey;
    //var  signature          = req.body.signature;
        
    var creationTime = Date.now();
    var accountID;
    var referred_person_email;
    var stat;
    var refcode;
    var txt = "";
    var salt = "";
    var seed = crypt.hashIt(Math.random() * creationTime);
    
    console.log('First Name :' + first_name);
	console.log('Last Name :' + last_name);
	console.log('Email : ' + email);
	console.log('Password : ' + password);
    console.log('Country :' + country);
    console.log('Flag : ' + flag);
    console.log('Mobile Number : ' + mobile_number);
    console.log('Refferal : ' + referral);
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
	if (!(validateParameter(email, 'Email')))
    {
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if (!(validateEmail(email)))
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
    userSchema.find({email:email},function(err, result){
        
        if(err)
        {
            console.log(err);
            return err;
        }
        
        console.log('Result : '+result);
        
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
            
            userSchema.find({my_referral_id:referred_person_code},function(err, result){
                
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
                
                userSchema.find({my_referral_id:{$regex:refcode}},function(err, result){
                        
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
                    var myInfo = new userSchema({
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
                        
                        sendVerificationEmail(accountInfo, flag);   // Send Email to Registered Email Address For Account Verification
                        console.log('Saved SuccessFully');
                        sendResponse(req, res, 200, -1, "Success");
                        
                    });
                    
                })
                
            })
        }
        
    })

}


/*============================= Verify =============================*/

module.exports.verifyAccount = function(req, res){
    
    console.log('Page Name : user.js');
	console.log('API Name : verifyAccount');
	console.log('Verify Account API Hitted');
	console.log('Parameters Receiving..');
    
    var auth       = req.body.auth;
	var email      = req.body.email;
    //var publicKey   = req.body.publicKey;
	//var signature   = req.body.signature;
	
	console.log('Email : '+email);
	console.log('Auth : '+auth);
    //console.log('Public Key : '+publicKey);
	//console.log('Signature : '+signature);
  
	auth=auth.replace(/\ /g,'+');
    
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
    
    userSchema.find({email:email},function(err, result){
        
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
            var tokenTest= crypt.token.verify(emailresults[0]._id, auth);
        
            if (tokenTest== 2)
            {
                console.log('Token is Expired');
                sendResponse(req, res, 200, 10, "Link expired");
                return;
            }

            // Token is Invalid
            else if (tokenTest== 0)
            {
                console.log('Token is Invalid');
                sendResponse(req, res, 200, 11, "Invalid link");
                return;
            }

            // Token is Valid
            else if (tokenTest == 1)
            {
                console.log('Token is Valid');
            }

            // Unknown Token Output
            else
            {
                console.log('Unknown Token Output');
                sendResponse(req, res, 200, 11, "Invalid link");
                return;
            } 
            
            if(result[0].active==1)
            {
                console.log('Account Already Activated');
				sendResponse(req, res, 200, 37, "Account is Already Activated");
            }
            
            else
            {
                userSchema.findOneAndUpdate({email:email},{$set:{active:1}}, function(err, result){
                    
                    if(err)
                    {
                        console.log(err);
                        return err;
                    }

                    if(result==null || result=="") // Email Not Found
                    {
                        console.log('Error In Activation');
                        sendResponse(req, res, 200, 5, 'Database Error');
                        return;
                    }
                    
                    else
                    {
                        console.log('Total Active Users Successfully Updated');
                        sendResponse(req, res, 200, -1, "Success");
                    }
                    
                })
            }
            
        }
        
    })
    
}

/*============================= Secure Login =============================*/

module.exports.secureLogin = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : secureLogin');
	console.log('Secure Login API Hitted');
	console.log('Parameters Receiving..');
    
    var email       = req.body.email;
	var password    = req.body.password;
	//var publicKey   = req.body.publicKey;
	//var signature   = req.body.signature;
    
    console.log('Email : '+email);
	console.log('Password : '+password);
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
	
	// Validate Password
	if(!(validateParameter(password, 'Password')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    userSchema.find({email:email},function(err, result){
        
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
            var hashpass = crypt.hashIt((result[0].salt)+password);
            
            if(hashpass === result[0].password)
            {
                if (!result[0].active)
                {
                    console.log('Account is Not Active');
                    sendResponse(req, res, 200, 3, "Account is not active");
                    return;
                }
                
                var currentTIme = Date.now();
                
                userSchema.findOneAndUpdate({email:email},{$set:{lastLogin:currentTIme}, $inc:{noOfLogins:1}}, function(err, result){
                    
                    if(err)
                    {
                        console.log(err);
                        return err;
                    }
                    
                    if(result==null || result=="") // Email Not Found
                    {
                        console.log('Error In Login');
                        sendResponse(req, res, 200, 5, 'Datbase Error');
                        return;
                    }
                    
                    else
                    {   
                        console.log('Successfully Login');
                        sendResponse(req, res, 200, -1, "Success");
                        return;
                    }
                    
                })
                
            }
            
            else
            {
                console.log('Email Password Combination is Incorrect');
                sendResponse(req, res, 200, 6, 'Email/password is incorrect');
                return;
            }
            
        }
        
    })
    
    
}


/*============================= Get Details =============================*/

module.exports.getDetails = function(req, res) {
    
    console.log('Page Name : user .js');
	console.log('API Name : getDetails');
	console.log('Get Details API Hitted');
	console.log('Parameters Receiving..');
    
    var email       = req.body.email;
	//var publicKey   = req.body.publicKey;
	//var signature   = req.body.signature;

	console.log('Email : '+email);
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
    
    userSchema.find({email:email},function(err, result){
        
        if(err)
        {
            console.log(err);
            return err;
        }
        
        if(result == null || result == undefined || result == "")
        {
            console.log(email+" Not Registered");
            sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
            return;
        }
        
        sendResponse(req, res, 200, -1, result[0]);
        return;
        
    })
}


/*============================= Set User Details =============================*/

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
    var publicKey       = req.body.publicKey;
    var signature       = req.body.signature;
    
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
    userSchema.findOneAndUpdate({email:email},updatedInfo,function(err, result){
        
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


/*============================= Currency Preference =============================*/

module.exports.currencyPrefrence = function(req, res) {
    
    console.log('Page Name : user.js');
	console.log('API Name : currencyPrefrence');
	console.log('Currency Preference API Hitted');
	console.log('Parameters Receiving..');
    
    var email           = req.body.email;
    var currency_code   = req.body.currency_code;
    var publicKey       = req.body.publicKey;
    var signature       = req.body.signature;
        
    var currentTime    = Date.now();
    
    console.log('Email : ' + email);
    console.log('Currency Code : ' + currency_code);
    //console.log('Public Key : ' + publicKey);
    //console.log('Signature : ' + signature);

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
    
    // Updated User's Currency Preference JSON
    var updatedInfo ={
        
        lastLogin: currentTime,                   	// Last login time
        lastUpdated: currentTime,                   // Last update time
        currencyPreference: currency_code			// Currency Code
    }
    
    // Find and Update User's Currency Preference
    userSchema.findOneAndUpdate({email:email},updatedInfo,function(err, result){
        
        if (err)
        {
            console.log(err);
            return err;
        }
        
        if (result==null || result=="") // Email Not Found
        {
            console.log(email+" Not Registered");
            sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
            return;
        }
        
        else
        {
            console.log('Currency Preference Successfully Updated');
            sendResponse(req, res, 200, -1, 'Success');
        }
        
    })
}


/*============================= Forget Password =============================*/

exports.secureForgotPassword = function(req, res) {

    console.log('Page Name : user.js');
    console.log('API Name : secureForgotPassword');
	console.log('Secure Forgot Password API Accessed');
    console.log('Parameters Receiving..');  
	
	var email          = req.body.email;
	var flag           = req.body.flag;
    //var publicKey      = req.body.publicKey;
    //var signature      = '123456';
    
    console.log('Email : ' + email);
    console.log('Flag : '+flag);
    //console.log('Public Key : ' + publicKey);
    //console.log('Signature : ' + signature);
    
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
    
    
    userSchema.find({email:email},function(err, result){
        
        if(err)
        {
            console.log(err);
            return err;
        }
        
        if(result == "" || result == null || result == undefined)
        {
            console.log(email+" Not Registered");
            sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
            return;
        }
        
        else
        {
            if(result[0].active)
            {
                sendRestEmail(result[0], flag); // Send Reset Password Link 
                sendResponse(req, res, 200, -1, "Success");
                return;
            }
            
            else
            {
                console.log('User Account is Not Active');
                sendResponse(req, res, 200, 3, "Account is not active");
                return;
            }
        }
        
    })
  
}


/*============================= Change Password =============================*/

module.exports.changePassword = function (req, res) {
    
    console.log('Page Name : user.js');
	console.log('API Name : changePassword');
	console.log('Change Password API Hitted');
	console.log('Parameters Receiving..');
    
    var email               = req.body.email;
    var old_pass            = req.body.old_password;
	var new_pass            = req.body.new_password;
    var confirm_new_pass    = req.body.confirm_new_password;
    //var publicKey           = req.body.publicKey;
    //var signature           = '123456';
    
    console.log('Email : ' + email);
    console.log('Old Password : ' + old_pass);
    console.log('New Password : ' + new_pass);
    console.log('Confirm Password : ' + confirm_new_pass);
    //console.log('Public Key : ' + publicKey);
    //console.log('Signature : ' + signature);
    
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
    
    // Validate Old Password
	if(!(validateParameter(old_pass, 'Old Password')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
//    deviceSchema.find({publicKey:publicKey}, function (err, result){
//    
//        if(err)
//        {
//            console.log(err);
//            return err;
//        }
//        
//        console.log('Result : '+result);
//        
//        if(result.length == 0) // DoesNot Exists
//        {
//            console.log("Server not Registered");
//            sendResponse(req, res, 200, 13, 'Server is not registered');
//            return;
//        }
//        
//        var privateKey = result[0].privateKey;
//        
//        var text = 'email='+email+'&old_password='+old_pass+'&new_password='+new_pass+'&confirm_new_password='+confirm_new_pass+'&publicKey='+publicKey;
//        
//        crypt.validateSignature(txt, signature, privateKey, function(isValid){
//            
//            // Signature Not Matched
//			if (!isValid)
//			{
//				console.log('Invalid Signature');
//				sendResponse(req, res, 200, 14, 'Invalid Signature');
//				return;
//			}
        
            // Find Existance of User
            userSchema.find({email:email},function(err, result){

                if(err)
                {
                    console.log(err);
                    return err;
                }

                if(result.length == 0) // DoesNot Exists
                {
                    console.log(email+" Not Registered");
                    sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                    return;
                }

                var salt = result[0].salt;
                var stored_pass = result[0].password;

                old_pass = crypt.hashIt(salt+old_pass);	

                // Validate Old Password
                if(old_pass != stored_pass)
                {
                    console.log('Old Password is Wrong');
                    sendResponse(req, res, 200, 6, "The entry in the Old Password field is incorrect.");
                    return;
                }

                // Validate New Password
                if(new_pass == null || new_pass.length==0 || confirm_new_pass == null || confirm_new_pass.length==0)
                {
                    console.log('Password is Blank');
                    sendResponse(req, res, 200, 1, "Mandatory field not found");
                    return;
                }

                if(new_pass.length < 6)
                {
                    console.log('Your password should be of minimum six characters');
                    sendResponse(req, res, 200, 1, "Your password should be of minimum six characters");
                    return;
                }

                // Checking New Password With Confirm New Password
                if(new_pass != confirm_new_pass)
                {
                    console.log('New Password And Confirm Password are Mismatched');
                    sendResponse(req, res, 200, 6, "Both password entries must be identical.");
                    return;
                }

                var salt = '';
                var currentTime = Date.now();

                // Generating Salt
                var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
                for(var i = 12; i > 0; --i) 
                {
                    salt += chars[Math.round(Math.random() * (chars.length - 1))];
                }

                var password = crypt.hashIt(salt+new_pass);

                var updatedInfo = {
                    password: password,                        	// Salted Hash of the password
                    salt:salt,									// Salt (Random Generated Value)
                    lastLogin: currentTime,                   	// Last Login Time
                    lastUpdated: currentTime,                	// Last Update Time
                };

                // Find and Update User's Currency Preference
                userSchema.findOneAndUpdate({email:email},updatedInfo,function(err, result){

                    if (err)
                    {
                        console.log(err);
                        return err;
                    }

                    if (result==null || result=="") // Email Not Found
                    {
                        console.log(email+" Not Registered");
                        sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                        return;
                    }

                    else
                    {
                        console.log('Password Changed Successfully');
                        sendResponse(req, res, 200, -1, 'Success');
                    }

                })

            })
            
//        })
//    
//    })
    
}


/*============================= Set App Id =============================*/

module.exports.setAppId = function (req, res) {
    
    console.log('Page Name : user.js');
	console.log('API Name : setAppId');
	console.log('Set App API Hitted');
	console.log('Parameters Receiving..');
    
    var email       = req.body.email;
    var appId       = req.body.appId;
    //var publicKey   = req.body.publicKey;
    //var signature   = '123456';
    
    console.log('Email : ' + email);
    console.log('App Id : ' + appId);
    //console.log('Public Key : ' + publicKey);
    //console.log('Signature : ' + signature);

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
    
    // Validate App Id
	if(!(validateParameter(appId, 'App ID')))
	{
		sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var currentTime = Date.now();
    
    var updatedInfo = {
        
        default_search_appId: appId,                // App Id
        lastLogin: currentTime,                   	// Last Login Time
        lastUpdated: currentTime,                	// Last Update Time
    };
    
    // Find and Update User's App Id
    userSchema.findOneAndUpdate({email:email},updatedInfo,function(err, result){
        
        if (err)
        {
            console.log(err);
            return err;
        }
        
        if (result==null || result=="") // Email Not Found
        {
            console.log(email+" Not Registered");
            sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
            return;
        }
        
        else
        {
            console.log('App Id Successfully Setted');
            sendResponse(req, res, 200, -1, 'Success');
        }
        
    })
    
}


/*============================= Get App Id =============================*/

module.exports.getAppId = function (req, res) {
    
    console.log('Page Name : user.js');
	console.log('API Name : getAppId');
	console.log('Get App API Hitted');
	console.log('Parameters Receiving..');
    
    var email       = req.body.email;
    //var publicKey   = req.body.publicKey;
    //var signature   = '123456';
    
    console.log('Email : ' + email);
    //console.log('Public Key : ' + publicKey);
    //console.log('Signature : ' + signature);

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

    userSchema.find({email:email},{default_search_appId:1},function(err, result){

        if(err)
        {
            console.log(err);
            return err;
        }
        
        if (result==null || result=="") // Email Not Found
        {
            console.log(email+" Not Registered");
            sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
            return;
        }

        else
        {
            console.log('App Id : '+result[0].default_search_appId);
            sendResponse(req, res, 200, -1, result[0].default_search_appId);
        }
    
    })
}