'use strict';

angular.module('cornerfindApp')
  .controller('OfferCtrl', function ($scope, $stateParams, offer, Auth) {
    $scope.userId = $stateParams.userId;	//User Id is stored here



    $scope.offers = offer.getBuyersOffers({id:Auth.getCurrentUser()._id});
    
    $scope.cancelOffer = function(param){
    	offer.delete({id:param._id},function(res,err){
    		var index = $scope.offers.indexOf(param);
    		$scope.offers.splice(index,1);
    	})
    }

    $scope.modifyOffer = function(){
        
    }

  });
