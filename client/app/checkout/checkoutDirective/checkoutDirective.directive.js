'use strict';

angular.module('cornerfindApp')
    .directive('checkoutd', function(User, $location) {
        return {
            templateUrl: 'app/checkout/checkoutDirective/checkoutDirective.html',
            restrict: 'EA',
            scope: {
                product: '=',
                user: '=',
                stripeResponseHandler: "&",
                buttonText: '@'
            },
            link: function(scope, element, attrs) {

                    Stripe.setPublishableKey('pk_test_HrMktfRjskOsJMw8RBnfca6X');

                    scope.checkout = function() {
                        // if ((/^\d{5}(?:[-\s]\d{4})?$/).test(scope.order.shipping.zip)) {
                        var ccArr = scope.ccinfo.expiry.split('/');
                        scope.ccinfo.exp_month = ccArr[0];
                        scope.ccinfo.exp_year = ccArr[1];
                        Stripe.card.createToken(scope.ccinfo, stripeResponseHandler);
                        console.log('Created token... ccinfo is ', scope.ccinfo);
                        return true;
                        // } else {
                        // return false;
                        // }
                    };

                    function stripeResponseHandler(status, response) {
                        if (response.error) {
                            // show the errors on the form
                            scope.errorMessage = response.error.message;
                            scope.$apply();
                        } else {
                            // token contains id, last4, and card type


                            scope.user.stripeToken = response['id'];
                            console.log('scope.user.stripeToken is ..', scope.user.stripeToken);

                            User.update(scope.user)
                                .$promise.then(function(user) {
                                    console.log('updated user stripe token is ..', user)
                                });


                            // scope.item.billing.cardType = response['card']['brand'];
                            // scope.item.billing.last4 = response['card']['last4'];


                            // angular.forEach($scope.order.lineItems, function(lineItem) {
                            //     lineItem.productId = lineItem.item._id;
                            //     lineItem.productName = lineItem.item.name;
                            //     lineItem.price = lineItem.item.price;
                            //     Product.updateQuantity(lineItem);
                            // });

                            // Order.save($scope.item, function(order) {
                            //     console.log(order);
                            //     $location.path('/checkout/complete');
                            // });
                        }
                    }


                } //END OF LINK
        };
    });