'use strict';

angular.module('cornerfindApp')

    .controller('MainCtrl', function($scope, Auth, $location, $http, socket, products, brand, category, $window) {
        $scope.productList = products.resource.query();
        $scope.brandList = brand.query();
        $scope.categoryList = category.query();
        $scope.currentUser = Auth.getCurrentUser();
        $scope.loggedin = Auth.isLoggedIn();




        $scope.searchSubmit = function(searchText) {
            products.search({
                    searchtext: searchText
                }).$promise
                .then(function(results) {
                    $scope.results = results;
                    if ($scope.results.data.length === 1) {
                        console.log('There was only one object found..');
                    } else if ($scope.results.data.length > 1) {
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

