var connect4 = angular.module('connect4', []).
config(function($routeProvider) {
    $routeProvider.
    when('/', {controller: LobbyController, templateUrl: '/view/connect.html'}).
    when('/lobby/', {controller: LobbyController, templateUrl: '/view/lobby.html'}).
    otherwise({redirectTo: '/'});
});