'use strict';

angular.module('cornerfindApp')
  .controller('MainCtrl', function ($scope, $http, socket, product, brand, category, $mdSidenav, User, Auth) {
    $scope.productList = product.query();
    $scope.brandList = brand.query();
    $scope.categoryList = category.query();
    $scope.isLoggedIn=function(){
      return Auth.isLoggedIn();
    };

    $scope.layout = function(ngRepeatIndex){
      if(ngRepeatIndex > 0 && ngRepeatIndex%3 ===0){
        return "column";
      } return "row";
    }

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
