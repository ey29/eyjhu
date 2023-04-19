(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('AllCategoriesListController', AllCategoriesListController);
    
    AllCategoriesListController.$inject = ['categories'];
    function AllCategoriesListController(categories) {
      var categoryList = this;
      categoryList.categories = categories;
    }
    
    })();
    