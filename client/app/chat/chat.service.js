'use strict';

angular.module('cornerfindApp')
  .factory('chat', function ($http, $q) {
    // Service logic
    // ...
    var chatlist = [];

    // Public API here
    return {
      getChatList: function () {
        var deferred = $q.defer();

        $http.get('/api/chats/' + '54d001dfae377bf2fde2cc61')
        .success(function(results) {
          deferred.resolve(results)
        }).error(function() {
          console.log('Chat Get Failed');
        });
        return deferred.promise;
      // socket.syncUpdates('chat', $scope.chatlist);
      },
      
      addChat: function(newChat) {
        console.log(newChat);
        $http.post('/api/chats/', {newChat: newChat})
      }
    };

  });
