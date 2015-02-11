'use strict';

angular.module('cornerfindApp')
	.directive('yourOfferView',function(){
		return {
			templateUrl: "/app/offer/offer.directive.html",
			restrict: 'EA',
			scope:{
				offer: '=',
				modifyOffer: '&',
				cancelOffer: '&'
			},
			link: function(scope,element,attrs){
				
			}

		}
	})