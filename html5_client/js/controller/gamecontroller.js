function GameController($scope, $socket, $location) {
    $scope.$on('$viewContentLoaded', function() {
    	var canvas = document.getElementsByTagName("canvas")[0];
		var ctx = canvas.getContext('2d');
		
		ctx.fillStyle = "rgb(200,0,0)";
		ctx.fillRect(0,0,600,600);
    });
}