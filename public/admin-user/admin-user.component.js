// Register the `adminUser` component on the `adminUser` module,

'use strict';

angular.
module('adminUser').
component('adminUser', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'admin-user/admin-user.template.html',
  controller: ['$scope', '$mdToast', 'Upload', 'adminUserService', '$mdDialog', function AdminUserController($scope, $mdToast, Upload, adminUserService, $mdDialog) {

    //populate this from loadUploadedContent response
    $scope.Tags = [];
    $scope.assemblyConstituenciesForDropdown = [];
    $scope.parliamentConstituenciesForDropdown = [];
    $scope.imageAllowedFileFormats = ["png", "jpg", "gif", "jpeg"];
    $scope.videoAllowedFileFormats = ["webm", "mp4", "ogg"];
    $scope.videoFileType = false;
    $scope.imageFileType = true; //show img tag by default
    $scope.hideFilterDiv = true;
    $scope.toggle={"class":"rotatedCSS"};
    $scope.rotated = true;
    //show search filters
    $scope.showDropDown = function(toggle) {
     $scope.hideFilterDiv = !$scope.hideFilterDiv;
     //toggle icon logic
     if(!toggle.class){
            toggle.class = ''; //Assume it's not clicked if there's no existing value
     }
     
     toggle.class = !toggle.class;
     $scope.rotated = toggle.class;
    }

    //dropdown for districts
    $scope.Districts = [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "YSR Kadapa",
      "Krishna",
      "Kurnool",
      "Nellore",
      "Prakasam",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari"
    ];

    //dropdown for assembly constituency
    $scope.assemblyConstituencies = assemblyConstituenciesExported;

    //parliamentary constituencies
    $scope.parliamentConstituencies = parliamentConstituenciesExported;

    //this gets called when a district is chosen to populate assembly and parliament contituency dropdowns
    $scope.setParliamentAndAssemblyDropDownValues = function(selectedDistrict) {
      if ($scope.assemblyConstituenciesForDropdown.length > 0) {
        $scope.assemblyConstituenciesForDropdown = [];
      }
      // console.log("selected district", selectedDistrict);
      for (var i = 0; i < $scope.assemblyConstituencies[0][selectedDistrict].length; i++) {
        console.log("assembly constituency val for dropdown", $scope.assemblyConstituencies[0][selectedDistrict][i]);
        $scope.assemblyConstituenciesForDropdown.push($scope.assemblyConstituencies[0][selectedDistrict][i]);
      }
      // console.log("$scope.assemblyConstituenciesForDropdown", $scope.assemblyConstituenciesForDropdown);
    }

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

    //make a call to get uploaded content
    $scope.loadUploadedContent = function() {
      console.log("in loadUploadedContent");
      $scope.hideUploadContentForm = true;
      // $scope.hideUploadedContentCards = false;
      //write service code to get all the uploaded and bind it
      adminUserService.adminUserGetContentUploadedRequest().then(getContentUploadedSuccess, getContentUploadedFailed);
    }

    function getContentUploadedSuccess(res) {
      // console.log("Success fully retrieved uploaded content, res", res);
      $scope.contentUploaded = res.data;

      //iterate over data.tags and push into $scope.Tags
      for (var i = 0; i < res.data.length; i++) {
        for (var j = 0; j < res.data[i].tags.length; j++) {
          if ($scope.Tags.indexOf(res.data[i].tags[j]) == -1) {
            $scope.Tags.push(res.data[i].tags[j]);
          }
        }
      }

      // console.log("tags after being populated", $scope.Tags);

      //update file format extensions
      for (var i = 0; i < $scope.contentUploaded.length; i++) {

        if ($scope.imageAllowedFileFormats.indexOf($scope.contentUploaded[i].uploaded_file_name.split(".")[1]) > -1) {
          $scope.contentUploaded[i].videoFileType = false;
          $scope.contentUploaded[i].imageFileType = true; //show img tag by default
        }

        if ($scope.videoAllowedFileFormats.indexOf($scope.contentUploaded[i].uploaded_file_name.split(".")[1]) > -1) {
          $scope.contentUploaded[i].videoFileType = true;
          $scope.contentUploaded[i].imageFileType = false; //hide img tag by default
          $scope.contentUploaded[i].videoFileExtension = $scope.contentUploaded[i].uploaded_file_name.split(".")[1];
        }

        console.log("each item extension,img tag:, video tag: in content", $scope.contentUploaded[i]);
      }

    }

    function getContentUploadedFailed(response) {
      console.log("Failed to retrieve uploaded content");
      // return $q.reject(response);
    }

    $scope.loadUploadedContent();
    
    //show dialog while deleting content
    $scope.showDeleteConfirm = function(ev, content) {
      // console.log("for id in content", content);
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete this?')
          // .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Delete Confirm')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

    $mdDialog.show(confirm).then(function() {
       console.log('Successfully deleted', content._id);
       //API to delete card by id
       adminUserService.adminUserDeleteOneCardContentRequest(content._id).then(deleteContentSuccess, deleteContentFailed);
     }, function() {
       console.log('Failed to delete');
     });
    };
    
    function deleteContentSuccess(response){
     console.log("Successfully deleted", response);
     //reload content after successful deletion
     $scope.loadUploadedContent();
    }

    function deleteContentFailed(response){
     console.log("failed to deleted", response);
    }

  }]
});
