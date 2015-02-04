'use strict';

angular.module('cornerfindApp')
  .controller('ChatCtrl', function ($scope, $http, chat, $firebase) {
    $scope.chatlist = [];

    //$scope.myDataRef = new Firebase('https://cornerfind.firebaseio.com/');

var ref = new Firebase('https://cornerfind.firebaseio.com/');

var sync = $firebase(ref);

$scope.chatListt = sync.$asObject();

    chat.getChatList().then(function(data){
      $scope.chatlist = data;
    });

    $scope.addChat = function(newChat){
      console.log('NewChat Variable:', newChat);

      $scope.chatlist.push(newChat);
      $http.post('/api/things', { name: $scope.newThing });
      newChat = {};
    };



$scope.addChatFire = function(newChatText){
      console.log('NewChatText Variable:', newChatText);
sync.$push({name: "Arcadius", text: newChatText});
    };



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
