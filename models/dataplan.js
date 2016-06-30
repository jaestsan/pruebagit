var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var dataplanSchema = new Schema({
	name: 		{ type: String },
	namecollection:	{ type: String },
	image:  	{ type: String },
	sapc:  		{ type: String }    
});


module.exports = mongoose.model('Dataplan', dataplanSchema);