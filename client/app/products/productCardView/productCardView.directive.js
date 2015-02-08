'use strict';

angular.module('cornerfindApp')
  .directive('productCardView', function (Auth, products, likes) {
    return {
      templateUrl: 'app/products/productCardView/productCardView.html',
      restrict: 'EA',
      scope: {
      	product: '=info',
        currentUser: '=currentUser',
      },
      link: function (scope, element, attrs) {

        console.log(scope.product);

        likes.resource.getProductLikes({id: scope.product._id}).$promise.then(function(data){
          
          scope.product.likes = data;

          if(scope.product.likes.length === 1){
            scope.likeText = scope.product.likes[0].username + " likes this";
            if( scope.likeText.length > 40)
            scope.likeText = scope.likeText.slice(0,37) + "..."
          }
          else if(scope.product.likes.length > 1){
            scope.likeText = scope.product.likes[0].username + " and " + scope.product.likes.length + " others like this";
            if( scope.likeText.length > 40)
            scope.likeText = scope.likeText.slice(0,37) + "..."
          }

          scope.product.likes.forEach(function(el){
            if(el.userId == scope.currentUser._id){
                  console.log(scope.product.likes);
                  scope.favorited = true;
            }
            else{
                scope.favorited = false;
            }
          })
   
        
          likes.resource.getUserLikes({id: scope.currentUser._id}).$promise.then(function(data){
              scope.currentUser.likes = data;
          });

        });


      

      
        //toggle favorite function to update backend. 
        scope.toggleFavorite = function(){
          // If already favorited do this
          if (scope.currentUser.likes.indexOf(scope.product._id) > -1) {
            console.log('remove from favorite', scope.product._id);
            scope.currentUser.likes.splice(scope.currentUser.likes.indexOf(scope.product._id), 1);
            scope.product.likes.splice(scope.product.likes.indexOf(scope.currentUser._id), 1);
            likes.resource.deleteLike({productid: scope.product._id, userid: scope.currentUser._id});
            scope.favorited = false;
          }

          else{
            console.log('adding to favorite', scope.product._id);
            scope.currentUser.likes.push(scope.product._id);
            scope.product.likes.push(scope.currentUser._id);
            likes.resource.save({productId: scope.product._id, userId: scope.currentUser._id});
            scope.favorited = true;
          }
            

            

        //     scope.currentUser.following.splice($scope.currentUser.following.indexOf($scope.user._id), 1)
                
        //         $timeout(function() {
        //             User.update($scope.currentUser)
        //                 .$promise.then(function(user) {
        //                     console.log('User Unfollowed! New logged in user.followed is ..', user)
        //                     $scope.followed = false;
        //                     $scope.toggleText = 'Follow';
        //                     $scope.$apply;
        //                 });
        //         }, 1000);


        //         $scope.user.followers.splice($scope.user.followers.indexOf($scope.currentUser._id), 1)
        //             // Update the user of the page's followers array
        //         User.update($scope.user)
        //             .$promise.then(function(user) {
        //                 console.log('Follower removed from users followers array ..', user)
        //             });

        //     }
        //     // If not following yet do this
        //     else {

        //         // Update logged in user's following Array
        //         $scope.currentUser.following.push($scope.user._id)
        //         User.update($scope.currentUser)
        //             .$promise.then(function(user) {
        //                 console.log('User Followed! New logged in user.followed is ..', user)
        //                 $scope.followed = true;
        //                 $scope.toggleText = 'Following';
        //                 $scope.$apply;
        //             });

        //         // Update the user of the page's followers array
        //         $scope.user.followers.push($scope.currentUser._id)
        //         User.update($scope.user)
        //             .$promise.then(function(user) {
        //                 console.log('Follower pushed to users followers array ..', user)
        //             });

        //     }
        // }

        

      }
    }
  }
  });