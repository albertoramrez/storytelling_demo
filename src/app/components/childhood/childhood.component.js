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
  function childhoodController($storytelling, $log) {
    var vm = this;

    $storytelling.scroll('#childhood .outer', 'childhoodScrolling', 3, animate);

    vm.dynamicText = 'Hola, soy un texto dinámico';

    function animate() {
      $log.log('mapa', $storytelling.currentSlide)
      if($storytelling.currentBreakPoint == '#childhood .outer') {
        switch($storytelling.currentSlide) {
          case 0:
            vm.dynamicText = 'Hola, soy un texto dinámico';
            break;
          case 1:
            vm.dynamicText = 'Siempre estoy visible, pero cambia mi contenido';
            break;
          case 2:
            vm.dynamicText = '¡Y también puedo bailar!';
            $storytelling.animateElem('#childhood .inner h1', 'shake');
            break;
        }
      } else {
        vm.dynamicText = '';
      }
    }
  }
})();