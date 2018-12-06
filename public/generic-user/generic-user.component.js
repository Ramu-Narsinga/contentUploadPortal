// Register the `genericUser` component on the `genericUser` module,

'use strict';

angular.
module('genericUser').
component('genericUser', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'generic-user/generic-user.template.html',
  controller: ['$scope', '$mdToast', 'genericUserService', function GenericUserController($scope, $mdToast, genericUserService) {
    //JSON that contains all details
    $scope.contentUploadedDetails = {};

    //dropdown for districts
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function(state) {
      return {
        abbrev: state
      };
    });

    //for taost alerts, set up toast position code
    var last = {
      bottom: true,
      top: false,
      left: true,
      right: false
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
    // toast related code extracted from codepen documentation
    // to show toast alerts
    var pinTo = $scope.getToastPosition();
    var toast = $mdToast.simple()
      .textContent("Please upload image with 'png/jpeg/jpg/gif' extension")
      .action('UNDO')
      .highlightAction(true)
      .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
      .position(pinTo);

    //this function gets called when a file is succesfully uploaded
    $scope.fileUploadSubmitFunction = function($files, $event, $flow) {
      // console.log("fileUploadSuccessFunction", $files, $event, $flow);
      // console.log("file name", $files[0].file.name)
      if ($files.length > 0) {
        $scope.contentUploadedDetails.UploadedfileName = $files[0].file.name;
        //split to get the extension and show toaster alert and remove incompatible file Uploaded
        var fileExtension = $files[0].file.type.split("/");
        console.log("fileExtension[1]", fileExtension[1]);
      }

      if (fileExtension[1] != 'png' && fileExtension[1] != 'jpg' && fileExtension[1] != 'jpeg' && fileExtension[1] != 'gif') {
        console.log("fileExtension is incompatible, remove the uploaded file and send toast", fileExtension[1]);
        $flow.cancel();
        $mdToast.show(toast).then(function(response) {
          if (response == 'ok') {
            alert('You clicked the \'UNDO\' action.');
          }
        });
      }
    }

    // to remove uploaded image from front end, and sending $flow object
    $scope.removeImg = function($flow) {
      // console.log("in remove IMG", $flow);
      $flow.cancel();
    }

    //this function gets called when submit is called to use a service and send a http request
    $scope.submitContentDetails = function() {
      //assign ng-bind data to the JSON sent in http request
      // console.log("what's in filled data", $scope.contentUploadedDetails, "$scope.comment", $scope.contentUploadedDetails.comment);
      genericUserService.genericUseContentrPostRequest($scope.contentUploadedDetails);
    }

  }]
});
