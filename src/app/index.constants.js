/* global malarkey:false, moment:false, d3:false, _:false, scrollWatcher:false */
(function() {
  'use strict';

  angular
    .module('storytellingDemo')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('d3', d3)
    .constant('_', _)
    .constant('scrollWatcher', scrollWatcher);

})();
