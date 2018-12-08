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
    // // $scope.hideUploadedContentCards = true;
    // $scope.imageAllowedFileFormats = ["png", "jpg", "gif", "jpeg"];
    // $scope.videoAllowedFileFormats = ["webm", "mp4", "ogg"];
    // $scope.videoFileType = false;
    // $scope.imageFileType = true; //show img tag by default

    // //this function gets called when mouseleave card of uploaded content to show edit delete buttons
    // $scope.hideEditDeleteButtons = function(content) {
    //   // console.log("content", content, "mouse leave hide",$scope.content.hideEditButton, "show", $scope.content.hideEditButton);
    //   content.hideEditButton = true;
    //   content.hideDeleteButton = true;
    // }

    //this function to hide edit/delete buttons
    // $scope.showEditDeleteButtons = function(content) {
    //   // console.log("content", content, "mouseover hide",$scope.content.hideEditButton, "show", $scope.content.hideEditButton);
    //   content.hideEditButton = false;
    //   content.hideDeleteButton = false;
    // }

    //dropdown for districts
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function(state) {
      return {
        abbrev: state
      };
    });

    // $scope.getFileExtension = function(file) {
    //  console.log("fileName", file);
    //  if ($scope.videoAllowedFileFormats.indexOf(file.uploaded_file_name.split(".")[1]) > -1) {
    //    //show video tag and hide img tag
    //    $scope.videoFileType = true;
    //    $scope.imageFileType = false;
    //  }
    //  $scope.videoFileExtension = file.uploaded_file_name.split(".")[1];
    // }

    // $scope.loadUploadedContent = function() {
    //   console.log("in loadUploadedContent");
    //   $scope.hideUploadContentForm = true;
    //   // $scope.hideUploadedContentCards = false;
    //   //write service code to get all the uploaded and bind it
    //   genericUserService.genericUserGetContentUploaded().then(getContentUploadedSuccess, getContentUploadedFailed);
    // }
    //
    // function getContentUploadedSuccess(res) {
    //   console.log("Success fully retrieved uploaded content, res", res);
    //   $scope.contentUploaded = res.data;
    // }
    //
    // function getContentUploadedFailed(response) {
    //   console.log("Failed to retrieve uploaded content");
    //   return $q.reject(response);
    // }

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
    // // toast related code extracted from codepen documentation
    // // to show toast alerts
    // var pinTo = $scope.getToastPosition();
    // var toast = $mdToast.simple()
    //   .textContent("Please upload image with 'png/jpeg/jpg/gif' extension")
    //   .action('UNDO')
    //   .highlightAction(true)
    //   .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
    //   .position(pinTo);

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
      console.log("file", file, $scope.picFile);
      $scope.contentUploadedDetails.UploadedfileName = $scope.picFile.name;
      console.log("contentUploadedDetails", $scope.contentUploadedDetails);
      //assign ng-bind data to the JSON sent in http request
      // console.log("what's in filled data", $scope.contentUploadedDetails, "$scope.comment", $scope.contentUploadedDetails.comment);

      //disable submit if wrong file format is uploaded //todo if evreything is perfect from front end then call http request
      genericUserService.genericUserContentPostRequest($scope.contentUploadedDetails).then(postRequestSuccess, postRequestError);

    }

    function postRequestSuccess(response) {
      console.log("response in component post success", response);
      //toast alert related code
      var pinTo = $scope.getToastPosition();
      var toast = $mdToast.simple()
        .textContent('Data uploaded successfully, you can upload more')
        // .action('UNDO')
        .highlightAction(true)
        .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
        .position(pinTo);

      $mdToast.show(toast).then(function(response) {
        if (response == 'ok') {
          alert('You clicked the \'UNDO\' action.');
        }
      });
    }

    function postRequestError(response) {
      console.log("error in component post request", response);
    }

  }]
});
