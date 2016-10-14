/*
author: niels.seidel@nise81.com
module:
description: 

**/

module.exports = function(db, app) {
	var 
		module = {},
		mongoose = require( 'mongoose' ),
	 	Log  = mongoose.model( 'Log' ),
	 	LogExt  = mongoose.model( 'LogExt' ),
	 	fs = require('node-fs'),
	 	get_ip = require('ipware')().get_ip
	 	;
	
	// index html page ~ home
	app.get('/', function(req, res) { 
		LogExt
			.find({})
			.limit(100)
			.exec(function(err, data){
				if(err){
					res.send(err);
				}
				res.render('index', {items: data});
			});	
	});
	
	// output route for JSON 
	app.get('/json/log', function(req, res) { 
		
		// trivial approach, not working with large data sets
		LogExt
			.find({ group:'e'})  // only group e will be selected
			.limit(100) // show only the first 100 entries
			.exec(function(err, data){
				if(err){
					res.send(err)
				}
				res.json( data );  // output as json
		});
		
			
		// trivial approach using streams, more suitable for large data sets
		/*
		var query = Log.find({}).stream();
		query.on('data', function (doc) {
				console.log(doc)
				//log.write( JSON.stringify( doc ) );
		}).on('error', function (err) {
				console.log(err);
		}).on('close', function () {
				console.log('@Log :: closed stream');
				res.send('streams data');
		});
		return;
		*/
		
	});	// end get /json/log
	
	
	
	
	
	
	// route for saving a log from the video player to the database
	app.post('/log', function(req, res) { console.log(req.sessionID)
		var 
			d = req.param('data')
			;
		var entry = {
			utc: 							d.utc, 
			//phase: 						Number,
			//date:  						String, 
			//time:  						String, 
			//group:  					d.group, 
			session:					String(req.sessionID),
			user:  						d.user, 
			user_name:  			req.user.username,
			//user_gender:			String,
			//user_culture:			String,
			//user_session:			Number,
			video_id:  				d.video_id,
			//video_file:  			String,
			//video_length:  		String,
			//video_language:  	String,
			action:  					{
				context: d.action.context,
				action: d.action.action,
				values: d.action.values
			},	
			//action_details: 	[Schema.Types.Mixed],
			playback_time:		d.playback_time === undefined ? '-99' : d.playback_time,
			user_agent:  			d.user_agent,
			ip: 							get_ip(req).clientIp
			//flag: 						Boolean
		}
		// todo: complete missing fields
		// save it
		
		new Log(entry).save( function( err, logs, count ){
			console.log(logs);
			res.end('done');
		} );
		res.send('terminated logging');

	}); // end post /log
	
	
	// method for writing log entries in a file instead 	
	var log = fs.createWriteStream('logfile.debug', {'flags': 'a'}); // use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
	
	
	
	


} // end module
