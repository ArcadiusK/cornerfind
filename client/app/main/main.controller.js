'use strict';

angular.module('cornerfindApp')
<<<<<<< HEAD
    .controller('MainCtrl', function($scope, Auth, $location, $http, socket, products, brand, category, $window) {
        $scope.productList = products.query();
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
                        console.log('There was more than one object found!')
                    }
                })
                .catch(function(err) {
                    console.log('There was an error in search', err);
                })
        }

        $scope.addProduct = function () {
            console.log('button clicked!')
             $location.path('/users/' + $scope.currentUser.username+'/add');
        }


        //Leaving for sockets reference
        // $http.get('/api/things').success(function(awesomeThings) {
        //   $scope.awesomeThings = awesomeThings;
        //   socket.syncUpdates('thing', $scope.awesomeThings);
        // });

        // $scope.$on('$destroy', function () {
        //   socket.unsyncUpdates('thing');
        // });
    });

