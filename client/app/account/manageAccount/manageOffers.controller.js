'use strict';

angular.module('cornerfindApp')
	.controller('ManageOffersCtrl',function($scope, offer){
		$scope.offers = offer.manageOffers({id:$scope.currentUser._id})
		
		// if($scope.offers.length ===0)

		$scope.acceptOffer = function(orderId){
			offer.acceptOffer({id:orderId})
		}

	})