'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
    $http({method: 'GET', url: '/api/name'}).
        success(function (data, status, headers, config) {
            $scope.name = data.name;
        }).
        error(function (data, status, headers, config) {
            $scope.name = 'Error!'
        });

    $http({method: 'GET', url: '/api/shop'}).
        success(function (data, status, headers, config) {
            $scope.shop = data;
        }).
        error(function (data, status, headers, config) {
            $scope.shop = 'Error!'
        });
}

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
