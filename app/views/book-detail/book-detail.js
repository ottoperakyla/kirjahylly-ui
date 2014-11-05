'use strict';

angular.module('myApp.bookDetail', ['ngRoute'])

.controller('BookDetailCtrl', ['$scope', '$http', '$routeParams', 
	function($scope, $http, $routeParams) {
		var bookId = $routeParams.bookId;
		$scope.page = 'kirjat';
		$scope.bookId = bookId;
		$http.get('demodata/json/' + bookId + '.json').success(function(data) {
			$scope.book = data;
			$scope.detail = $scope.book.title;
			console.log($scope.book.opinions);
		});
}]);