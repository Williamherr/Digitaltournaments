const Connection = require("../model/connectionModel");
const mongoose = require('mongoose');



const connectionData = new mongoose.Schema ({
        connectionName : String,
        connectionTopic : String,
        img : String,
        host : String,
        date : String,
        time : String,
        location : String,
        detail : String
      });

//Preloaded connections
var connections = [];

const connection = mongoose.model('Connection', connectionData);

connection.find(function (err, w) {
        if (err) return console.error(err);
        for (var i = 0; i < w.length; i++) {
              var c = new Connection (w[i]._id,w[i].connectionName,w[i].connectionTopic,w[i].img,w[i].host,w[i].date,w[i].time,w[i].location,w[i].detail);  
              connections.push(c);
        }
      });



class connectionDB {

// Returns a list of different connectionTopic.
// This is used to see how many topics there are
getCountTopic(){
    console.log(connections);
    var list = [];
    for (var i = 0; i < connections.length; i++) {
        if(!list.includes(connections[i].connectionTopic)){
            list.push(connections[i].connectionTopic);
        }
    }
    return list;
}
//Adds a new connection to the preloaded connections list
addNewConnection(connection){
    connections.push(connection);
    console.log('connection has been added to the connection model');
    return connections;
}
//Returns the connection list
getConnections() {
    return connections;
}
//Returns the specific connection based on ID
getConnection(connectID) {
    for (var i = 0; i < connections.length; i++) {
        if (connections[i].connectionId == connectID) {
            return connections[i];
        }
    }
    return null;
};

}
module.exports = connectionDB;