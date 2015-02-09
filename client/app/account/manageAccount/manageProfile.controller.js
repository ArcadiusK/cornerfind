angular.module('cornerfindApp')
	.controller('ManageProfileCtrl',function($scope, Auth, User){
		$scope.resetUserInfo = function(){
			$scope.currentUser = Auth.getCurrentUser();
			console.log('Why doesnt this live update the inputs?')
		}

		$scope.updateUser = function(userObject){
			User.update(userObject._id,userObject,function(res){
				$scope.success = true;
			})
		}

	})