function LobbyController($scope, $socket, $location) {
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
    		$location.path('/game');
    	} else {
    		$socket.emit('gameRequestResponse', {opponentName: frenemy, accept: false});
    	}
    });
    
    $socket.on('gameRequestResponse', function(obj) {
    	if (obj.accept) {
    		$location.path('/game');
    	}
    });
}