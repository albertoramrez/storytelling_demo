(function() {
  'use strict';

  angular
    .module('storytellingDemo')
    .component('adolescence', adolescence());

  function adolescence() {
    return {
      templateUrl: 'app/components/adolescence/adolescence.html',
      controller: adolescenceController,
      controllerAs: 'vm',
      bindToController: true,
      bindings: {}  
    }
  }

  /* @ngInject */
  function adolescenceController($storytelling, $log, $element, d3) {
    //var vm = this;
    $storytelling.scroll('#adolescence .outer', 'adolescenceScrolling', 2, animate);

    function animate() {
      $log.log('mapa', $storytelling.currentSlide)
      if($storytelling.currentBreakPoint == '#adolescence .outer') {
        switch($storytelling.currentSlide) {
          case 0:
            d3.select('#waldo')
              .style('background-position', '0% 0%')
              .style('background-size', '100%');
            break;

          case 1:
            d3.select('#waldo')
              .style('background-position', '9% 30%')
              .style('background-size', '303%');
            break;
            
        }
      } else {
        d3.select('#waldo')
          .style('background-position', null)
          .style('background-size', null);
      }
    }
  }
})();