'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
         .state('store', {
        url: '/store/{name}',
        templateUrl: 'app/store-temp/store.html',
        controller: 'StoreCtrl'
      })
      .state('store_admin', {
        url: '/store/{name}/admin',
        templateUrl: 'app/store-temp/store_admin/store_admin.html',
        controller: 'StoreAdminCtrl'
      })
      .state('create_store', {
        url: '/create_store',
        templateUrl: 'app/store-temp/create_store/create_store.html',
        controller: 'CreateStoreCtrl'
      })
      .state('edit_product', {
        url: '/store/{name}/admin/edit/{product}',
        templateUrl: 'app/store-temp/product_edit.html',
        controller: 'ProducteditCtrl'
      })
  });