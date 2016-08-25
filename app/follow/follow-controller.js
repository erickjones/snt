(function(){
	angular.module('snt')
	.controller('FollowController', ['$scope', '$http', '$state', function($scope, $http, $state){

		$scope.user = JSON.parse(localStorage['User-Data']);

	  $http.get('api/users/get').then(function(response){
			$scope.users = response.data;
			console.log($scope.user.email + " is following: " + $scope.user.following);
		})

		$scope.follow = function(userId, wasterId) {
			request = { userId: userId, wasterId: wasterId};

			console.log('Request: ' + request);

			$http.post('api/users/follow', request).then(function(response){

			});

			$scope.user.following.push({userId: wasterId});
			localStorage.setItem('User-Data', JSON.stringify($scope.user));

			$http.get('api/users/get').then(function(response){
				$scope.users = response.data;
				console.log('Response.data: ' + response.data);
				console.log('Number of following: ' + $scope.user.following.length);
				console.log('User: ' + $scope.user.email);
				console.log($scope.user.email + " is following: " + $scope.user.following);
			});
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
