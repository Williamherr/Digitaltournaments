var express = require('express');
var UserController = require('./controller/UserController.js');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser. urlencoded({extended: true}));
var session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/esport', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database Connected');
  // we're connected!
});


//session
app.use(session({
    secret: 'user',
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));



//routes and controllers
var controller = require('./controller/controller.js');
const UserProfile = require('./util/userProfile.js');
app.use('/connections', controller);
app.use('/UserController', UserController);


app.get('/', function(req,res){
    res.render('index', { name: req.session, 
        profile: req.session.UserProfile});
});
app.get('/contact', function(req,res){
    res.render('contact', {name: req.session,
        profile: req.session.UserProfile,
        qs: req.query});
});

app.get('/about', function(req,res){
    res.render('about', {name: req.session,
        profile: req.session.UserProfile,
        qs: req.query});
});

app.get('/savedConnections', function(req,res){
    console.log('savedConnection Page');
    //Checks to see if user is login
    if (!req.session.UserProfile) {
            res.render("login");
    } else {
    res.render('savedConnections', {name: req.session, 
        profile: req.session.UserProfile,
        qs: req.session.UserProfile});
    }
});
app.get('/newConnection', function(req,res){
    res.render('newConnection', {name: req.session, 
        profile: req.session.UserProfile,
        qs: req.query});
});
 

app.listen(3000);