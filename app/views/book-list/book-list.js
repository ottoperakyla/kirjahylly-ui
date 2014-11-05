'use strict';

angular.module('myApp.bookList', ['ngRoute'])

.controller('BookListCtrl', ['$scope', '$http', 
	function($scope, $http) {
		$scope.page = 'kirjat';
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

		$http.get('demodata/json/bookdata.json').success(function(data) {
			$scope.books = data;
		});

	}])

.directive('initBookListSlider', function(){
	return function(scope, element) {
		var $$SLICK_CONFIG = {
			speed: 300,
			slidesToShow: 7,
			slidesToScroll: 7,
			nextArrow: '#arrow-r',
			prevArrow: '#arrow-l'
		};

		if (scope.$last)
			$(element).parent().slick($$SLICK_CONFIG);
	}
	
});