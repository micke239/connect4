var lobby = {};

module.exports = {
    getConnectionsInLobby: function() {
        var array = new Array();
        for (var userName in lobby) {
            array.push(lobby[userName]);
        }
        return array;
    },
    getUserNamesInLobby: function() {
        var array = new Array();
        for (var userName in lobby) {
            array.push(userName);
        }
        return array;
    },
    addConnection: function(connection) {
        var userName = connection.userData.user.userName();
        if (!(userName in lobby)) {
            lobby[userName] = connection;
        } else {
            throw {
                name: "User Already Exists",
                message: "A User with that user name already exists in the lobby!"
            };
        }
    },
    removeConnection: function(userName) {
        delete lobby[userName];       
    },
    hasConnection: function(userName) {
        return (userName in lobby);
    },
    getConnection: function(userName) {
        return lobby[userName];
    }
};