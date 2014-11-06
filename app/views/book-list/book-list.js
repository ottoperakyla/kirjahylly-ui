'use strict';

angular.module('myApp.bookList', ['ngRoute'])

.controller('BookListCtrl', ['$window', '$scope', '$http', '$routeParams',
	function($window, $scope, $http, $routeParams) {
		// default to page 0, if no parameter is given
		if ($window.location.href.indexOf("?p=") == -1) 
			$window.location.href += "?p=0";

		$scope.origData;
		$scope.pageSize = 5;
		$scope.currentPage = $routeParams.p;
		$scope.params = $routeParams;
		$scope.filters = [
			{text: "Kirjan nimen mukaan", value: "title"},
			{text: "Kirjoittajan mukaan", value: "author"},
			{text: "Julkaisuvuoden mukaan", value: "year"},
			{text: "Arvostelun mukaan", value: "review"}
		];

		$scope.watchFilters = ['query', 'orderProp'];
		$scope.watchFilters.forEach(function(filter){
			$scope.$watch(filter, function(){
				// get the dataset again and
				// go to page 1 if filters are applied
				$scope.books = $scope.origData;
				$scope.currentPage = 0;
				//var hrefParts = $window.location.href.split($window.location.href.match(/p=\d/)[0]);
				//var redirectUrl = hrefParts[0] + "p=0" + hrefParts[1];
				//$window.location.href = redirectUrl;
			});
		});

		$scope.orderProp = 'title';

		$http.get('demodata/json/bookdata.json').success(function(data) {
			console.log(data.length);
			if ($routeParams.s != null && $routeParams.e != null) {
				$scope.books = data.slice($routeParams.s - 1, $routeParams.e + 1);
			} else {
				$scope.books = data;
			}

			$scope.origData = data;

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

			if (i==this.params.p) 
				htmlString += '<span class="pagination-item active">';
			else
				htmlString += '<span class="pagination-item">';

			htmlString += '<a href="#/books/?p='+i+'&s='+start+'&e='+end+'">' + pageNum + '</a></span>';
		}

		return htmlString + "... <span class='pagination-item'><a href='#/books/?s="+2*this.params.s+"&e="+this.params.e+"'>>></a></span>";
	}
})