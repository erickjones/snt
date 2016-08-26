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

			});

			$scope.user.following.push({userId: wasterId});
			localStorage.setItem('User-Data', JSON.stringify($scope.user));

			$http.get('api/users/get').then(function(response){
				$scope.users = response.data;
			});
		}

		$scope.unfollow = function(userId, wasterId) {
			request = { userId: userId, wasterId: wasterId};

			$http.post('api/users/unfollow', request).then(function(response){

			});

			var wasterIndex = $scope.user.following.map(function(obj, index) {
			    if(obj.userId == wasterId) {
			        return index;
			    }
			}).filter(isFinite);

			$scope.user.following.splice(wasterIndex, 1);
			localStorage.setItem('User-Data', JSON.stringify($scope.user));
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
