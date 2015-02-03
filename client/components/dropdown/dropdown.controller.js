'use strict';

angular.module('cornerfindApp')
  .controller('DropdownCtrl', function ($scope, $log) {
  	$scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  	];

  $scope.status = {
    openBrands: false,
    openCategories:false,
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleBrands = function($event) {
    console.log($event)
    // $event.preventDefault();
    // $event.stopPropagation();
    $scope.status.openBrands= !$scope.status.openBrands;
    console.log($scope.status)
  };
  $scope.toggleCategories = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.openCategories= !$scope.status.openCategories;
  };
})