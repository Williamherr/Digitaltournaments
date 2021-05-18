const Router = require('express');
var express = require('express');
var controller = express.Router();
var session = require('express-session');
const connectionDB = require('../util/connectionDB');
const userDB = require('../util/userDB');
const userProfile = require('../util/userProfile');
const User = require('../model/User');
const UserConnection = require('../model/userConnection');
const UserProfileDB = require('../util/UserProfileDB');
const Connection = require('../model/connectionModel');
const UserProfile = require('../util/userProfile');
const mongoose = require('mongoose');


controller.get('/', function(req,res){
    if (typeof req.session.UserProfile == 'undefined') {
    res.render('login');  
    } else {
        console.log('Already Logged in');
    }
    
});

//Used for testing purposes
controller.get('/test', function(req,res){
    console.log('Testing Funcions');
    /*
    var s = new UserProfileDB();
 
    //Testing for UserProfileDB getUserProfile Function
    console.log('adasd')
    console.log(s.getUserProfile('608cdfbd1b29f34baa48dfb3','email@email.com'));
    
    // Testing for addRSVP Function in UserProfileDB
    s.addRSVP('608cd7bd1b29f34baa48dfb12','608cdfbd1b29f34baa48dfb3','No');

    //Testing for addConnection
    var newConnection = new Connection(mongoose.Types.ObjectId(),"Chess Tournament","Tournamentss","/assets/pics/twitch.jpg","Yasmine","Wednesday, Feburary 10 2021","12:30Am - 4:30pm","Online","Join the Chess Tournament hosted by Yasmine.");
    s.addConnction(newConnection);
    */
  });
  
  //Creates new connection
controller.post('/newConnection',function(req,res){
    console.log('Posting new connection');
    console.log(req.body);

    // Finds the time in standard time
    var sHr = req.body.sTime.substring(0,2);
    var sMin = req.body.sTime.substring(3,5);
    var time1 = sHr +":" + sMin + ' AM';
    var eHr = req.body.eTime.substring(0,2);;
    var eMin = req.body.eTime.substring(3,5);
    var time2 = eHr + ":" + sHr + ' AM';
    
    // Changes the time if the time is larger than 12
    if (sHr > 12) { 
        time1 = (parseInt(sHr)-12).toString() +':'+ sMin + ' PM';
        console.log(time1);
    }
    // Changes the time if the time is larger than 12
    if (eHr > 12){
        time2 = (parseInt(eHr)-12).toString() +':'+ eMin + ' PM';
        console.log(time2);
    }
    // Put the time together
    var time1 = time1 + " - " + time2;
    
    var connection = {
        connectionName : req.body.name,
        connectionTopic : req.body.topic,
        img : "/assets/pics/logo.png",
        host : req.session.username,
        date : req.body.date,
        time : time1,
        location : req.body.location,
        details : req.body.details
    }
    var newConnection = new Connection(mongoose.Types.ObjectId(),req.body.name,connection.connectionTopic,connection.img,connection.host,connection.date,connection.time,connection.location,connection.details);
    console.log(newConnection);
    
    var up = new UserProfileDB();
    up.addConnction(newConnection);
    res.render('savedConnections', {name: req.session,
        profile: req.session.UserProfile,
        qs: req.session.UserProfile});
});

controller.post('/', function (req, res) {
    console.log('login');
    
    //Finding User and Password
    var findUser = new userDB();
    findUser = findUser.checkLogin(req.body.username,req.body.password);
    if (!findUser){
        console.log('Login Fail');
        res.render('login',{log:"no"});
        return false;
    }
    
    //Password and Username
    req.session.userID = findUser.userID;
    req.session.email = req.body.username 
    req.session.username = findUser.fName + " " + findUser.lName;
    req.session.password = req.body.password;

 
    // Saving User to session
    var up = new UserProfileDB();
    req.session.UserProfile = up.getUserProfile(findUser.userID,req.body.username );
    console.log(req.session.UserProfile);

    res.render('savedConnections', {name: req.session,
        profile: req.session.UserProfile,
        qs: req.session.UserProfile});
});


// Login 
controller.use('/', function (req,res,next){
    console.log('Testing Session');
    // Checks to see if the user is already login. 
    if (!req.session.UserProfile) {
        res.render("login");
    } else {
        next();
        console.log('next');
    }
});



controller.get('/rsvp', function(req,res){ 
    console.log('Changing rsvp');
    console.log(req.query.id);
    var cDB = new connectionDB();
    var up = new UserProfileDB();

    var rsvp ='';
    // Checks for RSVP 
    if (req.query.rsvp == 'true') {
        rsvp = 'Yes';
    }
    else if (req.query.rsvp == 'false'){
        rsvp = 'No';
    }
    else {
        rsvp = 'Maybe';
    }
    // ADD new connections 
    
    const myPromise = new Promise((resolve, reject) => {
        up.addRSVP(req.query.id, req.session.userID, rsvp);
        setTimeout(() => {
            console.log('Promising');
            req.session.UserProfile = up.getUserProfile(req.session.userID,req.session.email);
            console.log(req.session.UserProfile);
            res.render('savedConnections', {name: req.session, profile: req.session.UserProfile, qs: req.session.UserProfile});
        }, 200);
      });
    
    
});

//Delete
controller.get('/delete', function(req,res) {
    console.log('deleting in progress');
    console.log('query ID: ' + req.query.Id);
    var up = new UserProfileDB();
    up.addRSVP(req.query.Id,req.session.userID,'no');
    req.session.UserProfile = up.getUserProfile(req.session.userID,req.session.email);
    console.log(req.session.UserProfile);

    res.render('savedConnections', {name: req.session, profile: req.session.UserProfile,qs: req.session.UserProfile}); 
});

//logout
controller.get('/logout', function(req,res) {
    console.log('Logging out...');
    req.session.destroy();
    res.render('index');
});




  
module.exports = controller;