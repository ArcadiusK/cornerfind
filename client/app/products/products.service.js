'use strict';

angular.module('cornerfindApp')
    .factory('products', function($http, $location, $resource) {
      return{

    resource: $resource('/api/products/:id', { id: '@_id'}, {
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
    }),
    productRoute: function(userId){
      console.log('USERID ',userId)
      $location.path('/users'+userId+'/add');
      //check why this isnt working, want to add to navbar
    }

  }
   

    });
