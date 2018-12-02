'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'flow',
  'genericUser'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
//generic-user-service is application wide injectable
factory('genericUserService', ["$http", function($http) {
  // function genericUseContentrPostRequest($http) {
  //   console.log("genericUseContentrPostRequest");
  // }
  return {
      genericUseContentrPostRequest: function (contentUploadedDetails) {
        console.log("genericUseContentrPostRequest", contentUploadedDetails);
      }
  };
}]
);
