
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 

var Log = new Schema({
		utc: 							Number, 
		phase: 						Number,
		date:  						String, 
		time:  						String,
		session:  				String,
		
		group:  					String, 
		user:  						Number, 
		user_name:  			String,
		user_gender:			String,
		user_culture:			String,
		user_session:			Number,
				
		video_id:  				String,
		video_file:  			String,
		video_length:  		String,
		video_language:  	String,
		
		action:						{
			context: String,
			action: String,
			values: Array
		},
		playback_time:		Number,
		user_agent:  			String,
		ip: 							String,
		flag: 						Boolean
}); 
mongoose.model( 'Log', Log );


// extended Log
var LogExt = new Schema({
	utc: Number, 
	date: String,
	time: String,
	phase: Number,

	group: String, 
	user: Number, 
	user_name: String,
	user_gender: String,
	user_culture: String,
	user_session: Number,

	group_name: String,
	group: String,
		
	video_id: String,
	video_file: String,
	video_length: String,
	video_language: String,
	playback_time: Number,

	action_context: String,
	action_type: String,
	action_value: String,
	action_artefact: String,
	action_artefact_id: String,
	action_artefact_author: String,
	action_artefact_time: String,
	action_artefact_response: String,

	ua_browser_version: String,
	ua_browser_engine: String,
	ua_os: String,
	ua_os_version: String,
	ua_device: String,
	ip: String
}); 
mongoose.model( 'LogExt', LogExt );		

