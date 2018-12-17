// Register the `genericUser` component on the `genericUser` module,

'use strict';

angular.
module('genericUser').
component('genericUser', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'generic-user/generic-user.template.html',
  controller: ['$scope', '$mdToast', 'Upload', 'genericUserService', '$routeParams', function GenericUserController($scope, $mdToast, Upload, genericUserService, $routeParams) {

    $scope.idForUpdate = $routeParams.id;
    var formForEditIsSubmitted = false;
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
      // console.log("selected district", district);
      for (var i = 0; i < $scope.assemblyConstituencies[0][district].length; i++) {
        // console.log("assembly constituency val for dropdown", $scope.assemblyConstituencies[0][district][i]);
        $scope.assemblyConstituenciesForDropdown.push($scope.assemblyConstituencies[0][district][i]);
      }
      // console.log("$scope.assemblyConstituenciesForDropdown", $scope.assemblyConstituenciesForDropdown);
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
      var noFileChosen = false;
      if ($scope.picFile) {
        $scope.contentUploadedDetails.uploaded_file_name = $scope.picFile.name;
      }
      if (!$scope.picFile) {
        if (!$scope.idForUpdate) {
          console.log("this is consider first time update, no id and no file uploaded from genric user component")
          var noFileChosen = true;
          //toast alert related code
          var pinTo = $scope.getToastPosition();
          var toast = $mdToast.simple()
            .textContent('PLease select a file.')
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
      }
      $scope.contentUploadedDetails = $scope.contentUploadedDetails;
      console.log("contentUploadedDetails", $scope.contentUploadedDetails);
      //assign ng-bind data to the JSON sent in http request
      // console.log("what's in filled data", $scope.contentUploadedDetails, "$scope.comment", $scope.contentUploadedDetails.comment);

      //make tags in JSON an array
      if (!Array.isArray($scope.contentUploadedDetails.tags)) {
        console.log($scope.contentUploadedDetails.tags.split(','));
        var tagsArray = $scope.contentUploadedDetails.tags.split(',');
        $scope.contentUploadedDetails.tags = tagsArray;
      }
      //on submit if id exists it is an edit from admin user
      if ($scope.idForUpdate) {
        // with id url form is submitted
        formForEditIsSubmitted = true;
        //call a service to find by id and populating data
        genericUserService.genericUserPutRequestForEdit($scope.idForUpdate, $scope.contentUploadedDetails).then(getEditableRequestSuccess, getEditableRequestError);;
      } else {
        //disable submit if wrong file format is uploaded //todo if evreything is perfect from front end then call http request
        if (!noFileChosen) {
          genericUserService.genericUserContentPostRequest($scope.contentUploadedDetails).then(postRequestSuccess, postRequestError);
        }
      }
    }

    function postRequestSuccess(response) {
      console.log("response in component post success", response);
      if (formForEditIsSubmitted) {
        //toast alert related code
        var pinTo = $scope.getToastPosition();
        var toast = $mdToast.simple()
          .textContent('Data is uploaded successfully, you can upload more')
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
    }

    function postRequestError(response) {
      console.log("error in component post request", response);
    }

    console.log("$scope.idForUpdate", $scope.idForUpdate);
    if ($scope.idForUpdate) {
      //call a service to find by id and populating data
      genericUserService.genericUserGetRequestForEdit($scope.idForUpdate).then(getEditableRequestSuccess, getEditableRequestError);;
    }

    function getEditableRequestSuccess(response) {
      console.log("getEditableRequestSuccess response for edit in admin", response);
      $scope.contentUploadedDetails = response.data;
      console.log("$scope.contentUploadedDetails", $scope.contentUploadedDetails);
      $scope.setParliamentAndAssemblyDropDownValues($scope.contentUploadedDetails.district);
      //toast alert related code
      var pinTo = $scope.getToastPosition();
      var toast = $mdToast.simple()
        .textContent('Data is updated successfully')
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

    function getEditableRequestError(response) {
      console.log("response of error", response);
    }
  }]
});
