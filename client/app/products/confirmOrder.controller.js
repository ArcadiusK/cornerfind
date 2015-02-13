'use strict';

angular.module('cornerfindApp')
	.controller('ConfirmOrderCtrl',function($scope,$state,offer,Auth, Address, $cookieStore){

		$scope.confirmOrder = offer.getOrder();
		//if get order returns things, add the cookie
		//otherwise pull the cookie that's already there

		if($scope.confirmOrder.hasOwnProperty('lineItems')){
			$cookieStore.put('order',$scope.confirmOrder)
		} else {
			$scope.confirmOrder = $cookieStore.get('order')
		}
		
	})