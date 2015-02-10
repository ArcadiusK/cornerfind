'use strict';

angular.module('cornerfindApp')
	.directive('manageOfferView',function(){
		return {
			templateUrl: "/app/account/manageAccount/manageOffer.card.html",
			restrict: 'EA',
			scope:{
				offer: '=info',
				stripeResult: '=',
				acceptOffer: '&'
			},
			link: function(scope,element,attrs){
				// scope.submitted = false;
				scope.submitButton = function(){
						scope.charged = true;
						
				}
			}

		}
	})