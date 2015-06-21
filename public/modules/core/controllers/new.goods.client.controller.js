'use strict';

angular.module('core').controller('NewGoodsCtrl', ['$scope', '$state','$location', 'Authentication',
    function($scope, $state, $location, Authentication) {
        $scope.user = Authentication;
        $scope.params = {};
        $scope.state = $state.$current.name;
        console.log($state.$current.name);
        if (!$scope.user) $location.path('/signin');

        $scope.addNewGood = function () {

        };
        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });
    }
]);