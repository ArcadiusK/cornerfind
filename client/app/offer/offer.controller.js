'use strict';

angular.module('cornerfindApp')
  .controller('OfferCtrl', function ($scope, $stateParams, offer) {
    $scope.userId = $stateParams.userId;	//User Id is stored here

    $scope.offers = offer.getBuyersOffers({id:$scope.userId});
    
    $scope.items =[];

    //backend: populate users and also products for product thumbnail



  });
