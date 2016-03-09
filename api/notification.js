var notificationschema = require('../model/notification_model.js');
var mailer          = require('./mail.js');             // Mail Functionality
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var protocol        = 'http';

// Response Function
var sendResponse = function(req, res, status, errCode, errMsg) {

    var d = Date();
    console.log(status +" "+ errCode +" "+ errMsg + " " + d);
    res.status(status).send({
        errCode: errCode, 
        errMsg: errMsg,
        dbDate: d
    });
    
}

/*Verification Email api*/
module.exports.sendVerificationEmail = function(req){ 
  
  console.log('Page Name : notification.js');
  console.log('API Name : sendVerificationEmail');
  console.log('sendVerificationEmail API Hitted');
  console.log('Parameters Receiving..');
  // console.log(req.body[0]);
  var accountInfo = req.body[0];
  vhash = req.body[1].vhash;
  flag = req.body[1].flag;

  // Wallet
  if(flag == '2'){
    var url= protocol+"://scoinz.com/presaleWallet/wallet/verifyUser.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&errcode=15";
  }
  // Web
  else {
    var url= protocol+"://localhost/st-web/keywords/views/verifyUser.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&flag="+flag;
  }
  
  var text= '<div style="border:solid thin black; padding: 10px;"><div style="background: #25a2dc; color: #fff; padding: 5px"><img src="http://searchtrade.com/images/searchtrade_white.png" width="200px"></div><br><br><div style="background: #fff; color: #000; padding: 5px;"><div style="width:75%; margin: auto"><p>Hello '+accountInfo.first_name+' '+accountInfo.last_name+',</p><br><p>Your SearchTrade account has been created.</p><p>Please click <a href="'+url+'">Here</a> to verify your email address or copy/paste the link below into your browser.</p><p>'+url+'</p></div></div></div></div>';

  // Setup E-mail Data With Unicode Symbols
  var mailOptions= {
    from: 'Search Trade <donotreply@searchtrade.com>',  // Sender address   
    to : accountInfo.email,                             // List of Receivers
    subject: "Search Trade: Email Verification",        // Subject line
    text: text,                                         // Text
    html: text
  };

  mailer.sendmail(mailOptions, function(){

    if(true){

      console.log('mail callback success');
       
      var notificationInfo = new notificationschema({
        first_name : accountInfo.first_name,
        last_name : accountInfo.last_name
      });

      notificationInfo.save(function(err){

        if(err)
        {
          console.log(err);
          return err;
        }

        console.log('Saved SuccessFully');
        var mailStatus = true;

      });

    }else{

        console.log('mail callback fails');
        var mailStatus = false;
    }

    return mailStatus;

  });

}

/*forgot password Email api*/
module.exports.sendforgotpassword = function(req){

  console.log('Page Name : notification.js');
  console.log('API Name : sendforgotpassword');
  console.log('sendforgotpassword API Hitted');
  console.log('Parameters Receiving..');

  var accountInfo = req.body[0];
  var vhash = req.body[1].vhash;
  var flag = req.body[1].flag;

  if(flag == '1') // For Web
  {
    var url= protocol+"://localhost/st-web/forgetpwd.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&flag="+flag;
  }
  
  if(flag == '2') // For Wallet
  {
    var url= protocol+"://scoinz.com/presaleWallet/wallet/resetpass.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email);
  }
    
    if(flag == '3') // For Mobile
  {
    var url= protocol+"://localhost/st-web/MobileSite/forgetpwd.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&flag="+flag;
  }
  
  var text= '<div style="border: solid thin black; padding: 10px;"><div style="background: #25a2dc; color: #fff; padding: 5px"><img src="http://searchtrade.com/images/searchtrade_white.png" width="200px"></div><br><br><div style="background: #fff; color: #000; padding: 5px;"><div style="width:75%; margin: auto"><p>Hi '+accountInfo.first_name+' '+accountInfo.last_name+',</p><br><p>You have requested to Change your SearchTrade account password.</p><p>Please click <a href="'+url+'">Here</a> to reset your password.</p><p>OR</p><p>Copy Link Address below in your web browser</p><p>'+url+'</p><br><p>Regards the from SearchTrade team</p><br><p>Product of Searchtrade.com Pte Ltd, Singapore</p></div></div></div>';

  // Setup E-mail data with unicode symbols
  var mailOptions= {
    from: 'Search Trade <donotreply@searchtrade.com>',  // Sender address
    to: accountInfo.email,                              // List of Receivers
    subject: "Search Trade : Reset your password",      // Subject line
    text: text,                                         // Text
    html: text
  };
  
  mailer.sendmail(mailOptions, function(){

    if (true) {

        console.log('mail callback success');
        var mailStatus = true;
    }
    else{

        console.log('mail callback fails');
        var mailStatus = false;
    }

    return mailStatus

  });
// end mailer.sendmail 
};

/*Chnage password email api*/
module.exports.changePassEmail = function(req){
 // console.log(req.body);
  var accountInfo = req.body;
  var text= '<div style="border: solid thin black; padding: 10px;"><div style="background: #25a2dc; color: #fff; padding: 5px"><img src="http://searchtrade.com/images/searchtrade_white.png" width="200px"></div><br><br><div style="background: #fff; color: #000; padding: 5px;"><div style="width:75%; margin: auto"><p>Hi '+accountInfo.first_name+' '+accountInfo.last_name+',</p><br><p>This is a confirmation mail that you have successfully changed your password</p><br><p>You can log into your account with your new password.</p><br><p>Regards from the SearchTrade team</p><br><p>Product of Searchtrade.com Pte Ltd, Singapore</p></div></div></div></div>';
  
  // Setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'Search Trade <donotreply@searchtrade.com>',      // Sender address
    to: accountInfo.email,                                  // List of Receivers
    subject: "Search Trade: Password Change Confirmation",  // Subject line
    text: text,                                             // Text
    html: text
    };

  mailer.sendmail(mailOptions, function(){

    if (true) {

        console.log('mail callback success');
        var mailStatus = true;
    }
    else{

        console.log('mail callback fails');
        var mailStatus = false;
    }

    return mailStatus

  });

}

/*Reset Password*/
module.exports.resettedConfirmation = function(req){
  
  var accountInfo = req.body;
  var text= '<div style="border: solid thin black; padding: 10px;"><div style="background: #25a2dc; color: #fff; padding: 5px"><img src="http://searchtrade.com/images/searchtrade_white.png" width="200px"></div><br><br><div style="background: #fff; color: #000; padding: 5px;"><div style="width:75%; margin: auto"><p>Hi '+accountInfo.first_name+' '+accountInfo.last_name+',</p><br><p>This is a confirmation mail that you have successfully changed your password</p><br><p>You can log into your account with your new password.</p><br><p>Regards the from SearchTrade team</p><br><p>Product of Searchtrade.com Pte Ltd, Singapore</p></div></div></div></div>';
    
  // Setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'Search Trade <donotreply@searchtrade.com>',      // Sender address
    to: accountInfo.email,                                  // list of receivers
    subject: "Search Trade: Password Reset Confirmation",   // Subject line
    text: text,                                             // Text
    html: text
    };
  
   mailer.sendmail(mailOptions, function(){

      if (true) {

          console.log('mail callback success');
          var mailStatus = true;
      }
      else{

          console.log('mail callback fails');
          var mailStatus = false;
      }

      return mailStatus

  });

}