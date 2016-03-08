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

module.exports.registernotification = function(accountInfo){ 
  
  console.log('Page Name : api.js');
  console.log('API Name : registernotification');
  console.log('registernotification API Hitted');
  console.log('Parameters Receiving..');

  var accountInfo = accountInfo.body;
  vhash = accountInfo.vhash;
  flag = accountInfo.flag;

  if(flag == '2') // Wallet 
  {
    var url= protocol+"://scoinz.com/presaleWallet/wallet/verifyUser.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&errcode=15";
  }
  else // Web
  {
    var url= protocol+"://localhost/st-web/keywords/views/verifyUser.php?auth="+vhash+"&email="+encodeURIComponent(accountInfo.email)+"&flag="+flag;
  }
  
  var text= '<div style="border:solid thin black; padding: 10px;"><div style="background: #25a2dc; color: #fff; padding: 5px"><img src="http://searchtrade.com/images/searchtrade_white.png" width="200px"></div><br><br><div style="background: #fff; color: #000; padding: 5px;"><div style="width:75%; margin: auto"><p>Hello '+accountInfo.first_name+' '+accountInfo.last_name+',</p><br><p>Your SearchTrade account has been created.</p><p>Please click <a href="'+url+'">Here</a> to verify your email address or copy/paste the link below into your browser.</p><p>'+url+'</p></div></div></div></div>';

  // Setup E-mail Data With Unicode Symbols
  var mailOptions= {
    from: 'Search Trade <donotreply@searchtrade.com>',  // Sender address   
    to : 'prashanttapase@movingtrumpet.com',            // List of Receivers
    subject: "Search Trade: Email Verification",        // Subject line
    text: text,                                         // Text
    html: text
  };

  mailer.sendmail(mailOptions, function(){

    if(true){

      console.log('mail callback success');
       
      var notificationInfo = new notificationschema(accountInfo.body);

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

    return mailStatus

  });
// end mailer.sendmail 
};
// end registernotification function exports
