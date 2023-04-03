(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant(
      "ApiBasePath",
      "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    )
    .directive("foundItems", FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: "items.html",
      scope: {
        items: "<",
        onRemove: "&",
        isSearched: "<",
      },
      controller: FoundItemsDirectiveController,
      controllerAs: "list",
      bindToController: true,
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isItemEmpty = function () {
      if (list.isSearched && list.items.length == 0) {
        return true;
      }
      return false;
    };
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.searchTerm = "";
    list.items = [];
    list.isSearched = false;
    list.getMatchedMenuItems = function () {
      if (list.searchTerm !== "") {
        var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
        promise.then(function (response) {
          list.items = response;
        });
      } else {
        list.items = [];
      }
      list.isSearched = true;
    };
    list.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [];

    service.removeItem = function (itemIndex) {
      foundItems.splice(itemIndex, 1);
    };

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: ApiBasePath,
      }).then(function (result) {
        foundItems = [];
        var categoryList = result.data;
        var menuItems = [];
        Object.values(categoryList).forEach(
          (item) => (menuItems = menuItems.concat(item.menu_items))
        );
        for (var i = 0; i < menuItems.length; i++) {
          var description = menuItems[i].description;
          if (
            description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          ) {
            foundItems.push(menuItems[i]);
          }
        }
        return foundItems;
      });
    };
  }
})();
