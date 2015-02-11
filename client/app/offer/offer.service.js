'use strict';

angular.module('cornerfindApp')
    .factory('offer', function($resource) {
        return $resource('/api/orders/:id/:offers', {
                id: '@_id'
            },

            {
                getBuyersOffers: {
                    isArray: true,
                    method: 'GET',
                    params: {
                        id: '@id',
                        offers: 'offers'
                    }
                },
                getAcceptedOffer: {
                    // isArray:true,
                    method: 'GET',
                    params: {
                        id: '@id',
                        offers: 'getAccepted'
                    }
                },
                charge: {
                    method: 'POST',
                    params: {
                        offers: 'charge'
                    }
                },
                manageOffers: {
                    isArray: true,
                    method: 'GET',
                    params: {
                        id: '@id',
                        offers: 'manageOffers'
                    }
                },

                acceptOffer: {
                    method: 'GET',
                    params: {
                        id: '@id',
                        offers: 'acceptOffer'
                    }
                },
                updateOffer: {
                    method: 'PUT',
                    params: {
                        id: '@id'
                    }
                }
            }


        )
    });