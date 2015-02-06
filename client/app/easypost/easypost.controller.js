'use strict';

angular.module('cornerfindApp')
  .controller('EasypostCtrl', function ($scope, $http) {
   $scope.verifyAddyResult;

   $scope.verifyAddress = function(){
	   	$http.post('/api/easyposts/verify', {fromAddress:
		    {name: "Sawyer Bateman",
		    street1: "980 Fox Hill Ln",
		    city: "Scotch Plains",
		    state: "NJ",
		    zip: "07076",
		    phone: "908-668-8105"}
		}).success(function(results){
			$scope.verifyAddyResult = results.address;
		});
   }

  });
