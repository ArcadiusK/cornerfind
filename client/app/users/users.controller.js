'use strict';

angular.module('cornerfindApp')
    .controller('UsersCtrl', function($scope, products, Auth, User, chat, $stateParams) {

        $scope.currentUser = Auth.getCurrentUser();
        console.log('current logged in user is: ', $scope.currentUser)

        User.getUserByName({
            username: $stateParams.name
        }, function(user) {
            $scope.user = user;

        })

        $scope.followUser = function() {
            if ($scope.currentUser) {
                User.update({
                    _id: $scope.currentUser._id
                }, {
                    following: $scope.user._id
                }).$promise.then(function(user) {
                    console.log('Updated current user with new following is', user);

                    $scope.currentUser = user;
                })
            }

        }

        $scope.loadAbout = function() {

        }









    });