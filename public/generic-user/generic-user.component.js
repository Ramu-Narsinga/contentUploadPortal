// Register the `genericUser` component on the `genericUser` module,

'use strict';

angular.
module('genericUser').
component('genericUser', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'generic-user/generic-user.template.html',
  controller: ['$scope', '$mdToast', 'Upload', 'genericUserService', 'adminUserService', '$routeParams', function GenericUserController($scope, $mdToast, Upload, genericUserService, adminUserService, $routeParams) {

    $scope.idForUpdate = $routeParams.id;

    //JSON that contains all details
    $scope.contentUploadedDetails = {};
    $scope.hideUploadContentForm = false;
    $scope.assemblyConstituenciesForDropdown = [];
    $scope.parliamentConstituenciesForDropdown = [];

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

    //ths gets called when a distruct is chosen to populate assembly and parliament contituency dropdowns
    $scope.setParliamentAndAssemblyDropDownValues = function(district) {
      if ($scope.assemblyConstituenciesForDropdown.length > 0) {
        $scope.assemblyConstituenciesForDropdown = [];
      }
      console.log("selected district", district);
      for (var i = 0; i < $scope.assemblyConstituencies[0][district].length; i++) {
        console.log("assembly constituency val for dropdown", $scope.assemblyConstituencies[0][district][i]);
        $scope.assemblyConstituenciesForDropdown.push($scope.assemblyConstituencies[0][district][i]);
      }
      console.log("$scope.assemblyConstituenciesForDropdown", $scope.assemblyConstituenciesForDropdown);
    }

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

    //this function gets called when submit is called to use a service and send a http request
    $scope.submitContentDetails = function(file) {
      console.log("file", file, $scope.picFile);
      $scope.contentUploadedDetails.UploadedfileName = $scope.picFile.name;
      console.log("contentUploadedDetails", $scope.contentUploadedDetails);
      //assign ng-bind data to the JSON sent in http request
      // console.log("what's in filled data", $scope.contentUploadedDetails, "$scope.comment", $scope.contentUploadedDetails.comment);

      //make tags in JSON an array
      console.log($scope.contentUploadedDetails.tags.split(','));
      var tagsArray = $scope.contentUploadedDetails.tags.split(',');
      $scope.contentUploadedDetails.tags = tagsArray;

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

    console.log("$scope.idForUpdate", $scope.idForUpdate);
    if($scope.idForUpdate) {
      //call a service to find by id and populating data
      adminUserService.adminUserPutRequestForEdit($scope.idForUpdate).then(getEditableRequestSuccess, getEditableRequestError);;
    }

    function getEditableRequestSuccess(response) {
     console.log("getEditableRequestSuccess response", response);
     $scope.contentUploadedDetails = response.data;
     console.log("$scope.contentUploadedDetails", $scope.contentUploadedDetails);
     $scope.setParliamentAndAssemblyDropDownValues(response.data.district);
     $scope.contentUploadedDetails.assemblyConstituency = response.data.assembly_constituency;
     $scope.contentUploadedDetails.parliamentConstituency = response.data.parliament_constituency;
    }

    function getEditableRequestError(response) {
      console.log("response of error", response);
    }
  }]
});
