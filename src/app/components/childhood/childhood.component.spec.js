(function() {
  'use strict';
  describe('Component: childhood', function () {
    beforeEach(module('storytellingDemo'));
   
    var element;
    var scope;
    var controller;
    beforeEach(inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      element = angular.element('<childhood></childhood>');
      element = $compile(element)(scope);
      scope.$apply();
      controller = element.controller('childhood');
    }));
   
    it('should render ', function() {
      var h1 = element.find('h1');
      expect(h1.text()).toBeTruthy();
    });

    it('dynamicText should be defined', function() {
      expect(controller.dynamicText).toBeDefined();
    });
   
  });
})();