(function() {
  'use strict';

  angular
    .module('storytellingDemo')
    .factory('$storytelling', storytelling);

  /* @ngInject */
  function storytelling(scrollWatcher, $timeout, $rootScope, $q, d3, $document){
    var vm = {};
    vm.currentBreakPoint  = 0;
    vm.currentSlide       = 0;
    vm.bpHasChanged       = false;
    vm.scroll             = initScroll;
    vm.animateElem        = animateElem;
    vm.animateD3          = animateD3;
    vm.zoomTo             = zoomTo;
    vm.resetZoom          = resetZoom;

    /** Init scroll behaviour on .outer and .inner divs
     * @param {string} parent - Name of parent to fixed scroll
     * @param {string} scrollVarName - Specifies name for scrolling accesor
     * @param {integer} slidesNumber - Number of slides outer will be devided by
     * @param {function} callback - Function that will be executed when slide changes
     */
    function initScroll(parent, scrollVarName, slidesNumber, callback) {
      vm[scrollVarName] = 0;
      $timeout(function(){
        scrollWatcher({
          parent: parent,
          onUpdate: function(scrollPercent, parentElement) {
            if(vm[scrollVarName] != scrollPercent) { // scrolling position has changed
              $rootScope.$apply(function(){
                vm[scrollVarName] = (vm[scrollVarName] != scrollPercent) ? scrollPercent : vm[scrollVarName];
                vm.currentBreakPoint = parentElement.selector;
                if(vm.currentSlide !== getSlide(101, 0, slidesNumber, vm[scrollVarName])) {
                  vm.currentSlide = getSlide(101, 0, slidesNumber, vm[scrollVarName]);
                  callback();
                }
              });
            }
          }
        });
      });
    }

    /**
     * Calculate slide number that has to be seen
     * @param {number} end - End percentage
     * @param {number} start - Start percentage
     * @param {number} slidesLength - Quantity of slides defined
     * @param {number} scrollPercent - Current scroll percentage
     */
    function getSlide(end, start, slidesLength, scrollPercent){
      if(slidesLength == 0) {
        return 0;
      }
      var mul = (end - start) / slidesLength;
      return Math.floor((scrollPercent - start) / mul);
    }

    /**
     * Animate element using jQuery functions and animatecss
     * @param {selector} element 
     * @param {string} animationName 
     */
    function animateElem(element, animationName){
      return $q(function(resolve) { //, reject) {
        var animationEnds = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        angular.element(element).addClass('animated ' + animationName).one(animationEnds, function(){
          angular.element(this).removeClass('animated undefined ' + animationName);
          resolve(true);
        });
      })
    }

    /**
     * Animate elements using D3 and animatecss. It will replace ALL classes
     * @param {selector} element 
     * @param {string} animationName 
     */
    function animateD3(element, animationName) {
      return $q(function(resolve) { //} reject) {
        d3.selectAll(element).attr('class', null);
        d3.selectAll(element)
          .attr('class', 'animated ' + animationName)
          .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            d3.selectAll(element).attr('class', null);
            resolve(true);
          });
      });
    }

    /**
     * Resets group element (SVG) xoom to 0,0 and scale 1
     * @param {d3 selection} groupElement 
     */
    function resetZoom(groupElement) {
      groupElement.transition()
        .duration(500)
        .attr('transform', 'translate(0,0) scale(1)')
    }

    /**
     * Zoom group element (SVG) to calculated position of selector
     * Results may vary according to SVG properties
     * @param {d3 selection} groupElement 
     * @param {string selector} selector 
     */
    function zoomTo(groupElement, selector) {
      if(groupElement && selector && $document[0].querySelector(selector)) {
        $timeout(function(){
          
          var transform = 'translate(0,0)scale(1)';
          groupElement.attr('transform', null);
          
          var clientRect = $document[0].querySelector(selector).getBoundingClientRect();
          var bbox = angular.element(selector)[0].getBBox();
          var svg = groupElement._groups[0][0].parentNode.getBoundingClientRect();
          var active_pos = {
              x: bbox.x,
              y: bbox.y,
              width : clientRect.width,
              height : clientRect.height,
              centroidX: bbox.x / 2,
              centroidY: bbox.y
            };

          groupElement.attr('transform', transform);
          var scale = d3.min([svg.height / active_pos.height, svg.width / active_pos.width]);

          active_pos.translateX = -(active_pos.centroidX * scale * 2);
          active_pos.translateY = -(active_pos.centroidY * scale);

          groupElement
            .transition()
              .duration(600)
              .attr('transform', 'translate(' + active_pos.translateX + ',' + active_pos.translateY + ') scale(' + scale + ')')
        });
      }
    }

    return vm;
  }
})();