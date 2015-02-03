'use strict';

angular.module('cornerfindApp')
  .controller('ChatCtrl', function ($scope, $http, chat) {
    $scope.chatlist = [];

    chat.getChatList().then(function(data){
      $scope.chatlist = data;
    });

    $scope.addChat = function(newChat){
      $scope.chatlist.push(newChat);
      newChat = {};
    }

    

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });

  });
