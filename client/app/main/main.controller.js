'use strict';

angular.module('cornerfindApp')
  .controller('MainCtrl', function ($scope, $http, socket, products) {
    $scope.productList = [{name: 'test prod', description: 'this is a test', price: 50},
                          {name: 'test prod', description: 'this is a test', price: 30}];

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
  });
