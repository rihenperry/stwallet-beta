/* GET home page */
module.exports.homePage = function(req, res) {
  res.render('index.html',
             {title: "st-notify user preferences",
              head:  "User preference API"
             });
};
