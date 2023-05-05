(function () {
  "use strict";

  angular.module("common").service("MenuService", MenuService);

  MenuService.$inject = ["$http", "ApiPath"];
  function MenuService($http, ApiPath) {
    var service = this;
    service.user = {};
    var itemsMap = new Map();

    service.getCategories = function () {
      return $http.get(ApiPath + "/categories.json").then(function (response) {
        return response.data;
      });
    };

    service.getMenuItems = function (category) {
      return $http
        .get(ApiPath + "/menu_items/" + category + ".json")
        .then(function (response) {
          return response.data;
        });
    };

    service.setUser = function (userInput) {
      service.user = userInput;
    };

    service.getUser = function () {
      return service.user;
    };

    service.getAllItems = function () {
      return $http
        .get(ApiPath + "/menu_items.json")
        .then(function (response) {
          return buildItemsMap(response.data);
        });
    };

    function buildItemsMap(data) {
      Object.values(data).forEach(function (category) {
        category.menu_items.forEach(function (menuItem) {
          itemsMap.set(menuItem.short_name, menuItem);
        });
      });

      return itemsMap;
    }
  }
})();
