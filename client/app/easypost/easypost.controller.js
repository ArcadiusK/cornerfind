'use strict';

angular.module('cornerfindApp')
  .controller('EasypostCtrl', function ($scope, $http, Auth ) {
    $scope.verifyAddyResult;
  	$scope.false = true;
    $scope.buttonText = 'Submit';
    $scope.buttonColor = '';
    $scope.currentUser = Auth.getCurrentUser();
    $scope.address={};


    $http.get('/api/address/'+$scope.currentUser._id).success(function(results){
        $scope.address = results;
       
        $("#city").focus()
        $("#street1").focus()
        $("#street2").focus()
        $("#state").focus()
        $("#zip").focus()
        $("#city").focus()
    });

   $scope.saveAddress = function(address){
   		$scope.addyConfirm = true;
     
      if($scope.buttonText == 'Submit'){
     		toast('We found a match! Please review, modify and save', 5000) // 4000 is the duration of the toast
        $http.post('/api/easyposts/verify', {fromAddress: address}).success(function(results){
  			
        $scope.address.userId = $scope.currentUser._id;
        $scope.address.street1 = results.address.street1;
        $scope.address.street2 = results.address.street2;
        $scope.address.state = results.address.state;
        $scope.address.zip = results.address.zip;
        $scope.address.city = results.address.city;

        $scope.buttonColor = 'light-green light-green darken-4';
        $scope.buttonText = 'Save'
        });
      }
      else{
        //logic to save address Schema
        console.log('scope addy before saving', $scope.address);

        $http.post('/api/address/add', $scope.address).success(function(results){
          console.log('wht was added to the database', results);
        });

        $scope.buttonText = 'Submit';
        $scope.buttonColor = '';

        toast('Saved!', 5000)
      }
   }

   $scope.createLabel = function(buyerAddress, sellerAddress){
 	   	console.log(buyerAddress, SellerAddress);
	   	$http.post('/api/easyposts/createLabel', {to_Address: buyerAddress, from_address: sellerAddress}).success(function(results){
			$scope.labelURL = results;
		});
   }

  });
