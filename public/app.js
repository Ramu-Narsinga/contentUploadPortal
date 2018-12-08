'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'flow',
  'ngFileUpload',
  'ngOnload',
  'genericUser',
  'adminUser'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');

  $routeProvider.
  when('/portal/generic/', {
    template: '<generic-user></generic-user>'
  }).
  when('/portal/admin/', {
    template: '<admin-user></admin-user>'
  }).
  otherwise({
    redirectTo: '/portal/generic/'
  });
}]);
// .
// //generic-user-service is application wide injectable
// factory('genericUserService', ["$http", function($http) {
//   // function genericUseContentrPostRequest($http) {
//   //   console.log("genericUseContentrPostRequest");
//   // }
//   var factory = {};
//
//   factory.genericUserContentPostRequest = function(contentUploadedDetails) {
//     console.log("genericUseContentrPostRequest", contentUploadedDetails);
//     var req = {
//       method: 'POST',
//       url: '/user/uploadUserContent',
//       data: contentUploadedDetails
//     }
//
//     $http(req).then(factory.successCallback, factory.errorCallback);
//   }
//
//   factory.genericUserGetContentUploaded = function() {
//     var req = {
//       method: 'GET',
//       url: '/user/generic/getContentUploaded'
//     }
//
//     // $http(req).then(factory.successCallback, factory.errorCallback);
//     return $http(req).then(factory.successCallback, factory.errorCallback);
//   }
//
//   factory.successCallback = function(response) {
//     // $scope.status = response.status;
//     // $scope.data = response.data;
//     console.log("success", response);
//     return response;
//   }
//
//   factory.errorCallback = function(response) {
//     // $scope.data = response.data || 'Request failed';
//     // $scope.status = response.status;
//     console.log("error", response);
//     return ($q.reject(response));
//   }
//
//   return factory;
// }]);
