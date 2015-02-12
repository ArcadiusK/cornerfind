'use strict';

angular.module('cornerfindApp')
    .controller('OneProductViewCtrl', function($scope, Auth, User, products, chat, $stateParams, offer, $cookieStore, $location) {
        $scope.currentUser = Auth.getCurrentUser();
        if(typeof $scope.currentUser._id !== 'undefined'){
            Auth.getCurrentUser().$promise.then(function(user) {
                if (user.billing.stripeToken !==null) {
                    $scope.currentUser = user;
                    $scope.notoken =false;
                } else {
                       $scope.currentUser = user;
                    $scope.notoken = true;
                }
            })
        };

        products.resource.get({
            id: $stateParams.id
        }).$promise.then(function(product) {
            $scope.product = product;
        });

        chat.getChatList($stateParams.id).then(function(data) {
            $scope.chatlist = data;
        });

        $scope.isMobile = function(width) {
            return width <= 992;
        }

        $scope.showAddressForm = false;
        $scope.isPinned = function(width){
            if(!$scope.isMobile(width) && !$scope.showAddressForm) return 'pinned';
        }

        $scope.isOffering = false;
        $scope.boughtItem = false;
        $scope.showtoken = false;

        //need to clear the form after the offer is submitted
        //and put in a confirmation 'Successfully Submitted Offer!'

        $scope.submitOffer = function(offerPrice) {

            //SHOWS CHECKOUT DIRECTIVE IF USER DOES NOT HAVE A TOKEN ALREADY
            if ($scope.currentUser.billing.stripeToken == null) {
                $scope.showtoken = true;
                return;
            }

            var prod = $scope.product;
            $scope.isOffering = !$scope.isOffering;

            var orderForCreation = {
                lineItems: [{
                    //This ONLY handles single items as is, will need to be modified for bundling
                    productId: prod._id,
                    name: prod.name,
                    purchasePrice: offerPrice,
                }],
                sellerId: prod.userId._id,
                buyerId: $scope.currentUser._id,
                status: 'offer'
            }
            offer.save(orderForCreation, function(result) {
                console.log('offer created...', result)
            }, function(err) {
                if (err) {
                    console.log('Error ', err)
                };
            })

        }


        $scope.buyNow = function() {
            //SHOWS CHECKOUT DIRECTIVE IF USER DOES NOT HAVE A TOKEN ALREADY
            if ($scope.currentUser.billing.stripeToken == null) {
                $scope.showtoken = true;
                return;
            }

            var prod = $scope.product;
            $scope.isOffering = !$scope.isOffering;
           
            var orderForCreation = {
                lineItems: [{
                    //This ONLY handles single items as is, will need to be modified for bundling
                    productId: prod._id,
                    name: prod.name,
                    purchasePrice: $scope.product.price,
                }],
                sellerId: prod.userId._id,
                buyerId: $scope.currentUser._id,
                status: 'accepted'
            }
            offer.save(orderForCreation, function(result) {}, function(err) {
                if (err) {
                    console.log('Error ', err)
                    console.log(orderForCreation)
                };

            })

             // Create digestible stripe order
            $scope.stripeOrder = {
                    stripeToken: $scope.currentUser.billing.stripeToken ,
                    orderTotal: $scope.product.price
            }
            
            offer.charge($scope.stripeOrder).$promise.then(function(result){

                if (result.$resolved) {
                     $scope.boughtItem = true;

                }
            })

            


        }

        $scope.userRedirect = function() {
            $location.path('/users/' + $scope.product.userId.username);
        }



    });