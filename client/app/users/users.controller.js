'use strict';

angular.module('cornerfindApp')
    .controller('UsersCtrl', function($scope, products, Auth, User,chat, $stateParams) {

        
        // Get logged in user object
        $scope.currentUser = Auth.getCurrentUser();

        // Get user of current page
        User.getUserByName({
            username: $stateParams.name
        }, function(user) {
            $scope.user = user;
            console.log('You are LOGGED IN AS : ', $scope.currentUser.name);
            console.log('You are on ',$scope.user.name,'s Page!');
            if ($scope.currentUser.following.indexOf($scope.user._id) !== -1) {
                $scope.followed = true;
                      console.log('You are already following him!');
            }
            else {
                $scope.followed = false;
                   console.log('You are not following him yet!');
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