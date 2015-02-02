'use strict';

angular.module('cornerfindApp')
  .factory('chat', function () {
    // Service logic
    // ...

    var chatList = [{name:'David', text:'How worn is this?'},
                        {name:'Arcadius', text:'I love these booties!!!'}];

    // Public API here
    return {
      getChatList: function () {
        return chatList;
      },
      addChat: function(newChat) {
        chatList = chatList.push(newChat);
        console.log(chatList);
      }
    };

  });
