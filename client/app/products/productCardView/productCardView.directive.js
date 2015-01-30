'use strict';

angular.module('cornerfindApp')
  .directive('productCardView', function () {
    return {
      templateUrl: 'app/products/productCardView/productCardView.html',
      restrict: 'EA',
      scope: {
      	product: '=info'
      }
      // link: function (scope, element, attrs) {
      // }
    };
  });