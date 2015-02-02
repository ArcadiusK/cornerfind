'use strict';

angular.module('cornerfindApp')
  .factory('brand', function ($resource) {
    return $resource('/api/brands/:id',{id:'@_id'})
});
