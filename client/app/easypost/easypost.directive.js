'use strict';

angular.module('cornerfindApp')
  .directive('easypost', function () {
    return {
      templateUrl: 'app/easypost/easypost.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });