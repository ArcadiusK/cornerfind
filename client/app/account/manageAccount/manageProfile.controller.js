angular.module('cornerfindApp')
	.controller('ManageProfileCtrl',function($scope, Auth, User){
		$scope.resetUserInfo = function(){
			$scope.currentUser = Auth.getCurrentUser();
			console.log('Why doesnt this live update the inputs?')
		}


		$scope.toggleSuccess = function(){
			if(typeof $scope.success==='undefined'|| $scope.success ===false){
				$scope.success=true;
			}
			else {
				$scope.success =false;
				$scope.$apply();
			}
		}
		$scope.successPopup = function(){
			$scope.toggleSuccess()
			var changeBack = _.debounce($scope.toggleSuccess,3000)
			changeBack();
		}

		$scope.updateUser = function(userObject){
			User.update(userObject._id,userObject,function(res){
				$scope.successPopup();
			})
		}

	})