/*global require, module, console */
/*jslint node: true */
"use strict";

// Pages
var userSchema      = require('../models/userSchema.js');       // User Schema
var master          = require('../config/masterfunc.js');       // Master Functions
var crypt           = require('../config/crypt.js');            // Crypt/Signature Related Functionality
var mailer          = require('../config/mail.js');             // Mail Functionality
<<<<<<< HEAD
var protocol 		= 'http';

=======
var protocol        = "http";
>>>>>>> b27eb2dcd4128529efbd5eecdf2060439a6ee926

//========================= Page Functions ========================= //

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


// Send Email as Notification that Password is Changed Successfully
function changePassEmail(accountInfo){
	var text= '<div style="border: solid thin black; padding: 10px;"><div style="background: #25a2dc; color: #fff; padding: 5px"><img src="http://searchtrade.com/images/searchtrade_white.png" width="200px"></div><br><br><div style="background: #fff; color: #000; padding: 5px;"><div style="width:75%; margin: auto"><p>Hi '+accountInfo.first_name+' '+accountInfo.last_name+',</p><br><p>This is a confirmation mail that you have successfully changed your password</p><br><p>You can log into your account with your new password.</p><br><p>Regards from the SearchTrade team</p><br><p>Product of Searchtrade.com Pte Ltd, Singapore</p></div></div></div></div>';
  
	// Setup e-mail data with unicode symbols
	var mailOptions = {
		from: 'Search Trade <donotreply@searchtrade.com>', 		// Sender address
		to: accountInfo.email, 									// List of Receivers
		subject: "Search Trade: Password Change Confirmation", 	// Subject line
		text: text,												// Text
		html: text
	  };

	mailer.sendmail(mailOptions);
}

// Send Email as Notification that Password is Resetted Successfully
function resettedConfirmation(accountInfo){
	var text= '<div style="border: solid thin black; padding: 10px;"><div style="background: #25a2dc; color: #fff; padding: 5px"><img src="http://searchtrade.com/images/searchtrade_white.png" width="200px"></div><br><br><div style="background: #fff; color: #000; padding: 5px;"><div style="width:75%; margin: auto"><p>Hi '+accountInfo.first_name+' '+accountInfo.last_name+',</p><br><p>This is a confirmation mail that you have successfully changed your password</p><br><p>You can log into your account with your new password.</p><br><p>Regards the from SearchTrade team</p><br><p>Product of Searchtrade.com Pte Ltd, Singapore</p></div></div></div></div>';
  
    // Setup e-mail data with unicode symbols
	var mailOptions = {
		from: 'Search Trade <donotreply@searchtrade.com>', 		// Sender address
		to: accountInfo.email, 								// list of receivers
		subject: "Search Trade: Password Reset Confirmation", 	// Subject line
		text: text,												// Text
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
    var  publicKey         = req.body.publicKey;
    var  signature         = req.body.signature;
        
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
    console.log('Public Key : '+publicKey);
    console.log('Signature : '+signature);
    
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
	
	// Validate Email
	if (!(master.validateParameter(email, 'Email')))
    {
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if (!(validateEmail(email)))
    {
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Validate Password And Repeat Password
	if(password == "" || password == null || confirm_password == "" || confirm_password == null)
	{
		console.log('Any of Password Field is Missing');
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	else if(password == confirm_password)
	{
		if(password.length<6)
		{
			console.log('Your Password Is Less Than Six Characters');
			master.sendResponse(req, res, 200, 20, "Your password should be of minimum six characters");
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
		master.sendResponse(req, res, 200, 6, "Incorrect Email/password");
		return;
	}
	
	// Validate Country
	if(country == "Select Country")
	{
		console.log('Country Not Selected');
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var query = {publicKey:publicKey};
    var text  = 'first_name='+first_name+'&last_name='+last_name+'&email='+email+'&password='+req.body.password+'&confirm_password='+confirm_password+'&country='+country+'&mobile_number='+mobile_number+'&referral='+referral+'&flag='+flag+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
                master.sendResponse(req, res, 200, 2, "Email already in use");
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
                            master.sendResponse(req, res, 200, 18, "Wrong Affiliate Reference");
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

                            sendVerificationEmail(myInfo, flag);   // Send Email to Registered Email Address For Account Verification
                            console.log('Saved SuccessFully');
                            master.sendResponse(req, res, 200, -1, "Success");

                        });

                    })

                })
            }

        })
        
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
    var publicKey  = req.body.publicKey;
	var signature  = req.body.signature;
	
	console.log('Email : '+email);
	console.log('Auth : '+auth);
    console.log('Public Key : '+publicKey);
	console.log('Signature : '+signature);
  
	auth=auth.replace(/\ /g,'+');
    
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&auth='+auth+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                var tokenTest= crypt.token.verify(emailresults[0]._id, auth);

                if (tokenTest== 2)
                {
                    console.log('Token is Expired');
                    master.sendResponse(req, res, 200, 10, "Link expired");
                    return;
                }

                // Token is Invalid
                else if (tokenTest== 0)
                {
                    console.log('Token is Invalid');
                    master.sendResponse(req, res, 200, 11, "Invalid link");
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
                    master.sendResponse(req, res, 200, 11, "Invalid link");
                    return;
                } 

                if(result[0].active==1)
                {
                    console.log('Account Already Activated');
                    master.sendResponse(req, res, 200, 37, "Account is Already Activated");
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
                            master.sendResponse(req, res, 200, 5, 'Database Error');
                            return;
                        }

                        else
                        {
                            console.log('Total Active Users Successfully Updated');
                            master.sendResponse(req, res, 200, -1, "Success");
                        }

                    })
                }

            }

        })
    
    })
    
}


/*============================= Resend Verification Link =============================*/

exports.secureResendVerification = function(req, res) {

	console.log('Page Name : user.js');
	console.log('API Name : secureResendVerification');
	console.log('Secure Resend Verification API Accessed');
	console.log('Parameters Receiving..');
    
    var email       = req.body.email;
    var flag        = req.body.flag;
	var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;

    console.log('Email : '+email);
	console.log('Flag : '+flag);
	console.log('Public Key : '+publicKey);
	console.log('Signature : '+signature);
    
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&flag='+flag+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){

        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
        
        userSchema.find({email:email},function(err, result){
            
            if(err)
            {
                console.log(err);
                return err;
            }
            
            if(result[0]==null || result[0]==undefined || result[0]=="")
            {
                console.log(email+' Is Not Registered');
                master.sendResponse(req, res, 200, 4, "There is no user registered with that email address.");
                return;
            }
            
            console.log('User Found');
            sendVerificationEmail(result[0], flag);
            master.sendResponse(req, res, 200, -1, "Success");
            
        })
 
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
	var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;
    
    console.log('Email : '+email);
	console.log('Password : '+password);
	console.log('Public Key : '+publicKey);
	console.log('Signature : '+signature);
    
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
	
	// Validate Password
	if(!(master.validateParameter(password, 'Password')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var query = {publicKey:publicKey};
    var text  = "email="+email+"&password="+password+"&publicKey="+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
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
                        master.sendResponse(req, res, 200, 3, "Account is not active");
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
                            master.sendResponse(req, res, 200, 5, 'Datbase Error');
                            return;
                        }

                        else
                        {   
                            console.log('Successfully Login');
                            master.sendResponse(req, res, 200, -1, "Success");
                            return;
                        }

                    })

                }

                else
                {
                    console.log('Email Password Combination is Incorrect');
                    master.sendResponse(req, res, 200, 6, 'Email/password is incorrect');
                    return;
                }

            }

        })
    
    })
    
}


/*============================= Get Details =============================*/

module.exports.getDetails = function(req, res) {
    
    console.log('Page Name : user .js');
	console.log('API Name : getDetails');
	console.log('Get Details API Hitted');
	console.log('Parameters Receiving..');
    
    var email       = req.body.email;
	var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;

	console.log('Email : '+email);
	console.log('Public Key : '+publicKey);
	console.log('Signature : '+signature);
    
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    var text  = "email="+email+"&publicKey="+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            master.sendResponse(req, res, 200, -1, result[0]);
            return;

        })
        
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
    console.log('Public Key : '+publicKey);
    console.log('Signature : '+signature);
    
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Valiadte Mobile Number
	if(mobile_number!="" && isNaN(mobile_number))
	{
		console.log('Invalid Mobile');
		master.sendResponse(req, res, 200, 8, "Incorrect Mobile");
		return;
	}
    
    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&first_name='+first_name+'&last_name='+last_name+'&gender='+gender+'&address1='+address1+'&address2='+address2+'&country='+country+'&state='+state+'&zip='+zip+'&city='+city+'&mobile_number='+mobile_number+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                console.log('Details Successfully Updated');
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
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
    console.log('Public Key : ' + publicKey);
    console.log('Signature : ' + signature);

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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&currency_code='+currency_code+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                console.log('Currency Preference Successfully Updated');
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
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
    var publicKey      = req.body.publicKey;
    var signature      = '123456';
    
    console.log('Email : ' + email);
    console.log('Flag : '+flag);
    console.log('Public Key : ' + publicKey);
    console.log('Signature : ' + signature);
    
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
    
    // Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&flag='+flag+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                if(result[0].active)
                {
                    sendRestEmail(result[0], flag); // Send Reset Password Link 
                    master.sendResponse(req, res, 200, -1, "Success");
                    return;
                }

                else
                {
                    console.log('User Account is Not Active');
                    master.sendResponse(req, res, 200, 3, "Account is not active");
                    return;
                }
            }

        })
        
    })
  
}

/*============================= Reset Password =============================*/

module.exports.resetpassword = function(req, res) {

	console.log('Page Name : user.js');
	console.log('API Name : resetpassword');
	console.log("Reset Password API Hitted");
	console.log('Parameter Receiving..');

    var auth                = req.body.auth;
	var email               = req.body.email;
	var password            = req.body.password;
	var confirm_password    = req.body.confirm_password;
    var publicKey           = req.body.publicKey;
    var signature           = 'cb2aa4b29c505fe181863a6';
    
    console.log('Email : '+email);
	console.log('Authentication : '+auth);
	console.log('New Password : '+password);
	console.log('Confirm Password : '+confirm_password);
    console.log('Public Key : ' + publicKey);
    console.log('Signature : ' + signature);
    
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
    
    // Validate Authentication
    if(!(master.validateParameter(auth, 'Authentication')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    // Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
	
	// Validate Password
	if (password === 'undefined' || confirm_password === 'undefined')
	{
		console.log('Passwords Cannot be Blank');
		master.sendResponse(req, res, 200, 1, "Mandatory Field Not Found");
		return;
	}
	
	if (password.length < 6)
	{
		console.log('Your password should be of minimum six characters');
		master.sendResponse(req, res, 200, 6, "Your password should be of minimum six characters");
		return;
	} 

	// Validate Both Password Match 
	if (password !== confirm_password)
	{
		console.log('Password And Confirm Password are Mismatched');
		master.sendResponse(req, res, 200, 6, "Both password entries must be identical.");
		return;
	}	
    
    auth=auth.replace(/\ /g,'+');
    
    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&auth='+auth+'&password='+password+'&confirm_password='+confirm_password+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            else
            {
                var tokenTest = crypt.token.verify((result[0]._id).toString(), auth.toString());
                
                // Token Expired
                if (tokenTest == 2)
                {
                    console.log('Reset Password Token is Expired');
                    master.sendResponse(req, res, 200, 10, 'Token is expired');
                    return;
                }

                // Invalid Token 
                else if (tokenTest == 0)
                {
                    console.log('Token is Invalid');
                    master.sendResponse(req, res, 200, 11, 'Token is Invalid');
                    return;
                }

                // Valid Token
                else if (tokenTest == 1)
                {
                    console.log('Token is Valid');
                }

                // Unknown Token
                else
                {
                    console.log('Unknown Token Output');
                    master.sendResponse(req, res, 200, 50, 'Unkown Token Error');
                    return;
                }
                
                // Generated Salt
                var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
                var sat   = '';
                for(var i = 12; i > 0; --i) 
                {
                    salt += chars[Math.round(Math.random() * (chars.length - 1))];
                }
                
                var hashpass = crypt.hashIt(salt+password);
                var currentTime = Date.now();
                
                var updatedInfo = {
                    
                    password: hashpass,         // Salted Hash of the password
                    salt:salt,					// Salt (Random Generated Value)
                    lastLogin: currentTime,     // Last Login Time
                    lastUpdated: currentTime    // Last Update Time
                };
                
                // Find and Update User's Currency Preference
                userSchema.findOneAndUpdate({email:email},updatedInfo,function(err, results){

                    if (err)
                    {
                        console.log(err);
                        return err;
                    }

                    if (results==null || results=="") // Email Not Found
                    {
                        console.log(email+" Not Registered");
                        master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                        return;
                    }

                    else
                    {
                        console.log('Password Resetted Successfully');
                        resettedConfirmation(result[0]);
                        master.sendResponse(req, res, 200, -1, 'Success');
                    }

                })
                
            }
            
        })
        
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
    var publicKey           = req.body.publicKey;
    var signature           = '7c481e0f2991a5189d10fb94b26e66fc32a3e0ec0626d7bc31de3e0f070ba2da198d7ba09c55bb4f26b55491f6e956549da22e4ad2cbf60678c05786ec116583';
    
    console.log('Email : ' + email);
    console.log('Old Password : ' + old_pass);
    console.log('New Password : ' + new_pass);
    console.log('Confirm Password : ' + confirm_new_pass);
    console.log('Public Key : ' + publicKey);
    console.log('Signature : ' + signature);
    
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Validate Old Password
	if(!(master.validateParameter(old_pass, 'Old Password')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&old_password='+old_pass+'&new_password='+new_pass+'&confirm_new_password='+confirm_new_pass+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
        
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            var salt = result[0].salt;
            var stored_pass = result[0].password;

            old_pass = crypt.hashIt(salt+old_pass);	

            // Validate Old Password
            if(old_pass != stored_pass)
            {
                console.log('Old Password is Wrong');
                master.sendResponse(req, res, 200, 6, "The entry in the Old Password field is incorrect.");
                return;
            }

            // Validate New Password
            if(new_pass == null || new_pass.length==0 || confirm_new_pass == null || confirm_new_pass.length==0)
            {
                console.log('Password is Blank');
                master.sendResponse(req, res, 200, 1, "Mandatory field not found");
                return;
            }

            if(new_pass.length < 6)
            {
                console.log('Your password should be of minimum six characters');
                master.sendResponse(req, res, 200, 1, "Your password should be of minimum six characters");
                return;
            }

            // Checking New Password With Confirm New Password
            if(new_pass != confirm_new_pass)
            {
                console.log('New Password And Confirm Password are Mismatched');
                master.sendResponse(req, res, 200, 6, "Both password entries must be identical.");
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
                lastUpdated: currentTime                	// Last Update Time
            };

            // Find and Update User's Currency Preference
            userSchema.findOneAndUpdate({email:email},updatedInfo,function(err, results){

                if (err)
                {
                    console.log(err);
                    return err;
                }

                if (results==null || results=="") // Email Not Found
                {
                    console.log(email+" Not Registered");
                    master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                    return;
                }

                else
                {
                    console.log('Password Changed Successfully');
                    changePassEmail(result[0]);
                    master.sendResponse(req, res, 200, -1, 'Success');
                }

            })

        })
            
    })
    
}


/*============================= Set App Id =============================*/

module.exports.setAppId = function (req, res) {
    
    console.log('Page Name : user.js');
	console.log('API Name : setAppId');
	console.log('Set App API Hitted');
	console.log('Parameters Receiving..');
    
    var email       = req.body.email;
    var appId       = req.body.appId;
    var publicKey   = req.body.publicKey;
    var signature   = '123456';
    
    console.log('Email : ' + email);
    console.log('App Id : ' + appId);
    console.log('Public Key : ' + publicKey);
    console.log('Signature : ' + signature);

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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Validate App Id
	if(!(master.validateParameter(appId, 'App ID')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&appId='+appId+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
    
        var currentTime = Date.now();

        var updatedInfo = {

            default_search_appId: appId,                // App Id
            lastLogin: currentTime,                   	// Last Login Time
            lastUpdated: currentTime                	// Last Update Time
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                console.log('App Id Successfully Setted');
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
    
    })
    
}


/*============================= Get App Id =============================*/

module.exports.getAppId = function (req, res) {
    
    console.log('Page Name : user.js');
	console.log('API Name : getAppId');
	console.log('Get App API Hitted');
	console.log('Parameters Receiving..');
    
    var email       = req.body.email;
    var publicKey   = req.body.publicKey;
    var signature   = '123456';
    
    console.log('Email : ' + email);
    console.log('Public Key : ' + publicKey);
    console.log('Signature : ' + signature);

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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		console.log('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }

    var query = {publicKey:publicKey};
    var text  = 'email='+email+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
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
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                console.log('App Id : '+result[0].default_search_appId);
                master.sendResponse(req, res, 200, -1, result[0].default_search_appId);
            }

        })
        
    })
    
}


/* Accounting API */

/*============================= Credit User Amount =============================*/

module.exports.creditUserAmount = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : creditUserAmount')
	console.log('Credit User Amount API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Deposit
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{deposit:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Amount '+amount+' Successfully Deposited To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct User Amount =============================*/

module.exports.deductUserAmount = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductUserAmount')
	console.log('Deduct User Amount API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Deposit
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{deposit:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Purchase =============================*/

module.exports.addPurchases = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addPurchases')
	console.log('Add Purchase API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Purchases
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{purchases:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Purchase Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Purchases =============================*/

module.exports.deductPurchases = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductPurchases');
	console.log('Deduct Purchase API Hitted');
	console.log('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Purchases
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{purchases:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Purchase Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Cashback =============================*/

module.exports.addCashback = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addCashback')
	console.log('Add Cashback API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Cashback
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{cashback:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Cashback Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Cashback =============================*/

module.exports.deductCashback = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductPurchases');
	console.log('Deduct Cashback API Hitted');
	console.log('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Cashback
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{cashback:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Cashback Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Affiliate Earning =============================*/

module.exports.addAffEarning = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addAffEarning')
	console.log('Add Affiliate Earning API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Affiliate Earning
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{affiliate_earning:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Affiliate Earning Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Affiliate Earning =============================*/

module.exports.deductAffEarning = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductAffEarning');
	console.log('Deduct Affiliate Earning API Hitted');
	console.log('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Affiliate Earning
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{affiliate_earning:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Affiliate Earning Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Sales =============================*/

module.exports.addSales = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addSales')
	console.log('Add Sales API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Sales
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{sales:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Sales Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Sales =============================*/

module.exports.deductSales = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductSales');
	console.log('Deduct Sales API Hitted');
	console.log('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Sales
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{sales:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Sales Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Trade =============================*/

module.exports.addTrade = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addTrade')
	console.log('Add Trade API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Trade
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{trade_fees:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Trade Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Trade =============================*/

module.exports.deductTrade = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductTrade');
	console.log('Deduct Trade API Hitted');
	console.log('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Trade
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{trade_fees:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Trade Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Total Keyword Income =============================*/

module.exports.addTotalKeywordIncome = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addTotalKeywordIncome')
	console.log('Add Total Keyword Income API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Total Keyword Income
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{total_kwd_income:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Total Keyword Income Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Total Keyword Income =============================*/

module.exports.deductTotalKeywordIncome = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductTotalKeywordIncome');
	console.log('Deduct Total Keyword Income API Hitted');
	console.log('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Total Keyword Income
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{total_kwd_income:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Total Keyword Income Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Blocked Pending Withdrawals =============================*/

module.exports.addBlockedPendingWithdrawals = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addBlockedPendingWithdrawals')
	console.log('Add Blocked Pending Withdrawals API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Blocked Pending Withdrawals
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{blocked_for_pending_withdrawals:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Blocked Pending Withdrawals Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Blocked Pending Withdrawals =============================*/

module.exports.deductBlockedPendingWithdrawals = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductTotalKeywordIncome');
	console.log('Deduct Blocked Pending Withdrawals API Hitted');
	console.log('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Blocked Pending Withdrawals
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{blocked_for_pending_withdrawals:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            console.log('Blocked Pending Withdrawals Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Approved Withdrawals =============================*/

module.exports.addApprovedWithdrawals = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addApprovedWithdrawals')
	console.log('Add Approved Withdrawals API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Approved Withdrawals
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{approved_withdrawals:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Approved Withdrawals Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Approved Withdrawals =============================*/

module.exports.deductApprovedWithdrawals = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductApprovedWithdrawals');
	console.log('Deduct Blocked Pending Withdrawals API Hitted');
	console.log('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Approved Withdrawals
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{blocked_for_pending_withdrawals:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            console.log('Approved Withdrawals Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Total App Income =============================*/

module.exports.addTotalAppIncome = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addTotalAppIncome')
	console.log('Add Total App Income API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Total App Income
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{total_app_income:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Total App Income Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= First Buy Status =============================*/

module.exports.firstBuy = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : firstBuy')
	console.log('First Buy Status API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's First Buy Status
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{total_app_income:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Successfully Updated First Buy Status of '+retVal[0].email+' To '+amount);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Blocked For Bids =============================*/

module.exports.addBlockedForBids = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : addBlockedForBids')
	console.log('Add Blocked For Bids API Hitted');
	console.log('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Blocked For Bids
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{blocked_for_bids:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Blocked For Bids '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Blocked For Bids =============================*/

module.exports.deductBlockedForBids = function(req, res){
    
	console.log('Page Name : user.js');
	console.log('API Name : deductBlockedForBids');
	console.log('Deduct Blocked For Bids API Hitted');
	console.log('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Blocked For Bids
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{blocked_for_bids:amount}},function(err, result){

            if (err)
            {
                console.log(err);
                return err;
            }

            if (result==null || result=="") // Email Not Found
            {
                console.log(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            console.log('Blocked For Bids '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Reject Blocked Bids =============================*/

module.exports.rejectBlockedBids = function(req, res){
	
	console.log('Page Name : user.js');
	console.log('API Name : rejectBlockedBids')
	console.log('Reject Blocked Bids API Hitted');
	console.log('Parameter Receiving..');
	
	// Require Modules
	var http = require('http');
	var https = require('https');
	var async = require('async');
	
	// Storing Parameters
	var reject_bids_json = req.body.reject_bids_json;  
	var publicKey = req.body.publicKey;
	var signature = req.body.signature;
	var json = '';
	var length = '';
	var value = '';
	var emailValue = '';

	console.log('Json File : '+reject_bids_json);
	
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
	
	if(reject_bids_json == "" && reject_bids_json == null)
	{
		console.log('Reject Bids Json Missing');
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	var options = {
		host: 'searchtrade.com',
		path: '/keywords/active_bids/'+reject_bids_json+'.json'
	};  	
	
    var query = {publicKey:publicKey};
    var txt = 'reject_bids_json='+reject_bids_json+'&publicKey='+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
        
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

        async.series([

            // Function For Phase 1
            function (callback)
            {
                //Collecting Data From Json File;
                https.get(options, function(res){

                    // Receiving Data In Chunk
                    res.on('data', function(chunk){

                        console.log('Chunk Started');

                        json = chunk.toString();
                        json = json.replace(/\[/g,"");
                        json = json.replace(/\]/g,"");
                        json = json.replace(/\\/g,"");
                        json = json.split(",");

                    });

                    // After Receiving All Data Calling callback Function
                    res.on('end', function(){

                        callback();

                    });

                })
            },


            // Function For Phase 2
            // Holding Return Bid Functionality 
            function (callback)
            {
                length = json.length;

                // Loop To Fetch Records From Received Json File Data
                for(var i=0; i<length; i++)
                {
                    var singleJson = json[i].split("/"); 	

                    var bidRetEmail = singleJson[1];		// Storing Email 

                    var bidRetAmount = singleJson[3];		// Storing Amount

                    var commission = singleJson[4];			// Storing Comision

                    var totalAmount = parseFloat(bidRetAmount) + parseFloat(commission);	// Calculating Total Amount

                    console.log(totalAmount);

                    var query = {"email": bidRetEmail};

                    // Updating Blocked Bid Amount
                    userSchema.findOneAndUpdate(query,{$inc:{blocked_for_bids:-totalAmount}},function(val){

                        // Error In Updating Blocked Bids
                        if(!val)
                        {
                            value = i;
                            emailValue = bidRetEmail;
                            callback();
                        }

                        else
                        {
                            if(value == length-i)
                            {
                                value = "Success";
                                callback();
                            }
                        }

                    });
                }
            },


            // Function For Phase 3
            // Depends On Results of Phase 2
            // Holding Cancel Bid Functionality in 'else' part
            function callback()
            {
                // Return Bid Functionality of Phase 2 Successfully Done
                if(value == "Success")
                {
                    master.sendResponse(req, res, 200, -1, "Success");
                }

                // Error Returning Bid Functionality of Phase 2 
                else
                {
                    console.log('Error In Updating Blocked Bids At:'+value+' For Email: '+bidRetEmail);

                    for(var j=0; j<value; j++)
                    {
                        var singleJson = json[j].split("/"); 	

                        var bidRetEmail = singleJson[1];		// Storing Email 

                        var bidRetAmount = singleJson[3];		// Storing Amount

                        var commission = singleJson[4];			// Storing Comision

                        var totalAmount = parseFloat(bidRetAmount) + parseFloat(commission);	// Calculating Total Amount

                        var query = {"email": bidRetEmail};

                        // Updating Blocked Bid Amount
                        userSchema.findOneAndUpdate(query,{$inc:{blocked_for_bids:totalAmount}},function(val){

                            // Error In Updating Blocked Bids
                            if(!val)
                            {
                                value = i;
                                emailValue = bidRetEmail;
                                callback();
                            }

                            else
                            {
                                if(value == length-i)
                                {
                                    value = "Success";
                                    callback();
                                }
                            }

                        });
                    }
                }

            },


            // Function For Phase 4
            // Depends On Results of Phase 3
            // Holding Cancel Bid Functionality in 'else' part
            function callback()
            {
                //console.log(value);

                if(value == "Success")
                {
                    console.log('Cancelled All Reject Bids Successfully');
                    master.sendResponse(req, res, 200, 5, "Database Error");
                }

                else
                {
                    console.log('Error In Cancellation At:'+value+' For Email: '+bidRetEmail);
                    master.sendResponse(req, res, 200, 5, "Database Error");
                }
            }

        ])
            
    })
}