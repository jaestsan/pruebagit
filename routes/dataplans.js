//File: routes/dataplans.js
module.exports = function(app) {

  var Dataplan = require('../models/dataplan.js');

  //GET - Return all dataplans in the DB
  findAllDataplans = function(req, res) {
  	Dataplan.find(function(err, dataplans) {
  		if(!err) {
        console.log('GET /dataplans')
  			res.send(dataplans);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Dataplan with specified ID
  findById = function(req, res) {
  	Dataplan.findById(req.params.id, function(err, dataplan) {
  		if(!err) {
        console.log('GET /dataplan/' + req.params.id);
  			res.send(dataplan);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Dataplan in the DB
  addDataplan = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var dataplan = new Dataplan({
  		name:    req.body.name,
  		namecollection: req.body.namecollection,
  		image: req.body.image,
  		sapc: req.body.sapc
  	});

  	dataplan.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(dataplan);
  };

  //PUT - Update a register already exists
  updateDataplan = function(req, res) {
  	Dataplan.findById(req.params.id, function(err, dataplan) {
  		dataplan.name   = req.body.name;
  		dataplan.namecollection = req.body.namecollection;
  		dataplan.image = req.body.image;
  		dataplan.sapc  = req.body.sapc;

  		dataplan.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(dataplan);
  		});
  	});
  }

  //DELETE - Delete a TVShow with specified ID
  deleteDataplan = function(req, res) {
  	Dataplan.findById(req.params.id, function(err, dataplan) {
  		dataplan.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/dataplans', findAllDataplans);
  app.get('/dataplan/:id', findById);
  app.post('/dataplans', addDataplan);
  app.put('/dataplan/:id', updateDataplan);
  app.delete('/dataplan/:id', deleteDataplan);

}