'use strict';

angular.module('cornerfindApp')
    .controller('ManageOffersCtrl', function($scope, offer, $state) {


        $scope.offers = offer.resource.manageOffers({
            id: $scope.currentUser._id
        }, function(offers) {
          // Create digestible stripe order
            $scope.stripeOrder = {
                    stripeToken: offers[0].buyerId.billing.stripeToken,
                    orderTotal: offers[0].lineItems[0].purchasePrice
            }
            console.log('offer is...', offers);
            $scope.status = {status: ['accepted','shipped','received','issues']}
        })




        $scope.stripeResult = {};
        $scope.acceptOffer = function(orderId) {
            offer.resource.acceptOffer({
                id: orderId
            }, function(result) {
            });
            offer.resource.charge($scope.stripeOrder, function(result) {
                if (result.captured === true) {
                $scope.stripeResult = result;
                }
            });
        }
    })