// Set up
var express  = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var databaseConfig = require('./config/database');
var router = require('./app/routes');

var app = express();
 
// Configuration
mongoose.createConnection(databaseConfig.url);
 
app.use(logger('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({extended: false}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cors());

app.set('port', process.env.PORT || 8080);

// listen
app.listen(app.get('port'));
console.log("App listening on " + app.get('port'));

 router(app);

 
