'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }) 
      // .state('profile', {
      //   url: '/profile',
      //   templateUrl: 'app/profile/profile.html',
      //   controller: 'ProfileCtrl'
      // });

  });