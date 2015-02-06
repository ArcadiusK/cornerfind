'use strict';

angular.module('cornerfindApp')
  .directive('productCardView', function () {
    return {
      templateUrl: 'app/products/productCardView/productCardView.html',
      restrict: 'EA',
      scope: {
      	product: '=info'
      },
      link: function (scope, element, attrs) {
        if(scope.product.likes.length === 1){
          scope.likeText = scope.product.likes[0].username + " likes this";
          if( scope.likeText.length > 40)
          scope.likeText = scope.likeText.slice(0,37) + "..."
        }
        else if(product.likes.length > 1){
          scope.likeText = scope.product.likes[0].username + " and " + scope.product.likes.length + " likes this";
          if( scope.likeText.length > 40)
          scope.likeText = scope.likeText.slice(0,37) + "..."
        }

        console.log(scope);
    
        if(scope.product.likes.indexOf(scope.currentUser) == -1){
          scope.favoriteColor = "favoriteColor";
        }
        else{
          scope.favoriteColor = "";
        }

        //  // Get user of current page
        // User.getUserByName({
        //     username: $stateParams.name
        // }, function(user) {
        //     $scope.user = user;
        //     console.log('scope.user._id is ...', $scope.user._id);
        //     // console.log('$scope.loggedInUser.following is ...', $scope.loggedInUser.following);

        //     if ($scope.loggedInUser.following.indexOf($scope.user._id) !== -1) {
        //         $scope.followed = true;
        //         $scope.toggleText = 'Following';
        //         console.log('You are already following him!', $scope.user._id);
        //     } else {
        //         $scope.followed = false;
        //         $scope.toggleText = 'Follow';
        //         console.log('You are not following him yet!');
        //     }
        // }) 


        // scope.toggleFavorite = function(){

        //     // If already following do this
        //     if ($scope.favorite) {
        //         // Update logged in user's following Array


        //         $scope.loggedInUser.following.splice($scope.loggedInUser.following.indexOf($scope.user._id), 1)
                
        //         $timeout(function() {
        //             User.update($scope.loggedInUser)
        //                 .$promise.then(function(user) {
        //                     console.log('User Unfollowed! New logged in user.followed is ..', user)
        //                     $scope.followed = false;
        //                     $scope.toggleText = 'Follow';
        //                     $scope.$apply;
        //                 });
        //         }, 1000);


        //         $scope.user.followers.splice($scope.user.followers.indexOf($scope.loggedInUser._id), 1)
        //             // Update the user of the page's followers array
        //         User.update($scope.user)
        //             .$promise.then(function(user) {
        //                 console.log('Follower removed from users followers array ..', user)
        //             });

        //     }
        //     // If not following yet do this
        //     else {

        //         // Update logged in user's following Array
        //         $scope.loggedInUser.following.push($scope.user._id)
        //         User.update($scope.loggedInUser)
        //             .$promise.then(function(user) {
        //                 console.log('User Followed! New logged in user.followed is ..', user)
        //                 $scope.followed = true;
        //                 $scope.toggleText = 'Following';
        //                 $scope.$apply;
        //             });

        //         // Update the user of the page's followers array
        //         $scope.user.followers.push($scope.loggedInUser._id)
        //         User.update($scope.user)
        //             .$promise.then(function(user) {
        //                 console.log('Follower pushed to users followers array ..', user)
        //             });

        //     }
        // }

        

      }
    };
  });