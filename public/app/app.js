'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'flow',
  'genericUser'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');

  $routeProvider.
  when('/view1', {
    template: '<generic-user></generic-user>'
  }).
  otherwise({
    redirectTo: '/view1'
  });
}]).
//generic-user-service is application wide injectable
factory('genericUserService', ["$http", function($http) {
  // function genericUseContentrPostRequest($http) {
  //   console.log("genericUseContentrPostRequest");
  // }
  var factory = {};

  factory.genericUseContentrPostRequest = function(contentUploadedDetails) {
    console.log("genericUseContentrPostRequest", contentUploadedDetails);
    var req = {
      method: 'GET',
      url: '/'
      // data: contentUploadedDetails
    }

    $http(req).then(factory.successCallback, factory.errorCallback);
  }

  factory.successCallback = function(response) {
    // $scope.status = response.status;
    // $scope.data = response.data;
    console.log("success");
  }

  factory.errorCallback = function(response) {
    // $scope.data = response.data || 'Request failed';
    // $scope.status = response.status;
    console.log("error")
  }

  return factory;
}]);
