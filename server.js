// Set up dependencies
var express = require('express');
var bodyParser = require('body-parser');
var useragent = require('express-useragent');

// Define port
var port = process.env.PORT || 3000;

// Configure server
var app = express();
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(useragent.express());

// Set up routes
app.get('/api', function (req, res) {
  console.log(req);
  var header = req.headers;
  var language = header['accept-language'].split(',');

  res.json({
    ipaddress: header.host,
    language: language[0],
    software: req.useragent.platform + ', ' + req.useragent.os
  });
});

// Start server
app.listen(port, function() {
  console.log('App is running on port ' + port);
});
