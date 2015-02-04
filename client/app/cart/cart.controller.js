'use strict';

angular.module('cornerfindApp')
  .controller('CartCtrl', function ($scope, $stateParams, cart) {
    $scope.cartId = $stateParams.id;	//Cart Id is stored here

    //going to need a redirect in case someone tries to mess with url
    //right now it's just going to a blank cart page


  });
