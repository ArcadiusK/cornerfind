'use strict';

angular.module('cornerfindApp')
    .controller('UsersCtrl', function($scope, products, Auth, User, chat, review, $stateParams, $timeout) {



        // Get logged in user object
        $scope.loggedInUser = Auth.getCurrentUser();

        $scope.toggleText = 'Following';



        $scope.review = false;

        // Get user of current page
        User.getUserByName({
            username: $stateParams.name
        }, function(user) {
            $scope.user = user;
            console.log('scope.user._id is ...', $scope.user._id);
            // console.log('$scope.loggedInUser.following is ...', $scope.loggedInUser.following);

            $scope.reviews = review.resource.query({id:$scope.user._id});
            if ($scope.loggedInUser.following.indexOf($scope.user._id) !== -1) {
                $scope.followed = true;
                $scope.toggleText = 'Following';
                console.log('You are already following him!', $scope.user._id);
            } else {
                $scope.followed = false;
                $scope.toggleText = 'Follow';
                console.log('You are not following him yet!');
            }
        })

        $scope.showReviews = function () {
            $scope.review = true;
        }


        $scope.toggleFollow = function() {

            // If already following do this
            if ($scope.followed) {
                // Update logged in user's following Array


                $scope.loggedInUser.following.splice($scope.loggedInUser.following.indexOf($scope.user._id), 1)
                
                $timeout(function() {
                    User.update($scope.loggedInUser)
                        .$promise.then(function(user) {
                         
                            $scope.followed = false;
                            $scope.toggleText = 'Follow';
                            $scope.$apply;
                        });
                }, 1000);


                $scope.user.followers.splice($scope.user.followers.indexOf($scope.loggedInUser._id), 1)
                    // Update the user of the page's followers array
                User.update($scope.user)
                    .$promise.then(function(user) {
                        toast('Unfollowed',4000);
                       
                    });

            }
            // If not following yet do this
            else {

                // Update logged in user's following Array
                $scope.loggedInUser.following.push($scope.user._id)
                User.update($scope.loggedInUser)
                    .$promise.then(function(user) {
                          toast('Following',4000);
                        $scope.followed = true;
                        $scope.toggleText = 'Following';
                        $scope.$apply;
                    });

                // Update the user of the page's followers array
                $scope.user.followers.push($scope.loggedInUser._id)
                User.update($scope.user)
                    .$promise.then(function(user) {
                        console.log('Follower pushed to users followers array ..', user)
                    });

            }
        }

        // $scope.followUser = function() {
        //     $scope.loggedInUser.following.push($scope.user._id)
        //     User.update($scope.loggedInUser)
        //         .$promise.then(function(user) {

        //         });
        //     $scope.followed = true;
        // }

        // $scope.unfollowUser = function() {
        //     $scope.loggedInUser.following.splice($scope.loggedInUser.following.indexOf($scope.user.following.remove), 1)
        //     User.update($scope.loggedInUser)
        //         .$promise.then(function(user) {

        //         });
        //     $scope.followed = false;
        // }

        // $scope.loadAbout = function() {

        // }









    });