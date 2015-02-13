'use strict';

angular.module('cornerfindApp')
	.controller('ConfirmOrderCtrl',function($scope,$state,offer,Auth, Address, $cookieStore){

		$scope.confirmOrder = offer.getOrder();
		//if get order returns things, add the cookie
		//otherwise pull the cookie that's already there

		//question  cookies vs factory object for temporary data store
		//what about refreshes?
		if($scope.confirmOrder.hasOwnProperty('lineItems')){
			$cookieStore.put('order',$scope.confirmOrder)
		} else {
			$scope.confirmOrder = $cookieStore.get('order')
		}
		// $scope.keys = Object.keys($scope.confirmOrder)

		$scope.submitOrder = function(){
			$scope.submitted = true;
			var order = $scope.confirmOrder;
			var orderForCreation ={
				lineItems: order.lineItems,
				sellerId: order.sellerId,
				buyerId: order.buyerId,
				status: 'offer'
			}

			offer.resource.save(orderForCreation,function(result){
				toast('Successfully Submitted!',4000);
				$cookieStore.remove('order');
				offer.setOrder({});
			},function(err){
				if(err) {console.log('Error ',err)}
			})
		}
		
	})