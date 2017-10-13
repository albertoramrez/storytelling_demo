(function() {
  'use strict';

  angular
    .module('storytellingDemo')
    .component('infancy', infancy());

  function infancy() {
    return {
      templateUrl: 'app/components/infancy/infancy.html',
      controller: infancyController,
      controllerAs: 'vm',
      bindToController: true,
      bindings: {}
    }
  }

  /* @ngInject */
  function infancyController($storytelling, $log) {
    var vm = this;
    //Sección  fija, se divide en tres, cambia el contenido
    $storytelling.scroll('#infancy .outer', 'infancyScrolling', 3, animate);

    vm.dynamicText = 'Hola, soy un texto dinámico';

    function animate() {
      $log.log('mapa', $storytelling.currentSlide)
      if($storytelling.currentBreakPoint == '#infancy .outer') {
        switch($storytelling.currentSlide) {
          case 0:
            vm.dynamicText = 'Hola, soy un texto dinámico';
            break;

          case 1:
            vm.dynamicText = 'Siempre estoy visible, pero cambia mi contenido';
            break;

          case 2:
            vm.dynamicText = '¡Y también puedo bailar!';
            $storytelling.animateElem('#infancy .inner h1', 'shake').then(function(){
              $storytelling.animateElem('#infancy .inner h1', 'flip')
            });
            break;

        }
      } else {
        vm.dynamicText = '';
      }
    }
  }
})();
