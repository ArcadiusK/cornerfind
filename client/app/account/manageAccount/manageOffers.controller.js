'use strict';

angular.module('cornerfindApp')
	.controller('ManageOffersCtrl',function($scope, offer, $state){
		$scope.offers = offer.manageOffers({id:$scope.currentUser._id})

    // console.log('scope.offers is',$scope.offers[0].orderTotal)
		
		// if($scope.offers.length ===0)

		$scope.acceptOffer = function(orderId){
			offer.acceptOffer({id:orderId});
      console.log('offers is ..', $scope.offers[0].orderTotal)
      offer.charge($scope.offers[0]);
		}

		

	})