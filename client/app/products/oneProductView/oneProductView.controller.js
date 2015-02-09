'use strict';

angular.module('cornerfindApp')
    .controller('OneProductViewCtrl', function($scope, Auth, User, products, chat, $stateParams, offer, $cookieStore, $location) {
        $scope.currentUser = Auth.getCurrentUser();


        products.resource.get({
            id: $stateParams.id
        }).$promise.then(function(product) {
            $scope.product = product;
            // Get owner USER OBJECT of current product
            console.log('product is ', $scope.product)
        });



        chat.getChatList($stateParams.id).then(function(data) {
            $scope.chatlist = data;
        });

        $scope.isMobile = function(width) {
            return width <= 992 ? '' : 'pinned';
        }

        $scope.isOffering = false;

        //need to clear the form after the offer is submitted
        //and put in a confirmation 'Successfully Submitted Offer!'

        $scope.submitOffer = function(offerPrice) {

            $location.path('/checkout');

            // // $scope.isOffering=false;
            // var prod = $scope.product;
            // $scope.isOffering = !$scope.isOffering;

            // var orderForCreation = {
            //     lineItems: [{
            //         //This ONLY handles single items as is, will need to be modified for bundling
            //         productId: prod._id,
            //         name: prod.name,
            //         purchasePrice: offerPrice,
            //     }],
            //     sellerId: prod.userId._id,
            //     buyerId: $scope.currentUser._id,
            //     status: 'offer'
            // }
            // offer.save(orderForCreation, function(result) {}, function(err) {
            //     if (err) {
            //         console.log('Error ', err)
            //         console.log(orderForCreation)
            //     };
            // })
        }

        $scope.userRedirect = function() {
            $location.path('/users/' + $scope.product.userId.username);
        }



    });