//File: routes/collections.js
module.exports = function(app) {

  var CollectionDataplan = require('../models/collection.js');

  //GET - Return all collectionsDataplan in the DB
  findAllCollectionsDataplan = function(req, res) {
  	CollectionDataplan.find(function(err, collectionsdataplan) {
  		if(!err) {
        console.log('GET /collectionsdataplan')
  			res.send(collectionsdataplan);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Sapc with specified ID
  findById = function(req, res) {
  	CollectionDataplan.findById(req.params.id, function(err, collectiondataplan) {
  		if(!err) {
        console.log('GET /collectiondataplan/' + req.params.id);
  			res.send(collectiondataplan);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new CollectionDataplan in the DB
  addCollectionDataplan = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var collectiondataplan = new CollectionDataplan({
  		name:    req.body.name,
  		description: req.body.description
  	});

  	collectiondataplan.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(collectiondataplan);
  };

  //PUT - Update a register already exists
  updateCollectionDataplan = function(req, res) {
  	CollectionDataplan.findById(req.params.id, function(err, collectiondataplan) {
  		collectiondataplan.hostname   = req.body.name;
  		collectiondataplan.description = req.body.description;

  		CollectionDataplan.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(CollectionDataplan);
  		});
  	});
  }

  //DELETE - Delete a TVShow with specified ID
  deleteCollectionDataplan = function(req, res) {
  	CollectionDataplan.findById(req.params.id, function(err, CollectionDataplan) {
  		CollectionDataplan.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/collectionsdataplan', findAllCollectionsDataplan);
  app.get('/collectiondataplan/:id', findById);
  app.post('/collectionsdataplan', addCollectionDataplan);
  app.put('/collectiondataplan/:id', updateCollectionDataplan);
  app.delete('/collectiondataplan/:id', deleteCollectionDataplan);

}