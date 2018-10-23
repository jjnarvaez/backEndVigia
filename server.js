// Set up
var express  = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override'); 
var cors = require('cors');



// var http = require('http');
// var logger = require('morgan');
// var jwt = require('jsonwebtoken');
// var secret = 'yourSuperSecretPassword'

var databaseConfig = require('./config/database');
var router = require('./app/routes');

var app = express();
 
// Configuration
mongoose.connect(databaseConfig.url);
//mongoose.connect('mongodb://localhost/vigiadb');
 
app.use(logger('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({extended: false}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride());
app.use(cors());

app.set('port', process.env.PORT || 8080);
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//  });

// listen
app.listen(app.get('port'));
console.log("App listening on " + app.get('port'));

 router(app);

 
