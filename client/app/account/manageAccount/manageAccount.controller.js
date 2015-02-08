'use strict';

angular.module('cornerfindApp')
	.controller('ManageAccountCtrl',function($scope, Auth,User, $state){
		$scope.hello= 'Hello';
		$scope.currentUser = Auth.getCurrentUser();


	})