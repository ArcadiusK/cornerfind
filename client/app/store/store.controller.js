'use strict';

angular.module('cornerfindApp')
  .controller('StoreCtrl', function ($location, $scope, $http, socket, $stateParams, $resource, Auth, User, Store, Cart, Product) {
    
        $scope.currentUser = Auth.getCurrentUser();
        $scope.products = {};
   

        Cart.get(function(err, data) {});


        // Find store object, set scope.store and scope.owner variables.
        Store.get({
                name: $stateParams.name
            }).$promise
            .then(function(store) {
                console.log(store);
                $scope.store = store;
                $scope.store.products = [];
                User.get().$promise
                    .then(function(user) {
                        if (user._id === store.owner) {
                            $scope.owner = true;
                            $scope.ownerPresent = true;
                        }
                    });
  // Promo Stuff can enable later
                // $http.get('/api/promos/' + $scope.store._id)
                //     .then(function(response) {
                //         $scope.currentPromos = response.data;
                //         $scope.currentPromosCopy = $scope.currentPromos.map(function(promo) {
                //             return promo;
                //         })
                //         $scope.currentPromosCopy.forEach(function(promo, idx) {
                //             promo.expiry = new Date(promo.expiry);
                //             var now = new Date();
                //             if (now.getTime() > promo.expiry.getTime()) $scope.currentPromos.splice(idx, 1);
                //         })
                //     })
                //     .catch(function(err) {
                //         console.log('err in promos get', err);
                //     })
            })
            .then(null, function(err) {
                $location.path('/');
            });


        //Get all products by userid
        products.get({
                id: $scope.storeName
            }).$promise
            .then(function(products) {

                $scope.products = products;

            })

        $scope.addToCart = function(id) {
            Cart.add(id, function(err, data) {
                if (err) console.log(err)
                    // Cart.get(function(err, data) { This Still needs work. Not sure how to update cart
                    //   console.log("data",data);
                    //   console.log("formated objecT",Cart.formatCartObj(data.cart));
                    //   console.log($scope.cart_nav);
                    //   $scope.cart_nav = Cart.formatCartObj(data.cart);
                    // });
            });
        };
        $scope.searchStore = function() {
            $scope.store.products = []
            if ($scope.searchText) {
                Store.search({
                    'name': $stateParams.name
                }, {
                    searchtext: $scope.searchText
                }, function(res) {
                    if (res.data) {
                        $scope.products = res.data;
                        var productsArray = res.data;
                        // console.log("current store data",$scope.store.products);
                        // console.log("returned data", res.data);
                        productsArray.forEach(function(product) {
                                if (product.storeId == $scope.store._id && !(exist(product))) $scope.store.products.push(product);
                            })
                            // $scope.store.products = productsArray;
                        $scope.store.products.length == 0 ? $scope.noProds = true : $scope.noProds = false;
                    } else {
                        $scope.noProds = true;
                    }
                });
            } else {
                //Get all products in store
                Store.getProducts({
                        name: $scope.storeName
                    }).$promise
                    .then(function(products) {

                        $scope.products = products;

                    })
            }
        };

        function exist(prod) {
            var exist = false;
            $scope.store.products.forEach(function(product) {
                if (prod._id == product._id) {
                    exist = true;
                }
            });
            return exist;
        }
  });
