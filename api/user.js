/*global require, module, console */
/*jslint node: true */
"use strict";

// Pages
var poolSchema	  	    = require('../models/poolSchema.js'),           // Pool Schema
    userSchema          = require('../models/userSchema.js'),           // User Schema
    transactionSchema   = require('../models/transaction_Schema.js'),   // Transaction Schema
    master              = require('../config/masterfunc.js'),           // Master Functions
    crypt               = require('../config/crypt.js'),                // Crypt/Signature Related Functionality
    mailer              = require('../config/mail.js'),                 // Mail Functionality
    protocol 		    = 'http',
    fs 				    = require('fs'), 
    im 				    = require('imagemagick'),
    logger              = require('../config/w_config.js'),
    request             = require('request'),
    log                 = logger();

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
		var url= protocol+"://scoinz.com/keywords/views/verifyUser.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&flag="+flag;
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

    mailer.sendmail(mailOptions);
}

// Send Reset Password Link to User Email Address
function sendRestEmail(accountInfo, flag){
  
	var vhash = encodeURIComponent(crypt.generate(accountInfo._id));
  
	if(flag == '1') // For Web
	{
		var url= protocol+"://scoinz.com/forgetpwd.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&flag="+flag;
	}
  
	if(flag == '2')	// For Wallet
	{
		var url= protocol+"://scoinz.com/presaleWallet/wallet/resetpass.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email);
	}
    
    if(flag == '3') // For Mobile
	{
		var url= protocol+"://scoinz.com/MobileSite/forgetpwd.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&flag="+flag;
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
		to: accountInfo.email, 								    // list of receivers
		subject: "Search Trade: Password Reset Confirmation", 	// Subject line
		text: text,												// Text
		html: text
    };
	
	mailer.sendmail(mailOptions);
}


/* Export Fuctions */

/*============================= Register User =============================*/

module.exports.secureRegister = function (req, res) {
   
    log.info('Page Name : user.js');
	log.info('API Name : secureRegister');
	log.info('Secure Register API Hitted');
	log.info('Parameters Receiving..');
    
    var first_name         = req.body.first_name;
    var last_name          = req.body.last_name;
    var email              = req.body.email;
    var password           = req.body.password;
    var confirm_password   = req.body.confirm_password;
    var country            = req.body.country;
    var flag               = req.body.flag;
    var mobile_number      = req.body.mobile_number;
    var referral           = req.body.referral;
    var publicKey          = req.body.publicKey;
    var signature          = req.body.signature;
        
    var creationTime = Date.now();
    var accountID;
    var referred_person_email;
    var stat;
    var refcode;
    var txt = "";
    var salt = "";
    var seed = crypt.hashIt(Math.random() * creationTime);
    
    log.info('First Name :' + first_name);
	log.info('Last Name :' + last_name);
	log.info('Email : ' + email);
	log.info('Password : ' + password);
    log.info('Confirm Password : ' + confirm_password);
    log.info('Country :' + country);
    log.info('Flag : ' + flag);
    log.info('Mobile Number : ' + mobile_number);
    log.info('Refferal : ' + referral);
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
	
	// Validate Email
	if (!(master.validateParameter(email, 'Email')))
    {
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if (!(validateEmail(email)))
    {
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Validate Password And Repeat Password
	if(password == "" || password == null || confirm_password == "" || confirm_password == null)
	{
		log.info('Any of Password Field is Missing');
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	else if(password == confirm_password)
	{
		if(password.length<6)
		{
			log.info('Your Password Is Less Than Six Characters');
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
			
			log.info('Salt :'+salt);
			password = crypt.hashIt(salt+password);
		}
	}
	else
	{
		log.info('Passwords Are Not Matching');
		master.sendResponse(req, res, 200, 6, "Passwords Are Not Matching");
		return;
	}
	
	// Validate Country
	if(country == "Select Country")
	{
		log.info('Country Not Selected');
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
    
    var query = {publicKey:publicKey};
    //var text  = 'first_name='+encodeURIComponent(first_name)+'&last_name='+encodeURIComponent(last_name)+'&email='+encodeURIComponent(email)+'&password='+encodeURIComponent(req.body.password)+'&confirm_password='+encodeURIComponent(confirm_password)+'&country='+encodeURIComponent(country)+'&mobile_number='+encodeURIComponent(mobile_number)+'&referral='+encodeURIComponent(referral)+'&flag='+encodeURIComponent(flag)+'&publicKey='+encodeURIComponent(publicKey);
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            log.info('Result : '+result);

            if(result.length>0) // Already Exists
            {
                log.info(email+" Already exists");
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
                        log.error(err);
                        master.sendResponse(req, res, 200, 5, "Database Error");
                        return;
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
                            log.info('Wrong Affiliate Ref Code Entered');
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
                            log.error(err);
                            master.sendResponse(req, res, 200, 5, "Database Error");
                            return;
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
                            country : country,
                            first_buy_status: stat
                        });


                        myInfo.save(function(err){
                            
                            if(err)
                            {
                                log.error(err);
                                master.sendResponse(req, res, 200, 5, "Database Error");
                                return;
                            }
                                
                            sendVerificationEmail(myInfo, flag);   // Send Email to Registered Email Address For Account Verification
                            
                            log.info('Saved SuccessFully');
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
    
    log.info('Page Name : user.js');
	log.info('API Name : verifyAccount');
	log.info('Verify Account API Hitted');
	log.info('Parameters Receiving..');
    
    var auth       = req.body.auth;
	var email      = req.body.email;
    var publicKey  = req.body.publicKey;
	var signature  = req.body.signature;
	
	log.info('Email : '+email);
	log.info('Auth : '+auth);
    log.info('Public Key : '+publicKey);
	log.info('Signature : '+signature);
  
	//auth=auth.replace(/\ /g,'+');
    
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
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    //var text  = 'email='+encodeURIComponent(email)+'&auth='+encodeURIComponent(auth)+'&publicKey='+encodeURIComponent(publicKey);
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if(result==null || result=="") // Email Not Found
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                var tokenTest= crypt.token.verify(result[0]._id, auth);

                if (tokenTest== 2)
                {
                    log.info('Token is Expired');
                    master.sendResponse(req, res, 200, 10, "Link expired");
                    return;
                }

                // Token is Invalid
                else if (tokenTest== 0)
                {
                    log.info('Token is Invalid');
                    master.sendResponse(req, res, 200, 11, "Invalid link");
                    return;
                }

                // Token is Valid
                else if (tokenTest == 1)
                {
                    log.info('Token is Valid');
                }

                // Unknown Token Output
                else
                {
                    log.info('Unknown Token Output');
                    master.sendResponse(req, res, 200, 11, "Invalid link");
                    return;
                } 

                if(result[0].active==1)
                {
                    log.info('Account Already Activated');
                    master.sendResponse(req, res, 200, 37, "Account is Already Activated");
                }

                else
                {
                    userSchema.findOneAndUpdate({email:email},{$set:{active:1}}, function(err, result){

                        if(err)
                        {
                            log.error(err);
                            master.sendResponse(req, res, 200, 5, "Database Error");
                            return;
                        }

                        if(result==null || result=="") // Email Not Found
                        {
                            log.info('Error In Activation');
                            master.sendResponse(req, res, 200, 5, 'Database Error');
                            return;
                        }

                        else
                        {                            
                            // Update Pool totalActiveUsers
                            poolSchema.findOneAndUpdate({}, {$inc:{totalActiveUsers:1}}, function(err, retVals){

                                // Error In Updating Database
                                if(err)
                                {
                                    log.error(err);
                                    master.sendResponse(req, res, 200, 5, 'Database Error');
                                    return;
                                }
                                
                                // Successfully Updated
                                if(retVals)
                                {
                                    log.info('User Account Successfully Activated');
                                    master.sendResponse(req, res, 200, -1, "Success");
                                }

                            });
                            
                        }

                    })
                }

            }

        })
    
    })
    
}

/*============================= Resend Verification Link =============================*/

exports.secureResendVerification = function(req, res) {

	log.info('Page Name : user.js');
	log.info('API Name : secureResendVerification');
	log.info('Secure Resend Verification API Accessed');
	log.info('Parameters Receiving..');
    
    var email       = req.body.email;
    var flag        = req.body.flag;
	var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;

    log.info('Email : '+email);
	log.info('Flag : '+flag);
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    //var text  = 'email='+encodeURIComponent(email)+'&flag='+encodeURIComponent(flag)+'&publicKey='+encodeURIComponent(publicKey);
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }
            
            if(result[0]==null || result[0]==undefined || result[0]=="")
            {
                log.info(email+' Is Not Registered');
                master.sendResponse(req, res, 200, 4, "There is no user registered with that email address.");
                return;
            }

            log.info('User Found');
            sendVerificationEmail(result[0], flag);
            master.sendResponse(req, res, 200, -1, "Success");
            
        })
 
    })
    
}
    
/*============================= Secure Login =============================*/

module.exports.secureLogin = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : secureLogin');
	log.info('Secure Login API Hitted');
	log.info('Parameters Receiving..');
    
    var email       = req.body.email;
	var password    = req.body.password;
	var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;
    
    log.info('Email : '+email);
	log.info('Password : '+password);
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		log.info('Incorrect Email Format');
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
    //var text  = "email="+encodeURIComponent(email)+"&password="+encodeURIComponent(password)+"&publicKey="+encodeURIComponent(publicKey);
    var text  = "email="+email+"&password="+password+"&publicKey="+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
    
        userSchema.find({email:email},function(err, results){

            if(err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if(results==null || results=="") // Email Not Found
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                var hashpass = crypt.hashIt((results[0].salt)+password);

                if(hashpass === results[0].password)
                {
                    if (!results[0].active)
                    {
                        log.info('Account is Not Active');
                        master.sendResponse(req, res, 200, 3, "Account is not active");
                        return;
                    }

                    var currentTIme = Date.now();

                    userSchema.findOneAndUpdate({email:email},{$set:{lastLogin:currentTIme}, $inc:{noOfLogins:1}}, function(err, result){

                        if(err)
                        {
                            log.error(err);
                            master.sendResponse(req, res, 200, 5, "Database Error");
                            return;
                        }

                        if(result==null || result=="") // Email Not Found
                        {
                            log.info('Error In Login');
                            master.sendResponse(req, res, 200, 5, 'Datbase Error');
                            return;
                        }

                        else
                        {   
                            log.info('Successfully Login');
                            master.sendResponse(req, res, 200, -1, result);
                            return;
                        }

                    })

                }

                else
                {
                    log.info('Email Password Combination is Incorrect');
                    master.sendResponse(req, res, 200, 6, 'Email/password is incorrect');
                    return;
                }

            }

        })
    
    })
    
}

/*============================= Get Details =============================*/

module.exports.getDetails = function(req, res) {
    
    log.info('Page Name : user .js');
	log.info('API Name : getDetails');
	log.info('Get Details API Hitted');
	log.info('Parameters Receiving..');
    
    var email       = req.body.email;
	var publicKey   = req.body.publicKey;
	var signature   = req.body.signature;

	log.info('Email : '+email);
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {"publicKey":publicKey};
    //var text  = "email="+encodeURIComponent(email)+"&publicKey="+encodeURIComponent(publicKey);
    var text  = "email="+email+"&publicKey="+publicKey;
    
    master.secureAuth(query, text, signature, function (result){
         
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }
    
        userSchema.find({email:email}).lean().exec(function(err, userdata){

            if(err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if(userdata == null || userdata == undefined || userdata == "")
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            transactionSchema.find({$or:[{sender:email},{receiver:email}]},{_id:0}, function(err, retVal){
                
                if(err)
                {
                    log.error(err);
                    master.sendResponse(req, res, 200, 5, "Database Error");
                    return;
                }
                
                if(retVal == null || retVal == undefined || retVal == "")
                {
                    log.info('No Transactions Of This User');
                    master.sendResponse(req, res, 200, -1, userdata[0]);
                    return;
                }
                
                userdata[0].transactions = retVal;
                master.sendResponse(req, res, 200, -1, userdata[0]);
                
            }).sort({time:-1}).limit(50);

        })
        
    })
    
}

/*============================= Set User Details =============================*/

module.exports.setUserDetails = function(req, res){
    
    log.info('Page Name : user.js');
	log.info('API Name : setUserDetails');
	log.info('Set User Details API Hitted');
	log.info('Parameters Receiving..');
    
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
    
    log.info('Email : '+email);
    log.info('First Name : '+first_name);
    log.info('Last Name : '+last_name);
    log.info('Gender : '+gender);
    log.info('Address1 : '+address1);
    log.info('Address2 : '+address2);
    log.info('Country : '+country);
    log.info('State : '+state);
    log.info('Zip : '+zip);
    log.info('City : '+city);
    log.info('Mobile Number : '+mobile_number);
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
	
	// Validate Email
	if(!(master.validateParameter(email, 'Email')))
	{
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}

	if(!(validateEmail(email))) 
	{
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    // Valiadte Mobile Number
	if(mobile_number!="" && isNaN(mobile_number))
	{
		log.info('Invalid Mobile');
		master.sendResponse(req, res, 200, 8, "Incorrect Mobile");
		return;
	}
    
    var query = {publicKey:publicKey};
    //var text  = 'email='+encodeURIComponent(email)+'&first_name='+encodeURIComponent(first_name)+'&last_name='+encodeURIComponent(last_name)+'&gender='+encodeURIComponent(gender)+'&address1='+encodeURIComponent(address1)+'&address2='+encodeURIComponent(address2)+'&country='+encodeURIComponent(country)+'&state='+encodeURIComponent(state)+'&zip='+encodeURIComponent(zip)+'&city='+encodeURIComponent(city)+'&mobile_number='+encodeURIComponent(mobile_number)+'&publicKey='+encodeURIComponent(publicKey);
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if(result==null || result=="") // Email Not Found
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                log.info('Details Successfully Updated');
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
    
}

/*============================= Currency Preference =============================*/

module.exports.currencyPrefrence = function(req, res) {
    
    console.log(req.body.currency_code);
    
    log.info('Page Name : user.js');
	log.info('API Name : currencyPrefrence');
	log.info('Currency Preference API Hitted');
	log.info('Parameters Receiving..');
    
    var email           = req.body.email;
    var currency_code   = req.body.currency_code;
    var publicKey       = req.body.publicKey;
    var signature       = req.body.signature;
        
    var currentTime    = Date.now();
    
    log.info('Email : ' + email);
    log.info('Currency Code : ' + currency_code);
    log.info('Public Key : ' + publicKey);
    log.info('Signature : ' + signature);

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
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    //var text  = 'email='+encodeURIComponent(email)+'&currency_code='+encodeURIComponent(currency_code)+'&publicKey='+encodeURIComponent(publicKey);
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                log.info('Currency Preference Successfully Updated');
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
        
    })
    
}

/*============================= Forget Password =============================*/

exports.secureForgotPassword = function(req, res) {

    log.info('Page Name : user.js');
    log.info('API Name : secureForgotPassword');
	log.info('Secure Forgot Password API Accessed');
    log.info('Parameters Receiving..');  
	
	var email          = req.body.email;
	var flag           = req.body.flag;
    var publicKey      = req.body.publicKey;
    var signature      = req.body.signature;
    
    log.info('Email : ' + email);
    log.info('Flag : '+flag);
    log.info('Public Key : ' +publicKey);
    log.info('Signature : ' +signature);
    
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
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
    
    var query = {publicKey:publicKey};
    //var text  = 'email='+encodeURIComponent(email)+'&flag='+encodeURIComponent(flag)+'&publicKey='+encodeURIComponent(publicKey);
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if(result == "" || result == null || result == undefined)
            {
                log.info(email+" Not Registered");
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
                    log.info('User Account is Not Active');
                    master.sendResponse(req, res, 200, 3, "Account is not active");
                    return;
                }
            }

        })
        
    })
  
}

/*============================= Reset Password =============================*/

module.exports.resetpassword = function(req, res) {

	log.info('Page Name : user.js');
	log.info('API Name : resetpassword');
	log.info("Reset Password API Hitted");
	log.info('Parameter Receiving..');

    var auth                = req.body.auth;
	var email               = req.body.email;
	var password            = req.body.password;
	var confirm_password    = req.body.confirm_password;
    var publicKey           = req.body.publicKey;
    var signature           = req.body.signature;
    
    log.info('Email : '+email);
	log.info('Authentication : '+auth);
	log.info('New Password : '+password);
	log.info('Confirm Password : '+confirm_password);
    log.info('Public Key : ' + publicKey);
    log.info('Signature : ' + signature);
    
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
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }
	
	// Validate Password
	if (password === 'undefined' || confirm_password === 'undefined')
	{
		log.info('Passwords Cannot be Blank');
		master.sendResponse(req, res, 200, 1, "Mandatory Field Not Found");
		return;
	}
	
	if (password.length < 6)
	{
		log.info('Your password should be of minimum six characters');
		master.sendResponse(req, res, 200, 6, "Your password should be of minimum six characters");
		return;
	} 

	// Validate Both Password Match 
	if (password !== confirm_password)
	{
		log.info('Password And Confirm Password are Mismatched');
		master.sendResponse(req, res, 200, 6, "Both password entries must be identical.");
		return;
	}	
    
    auth=auth.replace(/\ /g,'+');
    
    var query = {publicKey:publicKey};
    //var text  = 'email='+encodeURIComponent(email)+'&auth='+encodeURIComponent(auth)+'&password='+encodeURIComponent(password)+'&confirm_password='+encodeURIComponent(confirm_password)+'&publicKey='+encodeURIComponent(publicKey);
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if(result == "" || result == null || result == undefined)
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            else
            {
                var tokenTest = crypt.token.verify((result[0]._id).toString(), auth.toString());
                
                // Token Expired
                if (tokenTest == 2)
                {
                    log.info('Reset Password Token is Expired');
                    master.sendResponse(req, res, 200, 10, 'Token is expired');
                    return;
                }

                // Invalid Token 
                else if (tokenTest == 0)
                {
                    log.info('Token is Invalid');
                    master.sendResponse(req, res, 200, 11, 'Token is Invalid');
                    return;
                }

                // Valid Token
                else if (tokenTest == 1)
                {
                    log.info('Token is Valid');
                }

                // Unknown Token
                else
                {
                    log.info('Unknown Token Output');
                    master.sendResponse(req, res, 200, 50, 'Unknown Token Error');
                    return;
                }
                
                // Generated Salt
                var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
                var salt  = '';
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
                        log.error(err);
                        master.sendResponse(req, res, 200, 5, "Database Error");
                        return;
                    }

                    if (results==null || results=="") // Email Not Found
                    {
                        log.info(email+" Not Registered");
                        master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                        return;
                    }

                    else
                    {
                        log.info('Password Resetted Successfully');
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
    
    log.info('Page Name : user.js');
	log.info('API Name : changePassword');
	log.info('Change Password API Hitted');
	log.info('Parameters Receiving..');
    
    var email               = req.body.email;
    var old_pass            = req.body.old_password;
	var new_pass            = req.body.new_password;
    var confirm_new_pass    = req.body.confirm_new_password;
    var publicKey           = req.body.publicKey;
    var signature           = req.body.signature;
    
    log.info('Email : ' + email);
    log.info('Old Password : ' + old_pass);
    log.info('New Password : ' + new_pass);
    log.info('Confirm Password : ' + confirm_new_pass);
    log.info('Public Key : ' + publicKey);
    log.info('Signature : ' + signature);
    
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
		log.info('Incorrect Email Format');
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
    //var text  = 'email='+encodeURIComponent(email)+'&old_password='+encodeURIComponent(old_pass)+'&new_password='+encodeURIComponent(new_pass)+'&confirm_new_password='+encodeURIComponent(confirm_new_pass)+'&publicKey='+encodeURIComponent(publicKey);
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if(result.length == 0) // DoesNot Exists
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            var salt = result[0].salt;
            var stored_pass = result[0].password;

            old_pass = crypt.hashIt(salt+old_pass);	

            // Validate Old Password
            if(old_pass != stored_pass)
            {
                log.info('Old Password is Wrong');
                master.sendResponse(req, res, 200, 6, "The entry in the Old Password field is incorrect.");
                return;
            }

            // Validate New Password
            if(new_pass == null || new_pass.length==0 || confirm_new_pass == null || confirm_new_pass.length==0)
            {
                log.info('Password is Blank');
                master.sendResponse(req, res, 200, 1, "Mandatory field not found");
                return;
            }

            if(new_pass.length < 6)
            {
                log.info('Your password should be of minimum six characters');
                master.sendResponse(req, res, 200, 1, "Your password should be of minimum six characters");
                return;
            }

            // Checking New Password With Confirm New Password
            if(new_pass != confirm_new_pass)
            {
                log.info('New Password And Confirm Password are Mismatched');
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
                    log.error(err);
                    master.sendResponse(req, res, 200, 5, "Database Error");
                    return;
                }

                if (results==null || results=="") // Email Not Found
                {
                    log.info(email+" Not Registered");
                    master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                    return;
                }

                else
                {

                    log.info('Password Changed Successfully');
                    changePassEmail(result[0]);
                    master.sendResponse(req, res, 200, -1, 'Success');

                }

            })

        })
            
    })
    
}

/*============================= Set App Id =============================*/

module.exports.setAppId = function (req, res) {
    
    log.info('Page Name : user.js');
	log.info('API Name : setAppId');
	log.info('Set App API Hitted');
	log.info('Parameters Receiving..');
    
    var email       = req.body.email;
    var appId       = req.body.appId;
    var publicKey   = req.body.publicKey;
    var signature   = req.body.signature;
    
    log.info('Email : ' + email);
    log.info('App Id : ' + appId);
    log.info('Public Key : ' + publicKey);
    log.info('Signature : ' + signature);

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
		log.info('Incorrect Email Format');
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
    //var text  = 'email='+encodeURIComponent(email)+'&appId='+encodeURIComponent(appId)+'&publicKey='+encodeURIComponent(publicKey);
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                log.info('App Id Successfully Setted');
                master.sendResponse(req, res, 200, -1, 'Success');
            }

        })
    
    })
    
}

/*============================= Get App Id =============================*/

module.exports.getAppId = function (req, res) {
    
    log.info('Page Name : user.js');
	log.info('API Name : getAppId');
	log.info('Get App API Hitted');
	log.info('Parameters Receiving..');
    
    var email       = req.body.email;
    var publicKey   = req.body.publicKey;
    var signature   = req.body.signature;
    
    log.info('Email : ' + email);
    log.info('Public Key : ' + publicKey);
    log.info('Signature : ' + signature);

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
		log.info('Incorrect Email Format');
		master.sendResponse(req, res, 200, 7, "Incorrect email id format");
		return;
    }

    var query = {publicKey:publicKey};
    //var text  = 'email='+encodeURIComponent(email)+'&publicKey='+encodeURIComponent(publicKey);
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            else
            {
                log.info('App Id : '+result[0].default_search_appId);
                master.sendResponse(req, res, 200, -1, result[0].default_search_appId);
            }

        })
        
    })
    
}

/*============================= Edit Profile Pic =============================*/

module.exports.editProfilePic = function(req, res){
  
    log.info('Page Name : user.js');
	log.info('API Name : editProfilePic');
	log.info('Edit Profile Pic API Hitted');
	log.info('Parameters Receiving..');
    
    var email       = req.body.email;
    var dataImage   = req.body.profile_pic;
    var extension   = req.body.extension;
    var publicKey   = req.body.publicKey;
    var signature   = req.body.signature;

    log.info('Email: '+email);
    log.info('Extension: '+extension);
    log.info('Public Key: '+publicKey);

    var imageUploadUrl = 'public/images/';

    var path       = imageUploadUrl+"original/";
    var thumbPath  = imageUploadUrl+"thumb/";
    var mediumPath = imageUploadUrl+"medium/";
    var smallPath  = imageUploadUrl+"small/";
      
    // Validate Email
    if(!(master.validateParameter(email, 'Email')))
    {
        master.sendResponse(req, res, 200, 1, "Mandatory field not found");
        return;
    }

    if(!(validateEmail(email))) 
    {
        log.info('Incorrect Email Format');
        master.sendResponse(req, res, 200, 7, "Incorrect email id format");
        return;
    }

    // Validate DataImage
    if(!(master.validateParameter(dataImage, 'dataImage')))
    {
        master.sendResponse(req, res, 200, 1, "Mandatory field not found");
        return;
    }

    // Validate Extension
    if(!(master.validateParameter(extension, 'Extension')))
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

    var query = {'publicKey': publicKey};
    // var text  = 'email='+encodeURIComponent(email)+'&publicKey='+encodeURIComponent(publicKey);
    var text  = 'email='+email+'&publicKey='+publicKey;

    master.secureAuth(query, text, signature, function (result){
             
        if(result[0].error == true || result[0].error == 'true')
        {
            master.sendResponse(req, res, 200, result[0].errCode, result[0].message);
            return;
        }

        var randomNo = Math.floor(Math.random()*9000) + 1000;
        var fileName = email+'_'+randomNo+'.'+extension;
        log.info('File Name : '+fileName);
        var query = {"email": email};

        userSchema.find(query, function(err, imageresults){

            log.info('getImageNameFromUser Callback');
            log.info(imageresults);

            if (typeof imageresults !== 'undefined')
            {  
                var filePath = path+imageresults[0]['profile_pic'];
                log.info('File Name from Database: '+filePath);

                fs.exists(filePath, function (exists) {
                      
                    if (exists)
                    {
                        if(imageresults[0]['profile_pic'] !== null && imageresults[0]['profile_pic'] !== 'Default_profile_image.PNG' && imageresults[0]['profile_pic'] !== '')
                        { 
                            log.info("File is there");
                            
                            //remove image from server.
                            fs.unlinkSync(filePath);

                            var fileThumbPath  = thumbPath+imageresults[0]['profile_pic'];
                            var fileMediumPath = mediumPath+imageresults[0]['profile_pic'];
                            var fileSmallPath  = smallPath+imageresults[0]['profile_pic'];

                            log.info(fileMediumPath);

                            fs.exists(fileThumbPath, function (exists){
                                
                                if (exists)
                                {
                                    fs.unlinkSync(fileThumbPath);
                                    //log.info('Image removed from thumb folder');
                                }
                                
                            });

                            fs.exists(fileMediumPath, function (exists){
                                
                                if (exists)
                                {
                                    fs.unlinkSync(fileMediumPath);
                                    //log.info('Image removed from medium folder');
                                 }
                            });

                            fs.exists(fileSmallPath, function (exists){
                                if (exists)
                                {
                                    fs.unlinkSync(fileSmallPath);
                                    //log.info('Image removed from small folder');
                                }
                                
                            }); 

                            log.info('Image removed from server');
                            
                        }  

                    }
                              
                    /*Created Origin image*/
                    fs.writeFile(path+fileName, dataImage, 'base64', {encoding:null}, function(err){ 
                                   
                        // log.info(path+fileName);
                        if(err)
                        {
                            log.error(err);
                            master.sendResponse(req, res, 200, 50, "file could not creating");
                            return;
                        }
                        else
                        {
                            var query = {"email": email};
                            
                            userSchema.findOneAndUpdate(query, {'profile_pic':fileName}, function(err, retVal){

                                if(retVal)
                                {
                                    log.info('Image path updated');
                                    log.info("Image successfully Created");
                                    resizeImages();
                                    master.sendResponse(req, res, 200, -1, "Image successfully Created");
                                }
                                else
                                {
                                    master.sendResponse(req, res, 200, -1, "Database Error");
                                    return;
                                }

                            });
                                         
                        }

                    });

                });

            }

        });


        /*function to resize images*/
        function resizeImages(){
        
            log.info("resize images function called");

            // Thumbnail Images
            im.resize({
                srcPath: path+fileName,
                dstPath: thumbPath+fileName,
                width:   80
            }, function(err, stdout, stderr){
              if (err) throw err;
              log.info('resized profile pic to fit within 64px');
            });

            // Medium Images
            im.resize({
                srcPath: path+fileName,
                dstPath: mediumPath+fileName,
                width:   200
            }, function(err, stdout, stderr){
              if (err) throw err;
              log.info('resized profile pic to fit within 200px');
            });

            // Small Images
            im.resize({
                srcPath: path+fileName,
                dstPath: smallPath+fileName,
                width:   150
            }, function(err, stdout, stderr){
              if (err) throw err;
              log.info('resized profile pic to fit within 128px');
            });
 
        }
  
   });

}

/* Accounting API */

/*============================= Credit User Amount =============================*/

module.exports.creditUserAmount = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : creditUserAmount')
	log.info('Credit User Amount API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Amount '+amount+' Successfully Deposited To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct User Amount =============================*/

module.exports.deductUserAmount = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductUserAmount')
	log.info('Deduct User Amount API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Purchase =============================*/

module.exports.addPurchases = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addPurchases')
	log.info('Add Purchase API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Purchase Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Purchases =============================*/

module.exports.deductPurchases = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductPurchases');
	log.info('Deduct Purchase API Hitted');
	log.info('Parameter Receiving..');
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Purchase Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Cashback =============================*/

module.exports.addCashback = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addCashback')
	log.info('Add Cashback API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Cashback Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Cashback =============================*/

module.exports.deductCashback = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductPurchases');
	log.info('Deduct Cashback API Hitted');
	log.info('Parameter Receiving..');
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Cashback Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Affiliate Earning =============================*/

module.exports.addAffEarning = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addAffEarning')
	log.info('Add Affiliate Earning API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Affiliate Earning Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Affiliate Earning =============================*/

module.exports.deductAffEarning = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductAffEarning');
	log.info('Deduct Affiliate Earning API Hitted');
	log.info('Parameter Receiving..');
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Affiliate Earning Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Sales =============================*/

module.exports.addSales = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addSales')
	log.info('Add Sales API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Sales Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Sales =============================*/

module.exports.deductSales = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductSales');
	log.info('Deduct Sales API Hitted');
	log.info('Parameter Receiving..');
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Sales Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Trade =============================*/

module.exports.addTrade = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addTrade')
	log.info('Add Trade API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Trade Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Trade =============================*/

module.exports.deductTrade = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductTrade');
	log.info('Deduct Trade API Hitted');
	log.info('Parameter Receiving..');
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Trade Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Total Keyword Income =============================*/

module.exports.addTotalKeywordIncome = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addTotalKeywordIncome')
	log.info('Add Total Keyword Income API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Total Keyword Income Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Total Keyword Income =============================*/

module.exports.deductTotalKeywordIncome = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductTotalKeywordIncome');
	log.info('Deduct Total Keyword Income API Hitted');
	log.info('Parameter Receiving..');
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Total Keyword Income Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Blocked Pending Withdrawals =============================*/

module.exports.addBlockedPendingWithdrawals = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addBlockedPendingWithdrawals')
	log.info('Add Blocked Pending Withdrawals API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Blocked Pending Withdrawals Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Blocked Pending Withdrawals =============================*/

module.exports.deductBlockedPendingWithdrawals = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductTotalKeywordIncome');
	log.info('Deduct Blocked Pending Withdrawals API Hitted');
	log.info('Parameter Receiving..');
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            log.info('Blocked Pending Withdrawals Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Approved Withdrawals =============================*/

module.exports.addApprovedWithdrawals = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addApprovedWithdrawals')
	log.info('Add Approved Withdrawals API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Approved Withdrawals Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Approved Withdrawals =============================*/

module.exports.deductApprovedWithdrawals = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductApprovedWithdrawals');
	log.info('Deduct Blocked Pending Withdrawals API Hitted');
	log.info('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Approved Withdrawals
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{approved_withdrawals:amount}},function(err, result){

            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            log.info('Approved Withdrawals Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Renewal Fees =============================*/

module.exports.addRenewalFees = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addRenewalFees')
	log.info('Add Renewal Fees API Hitted');
	log.info('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Approved Withdrawals
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{renewal_fees:amount}},function(err, result){

            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Renewal Fees Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Renewal Fees =============================*/

module.exports.deductRenewalFees = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductRenewalFees');
	log.info('Deduct Renewal Fees API Hitted');
	log.info('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = -parseFloat(retVal[0].amount);
        
        // Find and Update User's Approved Withdrawals
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{renewal_fees:amount}},function(err, result){

            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            log.info('Renewal Fees Amount '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Total App Income =============================*/

module.exports.addTotalAppIncome = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addTotalAppIncome')
	log.info('Add Total App Income API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Total App Income Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Search Affiliate Earning =============================*/

module.exports.addSearchAffEarning = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addSearchAffEarning')
	log.info('Add Search Affiliate Earning API Hitted');
	log.info('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's Search Affiliate Earnings
        userSchema.findOneAndUpdate({email:retVal[0].email},{$inc:{search_affiliate_earnings:amount}},function(err, result){

            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Search Affiliate Earning Amount '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= First Buy Status =============================*/

module.exports.firstBuy = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : firstBuy')
	log.info('First Buy Status API Hitted');
	log.info('Parameter Receiving..')
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        // Find and Update User's First Buy Status
        userSchema.findOneAndUpdate({email:retVal[0].email}, {first_buy_status:amount}, function(err, result){

            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Successfully Updated First Buy Status of '+retVal[0].email+' To '+amount);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Add Blocked For Bids =============================*/

module.exports.addBlockedForBids = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : addBlockedForBids')
	log.info('Add Blocked For Bids API Hitted');
	log.info('Parameter Receiving..')
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Blocked For Bids '+amount+' Successfully Added To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Deduct Blocked For Bids =============================*/

module.exports.deductBlockedForBids = function(req, res){
    
	log.info('Page Name : user.js');
	log.info('API Name : deductBlockedForBids');
	log.info('Deduct Blocked For Bids API Hitted');
	log.info('Parameter Receiving..');
    
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
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }

            log.info('Blocked For Bids '+amount+' Successfully Deducted From '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');

        })
        
    })
  
}

/*============================= Reject Blocked Bids =============================*/

module.exports.rejectBlockedBids = function(req, res){
	
	log.info('Page Name : user.js');
	log.info('API Name : rejectBlockedBids')
	log.info('Reject Blocked Bids API Hitted');
	log.info('Parameter Receiving..');
	
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

	log.info('Json File : '+reject_bids_json);
	
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
		log.info('Reject Bids Json Missing');
		master.sendResponse(req, res, 200, 1, "Mandatory field not found");
		return;
	}
	
	var options = {
		host: 'searchtrade.com',
		path: '/keywords/active_bids/'+reject_bids_json+'.json'
	};  	
	
    var query = {publicKey:publicKey};
    //var txt = 'reject_bids_json='+encodeURIComponent(reject_bids_json)+'&publicKey='+encodeURIComponent(publicKey);
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

                        log.info('Chunk Started');

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

                    log.info(totalAmount);

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
                    log.info('Error In Updating Blocked Bids At:'+value+' For Email: '+bidRetEmail);

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
                if(value == "Success")
                {
                    log.info('Cancelled All Reject Bids Successfully');
                    master.sendResponse(req, res, 200, 5, "Database Error");
                }

                else
                {
                    log.info('Error In Cancellation At:'+value+' For Email: '+bidRetEmail);
                    master.sendResponse(req, res, 200, 5, "Database Error");
                }
            }

        ])
            
    })
}

/*============================= Update Notification Status =============================*/

module.exports.updateNotificationStatus = function(req, res){
    
    log.info('Page Name : user.js');
	log.info('API Name : updateNotificationStatus')
	log.info('Update Notification Status API Hitted');
	log.info('Parameter Receiving..');
    
    master.validation(req, function(retVal){
        
        if(retVal[0].error == true || retVal[0].error == 'true')
        {
            master.sendResponse(req, res, 200, retVal[0].errCode, retVal[0].message);
            return;
        }
        
        var amount = parseFloat(retVal[0].amount);
        
        var notificationStatus = false;
        
        if(amount == 1)
        {
            notificationStatus == true;
        }
        
        // Find and Update User's Blocked For Bids
        userSchema.findOneAndUpdate({email:retVal[0].email},{$set:{notification_status:notificationStatus}},function(err, result){
            
            if (err)
            {
                log.error(err);
                master.sendResponse(req, res, 200, 5, "Database Error");
                return;
            }

            if (result==null || result=="") // Email Not Found
            {
                log.info(retVal[0].email+" Not Registered");
                master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
                return;
            }
            
            log.info('Notification Status '+notificationStatus+' Successfully Updated To '+retVal[0].email);
            master.sendResponse(req, res, 200, -1, 'Success');
            
        })
    })
}

/*============================= Get Notification Status =============================*/

module.exports.getNotificationStatus = function(req, res){
    
    log.info('Page Name : user.js');
	log.info('API Name : getNotificationStatus')
	log.info('Get Notification Status API Hitted');
	log.info('Parameter Receiving..');
    
    var email = req.body.email;

    // Find and Update User's Blocked For Bids
    userSchema.find({email:email},{notification_status:1,_id:1},function(err, result){

        if (err)
        {
            log.error(err);
            master.sendResponse(req, res, 200, 5, "Database Error");
            return;
        }

        if (result==null || result=="") // Email Not Found
        {
            log.info(email+" Not Registered");
            master.sendResponse(req, res, 200, 4, 'There is no user registered with that email address.');
            return;
        }

        log.info('Notification Status is '+result[0].notification_status+' For '+email);
        master.sendResponse(req, res, 200, -1, {notification_status:result[0].notification_status, user_id:result[0]._id});

    })

}