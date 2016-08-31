(function(){
    angular.module('snt')
    .controller('LoginController', ['$scope', '$http', "$state", function($scope, $http, $state){
        if (localStorage['User-Data']){
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }

        $scope.logUserIn = function(){
            $http.post('api/user/login', $scope.login).success(function(response){
               localStorage.setItem('User-Data', JSON.stringify(response));
               $scope.loggedIn = true;
               $state.go('main', {}, {reload: true});
            }).error(function(error){
                console.error(error);
            });
        };

        $scope.logUserInKeyboard = function(event){
          if(event.which === 13){
            $scope.logUserIn();
          }
        }
    }]);
}());