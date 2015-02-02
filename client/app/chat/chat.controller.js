'use strict';

angular.module('cornerfindApp')
  .controller('ChatCtrl', function ($scope, chat) {
    $scope.chatlist = chat.getChatList();
   

    $scope.addChat = function(newChat){
      $scope.chatlist.push(newChat);
    }

    // $http.get('/api/chat').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

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
