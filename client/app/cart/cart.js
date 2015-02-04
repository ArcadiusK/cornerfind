'use strict';

angular.module('cornerfindApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('cart',{
				url:'/cart/:id',
				templateUrl: 'app/cart/cart.html',
				controller: "CartCtrl"
			})
	})