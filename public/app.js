'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'flow',
  'ngFileUpload',
  'ngOnload',
  'ngCookies',
  'genericUser',
  'adminUser',
  'logIn'
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
  when('/login', {
    template: '<log-in></log-in>'
  }
  ).
  otherwise({
    redirectTo: '/login'
  });
}])
// .run(['$rootScope', '$location', function($rootScope, $location) {
//
//     $rootScope.$on('$routeChangeStart', function(event) {
//
//         $.get("/isAuthenticated", function(resp) {
//             //console.log("response about userId from server in routing and authenticating:" + JSON.stringify(resp));
//             if (resp != null && resp.result != "Success") {
//                 $location.path("/login");
//             } else if (resp == null) {
//                 $location.path("/login");
//             } else if (resp.role == "alumni") { // to prevent general user from accessing dashboard
//                 $rootScope.userRole = resp.role;
//
//                 if ($location.path() == "/memdetails") {
//                     // $location.path("/memorabilia");
//                 }
//             } else {
//                 $rootScope.userRole = resp.role;
//                 if (resp.role == "organizer") {
//                     if ($location.path() == "/login") {
//                         $location.path("/memdetails");
//                     }
//                 }
//             }
//         });
//
//     });
//
// }]);
