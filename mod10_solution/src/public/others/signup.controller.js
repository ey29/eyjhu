(function() {
    'use strict';

    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['MenuService'];
    function SignupController(MenuService){
        var $ctrl = this;
        var user = {};
        var itemsMap = new Map();
        $ctrl.signed = false;
        
        $ctrl.$onInit = function () {
            MenuService.getAllItems().then(function(map) {
              itemsMap = map;
            //   console.log(itemsMap);
            });
          };

        $ctrl.signup = function(){
            user.firstName = $ctrl.firstName;
            user.lastName = $ctrl.lastName;
            user.email = $ctrl.email;
            user.phone = $ctrl.phone;
            user.favDish = findItem($ctrl.favDish);

            $ctrl.signed = true;
            console.log(user);
            MenuService.setUser(user);
        }

        $ctrl.isDishValidate = function (value) {
            // console.log(itemsMap.has(value))
            return itemsMap.has(value);
        }

        function findItem(shortName) {
            return itemsMap.get(shortName)
        }

        
    }

}());
