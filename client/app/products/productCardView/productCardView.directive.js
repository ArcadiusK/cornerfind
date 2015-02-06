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
      }
    };
  });