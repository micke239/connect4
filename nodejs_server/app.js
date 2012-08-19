var props = require('./properties'),
    express = require('express'),
    http = require('http'),
    logger = require('winston'),
    addLobbyEvents = require('./events/LobbyEvents.js'),
    addGameEvents = require('./events/GameEvents.js');

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

app.get('/*', function(req, res) {
	res.sendfile(__dirname + '/client/client.html')
});

io.sockets.on('connection', function(connection) {
    connection.userData = {};
    addLobbyEvents(connection);
    addGameEvents(connection);
});
