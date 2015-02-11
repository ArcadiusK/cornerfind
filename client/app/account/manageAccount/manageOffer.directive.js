'use strict';

angular.module('cornerfindApp')
    .directive('manageOfferView', function() {
        return {
            templateUrl: "/app/account/manageAccount/manageOffer.card.html",
            restrict: 'EA',
            scope: {
                offer: '=info',
                status: '=',
                stripeResult: '=',
                acceptOffer: '&'
            },
            link: function(scope, element, attrs) {

                scope.submitButton = function() {
                    scope.charged = true;
                }

                scope.showReview = false;

                scope.review = function() {
                    scope.showReview = true;
                }

                scope.maxStars = [1, 2, 3, 4, 5];

              
                scope.starClasses = ["", "", "", "", ""];
                scope.setStars = function(num) {
                    scope.newReview.stars = num;
                    for (var i = 0; i < num; i++) {
                        scope.starClasses[i] = "star-color";
                    }
                    for (var i = num; i < 5; i++) {
                        scope.starClasses[i] = "";
                    }
                }

            }

        }
    })