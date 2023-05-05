describe("signup", function () {
  var signup;
  var $httpBackend;
  var mockMenu = {A: {category: {id: 82,name: "Soup",short_name: "A",special_instructions: "",},menu_items: [{description:"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",large_portion_name: "quart",name: "Won Ton Soup with Chicken",price_large: 5,price_small: 2.55,short_name: "A1",small_portion_name: "pint",},{description: "chicken broth with egg drop",large_portion_name: "quart",name: "Egg Drop Soup",price_large: 4.5,price_small: 2.25,short_name: "A2",small_portion_name: "pint", },],},};
  var expectedMap = new Map();
  expectedMap.set("A1", {description:"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",large_portion_name: "quart",name: "Won Ton Soup with Chicken",price_large: 5,price_small: 2.55,short_name: "A1",small_portion_name: "pint",});
  expectedMap.set("A2", {description: "chicken broth with egg drop", large_portion_name: "quart", name: "Egg Drop Soup", price_large: 4.5, price_small: 2.25, short_name: "A2", small_portion_name: "pint",});

  beforeEach(function () {
    module("common");

    inject(function ($injector) {
      signup = $injector.get("MenuService");
      $httpBackend = $injector.get("$httpBackend");
    });
  });

  it("should return the entire list of menu items", function () {
    $httpBackend
      .whenGET(
        "https://coursera-jhu-default-rtdb.firebaseio.com" + "/menu_items.json"
      )
      .respond(mockMenu);
    signup.getAllItems().then(function (response) {
      expect(response).toEqual(expectedMap);
    });
    $httpBackend.flush();
  });

  // isDishValidate function only check itemsMap.has(value)
  it("should return true if the favorite item exists in the menu", function () {
    $httpBackend
      .whenGET(
        "https://coursera-jhu-default-rtdb.firebaseio.com" + "/menu_items.json"
      )
      .respond(mockMenu);
    signup.getAllItems().then(function (response) {
      expect(response.has("A2")).toEqual(true);
    });
    $httpBackend.flush();
  });

  it("should return false if the favorite item does not exists in the menu", function () {
    $httpBackend
      .whenGET(
        "https://coursera-jhu-default-rtdb.firebaseio.com" + "/menu_items.json"
      )
      .respond(mockMenu);
    signup.getAllItems().then(function (response) {
      expect(response.has("B2")).toEqual(false);
    });
    $httpBackend.flush();
  });
});
