var props = require('./properties'),
    express = require('express'),
    http = require('http'),
    logger = require('winston'),
    addLobbyEvents = require('./events/LobbyEvents.js'),
    addGameEvents = require('./events/GameEvents.js');
    addInitEvents = require('./events/InitEvents.js');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.set('logger', logger);

server.listen(props.port, function() {
    logger.info('listening on port ' + props.port);
});

app.configure(function() {
    app.use(express.static(__dirname + '/client'));
});

io.sockets.on('connection', function(connection) {
    connection.userData = {};
    addInitEvents(connection);
    addLobbyEvents(connection);
    addGameEvents(connection);
});
