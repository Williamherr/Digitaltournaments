const User = require('../model/User');
const mongoose = require('mongoose');


const userData = new mongoose.Schema({
    fName : String,
    lName : String,
    email : String,
    pass : String
})


// Preloaded user
var users = [];
const Users = mongoose.model('User',userData);

Users.find(function (err, w) {
    if (err) return console.error(err);
    for (var i = 0; i < w.length; i++) {
        var c = new User (w[i]._id,w[i].fName,w[i].lName,w[i].email,w[i].pass);  
        users.push(c);   
  }
});



class userDB {

// Returns the user based on userID and email
getUser(userID, email) {
    
    for (var i = 0; i < users.length; i++) {
        if (users[i].userID == userID & users[i].email == email) {
            console.log('Valid User');
            return users[i];
        }
    }
    console.log("No User Found");
    return false;
}
// Checks the login for the user for email and pass 
checkLogin(email,pass) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].pass == pass & users[i].email == email) {
            console.log('Valid User');
            return users[i];
        }
    }
    console.log("No Valid user/pass");
    return false;
}
}

module.exports = userDB;