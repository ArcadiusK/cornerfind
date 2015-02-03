'use strict';

angular.module('cornerfindApp')
  .controller('ChatCtrl', function ($scope, $http, socket, chat, Auth) {
    $scope.chatlist = [];

    chat.getChatList().then(function(data){
      $scope.chatlist = data;
      socket.syncUpdates('chat', $scope.chatlist);
    });

    $scope.addChat = function(newChat){
      console.log('inside add chat');
      console.log('newChat in CTRL:', newChat);
      var tempChat = {
                textLine: newChat.text,
                // product: '54d001dfae377bf2fde2cc61',
                // sender: Auth.getCurrentUser,
                username: 'testusername',
              }
      chat.addChat(tempChat);
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
