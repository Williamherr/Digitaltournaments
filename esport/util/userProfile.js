const user = require('../model/user');
const UserConnection = require('../model/userConnection');
const Connection = require('../model/connectionModel');
const connectionDB = require('../util/connectionDB');
var cDB = new connectionDB();

class UserProfile{

    constructor(user, userConnections) {
        this._user = user;
        this._userConnections = userConnections;
    }
    
    
    // Functions 
    addConnection(connection, rsvp){
        var flag = 0;
        console.log("in addConnection");
        console.log(connection);
        console.log(rsvp);
        console.log(this._userConnections.rsvp[0]);
        
        // Updates and Adds Connections and RSVP
        if (connection instanceof Connection && rsvp != undefined) {
            for (let i=0; i <this._userConnections.connection.length; i++) {  
                    if (this._userConnections.connection[i].connectionId === connection.connectionId) {
                        this._userConnections.rsvp[i] = rsvp;
                        console.log(this._userConnections.rsvp[i] = rsvp);
                        flag = 1;
                        break;
                    }
                
            }
            console.log(this._userConnections);

            // Pushes the connection and rsvp in
            if (flag == 0) {
                console.log("adding connection. Updated");
                let newUserCon = new UserConnection(connection, rsvp);
                this._userConnections.connection.push(newUserCon.connection);
                this._userConnections.rsvp.push(newUserCon.rsvp);
            }
            console.log(this._userConnections);
        }

        else {
            console.log('error');
        }
    }
    // Removes a connection
    removeConnection(connection){
        for (let i=0; i <this._userConnections.connection.length; i++) {
            if (this._userConnections.connection[i].connectionId === connection.connectionId) {
                //Pops the array out
                console.log('removing connections');
                this._userConnections.rsvp.pop();
                this._userConnections.connection.pop();
                break;
            }
        }
    }

    getConnection() {
        return this._userConnections;
    }

    // updateConnection was not needed to update so I took it out. Instead I used controller to go to the direct page for editing.
    // updateConnection(userConnection){
    //     console.log('update');
    // }
}


module.exports = UserProfile;
