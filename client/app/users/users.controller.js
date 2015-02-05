'use strict';

angular.module('cornerfindApp')
    .controller('UsersCtrl', function($scope, products, User, chat, $stateParams) {

        User.getUserByName({
            username: $stateParams.name
        }, function(user) {
            $scope.user = user;
            console.log('populated user is', $scope.user);
             console.log('productssssss' ,$scope.user.listedProducts);
        })

        $scope.followUser = function () {

        }

        $scope.loadAbout = function () {
          
        }










    });