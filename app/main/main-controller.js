(function(){
  angular.module('snt')
  .controller('MainController', ['$scope', '$http', '$interval',
  function ($scope, $http, $interval){

    if (localStorage['User-Data'] !== undefined){
      $scope.user = JSON.parse(localStorage['User-Data']);
    }

    $scope.sendWaste = function(event){
      if (event.which === 13){
        var request = {
          user: $scope.user.username || $scope.user.email,
          userId: $scope.user._id,
          userImage: $scope.user.image,
          content: $scope.newWaste
        }

        $http.post('api/waste/post', request).success(function(response){
          $scope.wastes = response;
          getWastes(true);
        }).error(function(error){
          console.error(error);
        })
      }
    };

    function getWastes (initial){
      var data = {};
      if ($scope.user){
        data.following = angular.copy($scope.user.following);
        data.following.push({userId: $scope.user._id})
      }
      $http.post('api/waste/get', data).success(function (response){
        if (initial){
          $scope.wastes = response;
        } else {
          if (response.length > $scope.wastes.length){
            $scope.incomingWastes = response;
          }
        }
      })
    };

    $interval(function(){
      getWastes(false);
      if ($scope.incomingWastes){
        $scope.difference = $scope.incomingWastes.length - $scope.wastes.length;
      }
    }, 5000);

    $scope.setNewWastes = function () {
      $scope.wastes = angular.copy($scope.incomingWastes);
      $scope.incomingWastes = undefined;
    }

    //Init
    getWastes(true);


  }]);
}());
