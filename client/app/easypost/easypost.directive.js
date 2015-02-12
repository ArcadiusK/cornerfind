'use strict';

angular.module('cornerfindApp')
  .directive('easypost', function () {
    return {
      templateUrl: 'app/easypost/easypost.html',
      restrict: 'EA',
      scope: {},
      link: function (scope, element, attrs) {
      }
    };
  });