'use strict';

angular.module('cornerfindApp')
    .controller('CheckoutCtrl', function($scope, Auth, offer) {

        // Stripe.setPublishableKey('pk_test_HrMktfRjskOsJMw8RBnfca6X');
        // $scope.errorMessage;

        if (Auth.isLoggedIn()) {
            $scope.user = Auth.getCurrentUser();
            $scope.user.$promise.then(function(user) {
                $scope.item = offer.getAcceptedOffer({
                    id: $scope.user._id
                }, function (item) {
                  console.log('item in front end is... ', item);
                });
            })
        } else {
          console.log('You are not logged in..')
        }

        $scope.checkout = function() {
            if ((/^\d{5}(?:[-\s]\d{4})?$/).test($scope.order.shipping.zip)) {
                var ccArr = $scope.ccinfo.expiry.split('/');
                $scope.ccinfo.exp_month = ccArr[0];
                $scope.ccinfo.exp_year = ccArr[1];
                Stripe.card.createToken($scope.ccinfo, stripeResponseHandler);
                console.log('Checked out... ccinfo is ', $scope.ccinfo);
                return true;
            } else {
                return false;
            }
        };

        function stripeResponseHandler(status, response) {
            if (response.error) {
                // show the errors on the form
                $scope.errorMessage = response.error.message;
                $scope.$apply();
            } else {
                // token contains id, last4, and card type
                $scope.item.billing.stripeToken = response['id'];
                $scope.item.billing.cardType = response['card']['brand'];
                $scope.item.billing.last4 = response['card']['last4'];


                // angular.forEach($scope.order.lineItems, function(lineItem) {
                //     lineItem.productId = lineItem.item._id;
                //     lineItem.productName = lineItem.item.name;
                //     lineItem.price = lineItem.item.price;
                //     Product.updateQuantity(lineItem);
                // });
                Order.save($scope.item, function(order) {
                    console.log(order);
                    $location.path('/checkout/complete');
                });
            }
        }



    });