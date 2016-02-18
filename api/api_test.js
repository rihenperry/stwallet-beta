var request = require('request')


request({
  uri: "http://localhost:5000/secure/getPoolStats",
  method: "POST",
  json: {
   // action: "create",
    fieldType: {
   // name: "n$name",
      valueType: { primitive: "STRING" },
      //scope: "versioned",
      // namespaces: { "my.demo": "n" }
    }
  }
});
