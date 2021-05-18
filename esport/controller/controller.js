var express = require('express');
var controller = express.Router();
var ConnectionDB = require('../util/connectionDB');
let Connection = require("../model/connectionModel");
var mongoose = require('mongoose');
//loads the database of connections

controller.get('/', function(req,res){
    // cDB == connection DataBase
    let cDB = new ConnectionDB(); 
    var list = cDB.getCountTopic();
    cDB = cDB.getConnections();
    

    //Renders the data list to connections 
    res.render('connections', {
        name: req.session,
        profile: req.session.UserProfile,
        list: list, 
        qs: cDB});
    
   
});

controller.get('/:connectionID', function(req,res) {
    //gets connectionID
    let connectionID = req.params.connectionID;
    //Checks to see if connectionID is a number
    
        // cDB connection database
        let cDB = new ConnectionDB();
        cDB = cDB.getConnection(connectionID);
        //puts database into the model
        let connectionModel = new Connection(cDB.connectionId, cDB.connectionName, cDB.connectionTopic,cDB.img,cDB.host , cDB.date, cDB.time,cDB.location,cDB.details);
        console.log(connectionModel);
        res.render('connectionDetail', {profile: req.session.UserProfile, 
            name: req.session,
            Data: connectionModel});
    
});

module.exports = controller;
