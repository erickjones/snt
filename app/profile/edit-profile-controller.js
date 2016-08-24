(function(){
  angular.module('snt')
  .controller('EditProfileController', ['Upload', '$scope', '$state', '$http',
  function(Upload, $scope, $state, $http){

    $scope.user = JSON.parse(localStorage['User-Data']) || undefined;

    $scope.$watch(function(){
      return $scope.file
    }, function (){
      $scope.upload($scope.file);
    });

    $scope.upload = function (file) {
      if (file){
        Upload.upload({
          url: 'api/profile/editPhoto',
          method: 'POST',
          data: {userId: $scope.user._id},
          file: file
        }).progress(function(evt){
          console.log("firing");
        }).success(function(response){
          localStorage.setItem('User-Data', JSON.stringify(response));
          console.log('Image changed')
          $state.reload();
        }).error(function(error){
          console.log(error);
        })
      }
    };

    $scope.updateUsername = function () {
      var request = {
        userId: $scope.user._id,
        username: $scope.user.username
      }

      $http.post('api/profile/updateUsername', request).success(function(response){
        console.log(response);
        localStorage.setItem('User-Data', JSON.stringify(response));
        console.log("successoo");
      }).error(function(error){
        console.log("error");
      })
    };

    $scope.updateBio = function () {
      var request = {
        userId: $scope.user._id,
        bio: $scope.user.bio
      }

      $http.post('api/profile/updateBio', request).success(function(response){
        localStorage.setItem('User-Data', JSON.stringify(response));
      }).error(function(error){
        console.log(error);
      });
    }

  }]);
}());
