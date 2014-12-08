'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'ngSanitize',
	'booklist',
	'bookdetail',
	'login'
	])

.constant("GLOBALS", {
	"API_PATH": "http://localhost:8000/api"
})

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/books', {
		templateUrl: 'views/book-list/book-list.html',
		controller: 'BookListCtrl',
	})
	.when('/books/:bookId', {
		templateUrl: 'views/book-detail/book-detail.html',
		controller: 'BookDetailCtrl',
	})
	.when('/login', {
		templateUrl: 'views/login/login.html',
		controller: 'LoginCtrl',
		css: 'css/login.css'
	})
	.otherwise({redirectTo: '/login'})
}])

.controller('MainCtrl', function($scope, $route, $rootScope, $location, $routeParams, SessionService){
	$rootScope.$on('$routeChangeSuccess', function(e, current, pre){
		$scope.bodyClass = $location.path().slice(1);
	})

	$scope.loggedIn = function() {
		$scope.user = JSON.parse(SessionService.get('user'));
		return $scope.user ? true : false;
	}

	$scope.logout = function() {
		SessionService.unset('user');
		$location.search("");
		$location.path("/login");
	}

})

.filter('notEmpty', function() {
	return function(item) {
		return item != null ? item : '';
	}
})

.filter('dots', function() {
	return function(item) {
		return item != null ? item + '...' : '';
	}
})

.directive('appHeader', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/app-header.html'
	}
})

.directive('appFooter', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/app-footer.html'
	}
})

.directive('breadcrumbs', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/breadcrumbs.html'
	}
})

.directive('bookSlider', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/book-slider.html'
	};
})