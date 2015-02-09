'use strict';

angular.module('cornerfindApp')
    .controller('OneProductViewCtrl', function($scope, Auth, User, products, chat, $stateParams, offer, $cookieStore, $location, $mdSidenav) {
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

            if ($scope.currentUser.stripeToken == null) {
                $scope.notoken = true;
            }

        }

        $scope.userRedirect = function() {
            $location.path('/users/' + $scope.product.userId.username);
        }



    });