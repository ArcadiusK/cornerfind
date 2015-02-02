'use strict';

angular.module('cornerfindApp')
    .factory('brand', function($resource) {
        return $resource('/api/brands/:id/:controller', {
                id: '@_id'
            }, {
                search: {
                    method: 'POST',
                    params: {
                        controller: 'search'
                    }
                }
            }

        )
    });