'use strict';

angular.module('cornerfindApp')
    .controller('ManageOffersCtrl', function($scope, offer, $state) {
        $scope.offers = offer.manageOffers({
            id: $scope.currentUser._id
        }, function(offer) {

          // Create digestible stripe order
            
            $scope.stripeOrder = {
                    stripeToken: offer[0].buyerId.billing.stripeToken,
                    orderTotal: offer[0].lineItems[0].purchasePrice
            }
             
            console.log('scope.stripeOrder is...', $scope.stripeOrder);
        })




        $scope.acceptOffer = function(orderId) {
          
            offer.acceptOffer({
                id: orderId
            }, function(result) {
                console.log('result of acceptOffer is ..', result)
            });
            offer.charge($scope.stripeOrder, function(result) {
                console.log('result of charge is ..', result)
            });
        }


    })