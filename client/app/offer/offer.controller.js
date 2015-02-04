'use strict';

angular.module('cornerfindApp')
  .controller('OfferCtrl', function ($scope, $stateParams, offer) {
    $scope.cartId = $stateParams.id;	//User Id is stored here

    //going to need a redirect in case someone tries to mess with url
    //right now it's just going to a blank cart page


  });
