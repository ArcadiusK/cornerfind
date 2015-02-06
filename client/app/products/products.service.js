'use strict';

angular.module('cornerfindApp')
  .factory('products', function($http, $location, $resource) {
    return{

      resource: $resource('/api/products/:id/:listings', { id: '@_id'}, {
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
        },
        getUsersListings: {
          method: 'GET',
          isArray: true,
          params: {
            id: '@id',
            listings: 'listings'
          }
        }
      })
    }
  })

  
