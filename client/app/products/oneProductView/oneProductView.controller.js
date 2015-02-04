'use strict';

angular.module('cornerfindApp')
  .controller('OneProductViewCtrl', function ($scope, Auth, products, chat, $stateParams) {
    $scope.message = 'Hello';

    $scope.productID = $stateParams.id;

    products.resource.get({id: $stateParams.id}, function (product) {
      $scope.product = product;
    });

   chat.getChatList($stateParams.id).then(function(data){
      console.log('chats in ProductViewCTRL:', data);
      $scope.chatlist = data;
    });

   $scope.isMobile = function(width){
    if (width <= 992){
      return
    }
    else{
      return 'pinned';
    }

   }

  });
