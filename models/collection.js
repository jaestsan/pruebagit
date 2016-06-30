var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var collectionDataplanSchema = new Schema({
	name:   		{ type: String },
	description:  	{ type: String }    
});


module.exports = mongoose.model('CollectionDataplan', collectionDataplanSchema);