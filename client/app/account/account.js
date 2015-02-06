'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('account',{
        url: '/account',
        templateUrl: 'app/account/manageAccount/manageAccount.html',
        controller: "ManageAccountCtrl"
      })
      .state('account.settings',{
        templateUrl: 'app/account/manageAccount/changePassword.html',
        controller: 'ChangePasswordCtrl'
      })
      .state('account.listings',{
        templateUrl: 'app/account/manageAccount/manageListings.html',
        controller: "ManageListingsCtrl"

      })




      .state('login', {
        url: '/logins',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      // .state('settings', {
      //   url: '/settings',
      //   templateUrl: 'app/account/settings/changePassword.html',
      //   controller: 'ChangePasswordCtrl',
      //   authenticate: true
      // });
  });