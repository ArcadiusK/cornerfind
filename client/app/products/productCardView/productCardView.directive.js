'use strict';

angular.module('cornerfindApp')
    .directive('productCardView', function(Auth, products, likes) {
        return {
            templateUrl: 'app/products/productCardView/productCardView.html',
            restrict: 'EA',
            scope: {

                product: '=info',
                currentUser: '='

            },
            link: function(scope, element, attrs) {

                // scope.$watch('product', function(){
                //      scope.textGenerate();
                // });
                scope.textGenerate = function() {
                    likes.resource.getProductLikes({
                        id: scope.product._id
                    }).$promise.then(function(data) {
                        scope.product.likes = data;
                        scope.currentUser = Auth.getCurrentUser();
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
                     }).then(function(){
                        // console.log("scope.product.likes", scope.product.likes, "scope.product: ", scope.product)
                        //             if (typeof scope.product.likes !== 'undefined')
                        scope.product.likes.forEach(function(el) {
                            if (el.userId._id == scope.currentUser._id) {
                                scope.favorited = true;
                                return;
                            } else {
                                scope.favorited = false;
                            }
                        });

                        if (scope.currentUser._id) {
                            likes.resource.getUserLikes({
                                id: scope.currentUser._id
                            }).$promise.then(function(data) {
                                scope.currentUser.likes = data;
                            });
                        }
                    });   
                };

                scope.textGenerate();
               
                //toggle favorite function to update backend.
                scope.toggleFavorite = function() {
                    var likeObject = {
                        productId: scope.product._id,
                        userId: scope.currentUser._id
                    };

                    // If already favorited do this
                    if (scope.favorited) {

                        var userLikeIndex = scope.currentUser.likes.map(function(e) {
                            return e.productId;
                        }).indexOf(scope.product._id);

                        scope.currentUser.likes.splice(userLikeIndex, 1);

                        var productLikeIndex = scope.product.likes.map(function(e) {
                            return e.userId._id;
                        }).indexOf(scope.currentUser._id);
                        scope.product.likes.splice(productLikeIndex, 1);

                        likes.resource.deleteLike({
                            productid: scope.product._id,
                            userid: scope.currentUser._id
                        });
                        scope.favorited = false;

                        scope.textGenerate();
                    }
                    // If not favorited do this
                    else if (scope.currentUser._id) {
                        scope.currentUser.likes.push({
                            productId: scope.product._id,
                            userId: scope.currentUser._id
                        });
                        scope.product.likes.push({
                            productId: scope.product._id,
                            userId: scope.currentUser._id
                        });
                        likes.resource.save({
                            productId: scope.product._id,
                            userId: scope.currentUser._id
                        });
                        scope.favorited = true;
                        scope.textGenerate();
                    }


                }
            }
        }
    });
