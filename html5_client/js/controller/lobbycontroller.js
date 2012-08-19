function LobbyController($scope, $socket) {
    $scope.frenemies = {};
    
    $scope.$on('$viewContentLoaded', function() {
    	$socket.emit('getUsersInLobby');
    });
    
    $scope.selectFrenemy = function(frenemy) {
    	if ($scope.currentlySelected) {
    		if ($scope.frenemies[$scope.currentlySelected]) {
    			$scope.frenemies[$scope.currentlySelected] = false;
    		}
    	}
    	
    	$scope.frenemies[frenemy] = true;
    	$scope.currentlySelected = frenemy;
    }
    
    $scope.playRandom = function() {
    	
    }
    
    $scope.playSelected = function() {
    	$socket.emit('requestGame', $scope.currentlySelected);
    }
    
    $socket.on('usersInLobby', function(userNames) {
        delete $scope.frenemies;
        $scope.frenemies = {};
        for (var i = 0; i < userNames.length; i++) {
    		$scope.frenemies[userNames[i]] = false;
    	}
    });

    $socket.on('userJoinedLobby', function(userName) {
    	$scope.frenemies[userName] = false;
    });

    $socket.on('userLeftLobby', function(userName) {
    	delete $scope.frenemies[userName];
    });
    
    $socket.on('gameRequest', function(frenemy) {
    	if (confirm("Game request from " + frenemy + ". Accept?")) {
    		$socket.emit('gameRequestResponse', {opponentName: frenemy, accept: true});
    	} else {
    		$socket.emit('gameRequestResponse', {opponentName: frenemy, accept: false});
    	}
    });
    
    $socket.on('gameRequestResponse', function(obj) {
    	console.log(obj.opponentName + " accepted: " + obj.accept);
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
*/