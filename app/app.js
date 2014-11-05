'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.bookList',
	'myApp.bookDetail',
	'myApp.version'
	])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/books', {
		templateUrl: 'views/book-list/book-list.html',
		controller: 'BookListCtrl'
	})
	.when('/books/:bookId', {
		templateUrl: 'views/book-detail/book-detail.html',
		controller: 'BookDetailCtrl'
	})
	.otherwise({redirectTo: '/books'})
}])

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

.filter('imgSrc', function() {
	return function(item) {
		return 'demodata/img/' + item;
	}
})

.directive('breadcrumbs', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/breadcrumbs.html'
	}
})