function ConnectController($scope, $socket, $location) {
	$scope.nameAvailable = false;
	$scope.btnText = "'" + ($scope.userName || "'") + " not available : (";
	
	$scope.connect = function() {
	    $socket.emit('connect', $scope.userName);
	};
	
	$scope.$watch('userName', function() {
	    if ($scope.userName) {
	        $socket.emit('userNameAvailabilityCheck', $scope.userName);
	    } else {
	         $scope.btnText = "''" + " not available : (";
	         $scope.nameAvailable = false;
	    }        
	});
	
	$socket.on('connectSuccess', function(userNameId) {
	    $location.path('/lobby');
	});
	
	$socket.on('userNameAvailabilityCheckAnswer', function(nameAvailable) {
	     $scope.nameAvailable = nameAvailable;
	     if ($scope.nameAvailable) {
	         $scope.btnText = "connect already!";
	     } else {
	         $scope.btnText ="'" + $scope.userName +"' not available : (";
	     }
	});
}