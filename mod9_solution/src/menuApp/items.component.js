(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('items', {
      templateUrl: 'src/menuApp/templates/items-component.template.html',
      bindings: {
        items: '<'
      }
    });
    
    })();
    