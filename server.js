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
app.enable('trust proxy');

// Set up routes
app.get('/api', function (req, res) {
  var header = req.headers;
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  var language = header['accept-language'].split(',');

  res.json({
    ipaddress: ip,
    language: language[0],
    software: req.headers['user-agent'].split(') ')[0].split(' (')[1]
  });
});

// Start server
app.listen(port, function() {
  console.log('App is running on port ' + port);
});
