'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/users/:name',
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      })
      .state('add_product', {
        url: '/users/{name}/add',
        templateUrl: 'app/users/add_product/add_product.html',
        controller: 'AddProductCtrl'
      })
      .state('edit_profile', {
        url: '/users/{name}/edit',
        templateUrl: 'app/users/edit_profile/edit_profile.html',
        controller: 'EditProfileCtrl'
      })
  });