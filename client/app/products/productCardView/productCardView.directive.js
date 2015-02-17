'use strict';

angular.module('cornerfindApp')
    .directive('productCardView', function(Auth, products, likes) {
        return {
            templateUrl: 'app/products/productCardView/productCardView.html',
            restrict: 'EA',
            scope: {
                product: '=info',
            },
            link: function(scope, element, attrs) {
                
                //initialize get productlikes, currentuser and currentuserlikes
                var unbindWatcher = scope.$watch('product',function(){
                    likes.resource.getProductLikes({
                        id: scope.product._id
                    }).$promise.then(function(data) {
                        scope.product.likes = data;
                        scope.currentUser = Auth.getCurrentUser();
                    }).then(function() {
                        if (scope.currentUser._id) {
                            likes.resource.getUserLikes({
                                id: scope.currentUser._id
                            }).$promise.then(function(data) {
                                scope.currentUser.likes = data;
                            });
                        }
                    }).then(function(){
                        console.log('scope.product.Likes', scope.product.likes);
                        for(var i = 0; i < scope.product.likes.length; i++){
                            console.log('el', scope.product.likes[i]);
                            // console.log('currentUser', scope.currentUser._id );
                            if (scope.product.likes[i].userId._id == scope.currentUser._id) {
                                console.log('hit');
                                scope.favorited = true;
                                break;
                            } else {
                                console.log('turnoff');
                                scope.favorited = false;
                            }
                        }
                    });
                         
                    unbindWatcher();
                });


                scope.$watch('product.likes', function() {
                    scope.textGenerate();
                }, true);

                scope.textGenerate = function() {

                    if (scope.product.likes.length === 1) {
                        scope.likeText = scope.product.likes[0].userId.username + " likes this";
                        if (scope.likeText.length > 40)
                            scope.likeText = scope.likeText.slice(0, 37) + "..."
                    } else if (scope.product.likes.length > 1) {
                        scope.likeText = scope.product.likes[0].userId.username + " and " + (scope.product.likes.length - 1) + " others like this";
                        if (scope.likeText.length > 40)
                            scope.likeText = scope.likeText.slice(0, 37) + "..."
                    } else {
                        scope.likeText = '';
                    }

                };

                // scope.textGenerate();

                //toggle favorite function to update backend.
                scope.toggleFavorite = function() {
                    if (scope.currentUser._id) {
                        // If already favorited do this
                        if (scope.favorited) {
                            likes.resource.deleteLike({
                                productid: scope.product._id,
                                userid: scope.currentUser._id
                            }).$promise.then(function() {;
                                // console.log('userLikes', scope.currentUser.likes);

                                // console.log('productLikes',scope.product._id);
                                // var userLikeIndex = scope.currentUser.likes.map(function(e) {
                                //     return e.productId;
                                // }).indexOf(scope.product._id);
                                //  console.log('userLikeIndex', productLikeIndex);
                                // scope.currentUser.likes.splice(userLikeIndex, 1);

                                var productLikeIndex = scope.product.likes.map(function(e) {
                                    return e.userId._id;
                                }).indexOf(scope.currentUser._id);
                                console.log('productLikeIndex', productLikeIndex);
                                scope.product.likes.splice(productLikeIndex, 1);
                            });

                            scope.favorited = false;
                            // scope.textGenerate();
                        }
                        // If not favorited do this
                        else {
                             //save
                            likes.resource.save({
                                productId: scope.product._id,
                                userId: scope.currentUser._id
                            }).$promise.then(function(){
                                //push like to current user
                                // scope.currentUser.likes.push({
                                //     productId: scope.product._id,
                                //     userId: scope.currentUser._id
                                // });
                                // console.log('afterpush',scope.currentUser.likes )
                                //push like to product likes. userId is actually User object to get username for text
                                scope.product.likes.push({
                                    productId: scope.product._id,
                                    userId: scope.currentUser
                                });
                            });

                            scope.favorited = true;
                            // scope.textGenerate();
                        }
                    }
                }
            }
        }
    });
