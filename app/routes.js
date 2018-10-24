var AuthenticationController = require('./controllers/authentication'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

// var User = require('./app/models/user');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // Todo Routes
    // apiRoutes.use('/todos', todoRoutes);
 
    // todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    // todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    // todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);

    // // Get Users
    // app.get('/api/users', function(req, res) {
    //     console.log("fetching users");
    //     // use mongoose to get all reviews in the database
    //     User.find(function(err, users) {
    //         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    //         if (err)
    //             res.send(err)
    //         res.json(users); // return all reviews in JSON format
    //     });
    // });
 
    // // create User and send back all USers after creation
    // app.post('/api/users', function(req, res) {
    //     console.log("creating user");
    //     // create a review, information comes from request from Ionic
    //     User.create({
    //         name : req.body.name,
    //         email : req.body.email,
    //         lastname : req.body.lastname,
    //         cel : req.body.cel,
    //         password : req.body.password,
    //         done : false
    //     }, function(err, users) {
    //         if (err)
    //             res.send(err); 
    //         // get and return all the reviews after you create another
    //         User.find(function(err, users) {
    //             if (err)
    //                 res.send(err)
    //             res.json(users);
    //         });
    //     });
 
    // });
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}