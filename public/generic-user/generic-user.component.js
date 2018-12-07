// Register the `genericUser` component on the `genericUser` module,

'use strict';

angular.
module('genericUser').
component('genericUser', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'generic-user/generic-user.template.html',
  controller: ['$scope', '$mdToast', 'Upload', 'genericUserService', function GenericUserController($scope, $mdToast, Upload, genericUserService) {
    //JSON that contains all details
    $scope.contentUploadedDetails = {};
    $scope.hideUploadContentForm = false;
    $scope.hideUploadedContentCards = true;
    //dropdown for districts
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function(state) {
      return {
        abbrev: state
      };
    });

    $scope.loadUploadedContent = function() {
      console.log("in loadUploadedContent");
      $scope.hideUploadContentForm = true;
      $scope.hideUploadedContentCards = false;
      //to do, write service code to get all the uploaded and bind it
      genericUserService.genericUserGetContentUploaded().then(getContentUploadedSuccess, getContentUploadedFailed);
    }

    function getContentUploadedSuccess(res) {
      console.log("Success fully retrieved uploaded content, res", res);
      $scope.contentUploaded = res.data;
    }

    function getContentUploadedFailed(response) {
      console.log("Failed to retrieve uploaded content");
      return $q.reject(response);
    }

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
    // $scope.fileAddedFunction = function() {
      // console.log("fileAddedFunction");
      // console.log("file name", $files[0].file.name)
      // if ($files.length > 0) {
      //   $scope.contentUploadedDetails.UploadedfileName = $files[0].file.name;
        //split to get the extension and show toaster alert and remove incompatible file Uploaded
      //   var fileExtension = $files[0].file.type.split("/");
      //   console.log("fileExtension[1]", fileExtension[1]);
      // }

      // if (fileExtension[1] != 'png' && fileExtension[1] != 'jpg' && fileExtension[1] != 'jpeg' && fileExtension[1] != 'gif') {
      //   console.log("fileExtension is incompatible, remove the uploaded file and send toast", fileExtension[1]);
      //   $flow.cancel();
      //   $mdToast.show(toast).then(function(response) {
      //     if (response == 'ok') {
      //       alert('You clicked the \'UNDO\' action.');
      //     }
      //   });
      // }
    // }

    //this function gets called when submit is called to use a service and send a http request
    $scope.submitContentDetails = function(file) {
      console.log("file",file, $scope.picFile);
      $scope.contentUploadedDetails.UploadedfileName = $scope.picFile.name;
      console.log("contentUploadedDetails", $scope.contentUploadedDetails);
      //assign ng-bind data to the JSON sent in http request
      // console.log("what's in filled data", $scope.contentUploadedDetails, "$scope.comment", $scope.contentUploadedDetails.comment);
      genericUserService.genericUserContentPostRequest($scope.contentUploadedDetails).then(postRequestSuccess, postRequestError);
    }

    function postRequestSuccess(respnonse) {
      console.log("response in component post success", response);
    }

    function postRequestError(response) {
      console.log("error in component post request", response);
    }

  }]
});
