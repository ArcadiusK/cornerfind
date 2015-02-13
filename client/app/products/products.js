'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products',{
        url: '/products',
        templateUrl: 'app/products/products.html'
      })
      .state('products.oneProductView', {
        url: '/:id',
        templateUrl: 'app/products/oneProductView/oneProductView.html',
        controller: 'OneProductViewCtrl'
     })
      .state('products.stripeInfo',{
        // url: '/cardInfo',
        templateUrl: 'app/products/stripeForm.html',
        controller: 'StripeFormCtrl'
      })
      .state('products.addressForm',{
        // url: '/address',
        templateUrl: 'app/easypost/easypost.html',
        controller: 'EasypostCtrl'
      })
      .state('products.confirmOrder',{
        templateUrl: 'app/products/confirmOrder.html',
        controller: 'ConfirmOrderCtrl'
      })
     
  });
