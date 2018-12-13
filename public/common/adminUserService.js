"use strict";

function adminUserService($http, $q) {

  //get all the uploaded data
  this.adminUserGetContentUploadedRequest = function() {
    var req = {
      method: 'GET',
      url: '/user/admin/getContentUploaded'
    }

    return $http(req).then(successCallback, errorCallback);
  }

  // get request to populate content gor update
  this.adminUserPutRequestForEdit = function(id) {
    console.log("content id to be updated/edited", id);
    var req = {
      method: 'GET',
      url: '/user/admin/'+id+'/edit/',
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
angular.module('myApp').service('adminUserService', adminUserService);
