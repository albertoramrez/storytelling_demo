(function() {
  'use strict';
  describe('Component: adolescence', function () {
    beforeEach(module('storytellingDemo'));
   
    var element;
    var scope;
    //var controller;
    beforeEach(inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      element = angular.element('<adolescence></adolescence>');
      element = $compile(element)(scope);
      scope.$apply();
      //controller = element.controller('adolescence');
    }));
   
    it('should render ', function() {
      var waldo = element.find('#waldo');
      expect(waldo).toBeTruthy();
    });
  });
})();