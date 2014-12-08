'use strict';

angular.module('login', ['ngRoute'])

.factory('Login', function($http, GLOBALS) {
	return {
		auth: function(credentials) {
			return $http({
				method: 'POST',
				url: GLOBALS.API_PATH + "/login",
				data: credentials
			});
		}
	}
})

.factory('SessionService', function() {
	return {
		get: function(key) {
			return sessionStorage.getItem(key);
		},
		getUser: function() {
			var user = sessionStorage.getItem("user");
			if (user != undefined) 
				return JSON.parse(user);
		},
		set: function(key, val) {
			return sessionStorage.setItem(key, val);
		},
		unset: function(key) {
			return sessionStorage.removeItem(key);
		}
	}
})

.controller('LoginCtrl', function($scope, $location, $rootScope, Login, SessionService)
{

	if (SessionService.get('user')) 
		$location.path("/books");
	
	$scope.loginSubmit = function()
	{
		var auth_attempt = Login.auth($scope.loginData);

		auth_attempt.success(function(response) {
			if (response.id) {
				SessionService.set('user', JSON.stringify(response));
				$location.path("/books");
			} else {
				alert('Wrong username / password'); //todo: show message in .html template with $scope.$apply(?)
			}
		});
		
	}
})