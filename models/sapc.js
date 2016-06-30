var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var sapcSchema = new Schema({
	hostname:   	{ type: String },
	description:  	{ type: String },
	port:  			{ type: Number },
	user:  			{ type: String },
	password: 		{ type: String },
	becertificate: 	{ type: String }    
});


module.exports = mongoose.model('Sapc', sapcSchema);