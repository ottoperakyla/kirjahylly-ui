'use strict';

angular.module('myApp.bookList', ['ngRoute'])

.controller('BookListCtrl', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		$scope.page = 'kirjat';
		$scope.pageSize = 5;
		$scope.filters = [
		{
			text: "Kirjan nimen mukaan",
			value: "title"
		},
		{
			text: "Kirjoittajan mukaan",
			value: "author"
		},
		{
			text: "Julkaisuvuoden mukaan",
			value: "year"
		},
		{
			text: "Arvostelun mukaan",
			value: "review"
		}
		];
		$scope.orderProp = 'title';
		console.log($routeParams);

		$http.get('demodata/json/bookdata.json').success(function(data) {
			console.log(data.length);
			if ($routeParams.s != null && $routeParams.e != null) {
				$scope.books = data.slice($routeParams.s - 1, $routeParams.e + 1);
			} else {
				$scope.books = data;
			}
			
			$scope.pages = Math.ceil(data.length / $scope.pageSize);
		});

	}])

.directive('initBookListSlider', function(){
	return function(scope, element) {
		var $$SLICK_CONFIG = {
			speed: 300,
			slidesToShow: 8,
			slidesToScroll: 8,
			nextArrow: '#arrow-r',
			prevArrow: '#arrow-l'
		};

		if (scope.$last)
			$(element).parent().slick($$SLICK_CONFIG);
	}
	
})

.filter('htmlStars', function() {
	return function(item) {
		var half = '<span class="star half-left">&nbsp;</span><span class="star half-right">&nbsp;</span>';
		var full = '<span class="star full">&nbsp;</span>';
		var empty = '<span class="star empty">&nbsp;</span>';

		var htmlString = "";
		var charsAdded = 0;
		var charsToAdd = parseFloat(item);

		while(charsAdded < 5) {
			if (charsToAdd > 0) {
				htmlString += charsToAdd >= 1 ? full : half;
				charsToAdd--;
			} else {
				htmlString += empty;
			}
			charsAdded++;
		}

		return htmlString;
	}
})

.filter('pagination', function(){
	return function(item) {
		var htmlString = "";

		for (var i = 0; i < parseInt(item); i++) {
			var pageNum = i+1;

			htmlString += '<span class="pagination-item active"><a href="#/books/?s='+((i*this.pageSize)+1)+'&e='+(pageNum*this.pageSize)+'">' + pageNum + '</a></span>';
		}

		return htmlString + "... <span class='pagination-item'><a href='#nextPage'>>></a></span>";
	}
})