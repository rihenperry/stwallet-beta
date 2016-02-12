// Packages
var crypto  = require('crypto');
var token   = require('token');

// Algorithm AND Key
var algorithm = 'sha512';
var key       = 'a@45_hash';

token.defaults.secret= 'webwallet';
token.defaults.timeStep= 1 * 60 * 60; // 1h in seconds form

// Random Value Generator Function
module.exports.hashIt = function (data){
    
    var sha = crypto.createHash('sha1');
    sha.update(data+"",'ascii');
    return sha.digest('hex');
};

module.exports.generate = function(data) {
  return token.generate(data.toString());
};

module.exports.createKeyPair = function(text, cb) {
  console.log('createKeyPair');
  
  var hash;
  var hmac = crypto.createHmac(algorithm, key);
  // readout format:
  hmac.setEncoding('hex');
  //or also commonly: hmac.setEncoding('base64');

  // callback is attached as listener to stream's finish event:
  hmac.end(text, function () {
    hash = hmac.read();
    //...do something with the hash...
    //console.log(hash);
    
    cb(hash);
  });
  

};

module.exports.encryptMessage = function(text, k, cb) {
  console.log("encrypting "+text);
  
  var hash;
  
  var hmac = crypto.createHmac(algorithm, k);
  // readout format:
  hmac.setEncoding('hex');
  //or also commonly: hmac.setEncoding('base64');

  // callback is attached as listener to stream's finish event:
  hmac.end(text, function () {
    hash = hmac.read();
    //...do something with the hash...
    //console.log(hash);
    
    cb(hash);
  });
  

};

module.exports.validateSignature = function(text, signature, privateKey, cb) {
  //vrm744685
  //text = "email="+email+"&password="+password+"&publicKey="+publicKey;
  //console.log("checking "+text);
  //text = "first_name=palak&last_name=hazare&email=hazare&password=111111&confirm_password=111111&mobile_number=0&publicKey=35d52cb31c17c92ae77bf6dfab4debc042afbe89b24832ce237e07427f26b8bc";
  //text = "abc";
  
  this.encryptMessage(text, privateKey, function(hash) {
    if (signature === hash)
    {
		console.log('******');

    //console.log('Signature By Trilok :'+signature);
    //console.log('Hash :'+hash)

		console.log('Signature is Valid');
		cb(true);
    }
    else
    {
		//console.log("Signatures did not match");
		console.log( signature + ' !== \n' + hash);
		cb(false);
    }
  });
  
};

module.exports.random = function (howMany, chars) {
    chars = chars 
        || "0123456789";
    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };

    return value.join('');
}

module.exports.token = token;
