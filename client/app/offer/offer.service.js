'use strict';

angular.module('cornerfindApp')
  .factory('offer', function ($resource) {
    return $resource('/api/orders/:id',
    	{id:'@_id'})
  });
