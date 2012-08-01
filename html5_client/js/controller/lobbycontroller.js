function LobbyController($scope, $socket) {
    $scope.nameAvailable = false;
    $scope.btnText = "'" + ($scope.userName || "'") + " not available : (";
    $scope.login = function($socket) {
        alert($scope.userName);
    };
    
    $scope.checkUserNameAvailability = function() {
        if ($scope.userName) {
            $socket.emit('userNameAvailabilityCheck', $scope.userName);
        } else {
             $scope.btnText = "''" + " not available : (";
             $scope.nameAvailable = false;
        }
    };
    
    $socket.on('userNameAvailabilityCheckAnswer', function(nameAvailable) {
         $scope.nameAvailable = nameAvailable;
         if ($scope.nameAvailable) {
             $scope.btnText = "connect already!";
         } else {
             $scope.btnText = $scope.userName + " not available : (";
         }
    });
}

/*
socket.on('loginSuccess', function(userName) {
    socket.emit('joinLobby');
    $.get('/view/lobby.html', function(data) {
        $('#content').html(data);
        $('#usrName').text(userName);
    });
});

var joinedLobby = function() {
    
};

var clearLobby = function() {
	$("#users").children().each(function() {
		$(this).remove();
	});
};

var addFrenemyToLobby = function(name) {
	var users = document.getElementById("users");

	var listItem = document.createElement('li');

	$(listItem).click(function() {
		$('#users li.active').removeClass('active');
		$(this).addClass('active');
	});

	var anchor = document.createElement('a');
	anchor.setAttribute('href', '#');
	anchor.appendChild(document.createTextNode(name));

	listItem.appendChild(anchor);

	users.appendChild(listItem);
};

var removeFrenemyFromLobby = function(name) {
	$("#users").children().each(function() {
		$(this).children().filter('a').each(function() {
			if ($(this).text() === name) {
				$(this).parent().remove();
			}
		});
	});
};

socket.on('usersInLobby', function() {
    clearLobby(); 
    for (var i = 0; i < userNames.length; i++) {
		addFrenemyToLobby(userNames[i]);
	}
});

socket.on('userJoinedLobby', function(userName) {
	addFrenemyToLobby(userName);
});

socket.on('userLeftLobby', function(userName) {
	removeFrenemyFromLobby(userName);
});
*/