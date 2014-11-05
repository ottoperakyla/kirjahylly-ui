'use strict';

angular.module('myApp.bookList', ['ngRoute'])

.controller('BookListCtrl', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		$scope.page = 'kirjat';
		$scope.pageSize = 5;
		$scope.currentPage = $routeParams.p != null ? $routeParams.p : 0;
		$scope.params = $routeParams;
		$scope.filters = [ //todo: fix filtering to affect whole data set instead of currently visible items
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

			$scope.images = [];

			for (var i = 0; i < data.length; i++) {
				for(var prop in data[i])
					if (prop=='image') 
						$scope.images.push(data[i][prop]);
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
			var start = ((i*this.pageSize)+1);
			var end = (pageNum*this.pageSize);
			var nextStart = this.pageSize + ((i*this.pageSize)+1);

			if (i==this.currentPage) 
				htmlString += '<span class="pagination-item active">';
			else
				htmlString += '<span class="pagination-item">';

			htmlString += '<a href="#/books/?p='+i+'&s='+start+'&e='+end+'">' + pageNum + '</a></span>';
		}

		return htmlString + "... <span class='pagination-item'><a href='#/books/?s="+2*this.params.s+"&e="+this.params.e+"'>>></a></span>";
	}
})