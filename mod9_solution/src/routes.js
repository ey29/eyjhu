(function () {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');
    
      // *** Set up UI states ***
      $stateProvider
    
      .state('home', {
        url: '/',
        templateUrl: 'src/menuApp/templates/home.template.html'
      })
    
      .state('categories', {
        url: '/all-categories',
        templateUrl: 'src/menuApp/templates/categories.template.html',
        controller: 'AllCategoriesListController as categoryList',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
    
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/menuApp/templates/items.template.html',
        controller: 'AllItemsController as itemList',
        resolve: {
          items: ['$stateParams', 'MenuDataService',
                function ($stateParams, MenuDataService) {
                  return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
        }
      });
    }
    
    })();
    