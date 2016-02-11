// Pages
var schema      = require('../models/userSchema.js');

// Functions

/* Register */
module.exports.register = function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var mobileNumber = req.body.mobileNumber;
    
    var myInfo = new schema({
        name : name,
        email : email,
        mobileNumber : mobileNumber
    });
    
    myInfo.save(function(err){
        if(err)
        {
            console.log(err);
            return err;
        }
        console.log('Saved SuccessFully');
        res.send('Saved SuccessFully');
    });
}

/* Delete */
module.exports.delete = function(req, res){
    var email = req.body.email;
    var name = req.body.name;
    
    schema.findOneAndRemove({$and:[{name:name},{email:email}]}, function(err){
		if(err)
		{
			return err;
		}
		console.log('User Deleted!');
		res.send('Deleted Successfully');
	});
}

/* Edit */
module.exports.update = function(req, res){
    
    var name = req.body.name;
    var email = req.body.email;
    var changedName = req.body.changedName;
    
    schema.findOneAndUpdate({$and:[{name:name},{email:email}]}, {name:changedName}, function(err, user) {
        if(err)
		{
			return err;
		}
		console.log('User Updated!');
		res.send('Updated Successfully');
    });

}
