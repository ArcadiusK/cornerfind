'use strict';

angular.module('cornerfindApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth,brand, category) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];


    $scope.brandList = brand.query();
    $scope.categoryList=category.query();

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.smallerThan768 = function(){ //768 is the twitter navbar breakpoint
      return $scope.windowWidth < 768 ? true:false;
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });