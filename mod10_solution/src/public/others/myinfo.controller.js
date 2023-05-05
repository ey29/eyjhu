(function() {
    'use strict';

    angular.module('public')
    .controller('MyinfoController', MyinfoController);

    MyinfoController.$inject = ['MenuService'];
    function MyinfoController(MenuService){
        var $ctrl = this;
        $ctrl.user = MenuService.getUser();
        $ctrl.hasInfo = false;
        // console.log($ctrl.user);
        
        if(Object.keys($ctrl.user).length !== 0){
            $ctrl.hasInfo = true;
            $ctrl.user.categoryShortName = getCategoryShortName($ctrl.user.favDish.short_name);
        }

        function getCategoryShortName(str) {
            var result = "";
            for (var i = 0; i < str.length; i++) {
              if (!Number.isInteger(parseInt(str[i]))) {
                result += str[i];
              } else {
                break;
              }
            }
            return result;
          }
    }
}());
