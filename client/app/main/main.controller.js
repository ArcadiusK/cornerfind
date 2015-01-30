'use strict';

angular.module('cornerfindApp')
  .controller('MainCtrl', function ($scope, $http, socket, product, brand, category, $mdSidenav) {
    $scope.productList = product;

    $scope.brandList = brand.query();
    $scope.categoryList = category.query();

    //Leaving for socket references
    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });
    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });

    //Sidenav
    $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };


  });
