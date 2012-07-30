var User = require('../model/User.js');

module.exports = function(connection) {
    connection.on('login', function(userName) {
        this.userData.user = new User(userName);
        this.emit('loginSuccess', userName);
    });
    
    connection.on('loginAsGuest', function() {
        var guestName = "Guest" + Math.floor(Math.random()*1000000);
        this.userData.user = new User(guestName);
        
        this.emit('loginSuccess', guestName);
    });
};