// Register the `login` component on the `genericUser` module,

'use strict';

angular.
module('logIn').
component('logIn', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'log-in/log-in.template.html',
  controller: ['$scope', '$mdToast', '$location', 'Upload', 'userCredentialsService', function UserCredentialsController($scope, $mdToast, $location, Upload, userCredentialsService) {

    //by default show sign up page
    $scope.signupPage = true;
    $scope.loginPage = false;

    //to show login page when link for sign in is clicked
    $scope.loginPageLinkClicked = function() {
      //show login apage and hide signup page
      console.log("loginPageLinkClicked")
      $scope.signupPage = false;
      $scope.loginPage = true;
    }

    //for letting the user log in after checking api response and redirecting to the respective allowed page


    //for taost alerts, set up toast position code
    var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };

    $scope.toastPosition = angular.extend({}, last);

    $scope.getToastPosition = function() {
      sanitizePosition();

      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };

    function sanitizePosition() {
      var current = $scope.toastPosition;

      if (current.bottom && last.top) current.top = false;
      if (current.top && last.bottom) current.bottom = false;
      if (current.right && last.left) current.left = false;
      if (current.left && last.right) current.right = false;

      last = angular.extend({}, current);
    }

    //after user submits data post request to save credentials
    $scope.userDetailsSubmitted = function() {
      console.log("user credentials", $scope.user);
      userCredentialsService.userCredentialsPostRequest($scope.user).then(userCredentialsPostRequestSuccess, userCredentialsPostRequestError);
    }

    $scope.userlogin = {};
    //when user hits submit after providing login details
    $scope.loginButtonSubmitted = function(mail, password) {
      console.log("user log in details", $scope.userlogin, "mail", mail, "pwd", password);
      $scope.userlogin.email = mail;
      $scope.userlogin.password = password;
      console.log("userlogin", $scope.userlogin);
      userCredentialsService.userloginPostRequest($scope.userlogin).then(userCredentialsPostRequestSuccess, userCredentialsPostRequestError);
    }

    function userCredentialsPostRequestSuccess(response) {
      console.log("response in component post success", response);

      //redirect to genericUser component
      if (response.data.role == "generic") {
        console.log("response.role", response.data.role);

        //toast alert related code
        var pinTo = $scope.getToastPosition();
        var toast = $mdToast.simple()
          .textContent(response.data.message)
          // .action('UNDO')
          .highlightAction(true)
          .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
          .position(pinTo);

        $mdToast.show(toast).then(function(response) {
          if (response == 'ok') {
            alert('You clicked the \'UNDO\' action.');
          }
        });

        setTimeout(function(){
        $location.path("/portal/generic/");
        }, 3000);
      }

      //redirect to admin component
      if (response.data.role == "admin") {
        console.log("response.role", response.data.role);
        //toast alert related code
        var pinTo = $scope.getToastPosition();
        var toast = $mdToast.simple()
          .textContent(response.data.successMessage)
          // .action('UNDO')
          .highlightAction(true)
          .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
          .position(pinTo);

        $mdToast.show(toast).then(function(response) {
          if (response == 'ok') {
            alert('You clicked the \'UNDO\' action.');
          }
        });

        setTimeout(function(){
        $location.path("/portal/admin/");
        }, 3000);
      }
    }

    function userCredentialsPostRequestError(response) {
      console.log("error in component post request", response);
    }
  }]
});
