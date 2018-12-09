"use strict";

function adminUserService($http, $q) {

  // this.genericUserContentPostRequest = function(contentUploadedDetails) {
  //   console.log("genericUseContentrPostRequest", contentUploadedDetails);
  //   var req = {
  //     method: 'POST',
  //     url: '/user/uploadUserContent',
  //     data: contentUploadedDetails
  //   }
  //
  //   return ($http(req).then(successCallback, errorCallback));
  // }

  //get all the uploaded data
  this.adminUserGetContentUploadedRequest = function() {
    var req = {
      method: 'GET',
      url: '/user/admin/getContentUploaded'
    }

    // $http(req).then(factory.successCallback, factory.errorCallback);
    return $http(req).then(successCallback, errorCallback);
  }
  
  //API response payload
  function successCallback(response) {
    console.log("success", response);
    return response;
  }

  function errorCallback(response) {
    return ($q.reject("error", response));
  }

}
angular.module('myApp').service('adminUserService', adminUserService);
