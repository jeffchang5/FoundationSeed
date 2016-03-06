var fs = require('fs');
var express = require('express');
var config = require('./config/config');
var app = express();
var port = process.env.PORT || 3000;


// Bootstrap models


require('./config/routes')(app, config);

app.listen(port);

console.log('Express app started on port ' + port);
