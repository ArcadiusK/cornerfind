'use strict';

angular.module('cornerfindApp')
    .factory('Address', function($resource) {
        return $resource('/api/address/:id', {id: '@_id'}, {

            updateAddress: {
            	method: 'PUT',
            	params: {
            		id: '@id'
            	}
            }
        })
    });