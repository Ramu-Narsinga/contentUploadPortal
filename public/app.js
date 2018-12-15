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
  when('/portal/admin/:id/edit/',{
    template: '<generic-user></generic-user>'
  }).
  when('/login', {
    template: '<log-in></log-in>'
  }
  ).
  otherwise({
    redirectTo: '/login'
  });
}])
.run(['$rootScope', '$location', function($rootScope, $location) {

    $rootScope.$on('$routeChangeStart', function(event) {

        $.get("/isAuthenticated", function(resp) {
            console.log("response about userId from server in routing and authenticating:" + JSON.stringify(resp));
            if (resp != null && resp.result != "Success") {
                $location.path("/login");
            } else if (resp == null) {
                $location.path("/login");
            } else if (resp.role == "generic") { // to prevent general user from accessing dashboard
                $rootScope.userRole = resp.role;
                console.log("what's in $location.path()", $location.path());
                if ($location.path() == "/portal/admin/") {
                    $location.path("/portal/generic/");
                }
                if ($location.path() == "/login") {
                    $location.path("/portal/generic/");
                }
            } else {
                $rootScope.userRole = resp.role;
                if (resp.role == "admin") {
                    if ($location.path() == "/login") {
                        $location.path("/portal/admin");
                    }
                }
            }
        });

    });

}]);
