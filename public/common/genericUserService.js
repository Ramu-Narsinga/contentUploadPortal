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

  // get request to populate content gor update
  this.genericUserGetRequestForEdit = function(id) {
    console.log("content id to be updated/edited", id);
    var req = {
      method: 'GET',
      url: '/user/admin/'+id+'/edit/'
    }

    return $http(req).then(successCallback, errorCallback);
  }

  // put request to populate content gor update
  this.genericUserPutRequestForEdit = function(id, contentEditedDetails) {
    console.log("content id to be updated/edited", id, "contentEditedDetails", contentEditedDetails);
    var req = {
      method: 'PUT',
      url: '/user/admin/'+id+'/edit/',
      data: contentEditedDetails
    }

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
