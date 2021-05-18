const UserProfile = require('../util/userProfile');
const mongoose = require('mongoose');
const userDB = require('./userDB');
const userConnection = require('../model/userConnection');
const connection = require('./connectionDB');


// UserProfile Database model
const userProfileData = new mongoose.Schema({
    connectionID : String,
    userID : String,
    RSVP : String 
});

const UserPDB = mongoose.model("UserConnection", userProfileData);
const Connection = mongoose.model("Connection");

//Preloaded userProfileDatabaseModel
var userPDM = [];

// Set up the userPDM with the UserProfile Database
UserPDB.find(function (err, w) {
    if (err) return console.error(err);
    for (var i = 0; i < w.length; i++) {
        var c = new UserProfile (w[i].userID, new userConnection(w[i].connectionID,w[i].RSVP));  
        userPDM.push(c);    
  }
});




class UserProfileDB {

    // Get UserProfile
    getUserProfile(userIDs,email) {
        console.log('Getting UserProfile');
        // Checks to validate for user
        var s = new userDB();
        var c = new connection();
        var users = s.getUser(userIDs,email);
        // if there is a user
        
        if (users) {

            var userConnList = [];
            var list = []
            var rsvpList = [];
            // Pushes the connection into an arraylist 
            for (var i = 0; i < userPDM.length; i++) {
                if (userPDM[i]._user == userIDs){
                    //Pushes connections into array
                    userConnList.push(userPDM[i]._userConnections.connection);
                    //Pushes rsvp into an array
                    rsvpList.push(userPDM[i]._userConnections.rsvp);
                }
            }
            // Finds the connections for the userConnList
                for (var j = 0; j < userConnList.length; j++) {
                        //Pushes connections into array
                        list.push(c.getConnection(userConnList[j]));
            }

            userConnList = new userConnection(list,rsvpList);
            
            // Returns the list of UserProfile Objects
            console.log('Returning UserProfile');
            return userConnList;
        }
}
    // Updates the savedConnection database by adding/editing/deleting
    addRSVP(connectionID, userID, rsvp) {
        console.log('Adding/Updating/Deleting');
        // If RSVP is no, the connection is deleted
            if (rsvp.toUpperCase() == 'NO') {
                console.log('Deleting Connection');
                
                UserPDB.findOneAndDelete({connectionID:connectionID,userID:userID},function (err, w){
                    
                    console.log(w + " has been deleted");
                });
                //Deletes from the userPDM list
                for (var i = 0; i < userPDM.length; i++) {
                     if (userPDM[i]._userConnections.connection == connectionID & userPDM[i]._user == userID) {
                         userPDM.splice(i,1);
                         console.log(userPDM);
                         console.log(connectionID + " has been removed from the arraylist");
                     }
                 }
            }

            else {
            // Finds the connection based on connectionID and userID
            UserPDB.findOneAndUpdate({connectionID:connectionID,userID:userID},{ RSVP: rsvp},function (err, w){
                //if there no connection is found, a new one will be made
                if (w == null) {
                    const userP = new UserPDB({connectionID:connectionID,userID:userID,RSVP: rsvp});
                    userP.save();
                    userPDM.push(new UserProfile(userID,new userConnection(userP.connectionID,userP.RSVP)));             
                    console.log(userPDM);
                    console.log('added new rsvp');
                }
                // else the RSVP will update
                else{
                    console.log('RSVP has been updated to ' + rsvp);
                    for (var i = 0; i < userPDM.length; i++) {
                        if (userPDM[i]._userConnections.connection == connectionID & userPDM[i]._user == userID) {
                            userPDM[i]._userConnections.rsvp = rsvp;
                            console.log(userPDM);
                            console.log(connectionID + " has been updated");
                        }
                    }
                }
            });    
    }
    }
    
    // The method adds a new connection to the conenction tab
    addConnction(newConnections) {
        console.log('Adding new Connection');
        console.log(newConnections);
        var connect = new connection();
        connect.addNewConnection(newConnections);
        const newConnection = new Connection({connectionName:newConnections.connectionName,connectionTopic:newConnections.connectionTopic,img:newConnections.img,host:newConnections.host,date:newConnections.date,time:newConnections.time,location:newConnections.location,detail:newConnections.details });
        console.log(newConnection);
        
        Connection.find(function (err, w){
            newConnection.save();
        });
    }

}



module.exports = UserProfileDB;