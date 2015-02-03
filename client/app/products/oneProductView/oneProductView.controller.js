'use strict';

angular.module('cornerfindApp')
  .controller('OneProductViewCtrl', function ($scope, Auth, products, $stateParams) {
    $scope.message = 'Hello';
    products.get({id: $stateParams.id}, function (product) {
      console.log("product: ", product);
      $scope.product = product;

    });
  });
