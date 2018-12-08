// Register the `adminUser` component on the `adminUser` module,

'use strict';

angular.
module('adminUser').
component('adminUser', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'admin-user/admin-user.template.html',
  controller: ['$scope', '$mdToast', 'Upload', 'adminUserService', function GenericUserController($scope, $mdToast, Upload, adminUserService) {

    // $scope.hideUploadedContentCards = true;
    $scope.imageAllowedFileFormats = ["png", "jpg", "gif", "jpeg"];
    $scope.videoAllowedFileFormats = ["webm", "mp4", "ogg"];
    $scope.videoFileType = false;
    $scope.imageFileType = true; //show img tag by default

    //this function gets called when mouseleave card of uploaded content to show edit delete buttons
    $scope.hideEditDeleteButtons = function(content) {
      // console.log("content", content, "mouse leave hide",$scope.content.hideEditButton, "show", $scope.content.hideEditButton);
      content.hideEditButton = true;
      content.hideDeleteButton = true;
    }

    $scope.showEditDeleteButtons = function(content) {
      // console.log("content", content, "mouseover hide",$scope.content.hideEditButton, "show", $scope.content.hideEditButton);
      content.hideEditButton = false;
      content.hideDeleteButton = false;
    }

    $scope.getFileExtension = function(file) {
      console.log("fileName", file);
      if ($scope.videoAllowedFileFormats.indexOf(file.uploaded_file_name.split(".")[1]) > -1) {
        //show video tag and hide img tag
        $scope.videoFileType = true;
        $scope.imageFileType = false;
      }
      $scope.videoFileExtension = file.uploaded_file_name.split(".")[1];
    }

    //make a call to get uploaded content
    $scope.loadUploadedContent = function() {
      console.log("in loadUploadedContent");
      $scope.hideUploadContentForm = true;
      // $scope.hideUploadedContentCards = false;
      //write service code to get all the uploaded and bind it
      adminUserService.adminUserGetContentUploadedRequest().then(getContentUploadedSuccess, getContentUploadedFailed);
    }

    function getContentUploadedSuccess(res) {
      console.log("Success fully retrieved uploaded content, res", res);
      $scope.contentUploaded = res.data;
    }

    function getContentUploadedFailed(response) {
      console.log("Failed to retrieve uploaded content");
      // return $q.reject(response);
    }

    $scope.loadUploadedContent();
  }]
});
