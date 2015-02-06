'use strict';

angular.module('cornerfindApp')
	.controller('ManageAccountCtrl',function($scope, Auth,User){
		$scope.hello= 'Hello';



		$scope.currentUser = Auth.getCurrentUser();














	})