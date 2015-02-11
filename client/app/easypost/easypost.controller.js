'use strict';

angular.module('cornerfindApp')
  .controller('EasypostCtrl', function ($scope, $http) {
   $scope.verifyAddyResult;
	$scope.false = true;

   $scope.saveAddress = function(address){
   		$scope.addyConfirm = true;
   		toast('We found a match! Please review, modify and save', 8000) // 4000 is the duration of the toast
	   	$http.post('/api/easyposts/verify', {fromAddress: address}).success(function(results){
			$scope.address = results.address;
		});
   }

   $scope.createLabel = function(buyerAddress, sellerAddress){
 	   	console.log(buyerAddress, SellerAddress);
	   	$http.post('/api/easyposts/createLabel', {to_Address: buyerAddress, from_address: sellerAddress}).success(function(results){
			$scope.labelURL = results;
		});
   }

  });
