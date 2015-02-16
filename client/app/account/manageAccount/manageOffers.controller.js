'use strict';

angular.module('cornerfindApp')
    .controller('ManageOffersCtrl', function($scope,review, offer, $state, Address, $http) {


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
     
        $scope.acceptOffer = function(orderId, orderObj) {
            var buyerAddress = orderObj.buyerAddress;
            console.log('orderID',orderId,'orderObj',orderObj)
            console.log('userid',$scope.currentUser._id)
            // console.log($scope.stripeOrder)
            offer.resource.charge($scope.stripeOrder, function(result) {

                    if (result.captured === true) {
                        $scope.stripeResult = result;
                        // console.log('FIRED')

                        Address.getUserAddresses({
                                id: $scope.currentUser._id
                            })
                            .$promise.then(function(data) {
                                // console.log('ADDRESS response', data)
                                // console.log('ADDRESS arguments', arguments)

                                var sellerAddress = {
                                    name: data[0].name,
                                    street1: data[0].street1,
                                    street2: data[0].street2 || '',
                                    city: data[0].city,
                                    state: data[0].state,
                                    zip: data[0].zip,
                                    country: data[0].country,
                                    phone: data[0].phone
                                };

                                // console.log('SEller add', sellerAddress)
                                $http.post('/api/easyposts/createLabel', {
                                    toAddress: buyerAddress,
                                    fromAddress: sellerAddress
                                }).success(function(results) {

                                    var labelUrl = results.postage_label.label_url;
                                    offer.resource.acceptOffer({
                                        id: orderId,
                                        url: labelUrl
                                    }, function(res, error) {
                                        console.log('AcceptOffer Callback ', res)
                                        $scope.offerAccepted = true;
                                        toast('Success!',4000)
                                    })


                                });
                            })
                    }
                }
            );
        }

        $scope.submitReview = function(reviewObj){
            console.log('REVIEW OBJ ',reviewObj)
            review.resource.save(reviewObj,function(res,err){
                console.log('Review Callback ',res,err)
            })
        }
    })