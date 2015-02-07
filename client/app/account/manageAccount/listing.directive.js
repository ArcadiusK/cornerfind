'use strict';

angular.module('cornerfindApp')
	.directive('listingCard',function(){
		return {
			templateUrl: "/app/account/manageAccount/listing.card.html",
			restrict: 'EA',
			scope:{
				listing: '=info',
				editProduct: '&'
			},
			link: function(scope,element,attrs){

			}

		}
	})