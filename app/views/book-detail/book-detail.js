'use strict';

angular.module('bookdetail', ['ngRoute'])

.controller('BookDetailCtrl', function($scope, $http, $routeParams, GLOBALS, SessionService) {
	var bookId = $routeParams.bookId;
	$scope.dots = "...";
	$scope.charLimit = 160;
	$scope.chars = [];
	$scope.arrowDir = [];
	$scope.expanded = false;
	$scope.page = 'kirjat';
	$scope.bookId = bookId;
	$scope.buttonTexts = ["Lainaa", "Palauta"];

	$http.get(GLOBALS.API_PATH + '/books/' + bookId).success(function(data) {
		$scope.book = data;
		$scope.buttonText = $scope.buttonTexts[data.status];
		$scope.active = data.user_id != 0 ? 1 : 0;
		$scope.buttonText = $scope.buttonTexts[$scope.active];

			/*var reviews = data.reviews;
			var reviewTotal = 0;

			for(var review in reviews) 
				reviewTotal += reviews[review].stars;
			
			$scope.book.reviewsAverage = reviewTotal / reviews.length;*/
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

	$scope.borrow = function(book_id) {
		var user = SessionService.getUser();
		var borrowUrl = GLOBALS.API_PATH + '/books/' + book_id + '/borrowAs/' + user.id;
		console.log("attempting", borrowUrl);
		$scope.active = !$scope.active;
		$scope.buttonText = $scope.buttonTexts[$scope.active];
		$http.post(borrowUrl, {book_id: bookId, userId: user.id})
		.success(function(data){
			$scope.buttonText = $scope.buttonTexts[!$scope.active];
			console.log($scope.buttonText, "success for", data);
		});
	}

})

.filter('limitToTrailingDots', function(){
	return function (item, charLimit) {
		var reviewText = item.substring(0, charLimit);
		return charLimit > 160 ? reviewText : reviewText + '...';
	}
})