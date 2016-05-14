var jsonfile = require('jsonfile')
var fs = require('fs')
var Converter = require('csvtojson').Converter
var converter = new Converter({})

converter.fromFile('D:/test.csv', function (err, result) {
  var file = 'D:/test.json'

  jsonfile.writeFile(file, result, function (err) {
    // console.error(err)
  })
})
