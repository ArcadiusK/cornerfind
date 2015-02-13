'use strict';

angular.module('cornerfindApp')
	.controller('ConfirmOrderCtrl',function($scope,$state,offer,Auth, Address){

		$scope.worked='HOORAY'
		$scope.order = offer.getOrder();





	})