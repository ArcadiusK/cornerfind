'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('easypost', {
        url: '/easyposts',
        templateUrl: 'app/easypost/easypost.html',
        controller: 'EasypostCtrl'
      });
  });