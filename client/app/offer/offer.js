'use strict';

angular.module('cornerfindApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('offer',{
				url:'/offers/:userId', 
				//question for Joe with srefing this from navbar
				templateUrl: 'app/offer/offer.html',
				controller: "OfferCtrl"
			})
	})