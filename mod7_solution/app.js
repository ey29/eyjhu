(function () {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService)
    .filter("angularMoney", AngularMoneyFilter);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var itemsBuy = this;
    itemsBuy.items = ShoppingListCheckOffService.getItems();
    itemsBuy.removeItem = function (itemIndex) {
      try {
        ShoppingListCheckOffService.buyItem(itemIndex);
      } catch (error) {
        itemsBuy.errorMessage = error.message;
      }
    };
  }

  AlreadyBoughtController.$inject = [
    "ShoppingListCheckOffService",
    "angularMoneyFilter",
  ];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var itemsBought = this;
    var emptyBoughtMessage = "Nothing bought yet";
    var badInputMessage =
      "Item number must be integer and greater than 0. Try again";

    itemsBought.items = ShoppingListCheckOffService.getBoughtItems();
    itemsBought.showMessage = function () {
      if (itemsBought.items.length == 0) {
        return (itemsBought.errorMessage = emptyBoughtMessage);
      }
    };
    itemsBought.getTotalPrice = function (itemIndex) {
      try {
        return ShoppingListCheckOffService.calculateTotalPrice(itemIndex);
      } catch (error) {
        itemsBought.badInputMessage = badInputMessage;
      }
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuy = [
      { name: "cookies", quantity: 3, pricePerItem: 1 },
      { name: "milks", quantity: 10, pricePerItem: 2 },
      { name: "apples", quantity: 10, pricePerItem: 3 },
      { name: "Peanuts", quantity: 10, pricePerItem: 4 },
      { name: "Eggs", quantity: 10, pricePerItem: 5 },
    ];

    var bought = [];

    service.getItems = function () {
      return toBuy;
    };

    service.getBoughtItems = function () {
      return bought;
    };

    service.buyItem = function (itemIndex) {
      var emptyToBuyMessage = "Everything is bought!";
      var removedItem = toBuy.splice(itemIndex, 1);
      bought.push(removedItem[0]);

      if (toBuy.length < 1) {
        throw new Error(emptyToBuyMessage);
      }
    };

    service.calculateTotalPrice = function (itemIndex) {
      var quantity = bought[itemIndex].quantity;

      if (quantity <= 0) {
        throw new Error(msg);
      }

      var price = bought[itemIndex].pricePerItem;

      return quantity * price;
    };
  }

  // could use currency filter, but requirement asks to use custom filter
  function AngularMoneyFilter() {
    return function (input) {
      input = input || "";
      input = "$$$" + input.toFixed(2);
      return input;
    };
  }
})();
