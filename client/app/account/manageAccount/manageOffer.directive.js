'use strict';

angular.module('cornerfindApp')
    .directive('manageOfferView', function(review) {
        return {
            templateUrl: "/app/account/manageAccount/manageOffer.card.html",
            restrict: 'EA',
            scope: {
                offer: '=info',
                currentUser: '=',
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

                scope.newReview = {
                    reviewedUserId: scope.offer.sellerId,
                    reviewingUserId: scope.offer.buyerId._id,
                    text: "",
                    rating: 0,
                    date: new Date(),
                }
                scope.maxStars = [1, 2, 3, 4, 5];

                scope.starClasses = ["", "", "", "", ""];
                scope.setStars = function(num) {
                    scope.newReview.rating = num;
                    for (var i = 0; i < num; i++) {
                        scope.starClasses[i] = "star-color";
                    }
                    for (var i = num; i < 5; i++) {
                        scope.starClasses[i] = "";
                    }
                    console.log('set Stars clicked!-->', scope.newReview);
                }
                scope.submitReview = function () {
                	
                	   scope.newReview.text = scope.reviewText;
                    review.resource.save(scope.newReview, function (result) {

                    	toast('Review submitted!', 4000);
                    });
                }
            }

        }
    })