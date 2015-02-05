'use strict';

angular.module('cornerfindApp')
  .factory('offer', function ($resource) {
    return $resource('/api/orders/:id/:offers',
    	{id:'@_id'},

    	{
    		getBuyersOffers: {
    			isArray:true,
    			method: 'GET',
    			params: {
    				id: '@id',
    				offers: 'offers'
    			}
    		}
    	}


    )
  });
