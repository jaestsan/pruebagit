var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    cors = require('cors'),
    mongoose = require('mongoose'); 
  




app.configure(function () {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");

    next();
  });

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(cors());


  app.set('port', process.env.PORT || 3000);
  app.set('mongo_tcp_addr', process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost');
  app.set('mongo_tcp_port', process.env.MONGODB_PORT_27017_TCP_PORT || 27017);


});

app.get('/', function(req, res, next) {
  res.send("Hello world!");
  next();
});

routes = require('./routes/sapcs')(app)
routes = require('./routes/dataplans')(app)
routes = require('./routes/collections')(app)

mongoose.connect('mongodb://' + app.get('mongo_tcp_addr') + ':' + app.get('mongo_tcp_port') + 'vSAPC_ui', function(err, res) {
	if (err) {
		console.log('ERROR: connection to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

server.listen(app.get('port'), function() {
  console.log("Node server running on http://localhost:3000");
});
