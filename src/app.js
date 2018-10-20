'use strict';

var express = require('express');
var parser = require('body-parser');
var app = express();
var router = require('./api');

require('./database');
require('./seed');

app.use('/', express.static('public'));

app.use(parser.json());

app.use('/api', router);

app.listen(3000, function(){
	console.log("Server is running on port 3000");
});