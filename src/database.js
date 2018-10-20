'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-todo', function(err){
	if(err){
		console.log('DB ERROR APPEARED');
	} else {
		console.log('DB CONNECTED');
	}
});