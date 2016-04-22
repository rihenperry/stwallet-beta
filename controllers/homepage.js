/* GET home page */
module.exports.homePage = function (req, res) {
  res.render('index.html',
    {title: 'st-wallet browse API',
      head: 'ST-Wallet Beta API'
    })
}
