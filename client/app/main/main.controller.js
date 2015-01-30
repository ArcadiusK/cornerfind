'use strict';

angular.module('cornerfindApp')
  .controller('MainCtrl', function ($scope, $http, socket, products, $mdSidenav) {
    $scope.productList = products;



    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    //Testing sidenav
    $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };


  });
