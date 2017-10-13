(function() {
  'use strict';

  angular
    .module('storytellingDemo')
    .component('childhood', childhood());

  function childhood() {
    return {
      templateUrl: 'app/components/childhood/childhood.html',
      controller: childhoodController,
      controllerAs: 'vm',
      bindToController: true,
      bindings: {}
    }
  }

  /* @ngInject */
  function childhoodController($storytelling, $log, $element, d3) {
    var vm = this;

    $storytelling.scroll('#childhood .outer', 'childhoodScrolling', 3, animate);

    vm.dynamicText = '¡Ahora estoy arriba, mira esto!';
    d3.select($element[0]).select('.circle').style('display', 'none');

    function animate() {
      $log.log('mapa', $storytelling.currentSlide)
      if($storytelling.currentBreakPoint == '#childhood .outer') {
        switch($storytelling.currentSlide) {
          case 0:
            vm.dynamicText = '¡Ahora estoy arriba, mira esto!';
            d3.select($element[0]).select('h1').style('display', 'block');
            d3.select($element[0]).select('.circle').style('display', 'none');
            break;

          case 1:
            d3.select($element[0]).select('h1').style('display', 'none');
            d3.select($element[0]).select('.circle').style('display', 'block');
            $storytelling.animateElem('#childhood .circle', 'fadeIn');
            d3.select($element[0]).select('.circle')
              .style('width', '5vh')
              .style('height', '5vh')
              .style('background-color', '#e9d208');
            break;

          case 2:
            vm.dynamicText = '¡También puede crecer!';
            d3.select($element[0]).select('h1').style('display', 'block');
            d3.select($element[0]).select('.circle').style('display', 'block')
              .style('width', '20vh')
              .style('height', '20vh')
              .style('background-color', '#ba1a3a')
              //Ver childhood.scss transition: all 1s;
            break;

        }
      } else {
        d3.select($element[0]).select('.circle').style('display', 'none');
      }
    }
  }
})();
