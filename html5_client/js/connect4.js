var connect4 = angular.module('connect4', []).
config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
    $routeProvider.
    when('/', {controller: ConnectController, templateUrl: '/view/connect.html'}).
    when('/lobby/', {controller: LobbyController, templateUrl: '/view/lobby.html'}).
    otherwise({redirectTo: '/'});
});