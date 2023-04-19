(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('AllItemsController', AllItemsController);
    
    
    AllItemsController.$inject = ['items'];
    function AllItemsController(items) {
      var itemList = this;
      itemList.items = items;
    }
    
    })();
    