var connect4 = angular.module('connect4', []).
config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('!');
    $routeProvider.
    when('/', {controller: ConnectController, templateUrl: '/view/connect.html'}).
    when('/lobby/', {controller: LobbyController, templateUrl: '/view/lobby.html'}).
    when('/game/', {controller: GameController, templateUrl: '/view/game.html'}).
    otherwise({redirectTo: '/'});
});