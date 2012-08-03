var logger = require('winston'),
    lobby = require('../model/Lobby.js'),
    User = require('../model/User.js');

var alertUsersOnLeave = function(userNameThatLeft) {
    var connectionsInLobby = lobby.getConnectionsInLobby();

    for (var i = 0; i < connectionsInLobby.length; i++) {
        connectionsInLobby[i].emit('userLeftLobby', userNameThatLeft);
    }
};

var alertUsersOnJoin = function(userNameThatJoined) {
    var connectionsInLobby = lobby.getConnectionsInLobby();

    for (var i = 0; i < connectionsInLobby.length; i++) {
        connectionsInLobby[i].emit('userJoinedLobby', userNameThatJoined);
    }
};

var leaveLobby = function(userName) {
    lobby.removeConnection(userName);
    alertUsersOnLeave(userName);
    logger.info(userName + " has left the lobby :(");
};

module.exports = function(connection) {
    connection.on('userNameAvailabilityCheck', function(userName) {
        this.emit('userNameAvailabilityCheckAnswer', !lobby.hasConnection(userName));
    });
    
    connection.on('leaveLobby', function() {
        leaveLobby(this.userData.user.userName());
    });

    connection.on('requestGame', function(opponentName) {
        var userName = this.userData.user.userName();
        logger.info(userName + " wants to play a game against " + opponentName + ":D");
        if (lobby.hasConnection(opponentName)) {
            lobby.getConnection(opponentName).emit('gameRequest', userName);
        } else {
            this.emit('gameRequestResponse', {
                opponent: opponentName,
                accept: false
            });
        }
    });

    connection.on('gameRequestResponse', function(obj) {
        var userName = this.userData.user.userName();
        logger.info(this.userData.user.userName() + " responded on " + obj.opponentName + "'s request: " + obj.accepted);

        var requester = lobby.getConnection(obj.opponentName);
        requester.emit('gameRequestResponse', {
            opponent: userName,
            accepted: obj.accepted
        });

        if (obj.accepted) {
            logger.log(requesteduser.getUserName() + " and " + requestersName + " has agreed upon playing a game of connect-4.");

            leaveLobby(obj.opponentName);
            leaveLobby(userName);

            //TODO: Create a game.
        }
    });

    connection.on('getUsersInLobby', function() {
        this.emit('usersInLobby', lobby.getUserNamesInLobby());
    });

    connection.on("newGame", function(user1, user2) {

    });

    connection.on('disconnect', function() {
        if (this.userData && this.userData.user) {
            var userName = this.userData.user.userName();
            if (lobby.hasConnection(userName)) {
                leaveLobby(userName);
            }
        }
    });
    
    connection.on('connect', function(userName) {
        this.userData.user = new User(userName);
        this.emit('connectSuccess', userName);
        
        lobby.addConnection(this);

        alertUsersOnJoin(this.userData.user.userName());

        logger.info(this.userData.user.userName() + " joined the lobby!");
    });   
};
