function LoginController($scope) {
    $scope.login = function() {
        alert($scope.userName);
    };
}

/*
socket.on('loginSuccess', function(userName) {
    socket.emit('joinLobby');
    $.get('/view/lobby.html', function(data) {
        $('#content').html(data);
        $('#usrName').text(userName);
    });
});
*/