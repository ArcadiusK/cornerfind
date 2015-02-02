'use strict';

angular.module('cornerfindApp')
  .controller('MainCtrl', function ($scope, $http, socket, products, brand, category) {
    $scope.productList = products.query();
    $scope.brandList = brand.query();
    $scope.categoryList = category.query();


    $scope.searchSubmit = function (searchText) {
        products.search({searchtext: searchText}).$promise
            .then(function(results) {
                $scope.results = results;
                if ($scope.results.data.length === 1 )
                {
                    console.log('There was only one object found..');
                }
                else if ($scope.results.data.length >1 ) {
                    console.log('There was more than one object found!')
                }
            })
            .catch(function(err) {
                console.log('There was an error in search', err);
            })
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
