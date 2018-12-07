// Register the `adminUser` component on the `adminUser` module,

'use strict';

angular.
module('adminUser').
component('adminUser', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'admin-user/admin-user.template.html',
  controller: ['$scope', '$mdToast', 'Upload', 'genericUserService', function GenericUserController($scope, $mdToast, Upload, genericUserService) {
    //JSON that contains all details
    $scope.contentUploadedDetails = {};
  }]
});
