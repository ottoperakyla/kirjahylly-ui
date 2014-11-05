'use strict';

/* jasmine specs for controllers go here */
describe('Feskirjasto controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('BookListCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(module('myApp.bookList'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('demodata/json/bookdata.json').
      respond([{}]);

      scope = $rootScope.$new();
      scope.books = [];
      ctrl = $controller('BookListCtrl', {$scope: scope});
    }));

    it('should work', function() {
      expect(scope.books).toEqualData([]);
      expect(scope.books).toBeDefined();
    });


  })

});
