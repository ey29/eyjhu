(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'src/menuApp/templates/categories-component.template.html',
      bindings: {
        categories: '<'
      }
    });
})();
    