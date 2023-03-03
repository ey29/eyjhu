(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope) {
    $scope.dishes = "";
    $scope.fontColor = "";
    $scope.borderColor = "";

    $scope.check = function () {
      var numOfDishes = countDishes($scope.dishes);
      if (numOfDishes == 0) {
        $scope.result = "Please enter data first";
        $scope.fontColor = "red";
        $scope.borderColor = "red";
      } else if (numOfDishes <= 3) {
        $scope.result = "Enjoy!";
        $scope.fontColor = "green";
        $scope.borderColor = "green";
      } else {
        $scope.result = "Too much!";
        $scope.fontColor = "green";
        $scope.borderColor = "green";
      }
    };
  }

  function countDishes(input) {
    if (input === "") {
      return 0;
    }
    var numOfDishes = 0;
    var allDishes = input.split(",");
    for (var i = 0; i < allDishes.length; i++) {
      if (allDishes[i].trim() === "") {
        continue;
      }
      numOfDishes += 1;
    }
    return numOfDishes;
  }
})();
