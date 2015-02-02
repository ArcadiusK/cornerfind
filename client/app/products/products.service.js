'use strict';

angular.module('cornerfindApp')
    .factory('products', function($http, $location, $resource) {
        var productList = [{
            name: 'test prod1',
            description: 'this is a test',
            price: 50
        }, {
            name: 'test prod2',
            description: 'this is a test',
            price: 30
        }];

    var products = $resource('/api/products/:id', { id: '@_id'}, {
      // update: {
      //   method: 'PUT'
      // },
      // search : {
      //   url: '/api/products/search/:query',
      //   isArray: true,
      //   method: 'GET'
      // },
      // updateQuantity : {
      //   url: '/api/products/qty/:id',
      //   method: 'PUT'
      // }
    });

        return products;

    });
