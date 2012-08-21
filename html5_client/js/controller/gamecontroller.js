function GameController($scope, $socket, $location) {
	var checkScreenOrientationAndAdjustCanvases = function() {		
		for (var i = 0; i < arguments.length; i++) {
			//cell phone
			if (window.innerWidth < 768) {
				//landscape
				if (window.innerWidth > window.innerHeight) {
					var height = window.innerHeight - 20;
					arguments[i].canvasStyle.height = height + "px";
					arguments[i].canvasStyle.width = height * ($scope.cols/$scope.rows) + "px";
				} 
				//portrait
				else {
					arguments[i].canvasStyle.height = arguments[i].offsetWidth * ($scope.rows/$scope.cols) + "px";
				}
			} else {
				arguments[i].canvasStyle.height = arguments[i].offsetWidth * ($scope.rows/$scope.cols) + "px";
			}
		}
		
		$scope.canvas.canvasStyle.top = "-" + angular.element($scope.canvas).height() + "px";
	};
	
    $scope.$on('$viewContentLoaded', function() {
    	var backCanvas = document.getElementById("backCanvas");
    	$scope.canvas = document.getElementById("frontCanvas");
    	
    	$scope.squareSize = 100;
    	$scope.cols = frontCanvas.width / $scope.squareSize;
    	$scope.rows = frontCanvas.height / $scope.squareSize;
    	
    	frontCanvas.canvasStyle = {};
    	backCanvas.canvasStyle = {};
    	$scope.frontCanvasStyle = frontCanvas.canvasStyle;
    	$scope.backCanvasStyle = backCanvas.canvasStyle;
    	
    	$scope.addGameInteractionEvents(frontCanvas);
    	
    	checkScreenOrientationAndAdjustCanvases(frontCanvas, backCanvas);
    	
		$scope.ctx = frontCanvas.getContext('2d');
		
		$scope.drawBackground(backCanvas.getContext('2d'));
    });
    
    $scope.drawBackground = function(ctx) {
    	ctx.strokeStyle = "black";
		ctx.beginPath();
		for (var i = 0; i <= $scope.cols; i++) {
			var extra = 0;
			if (i == 0) {
				extra = 1;
			} else if (i == $scope.cols) {
				extra = -1;
			}
			ctx.moveTo(i*$scope.squareSize + extra, $scope.squareSize);
			ctx.lineTo(i*$scope.squareSize + extra, $scope.rows * $scope.squareSize);
		}
		for (var i = 1; i <= $scope.rows; i++) {
			var extra = 0;
			if (i == $scope.rows) {
				extra = -1;
			}
			ctx.moveTo(0, i*$scope.squareSize + extra);
			ctx.lineTo($scope.cols * $scope.squareSize, i*$scope.squareSize + extra);
		}
		ctx.stroke();
    };
    
   $scope.addGameInteractionEvents = function(element) {
   		element = angular.element(element);
   		element.on('click', $scope.handleDone);
   		element.on('mousemove', $scope.handleMove);
   		element.on('mouseout', $scope.handleOut);
   };
   
   
   $scope.handleDone = function(evt) {
   		console.log(evt);
   };
   
   $scope.handleOut = function(evt) {
   		$scope.$apply(function() {
   			$scope.renderModel.hoverIndicator = undefined;
   		});
   };
   
   $scope.handleMove = function(evt) {
   		$scope.$apply(function() {
   			var coords = $scope.getCoords(evt);
	   		$scope.renderModel.hoverIndicator = Math.floor(coords.x / $scope.squareSize);
   		});
   };
   
   $scope.getCoords = function(evt) {
   		var coords = {};
   		var canvas = angular.element($scope.canvas);
   		
   		coords.x = Math.round(evt.offsetX * (($scope.squareSize * $scope.cols) / canvas.width()));
   		coords.y = Math.round(evt.offsetY * (($scope.squareSize * $scope.rows) / canvas.height()));
   		
   		return coords;
   };
   
   $scope.renderModel = {};
   $scope.$watch('renderModel.hoverIndicator', function(newValue, oldValue) {
   		var halfSquareSize = $scope.squareSize / 2;
   		var oldX = oldValue * $scope.squareSize + halfSquareSize;
   		$scope.ctx.clearRect(oldX-10, halfSquareSize-10, 20, 20);
   		
   		if (newValue != undefined) {
			var newX = newValue * $scope.squareSize + halfSquareSize;

   			// draw circle
   			$scope.ctx.fillStyle="rgba(255,0,0,0.8)";
			$scope.ctx.beginPath();
			$scope.ctx.arc(newX, halfSquareSize, 10, 0, Math.PI*2, true);
			$scope.ctx.closePath();
			$scope.ctx.fill();
   		}
   });
}