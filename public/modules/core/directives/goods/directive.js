'use strict';  

angular.module('core').controller('GoodsDirectiveCtrl', function($http) {
    console.log('GoodsDirectiveCtrl');
});

angular.module('core').directive('goods', function () {
        return {
            templateUrl: 'modules/core/directives/goods/template.tpl',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                console.log('Goog derective!');
            }
        };
});