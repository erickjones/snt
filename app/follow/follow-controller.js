(function(){
	angular.module('snt')
	.controller('FollowController', ['$scope', '$http', '$state', function($scope, $http, $state){

		$scope.user = JSON.parse(localStorage['User-Data']);

	  $http.get('api/users/get').then(function(response){
			$scope.users = response.data;
		})

		$scope.follow = function(userId, wasterId) {
			request = { userId: userId, wasterId: wasterId};

			$http.post('api/users/follow', request).then(function(response){
				//console.log("following ", request.wasterId);
				//localStorage.setItem('User-Data', JSON.stringify(response));
				//console.log("successoo ao listar os followers");
				//$state.reload();
			});

			localStorage.setItem('User-Data', JSON.stringify($scope.user.following));
			$state.reload();

			//$scope.user.following.push(request.wasterId);
		}

		$scope.checkIsFollowing = function(wasterId){
			for(var i = 0, len = $scope.user.following.length; i < len; i++){
				if ($scope.user.following[i].userId === wasterId){
					return true;
				}
			}
			return false;
		}
	}]);
}());
