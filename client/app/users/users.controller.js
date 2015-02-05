'use strict';

angular.module('cornerfindApp')
    .controller('UsersCtrl', function($scope, products, Auth, User,chat, $stateParams) {

        $scope.followed = false;
        // Get logged in user object
        $scope.currentUser = Auth.getCurrentUser();

        // Get user of current page
        User.getUserByName({
            username: $stateParams.name
        }, function(user) {
            $scope.user = user;
            if ($scope.currentUser.following.indexOf(user._id)) {
                $scope.followed = true;
            }
        })

        $scope.followUser = function() {
            $scope.currentUser.following.push($scope.user._id)
            User.update($scope.currentUser)
                .$promise.then(function(user) {
                 
                });
            $scope.followed = true;
        }

        $scope.unfollowUser = function() {
            $scope.currentUser.following.splice($scope.currentUser.following.indexOf($scope.user.following.remove), 1)
            User.update($scope.currentUser)
                .$promise.then(function(user)  {
                
                });
            $scope.followed = false;
        }

        $scope.loadAbout = function() {

        }









    });