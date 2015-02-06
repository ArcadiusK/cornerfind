'use strict';

angular.module('cornerfindApp')
  .controller('EasypostCtrl', function ($scope, $http) {
   $scope.verifyAddyResult;

   $scope.verifyAddress = function(address){
   		console.log(address);
	   	$http.post('/api/easyposts/verify', {fromAddress: address}).success(function(results){
			$scope.verifyAddyResult = results.address;
		});
   }

  });
