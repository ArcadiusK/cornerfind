'use strict';

angular.module('cornerfindApp')
    .controller('ManageOffersCtrl', function($scope, offer, $state, Address,$http) {


        $scope.offers = offer.resource.manageOffers({
            id: $scope.currentUser._id
        }, function(offers) {
            // Create digestible stripe order
            $scope.stripeOrder = {
                stripeToken: offers[0].buyerId.billing.stripeToken,
                orderTotal: offers[0].lineItems[0].purchasePrice
            }
            console.log('offer is...', offers);
            $scope.status = {
                status: ['accepted', 'shipped', 'received', 'issues']
            }
        })




        $scope.stripeResult = {};
        // $scope.acceptOffer = function(orderId) {
        //     offer.resource.acceptOffer({
        //         id: orderId
        //     }, function(result) {
        //     });
        //     offer.resource.charge($scope.stripeOrder, function(result) {
        //         if (result.captured === true) {
        //             $scope.stripeResult = result;
        //         }


        //     });
        // }



        $scope.acceptOffer = function(orderId,orderObj) {
            var buyerAddress = orderObj.buyerAddress;
            // console.log($scope.stripeOrder)
            offer.resource.charge($scope.stripeOrder, function(result) {

                    if (result.captured === true) {
                        $scope.stripeResult = result;
                        // console.log('FIRED')

                        Address.getUserAddresses({
                                id: $scope.currentUser._id
                            })
                            .$promise.then(function(data) {
                                console.log('ADDRESS response', data)
                                delete data.__v;
                                delete data.billing;
                                delete data.userId;
                                delete data._id;
                                var sellerAddress = data;

                                $http.post('/api/easyposts/createLabel', {
                                    toAddress: buyerAddress,
                                    fromAddress: sellerAddress
                                }).success(function(results) {
                                    
                                    console.log('URL RES ',results)
                                    $scope.labelURL = results;

                                    // offer.resource.acceptOffer({
                                    //     id: orderId
                                    // }, function(result) {});


                                });





                            })





                    }


                }


            );
        }





    })