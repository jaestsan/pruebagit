//File: routes/sapcs.js
module.exports = function(app) {

  var Sapc = require('../models/sapc.js');
  cors = require('cors')

  app.use(cors());

  var whitelist = ['localhost:3000'];
  var corsOptionsDelegate = function(req, callback){
      var corsOptions;
      if(whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
      }else{
        corsOptions = { origin: false }; // disable CORS for this request
      }
      callback(null, corsOptions); // callback expects two parameters: error and options
  };


  //GET - Return all sapcs in the DB
  findAllSapcs = function(req, res) {
  	Sapc.find(function(err, sapcs) {
  		if(!err) {
        console.log('GET /sapcs')
  			res.send(sapcs);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Sapc with specified ID
  findById = function(req, res) {
  	Sapc.findById(req.params.id, function(err, sapc) {
  		if(!err) {
        console.log('GET /sapc/' + req.params.id);
  			res.send(sapc);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Sapc in the DB
  addSapc = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var sapc = new Sapc({
  		hostname:    req.body.hostname,
  		description: req.body.description,
  		port: req.body.port,
  		user: req.body.user,
  		password: req.body.password,
  		becertificate: req.body.becertificate 
  	});

  	sapc.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(sapc);
  };

  //PUT - Update a register already exists
  updateSapc = function(req, res) {
  	Sapc.findById(req.params.id, function(err, sapc) {
  		sapc.hostname   = req.body.hostname;
  		sapc.description = req.body.description;
  		sapc.port = req.body.port;
  		sapc.user  = req.body.user;
  		sapc.password = req.body.password;
  		sapc.becertificate  = req.body.becertificate;

  		sapc.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(sapc);
  		});
  	});
  }

  //DELETE - Delete a TVShow with specified ID
  deleteSapc = function(req, res) {
  	Sapc.findById(req.params.id, function(err, sapc) {
  		sapc.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/sapcs', findAllSapcs);
  app.get('/sapc/:id', findById);
  app.post('/sapcs', addSapc);
  app.put('/sapc/:id', cors(corsOptionsDelegate), updateSapc);
  app.delete('/sapc/:id', cors(corsOptionsDelegate),deleteSapc);

}