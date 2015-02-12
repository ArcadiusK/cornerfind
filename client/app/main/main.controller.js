'use strict';

angular.module('cornerfindApp')

    .controller('MainCtrl', function($scope, Auth, $location, $http, socket, products, brand, category, $window) {
        $scope.productList = products.resource.query();
        $scope.brandList = brand.query();
        $scope.categoryList = category.query();
        $scope.currentUser = Auth.getCurrentUser();
        $scope.loggedin = Auth.isLoggedIn();

        $scope.searchSubmit = function(searchText) {
          console.log('inside searchSubmit');
            products.resource.search({
                   //searchtext: searchText
                   id: searchText
                }).$promise
                .then(function(results) {
                    $scope.results = results;
                    console.log("results: ", results);
                    //if ($scope.results.data.length === 1) {
                      if ($scope.results.length === 1) {
                        console.log('There was only one object found..');
                 //   } else if ($scope.results.data.length > 1) {
                     } else if ($scope.results.length > 1) {
                        console.log('There was more than one object found!');
                    }
                })
                .catch(function(err) {
                    console.log('There was an error in search', err);
                });
        };

        $scope.addProduct = function (userId) {
             $location.path('/users/' + $scope.currentUser._id+'/add');
             // products.productRoute(userId)
             //Why doesn't it work when it's in a factory?
             //It reroutes instantly back to the main page
        };

    });

