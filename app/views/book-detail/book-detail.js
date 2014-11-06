'use strict';

angular.module('myApp.bookDetail', ['ngRoute'])

.controller('BookDetailCtrl', ['$scope', '$http', '$routeParams', 
	function($scope, $http, $routeParams) {
		var bookId = $routeParams.bookId;
		$scope.dots = "...";
		$scope.charLimit = 160;
		$scope.chars = [];
		$scope.arrowDir = [];
		$scope.expanded = false;
		$scope.page = 'kirjat';
		$scope.bookId = bookId;
		$http.get('demodata/json/' + bookId + '.json').success(function(data) {
			$scope.book = data;
			$scope.detail = $scope.book.title;
			console.log($scope.book.opinions);
		});

		$scope.initReview = function() {
			$scope.chars.push(this.charLimit);
			$scope.arrowDir.push('down');
		}

		$scope.toggleExpand = function(idx) {
			var isExpanded = this.chars[idx] == 160;
			$scope.chars[idx] = isExpanded ? 320 : 160;
			$scope.arrowDir[idx] = isExpanded ? 'up' : 'down';
		}

	}])

.filter('limitToTrailingDots', function(){
	return function (item, charLimit) {
		var reviewText = item.substring(0, charLimit);
		return charLimit > 160 ? reviewText : reviewText + '...';
	}
})