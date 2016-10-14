/*
 * @author: niels.seidel@nise81.com
 * @titel: Vi-Dashboard
 * @description: Video learning environment with support for real-time annotations and collaborative work structured by scripts.
 **/

require( './db' );

var 
	express = require('express'),
	expressValidator = require('express-validator'),
	app = express(),
	compression = require('compression'),
	path = require('path'),
	flash = require('connect-flash'),
	server = require('http').createServer(app),
	application = 'vi-dashboard', // default 
	mongoose = require( 'mongoose' )
	;


	/* 
	 * catch arguments 
	 * test: $ node process-2.js one two=three four
	 **/ 
	process.argv.forEach(function (val, index, array) {
		if( array.length > 2 ){
			application = array[3];
		}
	});


	/* 
	 *	make it a plattform for multiple applications
	 **/
	exports.application = function ( req, res ){
			return application;
	};


	/*
	 *
	 **/
	exports.server = function ( req, res ){
		return server;
	};
	

/* configure application **/
 	app.set('port', process.env.PORT || port);
 	app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
 	app.use(compression())
  app.use(express.static(path.join(__dirname, 'public/'+ application)));
 	app.set('views', __dirname + '/public/' + application + '/static/views');
	app.set('view engine', 'ejs');
	app.engine('ejs', require('ejs-locals'));
		
	var cookieParser = require('cookie-parser');
	app.use(cookieParser());
		
	var json = require('express-json');
	app.use( json());
	
	var bodyParser = require('body-parser');
	app.use(expressValidator());	
	app.use( bodyParser.urlencoded({ extended: true }));
	app.use( bodyParser.json());
		
	var methodOverride = require('method-override');
	app.use( methodOverride());
		
	var session = require('express-session');
	app.use(session({
	  secret: 'keyb22oar4d cat', 
	  saveUninitialized: true,
	  resave: true
   }));
	
	app.use(flash());
	//app.use(users.passport.initialize());
	//app.use(users.passport.session());
	app.set("jsonp callback", true); // ?????



/* 
	* Init database, load data, and init ACL 
	**/
var conn = mongoose.connect( 'mongodb://localhost/' + application , function(err, db){
	if(err){
		console.log(err);
	}else{
		/* Initialize Access Control List */
		var ACL = require('./routes/aclrouts')(db, app);
	}	
});


var port = 3000;
server.listen(port);
server.setMaxListeners(0); 

console.log('\n\n***********************************************************');
console.log('Started server for application __'+ application +'__ on port: '+ port);	
console.log('***********************************************************\n\n');
	





