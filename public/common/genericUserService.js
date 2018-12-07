"use strict";

function genericUserService($http, $q) {

  this.genericUserContentPostRequest = function(contentUploadedDetails) {
    console.log("genericUseContentrPostRequest", contentUploadedDetails);
    var req = {
      method: 'POST',
      url: '/user/uploadUserContent',
      data: contentUploadedDetails
    }

    return ($http(req).then(successCallback, errorCallback));
  }

  this.genericUserGetContentUploaded = function() {
    var req = {
      method: 'GET',
      url: '/user/generic/getContentUploaded'
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
angular.module('myApp').service('genericUserService', genericUserService);
