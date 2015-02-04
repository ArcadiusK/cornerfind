'use strict';

angular.module('cornerfindApp')
  .factory('cart', function ($resource) {
    return $resource('/api/orders/:id',{id:'@_id'})
  });
