'use strict';

angular.module('cornerfindApp')
    .factory('products', function($http, $location, $resource) {


    var products = $resource('/api/products/:id', { id: '@_id'}, {
      update: {
        method: 'PUT'
      },
      search : {
        url: '/api/products/search/:query',
        isArray: true,
        method: 'GET'
      },
      updateQuantity : {
        url: '/api/products/qty/:id',
        method: 'PUT'
      }
    });


        return products;

    });
