connect4.directive('frenemyList', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            var frenemies = $scope.frenemies = {};
            
            $scope.add = function(name) {
                
            };
            
            $scrope.remove = function(name) {
                
            };
            
            $scope.clear = function() {
                
            };
            
            $scope.getSelected = function() {
                
            };
        },
        template: '<ul class="nav nav-tabs nav-stacked" ng-transclude><li class="nav-header">Users online</li></ul>',
        replace: true
    };
});