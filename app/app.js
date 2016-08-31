(function(){
  angular.module('snt', ['ui.router', 'ngFileUpload'])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('signUp', {
      url: "/signup",
      templateUrl: "app/signup/signup.html",
      controller: "SignupController"
    })
    .state('login', {
      url: "/login",
      templateUrl: "app/login/login.html",
      controller: "LoginController"
    })
    .state('editProfile', {
      url: "/edit-profile",
      templateUrl: "app/profile/edit-profile-view.html",
      controller: "EditProfileController"
    })
    .state('main', {
      url: "/",
      templateUrl: "app/main/main.html",
      controller: "MainController"
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "app/profile/profile-view.html",
      controller: "EditProfileController"
    })
    .state('follow', {
      url: "/follow-users",
      templateUrl: "app/follow/follow.html",
      controller: "FollowController"
    });
  })
}());
