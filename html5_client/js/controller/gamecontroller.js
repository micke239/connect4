function GameController($scope, $socket, $location) {
	var renderer, rows, cols, squareSize, canvas, frontCtx, backCtx;
	//TODO: FIX THIS
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
					arguments[i].canvasStyle.height = arguments[i].offsetWidth * (rows/cols) + "px";
				}
			} else {
				arguments[i].canvasStyle.height = arguments[i].offsetWidth * (rows/cols) + "px";
			}
		}

		frontCanvas.canvasStyle.top = "-" + frontCanvas.height() + "px";
	};
	
    $scope.$on('$viewContentLoaded', function() {
    	backCanvas = angular.element("#backCanvas");
    	frontCanvas = angular.element("#frontCanvas");
    	frontCtx = frontCanvas[0].getContext('2d');
		backCtx = backCanvas[0].getContext('2d');
    	
    	squareSize = 100;
    	cols = frontCanvas[0].width / squareSize;
    	rows = frontCanvas[0].height / squareSize;
    	
    	frontCanvas.canvasStyle = {};
    	backCanvas.canvasStyle = {};
    	$scope.frontCanvasStyle = frontCanvas.canvasStyle;
    	$scope.backCanvasStyle = backCanvas.canvasStyle;
    	
    	addGameInteractionEvents(frontCanvas);
    	
    	checkScreenOrientationAndAdjustCanvases(frontCanvas, backCanvas);
		
		drawBackground();
    });
    
  addGameInteractionEvents = function(element) {
   		element = angular.element(element);
   		element.on('click', handleDone);
   		element.on('mousemove', handleMove);
   		element.on('mouseout', handleOut);
   };
   
   
   handleDone = function(evt) {
   		console.log(evt);
   };
   
   handleOut = function(evt) {
   		$scope.$apply(function() {
   			$scope.render.hover = undefined;
   		});
   };
   
   handleMove = function(evt) {
   		$scope.$apply(function() {
   			var coords = getCoords(evt);
	   		$scope.render.hover = Math.floor(coords.x / squareSize);
   		});
   };
   
   getCoords = function(evt) {
   		var coords = {};
   		coords.x = Math.round(evt.offsetX * ((squareSize * cols) / frontCanvas.width()));
   		coords.y = Math.round(evt.offsetY * ((squareSize * rows) / frontCanvas.height()));
   		
   		return coords;
   };
   
   $scope.render = {};
   $scope.$watch('render.hover', function(newValue, oldValue) {
   		var circleRadius = 5;
   		var halfSquareSize = squareSize / 2;
   		var oldX = oldValue * squareSize + halfSquareSize;
   		frontCtx.clearRect(oldX-circleRadius, halfSquareSize-circleRadius, circleRadius*2, circleRadius*2);
   		
   		if (newValue != undefined) {
			var newX = newValue * squareSize + halfSquareSize;

   			// draw circle
   			frontCtx.fillStyle="rgba(255,0,0,0.8)";
			frontCtx.beginPath();
			frontCtx.arc(newX, halfSquareSize, circleRadius, 0, Math.PI*2, true);
			frontCtx.closePath();
			frontCtx.fill();
   		}
   });
   
   $scope.$watch('render.grid', function(newValue, oldValue) {
   		//renderer.addPiece(newValue);
   });
   
   
   	var drawModel = function(newValue, oldValue) {
		var circleRadius = 5;
   		var halfSquareSize = squareSize / 2;
   		var oldX = oldValue * squareSize + halfSquareSize;
   		frontCtx.clearRect(oldX-circleRadius, halfSquareSize-circleRadius, circleRadius*2, circleRadius*2);
   		
   		if (newValue != undefined) {
			var newX = newValue * squareSize + halfSquareSize;

   			// draw circle
   			frontCtx.fillStyle="rgba(255,0,0,0.8)";
			frontCtx.beginPath();
			frontCtx.arc(newX, halfSquareSize, circleRadius, 0, Math.PI*2, true);
			frontCtx.closePath();
			frontCtx.fill();
   		}
	};
	
	var drawBackground = function() {
		backCtx.strokeStyle = "black";
		backCtx.beginPath();
		for (var i = 0; i <= cols; i++) {
			var extra = 0;
			if (i == 0) {
				extra = 1;
			} else if (i == cols) {
				extra = -1;
			}
			backCtx.moveTo(i*squareSize + extra, squareSize);
			backCtx.lineTo(i*squareSize + extra, rows * squareSize);
		}
		for (var i = 1; i <= rows; i++) {
			var extra = 0;
			if (i == rows) {
				extra = -1;
			}
			backCtx.moveTo(0, i*squareSize + extra);
			backCtx.lineTo(cols * squareSize, i*squareSize + extra);
		}
		backCtx.stroke();
	};
}
