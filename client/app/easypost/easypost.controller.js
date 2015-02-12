'use strict';

angular.module('cornerfindApp')
  .controller('EasypostCtrl', function ($scope, $http, Auth, Address ) {
    $scope.verifyAddyResult;
  	$scope.false = true;
    $scope.buttonText = 'Submit';
    $scope.buttonColor = '';
    $scope.currentUser = Auth.getCurrentUser();
    
    $scope.address = Address.get({id:$scope.currentUser._id});
    //question how to fix focus thing
    $("#street1").focus();
    $("#street2").focus();
    $("#state").focus();
    $("#zip").focus();
    $("#city").focus();

   $scope.saveAddress = function(){
    toast('Confirming Address ...',3000)
      if($scope.buttonText == 'Submit'){


        $http.post('/api/easyposts/verify',{fromAddress:$scope.address}).success(function(address,status){

          if(status !== 200){
            return toast('Invalid Address',4000)
          }

          $scope.address ={
          userId: $scope.currentUser._id,
          name: address.address.name,
          street1: address.address.street1,
          street2: address.address.street2,
          state: address.address.state,
          zip: address.address.zip,
          city: address.address.city,
          phone: address.address.phone,
          email: address.address.email

        }

        Address.updateAddress({id:$scope.currentUser._id},$scope.address,null,function(results){
     		toast('Success!', 5000)
        console.log("results ",results)
        })

      })
    }
  }


   $scope.createLabel = function(buyerAddress, sellerAddress){
 	   	console.log(buyerAddress, SellerAddress);
	   	$http.post('/api/easyposts/createLabel', {to_Address: buyerAddress, from_address: sellerAddress}).success(function(results){
			$scope.labelURL = results;
		});
   }

  });
