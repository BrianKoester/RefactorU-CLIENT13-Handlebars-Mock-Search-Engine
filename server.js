//****************
// SERVER SIDE JS
//****************

/**
 * Module dependencies.
 */

var express = require('express');
// var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// display html to client
app.get('/', function(req, res){
	res.render('html-index');
});


// read dataFile 
app.get('/search', function(req, res){
	fs.readFile(__dirname + '/search-data.js', function(err, data){
		res.setHeader('Content-Type', 'text/plain');
		
		// parse dataFile
		var dataFile = {};
		dataFile =  JSON.parse(data);

		// return item found from 'programming' key
		if (dataFile["programming"][req.query.searchKey]) {
			foundValue = dataFile["programming"][req.query.searchKey]["desc"];
		}

		else if 
		// return item found from 'search engines' key
				(dataFile["search engines"][req.query.searchKey]) {
				foundValue = dataFile["search engines"][req.query.searchKey]["desc"];
		}

		else {
		// return error message if item is not found
			foundValue = "***** Item Not Found *****";
		}

		// return foundValue to client
		res.send(foundValue);

	})
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
