'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsCtrl'
      })
     .state('oneProductView', {
        url: '/products/:id',
        templateUrl: 'app/products/oneProductView/oneProductView.html',
        controller: 'OneProductViewCtrl'
     })
      ;
  });
