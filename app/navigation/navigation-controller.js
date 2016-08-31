(function(){
    angular.module('snt')
    .controller('NavigationController', ['$scope', '$http', "$state", function($scope, $http, $state){
        if (localStorage['User-Data']){
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }

        $scope.logOut = function () {
            localStorage.clear();
            $scope.loggedIn = false;
        }
    }]);
}());
